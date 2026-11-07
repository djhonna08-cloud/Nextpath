const test = require("node:test");
const assert = require("node:assert/strict");
const courses = require("../course-data");
const taxonomy = require("../course-taxonomy");
const questions = require("../course-match-questions");
const { calculateCourseMatches } = require("../course-match-scoring");

test("course catalog covers the eight main and fifteen detailed categories", () => {
  assert.equal(taxonomy.mainCategories.length, 8);
  assert.equal(taxonomy.detailedCategories.length, 15);
  assert.equal(courses.length, 65);
  assert.equal(new Set(courses.map((course) => course.id)).size, courses.length);
  assert.equal(new Set(courses.map((course) => course.name.toLowerCase())).size, courses.length);
  for (const course of courses) {
    assert.ok(course.mainCategoryId);
    assert.ok(course.categoryId);
    assert.ok(course.abbreviation);
    assert.ok(course.duration);
    assert.ok(course.subjects.length);
    assert.ok(course.skills.length);
    assert.ok(course.recommendedStrand);
    assert.ok(course.careers.length);
    assert.ok(course.relatedCourseIds.length);
  }
  for (const option of questions.flatMap((question) => question.options)) {
    for (const categoryId of option.matchesCategories || []) {
      assert.ok(taxonomy.detailedCategories.some((category) => category.id === categoryId));
    }
  }

  const technologyCourses = courses.filter((course) => course.mainCategoryId === "technology-computing");
  assert.deepEqual(technologyCourses.map((course) => course.name), [
    "BS Information Technology",
    "BS Computer Science",
    "BS Information Systems",
    "BS Computer Engineering",
    "BS Data Science",
    "BS Cybersecurity",
    "BS Software Engineering",
    "BS Artificial Intelligence",
    "BS Game Development",
    "BS Entertainment and Multimedia Computing",
  ]);
});

test("Course Match ranks direct course evidence above broad category evidence", () => {
  const answers = questions.map(() => 0);
  const recommendations = calculateCourseMatches(answers, courses);
  const it = recommendations.find((match) => match.course.id === "it");
  const softwareEngineering = courses.find((course) => course.id === "software-engineering");

  assert.equal(recommendations.length, 3);
  assert.equal(recommendations[0].course.id, "engineering");
  assert.equal(recommendations[0].score, 100);
  assert.ok(it.score > calculateCourseMatches(answers, [softwareEngineering])[0].score);
  assert.ok(recommendations.every((match, index) =>
    index === 0 || recommendations[index - 1].points >= match.points
  ));
});
