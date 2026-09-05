const courses = [
  {
    id: "it",
    name: "Information Technology",
    category: "Information Technology",
    icon: "monitor",
    description:
      "Build the systems and digital tools that keep modern organizations moving.",
    learn: [
      "How networks, cloud platforms, and databases work",
      "Designing secure, reliable technology solutions",
      "Managing projects and translating needs into systems",
    ],
    subjects: [
      "Web development",
      "Networking",
      "Database management",
      "Cybersecurity basics",
    ],
    skills: [
      "Problem solving",
      "Technical support",
      "Systems thinking",
      "Project management",
    ],
    careers: [
      "IT support specialist",
      "Systems administrator",
      "Web developer",
      "Technology consultant",
    ],
    interests: [
      "Curious about how things work",
      "Enjoy helping people solve problems",
      "Like practical, hands-on projects",
    ],
  },
  {
    id: "cs",
    name: "Computer Science",
    category: "Computer Science",
    icon: "code-2",
    description:
      "Explore the logic behind software, algorithms, and the next generation of technology.",
    learn: [
      "Programming principles and computational thinking",
      "How to build efficient software and applications",
      "Data structures, algorithms, and intelligent systems",
    ],
    subjects: [
      "Programming",
      "Data structures",
      "Artificial intelligence",
      "Software engineering",
    ],
    skills: [
      "Logical reasoning",
      "Coding",
      "Abstract thinking",
      "Attention to detail",
    ],
    careers: [
      "Software engineer",
      "Data analyst",
      "Mobile app developer",
      "AI engineer",
    ],
    interests: [
      "Love puzzles and patterns",
      "Enjoy making things with technology",
      "Patient with complex challenges",
    ],
  },
  {
    id: "business",
    name: "Business Administration",
    category: "Business",
    icon: "briefcase-business",
    description:
      "Learn how ideas become sustainable organizations, products, and experiences.",
    learn: [
      "How teams, markets, and organizations create value",
      "Making decisions with financial and customer insight",
      "Building strategies and leading collaborative work",
    ],
    subjects: ["Marketing", "Finance", "Management", "Entrepreneurship"],
    skills: [
      "Communication",
      "Leadership",
      "Strategic thinking",
      "Negotiation",
    ],
    careers: [
      "Business analyst",
      "Marketing coordinator",
      "Entrepreneur",
      "Operations manager",
    ],
    interests: [
      "Enjoy organizing and leading",
      "Interested in how businesses grow",
      "Energized by people and decisions",
    ],
  },
  {
    id: "engineering",
    name: "Engineering",
    category: "Engineering",
    icon: "cog",
    description:
      "Use math, science, and creativity to design solutions to real-world problems.",
    learn: [
      "Applying scientific principles to design and testing",
      "Creating safe, efficient systems and products",
      "Working through constraints as part of a project team",
    ],
    subjects: ["Calculus", "Physics", "Design systems", "Materials science"],
    skills: ["Analytical thinking", "Design", "Precision", "Collaboration"],
    careers: [
      "Civil engineer",
      "Mechanical engineer",
      "Project engineer",
      "Product designer",
    ],
    interests: [
      "Like building and improving things",
      "Enjoy math and science",
      "Think in systems and structures",
    ],
  },
  {
    id: "education",
    name: "Education",
    category: "Education",
    icon: "book-open",
    description:
      "Shape learning experiences and help people unlock their own potential.",
    learn: [
      "How people learn and grow across different ages",
      "Creating inclusive, engaging learning environments",
      "Planning lessons and evaluating progress",
    ],
    subjects: [
      "Learning psychology",
      "Teaching methods",
      "Curriculum design",
      "Assessment",
    ],
    skills: ["Empathy", "Public speaking", "Adaptability", "Mentoring"],
    careers: [
      "Teacher",
      "Learning designer",
      "School counselor",
      "Training specialist",
    ],
    interests: [
      "Find meaning in helping others grow",
      "Patient and a clear communicator",
      "Enjoy explaining ideas",
    ],
  },
  {
    id: "design",
    name: "Arts and Design",
    category: "Arts & Design",
    icon: "palette",
    description:
      "Turn imagination into visual work that connects, communicates, and moves people.",
    learn: [
      "Creative process, visual language, and design principles",
      "Using digital tools to make compelling work",
      "Presenting ideas and responding to feedback",
    ],
    subjects: [
      "Graphic design",
      "Illustration",
      "Photography",
      "User experience",
    ],
    skills: [
      "Creative thinking",
      "Visual communication",
      "Craft",
      "Storytelling",
    ],
    careers: ["Graphic designer", "UX designer", "Art director", "Illustrator"],
    interests: [
      "Notice details and visual stories",
      "Prefer making over memorizing",
      "Enjoy exploring different perspectives",
    ],
  },
  {
    id: "health",
    name: "Health Sciences",
    category: "Health Sciences",
    icon: "heart-pulse",
    description:
      "Understand the human body and contribute to healthier lives and communities.",
    learn: [
      "Foundations of anatomy, wellness, and human health",
      "How evidence guides care and prevention",
      "Communicating with compassion in health settings",
    ],
    subjects: ["Anatomy", "Public health", "Nutrition", "Medical terminology"],
    skills: ["Careful observation", "Empathy", "Research", "Responsibility"],
    careers: [
      "Health educator",
      "Medical technologist",
      "Public health officer",
      "Clinic coordinator",
    ],
    interests: [
      "Want to make a direct difference",
      "Interested in people and biology",
      "Calm and attentive under pressure",
    ],
  },
  {
    id: "communication",
    name: "Communication",
    category: "Communication",
    icon: "megaphone",
    description:
      "Master the stories, messages, and media that shape how people understand the world.",
    learn: [
      "How audiences interpret messages and media",
      "Writing, presenting, and producing for different channels",
      "Building trust through clear, ethical communication",
    ],
    subjects: ["Writing", "Media studies", "Public relations", "Broadcasting"],
    skills: ["Writing", "Presentation", "Listening", "Creative strategy"],
    careers: [
      "Content strategist",
      "Public relations officer",
      "Copywriter",
      "Broadcast producer",
    ],
    interests: [
      "Love stories and conversation",
      "Notice how messages affect people",
      "Enjoy writing or performing",
    ],
  },
];
const categories = [
  "All categories",
  ...new Set(courses.map((course) => course.category)),
];
const quizQuestions = [
  {
    text: "What kind of challenge sounds most satisfying?",
    answers: [
      ["Build a useful tool", "cs,it,engineering"],
      [
        "Help a person through a tough moment",
        "education,health,communication",
      ],
      ["Make an idea look and feel amazing", "design,communication"],
      ["Plan a smart way to reach a goal", "business,it"],
    ],
  },
  {
    text: "Where do you feel most in your element?",
    answers: [
      ["At a desk exploring ideas", "cs,design,communication"],
      ["With a team making decisions", "business,engineering"],
      ["In a lab, workshop, or active setting", "health,engineering,it"],
      [
        "In front of or alongside other people",
        "education,communication,health",
      ],
    ],
  },
  {
    text: "Which strength feels most like you?",
    answers: [
      ["I spot patterns and think logically", "cs,it,engineering"],
      [
        "I listen carefully and understand people",
        "education,health,communication",
      ],
      ["I imagine possibilities others miss", "design,business"],
      ["I turn plans into action", "business,engineering,it"],
    ],
  },
  {
    text: "What would you like your work to do?",
    answers: [
      ["Make everyday life easier", "it,engineering,cs"],
      ["Help people learn or feel better", "education,health"],
      ["Tell stories that move people", "communication,design"],
      ["Grow an idea into something real", "business,design,engineering"],
    ],
  },
];
let state = {
  view: "landing",
  authMode: "register",
  user: JSON.parse(localStorage.getItem("pathfinderUser") || "null"),
  selectedCourse: null,
  quizStep: 0,
  quizAnswers: [],
  quizResult: null,
};
const app = document.querySelector("#app");
function icon(name, size = 18) {
  return `<i data-lucide="${name}" width="${size}" height="${size}"></i>`;
}
function render() {
  app.innerHTML =
    state.user &&
    state.view !== "landing" &&
    state.view !== "login" &&
    state.view !== "register"
      ? shell()
      : state.view === "landing"
        ? landing()
        : state.view === "about"
          ? publicAbout()
          : auth();
  app.innerHTML = app.innerHTML
    .replace(/\bpathfinder\b/gi, "CourseCompass")
    .replace('<span class="eyebrow">Your next chapter starts here</span>', "");
  if (state.view === "landing")
    app
      .querySelector(".hero")
      ?.insertAdjacentHTML(
        "afterbegin",
        '<span class="eyebrow">Your First Step Toward Your Future</span>',
      );
  lucide.createIcons();
}
function landing() {
  return `<div class="screen landing"><nav class="landing-nav"><div class="brand"><span class="brand-mark"><i></i></span>pathfinder</div><div class="nav-actions"><button class="text-btn" onclick="go('about')">Why Pathfinder</button><button class="primary-btn" onclick="go('register')">Get started ${icon("arrow-up-right", 16)}</button></div></nav><main class="landing-main"><div class="hero-grid"><section class="hero"><span class="eyebrow">Your next chapter starts here</span><h1>Find a course that feels like <em>you.</em></h1><p class="hero-copy">Choosing a degree is a big decision. Pathfinder gives you the clarity to explore your options, understand what each path looks like, and move forward with confidence.</p><div class="hero-actions"><button class="primary-btn" onclick="go('register')">Explore your options ${icon("arrow-right", 16)}</button><button class="secondary-btn" onclick="go('login')">I already have an account</button></div><div class="hero-note"><div class="avatars"><span class="avatar">A</span><span class="avatar">J</span><span class="avatar">M</span></div><span>Join 2,400+ students finding their direction</span></div></section><div class="hero-art"><div class="art-paper"></div><div class="path-circle">${icon("compass", 35)}</div><div class="art-card art-main"><span class="art-label">YOUR PATHFINDER SNAPSHOT</span><h3>Curiosity is a strength.</h3><div class="fake-bars"><span></span><span></span><span></span></div><div class="mini-line"><b></b><b></b><b></b></div></div><div class="art-card art-mini"><span class="art-label">TOP MATCH</span><h4>Creative problem solver</h4><span class="art-label">4 paths to explore</span></div></div></div></main><div class="feature-strip"><div class="feature"><span class="feature-icon">${icon("compass", 18)}</span><div><h3>Explore without pressure</h3><p>Get the full picture of courses, from subjects to future jobs.</p></div></div><div class="feature"><span class="feature-icon">${icon("sparkles", 18)}</span><div><h3>See what fits you</h3><p>A quick, thoughtful quiz turns your interests into ideas.</p></div></div><div class="feature"><span class="feature-icon">${icon("bookmark-check", 18)}</span><div><h3>Make an informed choice</h3><p>Save your discoveries and return when you are ready.</p></div></div></div></div>`;
}
function publicAbout() {
  return `<div class="screen landing"><nav class="landing-nav"><div class="brand"><span class="brand-mark"><i></i></span>pathfinder</div><div class="nav-actions"><button class="text-btn" onclick="go('landing')">Back home</button><button class="primary-btn" onclick="go('register')">Get started ${icon("arrow-up-right", 16)}</button></div></nav><main class="landing-main"><div class="about-grid"><section class="about-copy"><span class="eyebrow">The thinking behind Pathfinder</span><h1>You do not have to have it all figured out.</h1><p>Pathfinder was made for the in-between moment: after high school, before a major decision, when every option can feel both exciting and overwhelming.</p><p>We bring course information into one welcoming place so you can compare paths, notice what resonates, and have better conversations with the people supporting you.</p><button class="primary-btn" onclick="go('register')">Start exploring ${icon("arrow-right", 15)}</button></section><section class="about-list"><div class="about-point"><span>01</span><div><h3>Curiosity before certainty</h3><p>Explore broadly before narrowing down. Every course page is an invitation, not a commitment.</p></div></div><div class="about-point"><span>02</span><div><h3>Real-world context</h3><p>See subjects, skills, and possible jobs together, so each degree feels easier to imagine.</p></div></div><div class="about-point"><span>03</span><div><h3>Your choice, your pace</h3><p>Recommendations are helpful prompts, never a verdict. The best path is the one you make sense of.</p></div></div></section></div></main></div>`;
}
function auth() {
  const isLogin = state.view === "login";
  return `<div class="auth-wrap"><aside class="auth-side"><div><div class="brand"><span class="brand-mark"><i></i></span>pathfinder</div></div><div><h1>${isLogin ? "Welcome back to your path." : "A little clarity can change everything."}</h1><p>${isLogin ? "Pick up where you left off and keep exploring the possibilities ahead." : "Create a free account to explore course paths made for the person you are becoming."}</p></div><div class="side-art">“</div></aside><section class="auth-form-wrap"><form class="auth-form" onsubmit="submitAuth(event)"><button type="button" class="back-link" onclick="go('landing')">${icon("arrow-left", 15)} Back to home</button><span class="eyebrow">${isLogin ? "Good to see you" : "Start exploring"}</span><h2>${isLogin ? "Log in" : "Create your account"}</h2><p>${isLogin ? "Your next possibility is waiting." : "It only takes a minute. No wrong answers here."}</p>${state.error ? `<div class="error">${state.error}</div>` : ""}${!isLogin ? `<div class="form-field"><label for="firstName">First name</label><input id="firstName" required placeholder="e.g. Alex"></div><div class="form-field"><label for="lastName">Last name</label><input id="lastName" required placeholder="e.g. Rivera"></div>` : ""}<div class="form-field"><label for="email">Email address</label><input id="email" type="email" required placeholder="you@example.com"></div><div class="form-field"><label for="password">Password</label><input id="password" type="password" minlength="6" required placeholder="At least 6 characters"></div><button class="primary-btn form-submit" type="submit">${isLogin ? "Log in" : "Create account"} ${icon("arrow-right", 16)}</button><div class="form-switch">${isLogin ? "New to Pathfinder?" : "Already have an account?"} <button type="button" onclick="go('${isLogin ? "register" : "login"}')">${isLogin ? "Create an account" : "Log in"}</button></div></form></section></div>`;
}
function shell() {
  return `<div class="app-shell"><aside class="sidebar" id="sidebar"><div class="brand"><span class="brand-mark"><i></i></span>pathfinder</div><nav class="nav-list"><button class="nav-item ${state.view === "dashboard" ? "active" : ""}" onclick="go('dashboard')">${icon("layout-dashboard")} Overview</button><button class="nav-item ${state.view === "explorer" ? "active" : ""}" onclick="go('explorer')">${icon("compass")} Explore courses</button><button class="nav-item ${state.view === "quiz" ? "active" : ""}" onclick="go('quiz')">${icon("sparkles")} Find my fit</button><button class="nav-item ${state.view === "about" ? "active" : ""}" onclick="go('about')">${icon("circle-help")} About Pathfinder</button></nav><div class="sidebar-footer"><div class="user-dot">${(state.user.name || "S")[0].toUpperCase()}</div><div class="user-info"><strong>${state.user.name}</strong><span>${state.user.email}</span></div><button class="text-btn" title="Log out" onclick="logout()">${icon("log-out", 16)}</button></div></aside><main class="main-content"><header class="topbar"><button class="mobile-menu" onclick="toggleMenu()">${icon("menu")}</button><span class="topbar-note">A clearer way forward, ${state.user.name.split(" ")[0]}.</span><button class="text-btn" title="Log out" onclick="logout()">${icon("log-out", 18)}</button></header>${viewContent()}</main></div>`;
}
function viewContent() {
  if (state.view === "explorer") return explorer();
  if (state.view === "details") return details();
  if (state.view === "quiz") return quiz();
  if (state.view === "about") return about();
  return dashboard();
}
function dashboard() {
  const picks = courses.slice(0, 3);
  return `${state.success ? `<div class="toast" role="status">${icon("check-circle", 16)} ${state.success}</div>` : ""}<div class="welcome-banner"><div><span class="eyebrow" style="color:var(--yellow)">Ready when you are</span><h1>Keep your options open.</h1><p>Start with a quick quiz, or browse paths at your own pace.</p></div><button class="banner-action" onclick="go('quiz')">${icon("sparkles", 17)} Take the quiz</button></div><div class="stat-grid"><div class="stat-card"><div><span>Courses to explore</span><span class="stat-icon">${icon("library", 19)}</span></div><strong>${courses.length}</strong></div><div class="stat-card"><div><span>Course categories</span><span class="stat-icon">${icon("layers-3", 19)}</span></div><strong>${categories.length - 1}</strong></div><div class="stat-card"><div><span>Quiz questions</span><span class="stat-icon">${icon("message-circle-question", 19)}</span></div><strong>4</strong></div></div><div class="section-title"><h2>Paths worth exploring</h2><button class="link-btn" onclick="go('explorer')">View all ${icon("arrow-right", 15)}</button></div><div class="course-grid">${picks.map(card).join("")}</div>`;
}
function card(course) {
  return `<article class="course-card" onclick="showDetails('${course.id}')"><div class="course-color"></div><div class="course-card-body"><span class="category">${course.category}</span><h3>${course.name}</h3><p>${course.description}</p><div class="card-foot"><div class="skill-pills">${course.skills
    .slice(0, 2)
    .map((skill) => `<span class="pill">${skill}</span>`)
    .join(
      "",
    )}</div><span class="arrow">${icon("arrow-up-right", 17)}</span></div></div></article>`;
}
function explorer() {
  return `<div class="view-heading"><div><span class="eyebrow">Browse the possibilities</span><h1>Explore courses</h1><p>Compare the paths that catch your interest.</p></div></div><div class="explorer-tools"><label class="search-box">${icon("search", 17)}<input oninput="filterCourses(this.value)" id="course-search" placeholder="Search by course or skill..."></label><select class="filter-select" onchange="filterCourses(document.querySelector('#course-search').value, this.value)">${categories.map((category) => `<option>${category}</option>`).join("")}</select></div><div class="course-grid" id="course-results">${courses.map(card).join("")}</div>`;
}
function filterCourses(query = "", category = "All categories") {
  const list = courses.filter(
    (course) =>
      (category === "All categories" || course.category === category) &&
      (course.name + " " + course.description + " " + course.skills.join(" "))
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  document.querySelector("#course-results").innerHTML = list.length
    ? list.map(card).join("")
    : '<div class="empty">No courses match that search yet. Try a broader term.</div>';
}
function details() {
  const c = courses.find((course) => course.id === state.selectedCourse);
  return `<button class="detail-back" onclick="go('explorer')">${icon("arrow-left", 16)} Back to courses</button><div class="detail-hero"><span class="category">${c.category}</span><h1>${c.name}</h1><p>${c.description}</p></div><div class="detail-layout"><div><section class="detail-panel"><h2>What you will learn</h2><ul>${c.learn.map((item) => `<li>${icon("check-circle", 16)}${item}</li>`).join("")}</ul></section><section class="detail-panel"><h2>Possible subjects</h2><div class="tag-list">${c.subjects.map((item) => `<span>${item}</span>`).join("")}</div></section><section class="detail-panel"><h2>Skills you can develop</h2><div class="tag-list">${c.skills.map((item) => `<span>${item}</span>`).join("")}</div></section></div><aside><section class="detail-panel"><h2>Where it can lead</h2><ul class="career-list">${c.careers.map((item) => `<li>${item}</li>`).join("")}</ul></section><section class="detail-panel"><h2>Good fit if you...</h2><ul>${c.interests.map((item) => `<li>${icon("sparkle", 16)}${item}</li>`).join("")}</ul></section><section class="detail-panel match-card"><h2>Still deciding?</h2><p>Our short quiz can point you toward paths that match your interests.</p><button class="primary-btn" onclick="go('quiz')">Find my fit ${icon("arrow-right", 15)}</button></section></aside></div>`;
}
function quiz() {
  if (state.quizResult) return results();
  const q = quizQuestions[state.quizStep];
  return `<div class="view-heading"><div><span class="eyebrow">A little self-discovery</span><h1>Find your fit</h1><p>There is no perfect answer. Go with what feels natural.</p></div></div><div class="quiz-intro">${icon("sparkles", 21)}<div><h3>Four questions. A few new directions.</h3><p>We will use your answers to highlight courses worth a closer look. Your result is a starting point, not a final decision.</p></div></div><div class="quiz-progress">${quizQuestions.map((_, i) => `<span class="${i < state.quizStep ? "done" : i === state.quizStep ? "current" : ""}"></span>`).join("")}</div><section class="quiz-box"><span class="eyebrow">Question ${state.quizStep + 1} of ${quizQuestions.length}</span><h2>${q.text}</h2><div class="answer-grid">${q.answers.map((answer, i) => `<button class="answer ${state.quizAnswers[state.quizStep] === i ? "selected" : ""}" onclick="answerQuiz(${i})">${answer[0]}</button>`).join("")}</div><div class="quiz-footer"><span class="step-label">Choose one answer</span><button class="primary-btn" ${state.quizAnswers[state.quizStep] === undefined ? "disabled" : ""} onclick="nextQuiz()">${state.quizStep === quizQuestions.length - 1 ? "See my matches" : "Next question"} ${icon("arrow-right", 15)}</button></div></section>`;
}
function results() {
  return `<div class="result-head"><span class="eyebrow">Your Pathfinder results</span><h1>Some promising directions.</h1><p>Based on what you chose, these courses may be worth exploring next. Notice what sparks your curiosity.</p></div><div>${state.quizResult.map((item, index) => `<article class="result-card"><div><span class="category">${index === 0 ? "Strong match" : "Also worth a look"}</span><h3>${item.course.name}</h3><p>${item.course.description}</p></div><div class="score">${item.score}%</div><button class="primary-btn" onclick="showDetails('${item.course.id}')">Explore ${icon("arrow-up-right", 15)}</button></article>`).join("")}</div><div style="text-align:center;margin-top:25px"><button class="secondary-btn" onclick="resetQuiz()">Retake quiz</button></div>`;
}
function about() {
  return `<div class="about-grid"><section class="about-copy"><span class="eyebrow">The thinking behind Pathfinder</span><h1>You do not have to have it all figured out.</h1><p>Pathfinder was made for the in-between moment: after high school, before a major decision, when every option can feel both exciting and overwhelming.</p><p>We bring course information into one welcoming place so you can compare paths, notice what resonates, and have better conversations with the people supporting you.</p><button class="primary-btn" onclick="go('explorer')">Start exploring ${icon("arrow-right", 15)}</button></section><section class="about-list"><div class="about-point"><span>01</span><div><h3>Curiosity before certainty</h3><p>You are allowed to explore broadly before narrowing down. Every course page is an invitation, not a commitment.</p></div></div><div class="about-point"><span>02</span><div><h3>Real-world context</h3><p>See subjects, skills, and possible jobs together, so the day-to-day shape of a degree feels easier to imagine.</p></div></div><div class="about-point"><span>03</span><div><h3>Your choice, your pace</h3><p>Recommendations are helpful prompts, never a verdict. The best path is the one you make sense of for yourself.</p></div></div></section></div>`;
}
function go(view) {
  state.view = view;
  state.error = "";
  if (view === "about" && !state.user) {
    state.view = "landing";
  }
  render();
}
async function submitAuth(event) {
  event.preventDefault();
  const authAction = state.view;
  const email = document.querySelector("#email").value.trim().toLowerCase();
  const password = document.querySelector("#password").value;
  const payload =
    authAction === "register"
      ? {
          firstName: document.querySelector("#firstName").value.trim(),
          lastName: document.querySelector("#lastName").value.trim(),
          email,
          password,
        }
      : { email, password };
  try {
    const response = await fetch(`/api/${authAction}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error);
    state.user = result.user;
    localStorage.setItem("pathfinderUser", JSON.stringify(state.user));
    state.view = "dashboard";
    state.error = "";
    state.success =
      authAction === "register" ? "Your account was created successfully." : "";
  } catch (error) {
    state.error = error.message || "Unable to connect to the account service.";
  }
  render();
}
function logout() {
  state.user = null;
  state.view = "landing";
  render();
}
function showDetails(id) {
  state.selectedCourse = id;
  state.view = "details";
  render();
  window.scrollTo(0, 0);
}
function answerQuiz(index) {
  state.quizAnswers[state.quizStep] = index;
  render();
}
function nextQuiz() {
  if (state.quizAnswers[state.quizStep] === undefined) return;
  if (state.quizStep < quizQuestions.length - 1) state.quizStep++;
  else {
    const scores = {};
    state.quizAnswers.forEach((answerIndex, step) =>
      quizQuestions[step].answers[answerIndex][1]
        .split(",")
        .forEach((id) => (scores[id] = (scores[id] || 0) + 1)),
    );
    state.quizResult = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id, score]) => ({
        course: courses.find((c) => c.id === id),
        score: Math.round((score / quizQuestions.length) * 100),
      }));
  }
  render();
}
function resetQuiz() {
  state.quizStep = 0;
  state.quizAnswers = [];
  state.quizResult = null;
  render();
}
function toggleMenu() {
  document.querySelector("#sidebar").classList.toggle("open");
}
render();
