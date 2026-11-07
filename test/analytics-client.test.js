const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

function client(fetch) {
  const context = {
    console: { warn() {} }, fetch,
    document: { querySelector: () => ({}) },
    localStorage: { getItem: () => null },
    window: {
      courseTaxonomy: require('../course-taxonomy'),
      courseCatalog: require('../course-data'),
      courseMatchQuestions: require('../course-match-questions'),
    },
  };
  vm.createContext(context);
  let source = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
  source = source.slice(0, source.lastIndexOf('\nrender();'));
  vm.runInContext(source, context);
  vm.runInContext("state.user = { id: 1 }; render = () => {};", context);
  return context;
}

test('profile activity waits until the latest page visit has been saved', async () => {
  let release;
  const write = new Promise(resolve => { release = resolve; });
  const reads = [];
  const context = client(async (url, options) => {
    if (options?.method === 'POST') { await write; return { ok: true }; }
    reads.push(url);
    return { ok: true, json: async () => url === '/api/analytics'
      ? { totals: { page_view: 1 } } : { sessions: [] } };
  });
  const loading = vm.runInContext("trackAnalytics('page_view', 'profile'); loadProfileData();", context);
  await Promise.resolve();
  assert.equal(reads.length, 0);
  release();
  await loading;
  assert.equal(reads.length, 2);
  assert.equal(vm.runInContext('state.analytics.totals.page_view', context), 1);
});

test('an unsuccessful activity save does not block later events or profile loading', async () => {
  let writes = 0;
  const context = client(async (url, options) => {
    if (options?.method === 'POST') {
      writes++;
      if (writes === 1) throw new Error('Connection interrupted');
      return { ok: true };
    }
    return { ok: true, json: async () => url === '/api/analytics'
      ? { totals: { page_view: 1 } } : { sessions: [] } };
  });
  await vm.runInContext("trackAnalytics('page_view', 'dashboard'); trackAnalytics('page_view', 'profile'); loadProfileData();", context);
  assert.equal(writes, 2);
  assert.equal(vm.runInContext('state.analytics.totals.page_view', context), 1);
});

test('admin insights render scaled charts and readable rankings, including empty data', () => {
  const context = client(async () => ({ ok: true }));
  const markup = vm.runInContext(`adminAnalyticsOverview({
    registrations:[{date:'2026-10-29',count:0},{date:'2026-10-30',count:4}],
    activityTrend:[{date:'2026-10-29',count:0},{date:'2026-10-30',count:0}],
    popularCourses:[{courseId:'it',matches:3}],
    activity:[{eventType:'page_view',count:4},{eventType:'course_view',count:1}]
  }, new Map([['it','Information Technology']]))`, context);
  assert.match(markup, /Information Technology/);
  assert.match(markup, /Page visits/);
  assert.match(markup, /80\.0%/);
  assert.match(markup, /Daily average/);
  assert.doesNotMatch(markup, /NaN|Infinity/);
  const empty = vm.runInContext('adminAnalyticsOverview({}, new Map())', context);
  assert.match(empty, /No activity recorded/);
  assert.doesNotMatch(empty, /NaN|Infinity/);
});

test('administration renders separate sections and limits settings to super admins', () => {
  const context = client(async () => ({ok:true}));
  vm.runInContext(`state.user={id:1,role:'super_admin'};
    state.adminOverview={stats:{},registrations:[],activityTrend:[],popularCourses:[],activity:[]};
    state.adminUsers={users:[],total:0,page:1,pageSize:20};`,context);
  const markup = vm.runInContext('adminDashboard()',context);
  for (const panel of ['admin-overview-panel','admin-accounts-panel','admin-courses-panel','admin-settings-panel']) assert.ok(markup.includes(panel));
  assert.match(markup,/setAdminTab\('accounts'\)/);
  vm.runInContext("state.user.role='admin'; setAdminTab('settings');",context);
  assert.equal(vm.runInContext('state.adminTab',context),'overview');
  const scoped = vm.runInContext('adminDashboard()',context);
  assert.ok(!scoped.includes('admin-settings-panel'));
});
