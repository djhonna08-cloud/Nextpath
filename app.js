const courseTaxonomy = window.courseTaxonomy;
let courses = window.courseCatalog || [
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
let categories = window.courseTaxonomy.mainCategories;
const courseMatchQuestions = window.courseMatchQuestions;
let state = {
  view: "landing",
  authMode: "register",
  user: null,
  error: "",
  success: "",
  chatMessages: [],
  chatBusy: false,
  chatError: "",
  chatRetryMessage: "",
  chatOpen: false,
  quizSessionId: null,
  quizLoading: false,
  quizSaving: false,
  quizGenerating: false,
  quizSending: false,
  quizSelectedAnswer: null,
  quizChatUnavailable: false,
  quizDraft: "",
  quizConversation: [],
  analytics: null,
  adminOverview: null,
  adminUsers: null,
  adminError: "",
  adminLoading: false,
  adminSearch: "",
  adminCourses: [],
  adminSettings: null,
  adminEditingCourse: null,
  settings: { siteName: "NextPath", registrationEnabled: true, maintenanceMode: false },
  adminNotice: "",
  adminTab: "overview",
  resetEmail: "",
  resetCode: "",
  resetToken: "",
  resetStep: "email",
  savedQuizSessions: [],
  registrationEmail: "",
  profileMessage: "",
  profilePhotoDraft: undefined, profilePhotoProcessing: false,
  selectedCourse: null,
  selectedCourseSnapshot: null,
  detailsReturnView: "explorer",
  browseMainCategory: "",
  browseDetailedCategory: "",
  browseQuery: "",
  browseMode: "category",
  browseSort: "mixed",
  browseDisplayedCount: 12,
  quizStep: 0,
  quizAnswers: [],
  quizResult: null,
};
const app = document.querySelector("#app");
function icon(name, size = 18) {
  if (name === "sparkle" || name === "sparkles") return "";
  return `<i data-lucide="${name}" ${name === "target" ? 'class="target-nav-icon"' : ""} width="${size}" height="${size}"></i>`;
}
function render() {
  document.title = state.settings.siteName || "NextPath";
  if (state.settings.maintenanceMode && state.user?.role === "user") {
    app.innerHTML = `<main class="maintenance-page"><span class="brand"><span class="brand-mark" aria-hidden="true">N</span>${escapeHtml(state.settings.siteName)}</span><h1>We’ll be back soon</h1><p>NextPath is temporarily in maintenance mode. Your saved progress is safe; please try again later.</p><button class="secondary-btn" onclick="logout()">Log out</button></main>`;
    return;
  }
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
    .replace(/\bpathfinder\b/gi, escapeHtml(state.settings.siteName || "NextPath"))
    .replace(/\bNextPath\b/g, escapeHtml(state.settings.siteName || "NextPath"))
    .replace(/\bfind my fit\b/gi, "Course Match")
    .replace(/\bfind your fit\b/gi, "Course Match")
    .replace("Tell us what you enjoy or hope to do. We will talk it through and explore courses together.", "Your answers are guiding these recommendations. Chat with the counselor to clarify your preferences or explore the suggested courses.")
    .replace("Share an interest, subject, or question…", "Share a preference, question, or detail to consider…")
    .replace('<span class="eyebrow">Your next chapter starts here</span>', "");
  if (
    state.user ||
    ["landing", "login", "register", "verify-email", "reset-password", "about"].includes(state.view)
  ) {
    app.insertAdjacentHTML("beforeend", chatWidget(!state.user));
  }
  lucide.createIcons();
  const courseMatchMessage = app.querySelector("#course-match-message");
  if (courseMatchMessage) courseMatchMessage.value = state.quizDraft;
  const courseMatchMessages = app.querySelector(".course-match-results-chat .chat-messages");
  if (courseMatchMessages) courseMatchMessages.scrollTop = courseMatchMessages.scrollHeight;
  if (state.chatOpen) {
    const chatMessages = app.querySelector(".chat-messages");
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}
function landing() {
  return `<div class="screen landing"><nav class="landing-nav"><div class="brand"><span class="brand-mark" aria-hidden="true">N</span>NextPath</div><div class="nav-actions"><button class="text-btn" onclick="go('about')">Why NextPath</button><button class="primary-btn" onclick="go('register')">Get started ${icon("arrow-up-right", 16)}</button></div></nav><main class="landing-main"><div class="hero-grid"><section class="hero"><span class="eyebrow">Your first step toward your future</span><h1><span class="hero-line">Find a course</span><span class="hero-line">that feels like <em>you.</em></span></h1><p class="hero-copy">Choosing a degree is a big decision. NextPath gives you the clarity to explore your options, understand what each path looks like, and move forward with confidence.</p><div class="hero-actions"><button class="primary-btn" onclick="go('register')">Explore your options ${icon("arrow-right", 16)}</button><button class="secondary-btn" onclick="go('login')">I already have an account</button></div><div class="hero-note"><div class="avatars"><span class="avatar">A</span><span class="avatar">J</span><span class="avatar">M</span></div><span>Join 2,400+ students finding their direction</span></div></section><div class="hero-art"><div class="art-paper"></div><div class="path-circle">${icon("compass", 35)}</div><div class="art-card art-main"><span class="art-label">YOUR NEXTPATH SNAPSHOT</span><h3>Curiosity is a strength.</h3><div class="fake-bars"><span></span><span></span><span></span></div><div class="mini-line"><b></b><b></b><b></b></div></div><div class="art-card art-mini"><span class="art-label">TOP MATCH</span><h4>Creative problem solver</h4><span class="art-label">4 paths to explore</span></div></div></div></main><div class="feature-strip"><div class="feature"><span class="feature-icon">${icon("compass", 26)}</span><div><h3>Explore real options</h3><p>Discover different courses, subjects, skills, and career opportunities.</p></div></div><div class="feature"><span class="feature-icon">${icon("chart-no-axes-column-increasing", 26)}</span><div><h3>Understand what fits you</h3><p>Get personalized recommendations based on your interests and answers.</p></div></div><div class="feature"><span class="feature-icon">${icon("users-round", 26)}</span><div><h3>Move forward with confidence</h3><p>Learn at your own pace with tools, insights, and AI assistance.</p></div></div></div></div>`;
}
function publicAbout() {
  return `<div class="screen landing"><nav class="landing-nav"><div class="brand"><span class="brand-mark" aria-hidden="true">N</span>pathfinder</div><div class="nav-actions"><button class="text-btn" onclick="go('landing')">Back home</button><button class="primary-btn" onclick="go('register')">Get started ${icon("arrow-up-right", 16)}</button></div></nav><main class="landing-main"><div class="about-grid"><section class="about-copy"><span class="eyebrow">The thinking behind Pathfinder</span><h1>You do not have to have it all <span class="gradient-heading-text">figured out.</span></h1><p>Pathfinder was made for the in-between moment: after high school, before a major decision, when every option can feel both exciting and overwhelming.</p><p>We bring course information into one welcoming place so you can compare paths, notice what resonates, and have better conversations with the people supporting you.</p><button class="primary-btn" onclick="go('register')">Start exploring ${icon("arrow-right", 15)}</button></section><section class="about-list"><div class="about-point"><span>01</span><div><h3>Curiosity before certainty</h3><p>Explore broadly before narrowing down. Every course page is an invitation, not a commitment.</p></div></div><div class="about-point"><span>02</span><div><h3>Real-world context</h3><p>See subjects, skills, and possible jobs together, so each degree feels easier to imagine.</p></div></div><div class="about-point"><span>03</span><div><h3>Your choice, your pace</h3><p>Recommendations are helpful prompts, never a verdict. The best path is the one you make sense of.</p></div></div></section></div></main></div>`;
}
function auth() {
  if (state.view === "reset-password") {
    const isEmailStep = state.resetStep === "email";
    const isCodeStep = state.resetStep === "code";
    const title = isEmailStep ? "Enter your email address." : isCodeStep ? "Check your email." : "Set a new password.";
    const description = isEmailStep
      ? "We’ll send a one-time code to the email address on your account."
      : isCodeStep
        ? `Enter the 6-digit code sent to ${state.resetEmail}.`
        : "Your email code is verified. Choose a new password to finish.";
    const content = isEmailStep
      ? `<form class="auth-form" onsubmit="requestPasswordReset(event)"><div class="form-field"><label for="reset-email">Email address</label><input id="reset-email" name="email" type="email" required maxlength="254" autocomplete="email" value="${escapeHtml(state.resetEmail)}"></div><button class="primary-btn form-submit" type="submit">Send one-time code ${icon("arrow-right", 16)}</button></form>`
      : isCodeStep
        ? `<form class="auth-form" onsubmit="verifyPasswordReset(event)"><div class="form-field"><label for="reset-code">One-time code</label><input id="reset-code" name="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" required value="${escapeHtml(state.resetCode)}"></div><button class="primary-btn form-submit" type="submit">Verify code ${icon("arrow-right", 16)}</button><button class="link-btn" type="button" onclick="requestAnotherPasswordResetCode()">Send a new code</button><button class="link-btn" type="button" onclick="changePasswordResetEmail()">Change email address</button></form>`
        : `<form class="auth-form" onsubmit="submitPasswordReset(event)"><div class="form-field"><label for="new-password">New password</label><input id="new-password" name="password" type="password" minlength="8" maxlength="128" autocomplete="new-password" required></div><button class="primary-btn form-submit" type="submit">Update password ${icon("arrow-right", 16)}</button></form>`;
    return `<div class="auth-wrap"><aside class="auth-side"><div><div class="brand"><span class="brand-mark" aria-hidden="true">N</span>NextPath</div></div><div><h1>${title}</h1><p>${description}</p></div><div class="side-art">“</div></aside><section class="auth-form-wrap"><div class="auth-form"><button type="button" class="back-link" onclick="backToLoginFromPasswordReset()">${icon("arrow-left", 15)} Back to log in</button><span class="eyebrow">Account recovery</span><h2>Reset password</h2><p>${isEmailStep ? "First, tell us where to send your code." : isCodeStep ? "The code expires after 10 minutes." : "Your code has been verified."}</p>${state.error ? `<div class="error" role="alert">${escapeHtml(state.error)}</div>` : ""}${!state.error && state.success ? `<p class="profile-message" role="status">${escapeHtml(state.success)}</p>` : ""}${content}</div></section></div>`;
  }
  if (state.view === "verify-email") {
    return `<div class="auth-wrap"><aside class="auth-side"><div><div class="brand"><span class="brand-mark" aria-hidden="true">N</span>NextPath</div></div><div><h1>One quick check, then you are on your way.</h1><p>Verify your email address to keep your account safe and make sure you can receive important account messages.</p></div><div class="side-art">“</div></aside><section class="auth-form-wrap"><form class="auth-form" onsubmit="verifyRegistration(event)"><button type="button" class="back-link" onclick="go('register')">${icon("arrow-left", 15)} Back to registration</button><span class="eyebrow">Check your inbox</span><h2>Enter your code</h2><p>We sent a 6-digit code to <strong>${escapeHtml(state.registrationEmail)}</strong>. It expires in 10 minutes.</p>${state.error ? `<div class="error" role="alert">${escapeHtml(state.error)}</div>` : ""}${state.success ? `<div class="profile-message" role="status">${escapeHtml(state.success)}</div>` : ""}<div class="form-field"><label for="verification-code">Verification code</label><input id="verification-code" name="code" type="text" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" required placeholder="6-digit code"></div><button class="primary-btn form-submit" type="submit">Verify email ${icon("arrow-right", 16)}</button><button class="link-btn" type="button" onclick="resendRegistrationCode()">Send a new code</button><div class="form-switch">Already have an account? <button type="button" onclick="go('login')">Log in</button></div></form></section></div>`;
  }
  const isLogin = state.view === "login";
  return `<div class="auth-wrap"><aside class="auth-side"><div><div class="brand"><span class="brand-mark" aria-hidden="true">N</span>pathfinder</div></div><div><h1>${isLogin ? "Welcome back to your path." : "A little clarity can change everything."}</h1><p>${isLogin ? "Pick up where you left off and keep exploring the possibilities ahead." : "Create a free account to explore course paths made for the person you are becoming."}</p></div><div class="side-art">“</div></aside><section class="auth-form-wrap"><form class="auth-form" onsubmit="submitAuth(event)"><button type="button" class="back-link" onclick="go('landing')">${icon("arrow-left", 15)} Back to home</button><span class="eyebrow">${isLogin ? "Good to see you" : "Start exploring"}</span><h2>${isLogin ? "Log in" : "Create your account"}</h2><p>${isLogin ? "Your next possibility is waiting." : "It only takes a minute. No wrong answers here."}</p>${state.error ? `<div class="error" role="alert">${escapeHtml(state.error)}</div>` : ""}${state.success ? `<p class="profile-message" role="status">${escapeHtml(state.success)}</p>` : ""}${!isLogin ? `<div class="form-field"><label for="firstName">First name</label><input id="firstName" required placeholder="e.g. Alex"></div><div class="form-field"><label for="lastName">Last name</label><input id="lastName" required placeholder="e.g. Rivera"></div>` : ""}<div class="form-field"><label for="email">Email address</label><input id="email" type="email" required placeholder="you@example.com"></div><div class="form-field"><label for="password">Password</label><input id="password" type="password" minlength="6" required placeholder="At least 6 characters"></div>${isLogin ? `<button class="link-btn" type="button" onclick="startPasswordReset()">I have a password setup or reset code</button>` : ""}<button class="primary-btn form-submit" type="submit">${isLogin ? "Log in" : "Create account"} ${icon("arrow-right", 16)}</button><div class="form-switch">${isLogin ? "New to NextPath?" : "Already have an account?"} <button type="button" onclick="go('${isLogin ? "register" : "login"}')">${isLogin ? "Create an account" : "Log in"}</button></div></form></section></div>`;
}
function shell() {
  const navItem = (view, label, iconName) => `<button class="nav-item${state.view === view ? " active" : ""}" type="button" ${state.view === view ? 'aria-current="page"' : ""} onclick="go('${view}')">${icon(iconName)}<span>${label}</span></button>`;
  return `<div class="app-shell"><header class="app-topnav"><div class="topnav-inner"><button class="brand topnav-brand" type="button" onclick="go('dashboard')" aria-label="NextPath dashboard"><span class="brand-mark" aria-hidden="true">N</span><span>NextPath</span></button><button class="mobile-menu" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="main-navigation" onclick="toggleMenu()">${icon("menu", 20)}</button><nav class="nav-list" id="main-navigation" aria-label="Main navigation">${navItem("dashboard", "Dashboard", "house")}${navItem("explorer", "Explore Courses", "book-open")}${navItem("quiz", "Course Match", "star")}${navItem("profile", "My Profile", "user-round")}${navItem("about", "About NextPath", "info")}${["admin", "super_admin"].includes(state.user.role) ? navItem("admin-dashboard", "Administration", "shield-check") : ""}</nav><div class="topnav-actions"><button class="topnav-logout" type="button" onclick="logout()">${icon("log-out", 18)}<span>Logout</span></button></div></div></header><main class="main-content">${viewContent()}</main></div>`;
}
function viewContent() {
  if (state.view === "admin-dashboard") return adminDashboard();
  if (state.view === "explorer") return explorer();
  if (state.view === "details") return details();
  if (state.view === "quiz") return quiz();
  if (state.view === "about") return about();
  if (state.view === "profile") return profile();
  return dashboard();
}
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}
function formatTimestamp(value) {
  const normalized = value.endsWith("Z") ? value : `${value.replace(" ", "T")}Z`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? "Time unavailable" : date.toLocaleString();
}
function chatWidget(publicMode = !state.user) {
  const messages = state.chatMessages.length
    ? state.chatMessages.map((message) =>
      `<article class="chat-message ${message.role}"><span class="chat-role">${message.role === "user" ? "You" : "NextPath assistant"}</span><p>${escapeHtml(message.content).replace(/\n/g, "<br>")}</p>${message.suggestions ? `<div class="chat-suggestions" aria-label="Recommended questions">${message.suggestions.map((_, index) => `<button type="button" class="chat-suggestion" onclick="sendSuggestedChatQuestion(${index})">${escapeHtml(publicChatSuggestions[index])}</button>`).join("")}</div>` : ""}</article>`,
    ).join("")
    : '<article class="chat-message assistant"><span class="chat-role">NextPath assistant</span><p>Hi! I can answer questions about using NextPath, courses, the Course Match quiz, accounts, saved progress, and the local database. What would you like to know?</p></article>';
  return `<aside class="chat-widget ${state.chatOpen ? "open" : ""}" aria-label="NextPath assistant">${state.chatOpen ? `<section class="chat-panel" id="chat-panel"><header class="chat-widget-header"><div class="chat-widget-title">${icon("message-circle", 18)}<div><strong>NextPath assistant</strong><span>${publicMode ? "Quick answers, no sign-in needed" : "Ask about using NextPath"}</span></div></div><button class="chat-collapse" type="button" aria-label="Collapse assistant" title="Collapse assistant" onclick="toggleChat()">${icon("minus", 18)}</button></header><div class="chat-messages" aria-live="polite" aria-label="Conversation">${messages}${state.chatBusy ? '<article class="chat-message assistant"><span class="chat-role">NextPath assistant</span><p>Thinking…</p></article>' : ""}</div>${state.chatError ? `<div class="chat-error" role="alert"><span>${escapeHtml(state.chatError)}</span>${state.chatRetryMessage ? '<button type="button" onclick="retryChatMessage()" ' + (state.chatBusy ? "disabled" : "") + '>Try again</button>' : ""}</div>` : ""}<form class="chat-form" onsubmit="sendChatMessage(event)"><label class="sr-only" for="chat-message">Ask NextPath a question</label><textarea id="chat-message" maxlength="1200" rows="2" placeholder="Ask a question about NextPath…" onkeydown="handleChatKeydown(event)" required ${state.chatBusy ? "disabled" : ""}></textarea><button class="primary-btn" type="submit" aria-label="Send message" ${state.chatBusy ? "disabled" : ""}>${icon("arrow-up", 17)}</button></form><p class="chat-notice">${publicMode ? "Quick answers use built-in NextPath help. Sign in to ask the AI assistant other NextPath questions." : "Focused on NextPath. Don’t share passwords, API keys, or other sensitive information. Messages are sent to NVIDIA AI and aren’t saved by NextPath."}</p></section>` : ""}<button class="chat-launcher" type="button" aria-label="${state.chatOpen ? "Close" : "Open"} NextPath assistant" aria-expanded="${state.chatOpen}" aria-controls="chat-panel" onclick="toggleChat()">${icon(state.chatOpen ? "x" : "message-circle", 22)}</button></aside>`;
}
function toggleChat() {
  state.chatOpen = !state.chatOpen;
  render();
  if (state.chatOpen) document.querySelector("#chat-message")?.focus();
}
function dashboard() {
  const picks = courses.slice(0, 3);
  const name = (state.user.displayName || state.user.name || 'there').split(' ')[0];
  return `<section class="dashboard-page">${state.success ? `<div class="toast" role="status">${icon("check-circle", 16)} ${escapeHtml(state.success)}</div>` : ""}<div class="welcome-banner"><div><h1>Welcome back, <span class="gradient-heading-text">${escapeHtml(name)}!</span></h1><h2>Your next adventure starts here.</h2><p>Explore courses, discover your interests, and take the next step towards your future.</p></div><span class="dashboard-compass" aria-hidden="true">${icon("compass", 42)}</span><div class="dashboard-banner-actions"><button class="primary-btn" onclick="go('quiz')">Take Course Match ${icon("arrow-right",16)}</button><button class="secondary-btn" onclick="go('explorer')">Explore courses</button></div></div><div class="stat-grid">${[[courses.length,'Courses to explore','book-open','Discover programs from different fields.'],[categories.length,'Course categories','layers-3','Explore what interests you most.'],[courseMatchQuestions.length,'Quiz questions','message-circle-question','Find courses that fit your interests.']].map(([count,label,symbol,description])=>`<div class="stat-card"><span class="stat-icon">${icon(symbol,24)}</span><div><strong>${count}</strong><h3>${label}</h3><p>${description}</p></div></div>`).join('')}</div><div class="dashboard-lower"><section class="dashboard-paths"><div class="section-title"><h2>Paths worth exploring</h2><button class="link-btn" onclick="go('explorer')">View all courses ${icon('arrow-right',15)}</button></div><div class="course-grid">${picks.map(course=>card(course)).join('')}</div></section><aside class="dashboard-next"><h2>Your next step</h2><span class="next-icon">${icon('message-circle-question',25)}</span><h3>Take the Course Match quiz</h3><p>Answer a few questions to discover courses that fit your interests and goals.</p><button class="primary-btn" onclick="go('quiz')">Start Quiz ${icon('arrow-right',16)}</button></aside></div></section>`;
}

function adminAnalyticsOverview(overview, courseNames) {
  const number = value => Number(value || 0).toLocaleString();
  const chart = (title, series, color, symbol, unit) => {
    const values = series || [];
    const total = values.reduce((sum, item) => sum + Number(item.count || 0), 0);
    const maximum = Math.max(2, ...values.map(item => Number(item.count || 0)));
    const ceiling = Math.ceil(maximum / 2) * 2;
    const positions = values.map((item, index) => ({
      ...item, x: 44 + index * 456 / Math.max(1, values.length - 1),
      y: 152 - Number(item.count || 0) / ceiling * 120,
    }));
    const points = positions.map(item => item.x + ',' + item.y).join(' ');
    const date = value => value ? new Date(value + 'T00:00:00Z').toLocaleDateString('en-US', { month:'short', day:'numeric', timeZone:'UTC' }) : '';
    return '<section class="profile-card admin-trend-card" style="--chart-color:' + color + '"><header class="admin-insight-heading"><div><span class="admin-insight-icon" aria-hidden="true">' + icon(symbol,20) + '</span><h2>' + title + '</h2></div><span class="admin-period">Last 14 days</span></header><div class="admin-trend-total"><strong>' + number(total) + '</strong><span>' + unit + ' in this period</span></div>' + (positions.length ? '<svg class="admin-trend-svg" viewBox="0 0 530 190" role="img" aria-label="' + title + ': ' + number(total) + ' over the last 14 days"><title>' + title + ' daily counts</title>' + [0,1,2].map(i=>{ const y=152-i*60; return '<line x1="44" x2="500" y1="'+y+'" y2="'+y+'" stroke="#e6eaf3" stroke-dasharray="4 4"/><text x="32" y="'+(y+4)+'" text-anchor="end">'+number(i*ceiling/2)+'</text>'; }).join('') + '<polygon points="44,152 '+points+' '+positions.at(-1).x+',152" fill="'+color+'" opacity=".08"/><polyline points="'+points+'" fill="none" stroke="'+color+'" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>' + positions.map(item=>'<circle cx="'+item.x+'" cy="'+item.y+'" r="3.5" fill="'+color+'"><title>'+escapeHtml(date(item.date))+': '+number(item.count)+'</title></circle>').join('') + '<text x="44" y="181">'+escapeHtml(date(values[0].date))+'</text><text x="500" y="181" text-anchor="end">'+escapeHtml(date(values.at(-1).date))+'</text></svg>' : '<p class="admin-insight-empty">No activity recorded in this period.</p>') + '<footer class="admin-trend-footer"><span>Daily average <b>'+ (values.length ? (total/values.length).toLocaleString(undefined,{maximumFractionDigits:1}) : '0') +'</b></span><span>Peak day <b>'+number(Math.max(0,...values.map(item=>Number(item.count||0))))+'</b></span></footer></section>';
  };
  const popular = overview.popularCourses || [];
  const activity = overview.activity || [];
  const maxMatches = Math.max(1,...popular.map(item=>Number(item.matches)));
  const totalActivity = activity.reduce((sum,item)=>sum+Number(item.count||0),0);
  const labels = {page_view:'Page visits',course_view:'Course views',quiz_started:'Quizzes started',quiz_completed:'Quizzes completed',profile_updated:'Profile updates'};
  const ranked = popular.length ? '<ol class="admin-ranked-list">' + popular.map((item,index)=>'<li><span class="admin-rank">'+(index+1)+'</span><div class="admin-ranked-course"><div><span>'+escapeHtml(courseNames.get(item.courseId)||item.courseId)+'</span><strong>'+number(item.matches)+' <small>matches</small></strong></div><div class="admin-bar-track" aria-hidden="true"><span style="width:'+(Number(item.matches)/maxMatches*100)+'%"></span></div></div></li>').join('')+'</ol>' : '<p class="admin-insight-empty">Completed Course Matches will appear here.</p>';
  const breakdown = activity.length ? '<ul class="admin-breakdown-list">'+activity.map(item=>{const percentage=totalActivity ? Number(item.count)/totalActivity*100 : 0;return '<li><div><span>'+escapeHtml(labels[item.eventType]||item.eventType.replaceAll('_',' '))+'</span><strong>'+number(item.count)+' <small>'+percentage.toFixed(1)+'%</small></strong></div><div class="admin-bar-track" aria-hidden="true"><span style="width:'+percentage+'%"></span></div></li>';}).join('')+'</ul>' : '<p class="admin-insight-empty">Recorded activity will appear here.</p>';
  return '<div class="admin-insights admin-insights-redesigned">'+chart('Registrations',overview.registrations,'#7464ca','user-plus','new accounts')+chart('Platform activity',overview.activityTrend,'#368c92','activity','recorded events')+'<section class="profile-card admin-ranking-card"><header class="admin-insight-heading"><div><h2>Top matched courses</h2><p>Most frequent recommendations · all time</p></div>'+icon('graduation-cap',22)+'</header>'+ranked+'</section><section class="profile-card admin-breakdown-card"><header class="admin-insight-heading"><div><h2>Activity breakdown</h2><p>'+number(totalActivity)+' recorded events · all time</p></div>'+icon('chart-no-axes-combined',22)+'</header>'+breakdown+'</section></div>';
}

function setAdminTab(tab) {
  const allowed = state.user?.role === 'super_admin' ? ['overview','accounts','courses','settings'] : ['overview','accounts','courses'];
  if (!allowed.includes(tab)) return;
  state.adminTab = tab;
  render();
  document.querySelector('.admin-section-button.active')?.focus();
}
function adminSectionNavigation() {
  const tabs = [['overview','Overview','chart-no-axes-combined'],['accounts','Accounts','users-round'],['courses','Courses','book-open']];
  if (state.user.role === 'super_admin') tabs.push(['settings','Settings','settings-2']);
  return `<nav class="admin-section-nav" aria-label="Administration sections">${tabs.map(([id,label,symbol]) => `<button type="button" class="admin-section-button${state.adminTab === id ? ' active' : ''}" ${state.adminTab === id ? 'aria-current="page"' : ''} onclick="setAdminTab('${id}')">${icon(symbol,18)} ${label}</button>`).join('')}</nav>`;
}
function adminDashboard() {
  const stats = state.adminOverview?.stats;
  const users = state.adminUsers?.users || [];
  const courseNames = new Map([...courses, ...(state.adminCourses || [])].map((course) => [course.id, course.name]));
  const editingCourse = state.adminEditingCourse;
  const blankCourse = { name: "", category: "", icon: "book-open", description: "", abbreviation: "", duration: "", recommendedStrand: "", relatedCourseIds: [], matchTags: [], learn: [], subjects: [], skills: [], careers: [], interests: [] };
  const course = editingCourse || blankCourse;
  const textArea = (name, label) => `<label class="form-field"><span>${label} (comma-separated)</span><textarea name="${name}" rows="2">${escapeHtml((course[name] || []).join(", "))}</textarea></label>`;
  return `<section class="admin-page" data-admin-tab="${state.adminTab}" aria-busy="${state.adminLoading}"><div class="view-heading"><div><span class="eyebrow">Restricted access · ${state.user.role === "super_admin" ? "Super admin" : "Admin"}</span><h1 class="standard-page-title"><span class="gradient-heading-text">System</span> dashboard</h1><p>Manage NextPath accounts, courses, and system activity.</p></div><button class="secondary-btn" type="button" onclick="loadAdminData()" ${state.adminLoading ? "disabled" : ""}>Refresh ${icon("refresh-cw", 15)}</button></div>${state.adminError ? `<div class="admin-load-error" role="alert"><p class="error admin-error">${escapeHtml(state.adminError)}</p><button class="secondary-btn" type="button" onclick="loadAdminData()">Retry</button></div>` : ""}${state.adminNotice ? `<p class="profile-message" role="status">${escapeHtml(state.adminNotice)}</p>` : ""}${adminSectionNavigation()}${!stats ? state.adminLoading ? `<div class="profile-card" role="status">Loading administration data…</div>` : `<div class="profile-card admin-load-error" role="alert"><p class="error admin-error">Administration data is not available.</p><button class="secondary-btn" type="button" onclick="loadAdminData()">Retry</button></div>` : `<section class="admin-overview-panel"><div class="admin-stat-grid">${[
    ["Total users", stats.totalUsers, "users-round"],
    ["Email verified", stats.verifiedUsers, "mail-check"],
    ["New users · 30 days", stats.newUsers30Days, "user-plus"],
    ["Active users · 7 days", stats.activeUsers7Days, "activity"],
    ["Active sessions", stats.activeSessions, "key-round"],
    ["Pending email verifications", stats.pendingRegistrations, "mail-check"],
    ["Completed Course Matches", stats.completedCourseMatches, "check-circle"],
    ["In-progress Course Matches", stats.inProgressCourseMatches, "list-checks"],
    ["Recorded activity events", stats.totalActivityEvents, "chart-no-axes-combined"],
  ].map(([label, value, iconName]) => `<article class="admin-stat"><span>${icon(iconName, 18)}</span><strong>${Number(value).toLocaleString()}</strong><small>${label}</small></article>`).join("")}</div>${adminAnalyticsOverview(state.adminOverview, courseNames)}</section><section class="profile-card admin-users-card admin-accounts-panel"><div class="section-title"><div><h2>Users</h2><p class="admin-user-count">${state.adminUsers.total.toLocaleString()} account${state.adminUsers.total === 1 ? "" : "s"}</p></div><form class="admin-search" onsubmit="searchAdminUsers(event)"><input name="q" maxlength="100" value="${escapeHtml(state.adminSearch)}" placeholder="Search name or email" aria-label="Search users"><button class="secondary-btn" type="submit">Search</button></form></div>${state.user.role === "super_admin" || state.user.role === "admin" ? `<form class="admin-inline-form" onsubmit="createAdminUser(event)"><h3>Create user account</h3><input name="firstName" required maxlength="60" placeholder="First name"><input name="lastName" required maxlength="60" placeholder="Last name"><input name="email" type="email" required maxlength="254" placeholder="Email address">${state.user.role === "super_admin" ? `<select name="role" aria-label="New account role"><option value="user">User</option><option value="admin">Admin</option><option value="super_admin">Super admin</option></select>` : ""}<button class="primary-btn" type="submit">Create &amp; email setup code</button><p class="admin-footnote">The account holder sets their password using a one-time code sent to their email.</p></form>` : ""}<div class="admin-table-wrap"><table class="admin-users-table"><thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Matches / activity</th><th>Actions</th></tr></thead><tbody>${users.length ? users.map((user) => `<tr><td><span class="admin-user-identity"><span class="admin-user-avatar" aria-hidden="true">${user.photoData ? `<img src="${escapeHtml(user.photoData)}" alt="">` : escapeHtml(`${(user.firstName || "").charAt(0)}${(user.lastName || "").charAt(0)}`.toUpperCase())}</span><span>${escapeHtml(user.displayName || `${user.firstName} ${user.lastName}`)}</span></span></td><td>${escapeHtml(user.email)}</td><td>${state.user.role === "super_admin" ? `<select aria-label="Role for ${escapeHtml(user.email)}" onchange="updateAdminUser(${user.id}, {role: this.value})"><option value="user" ${user.role === "user" ? "selected" : ""}>User</option><option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option><option value="super_admin" ${user.role === "super_admin" ? "selected" : ""}>Super admin</option></select>` : `<span class="admin-role">User</span>`}</td><td>${user.isActive ? "Active" : "Deactivated"}${user.emailVerified ? "" : " · Email pending"}</td><td>${escapeHtml(formatTimestamp(user.createdAt))}</td><td>${user.completedMatches} / ${user.activityEvents}</td><td class="admin-actions"><button class="secondary-btn" type="button" onclick="editAdminUser(${user.id})">Edit name</button>${user.isActive ? `<button class="secondary-btn" type="button" onclick="sendAdminReset(${user.id})">Send reset code</button><button class="secondary-btn" type="button" onclick="deactivateAdminUser(${user.id})">Deactivate</button>` : `<button class="secondary-btn" type="button" onclick="updateAdminUser(${user.id}, {isActive: true})">Reactivate</button>`}</td></tr>`).join("") : `<tr><td colspan="7">No matching users found.</td></tr>`}</tbody></table></div><div class="admin-pagination"><p class="admin-footnote">Showing page ${state.adminUsers.page} of ${Math.max(1, Math.ceil(state.adminUsers.total / state.adminUsers.pageSize))}. Account removal is a reversible deactivation; saved history is retained.</p><div><button class="secondary-btn" type="button" onclick="loadAdminData(state.adminSearch, ${Math.max(1, state.adminUsers.page - 1)})" ${state.adminUsers.page <= 1 ? "disabled" : ""}>Previous</button><button class="secondary-btn" type="button" onclick="loadAdminData(state.adminSearch, ${state.adminUsers.page + 1})" ${state.adminUsers.page * state.adminUsers.pageSize >= state.adminUsers.total ? "disabled" : ""}>Next</button></div></div></section><section class="profile-card admin-users-card admin-courses-panel"><div class="section-title"><div><h2>Course catalog</h2><p class="admin-user-count">Course details and matching attributes</p></div></div><form class="admin-course-form" onsubmit="saveAdminCourse(event)"><h3>${editingCourse ? "Edit course" : "Add a course"}</h3><div class="admin-form-grid"><label class="form-field">Course name<input name="name" required maxlength="100" value="${escapeHtml(course.name)}"></label><label class="form-field">Category / subject<input name="category" required maxlength="80" value="${escapeHtml(course.category)}"></label><label class="form-field">Icon<input name="icon" maxlength="40" value="${escapeHtml(course.icon)}"></label><label class="form-field">Description<textarea name="description" required maxlength="1000" rows="2">${escapeHtml(course.description)}</textarea></label><label class="form-field">Abbreviation<input name="abbreviation" maxlength="30" value="${escapeHtml(course.abbreviation || "")}"></label><label class="form-field">Typical duration<input name="duration" maxlength="100" value="${escapeHtml(course.duration || "")}"></label><label class="form-field">Recommended SHS strand<input name="recommendedStrand" maxlength="160" value="${escapeHtml(course.recommendedStrand || "")}"></label>${["learn", "subjects", "skills", "careers", "interests", "relatedCourseIds", "matchTags"].map((field) => textArea(field, field === "relatedCourseIds" ? "Related course IDs" : field === "matchTags" ? "Course Match tags" : field[0].toUpperCase() + field.slice(1))).join("")}</div>${editingCourse && !editingCourse.isActive ? `<label><input type="checkbox" name="isActive"> Reactivate this course</label>` : ""}<div class="admin-actions"><button class="primary-btn" type="submit">${editingCourse ? "Save course" : "Add course"}</button>${editingCourse ? `<button class="secondary-btn" type="button" onclick="cancelCourseEdit()">Cancel</button>` : ""}</div></form><div class="admin-course-list">${(state.adminCourses || []).map((item) => `<div><span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.category)} · ${item.isActive ? "Active" : "Inactive"}</small></span><div class="admin-actions"><button class="secondary-btn" type="button" onclick="editAdminCourse('${item.id}')">Edit</button>${item.isActive ? `<button class="secondary-btn" type="button" onclick="deactivateAdminCourse('${item.id}')">Deactivate</button>` : ""}</div></div>`).join("")}</div></section>${state.user.role === "super_admin" ? `<section class="profile-card admin-users-card admin-settings-panel"><h2>System settings</h2><form class="admin-settings-form" onsubmit="saveAdminSettings(event)"><label class="form-field">Site name<input name="siteName" required maxlength="60" value="${escapeHtml(state.adminSettings?.siteName || "NextPath")}"></label><label><input type="checkbox" name="registrationEnabled" ${state.adminSettings?.registrationEnabled ? "checked" : ""}> Allow public registration</label><label><input type="checkbox" name="maintenanceMode" ${state.adminSettings?.maintenanceMode ? "checked" : ""}> Maintenance mode (blocks ordinary user sessions)</label><button class="primary-btn" type="submit">Save settings</button></form></section>` : ""}`}</section>`;
}
let adminLoadRequest = null;
let adminLoadSequence = 0;
function loadAdminData(query = state.adminSearch, page = 1) {
  if (!["admin", "super_admin"].includes(state.user?.role)) {
    state.adminError = "Administrator access is required.";
    if (state.view === "admin-dashboard") render();
    return Promise.resolve();
  }
  const key = `${state.user.id}\u0000${query}\u0000${page}\u0000${state.user.role}`;
  if (adminLoadRequest?.key === key) return adminLoadRequest.promise;
  adminLoadRequest?.controller.abort();

  const request = {
    key,
    id: ++adminLoadSequence,
    controller: new AbortController(),
    promise: null,
  };
  adminLoadRequest = request;
  state.adminError = "";
  state.adminLoading = true;
  state.adminSearch = query;
  if (state.view === "admin-dashboard") render();

  request.promise = (async () => {
    const timeout = setTimeout(() => request.controller.abort(), 15_000);
    try {
      const params = new URLSearchParams({ q: query, page: String(page) });
      const fetchJson = async (url) => {
        const response = await fetch(url, { signal: request.controller.signal });
        let body;
        try {
          body = await response.json();
        } catch {
          throw new Error(`${url} returned an invalid response.`);
        }
        if (!response.ok) {
          throw new Error(body.error || `Administration request failed (${response.status}).`);
        }
        return body;
      };
      const requests = [
        fetchJson("/api/admin/overview"),
        fetchJson(`/api/admin/users?${params}`),
        fetchJson("/api/admin/courses"),
      ];
      if (state.user.role === "super_admin") requests.push(fetchJson("/api/admin/settings"));
      const [overview, userList, courseList, settings] = await Promise.all(requests);
      if (adminLoadRequest !== request) return;
      state.adminOverview = overview;
      state.adminUsers = userList;
      state.adminCourses = courseList.courses;
      if (settings) state.adminSettings = settings;
    } catch (error) {
      if (adminLoadRequest !== request) return;
      state.adminError = request.controller.signal.aborted
        ? "Loading administration data timed out. Please try again."
        : error instanceof TypeError
          ? "Could not reach the local server. Make sure NextPath is running and try again."
          : error.message || "Unable to load the admin dashboard.";
    } finally {
      clearTimeout(timeout);
      if (adminLoadRequest === request) {
        adminLoadRequest = null;
        state.adminLoading = false;
        if (state.view === "admin-dashboard") render();
      }
    }
  })();
  return request.promise;
}
function searchAdminUsers(event) {
  event.preventDefault();
  loadAdminData(new FormData(event.currentTarget).get("q")?.toString().trim() || "", 1);
}
async function adminRequest(url, method, body) {
  const response = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const result = response.status === 204 ? {} : await response.json();
  if (!response.ok) throw new Error(result.error || "The administrator action failed.");
  return result;
}
async function runAdminAction(action, successMessage) {
  state.adminError = "";
  try {
    await action();
    state.adminNotice = successMessage;
    await loadAdminData(state.adminSearch, state.adminUsers?.page || 1);
  } catch (error) {
    state.adminError = error.message || "The administrator action failed.";
    render();
  }
}
async function createAdminUser(event) {
  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const body = Object.fromEntries(values.entries());
  await runAdminAction(() => adminRequest("/api/admin/users", "POST", body), "Account created and setup instructions sent by email.");
}
async function updateAdminUser(id, changes) {
  await runAdminAction(() => adminRequest(`/api/admin/users/${id}`, "PATCH", changes), "User account updated.");
}
async function editAdminUser(id) {
  const user = state.adminUsers?.users.find((item) => item.id === id);
  if (!user) return;
  const firstName = prompt("First name", user.firstName);
  if (firstName === null) return;
  const lastName = prompt("Last name", user.lastName);
  if (lastName === null) return;
  await updateAdminUser(id, { firstName, lastName });
}
async function deactivateAdminUser(id) {
  if (!confirm("Deactivate this account? Its saved Course Match and activity history will be retained.")) return;
  await runAdminAction(() => adminRequest(`/api/admin/users/${id}`, "DELETE"), "User account deactivated.");
}
async function sendAdminReset(id) {
  await runAdminAction(() => adminRequest(`/api/admin/users/${id}/password-reset`, "POST", {}), "Password setup/reset code sent to the user's email.");
}
function splitCourseList(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}
function editAdminCourse(id) {
  state.adminEditingCourse = state.adminCourses.find((item) => item.id === id) || null;
  render();
}
function cancelCourseEdit() {
  state.adminEditingCourse = null;
  render();
}
async function saveAdminCourse(event) {
  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const body = Object.fromEntries(values.entries());
  for (const field of ["learn", "subjects", "skills", "careers", "interests", "relatedCourseIds", "matchTags"]) body[field] = splitCourseList(body[field] || "");
  if (state.adminEditingCourse) {
    body.isActive = state.adminEditingCourse.isActive && values.has("isActive") ? false : values.has("isActive") ? true : state.adminEditingCourse.isActive;
  }
  const courseId = state.adminEditingCourse?.id;
  const method = courseId ? "PUT" : "POST";
  const url = courseId ? `/api/admin/courses/${encodeURIComponent(courseId)}` : "/api/admin/courses";
  await runAdminAction(async () => {
    await adminRequest(url, method, body);
    state.adminEditingCourse = null;
    await loadCatalog();
  }, courseId ? "Course updated." : "Course added to the catalog.");
}
async function deactivateAdminCourse(id) {
  if (!confirm("Deactivate this course? It will disappear from the public catalog, while saved results remain intact.")) return;
  await runAdminAction(async () => {
    await adminRequest(`/api/admin/courses/${encodeURIComponent(id)}`, "DELETE");
    await loadCatalog();
  }, "Course deactivated.");
}
async function saveAdminSettings(event) {
  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const body = {
    siteName: values.get("siteName").toString().trim(),
    registrationEnabled: values.has("registrationEnabled"),
    maintenanceMode: values.has("maintenanceMode"),
  };
  await runAdminAction(async () => {
    state.adminSettings = await adminRequest("/api/admin/settings", "PUT", body);
    state.settings = await (await fetch("/api/settings/public")).json();
  }, "System settings saved.");
}
function profile() {
  const totals = state.analytics?.totals || {};
  const progress = state.analytics?.courseMatch || { completedCount: 0, inProgressCount: 0 };
  const sessions = state.savedQuizSessions;
  return `<section class="profile-page">
    <div class="view-heading"><div><span class="eyebrow">Your NextPath account</span><h1 class="standard-page-title">A little more <span class="gradient-heading-text">you.</span></h1><p>Your profile, your progress, and the paths ahead.</p></div></div>
    ${state.profileMessage ? `<p class="profile-message" role="status">${escapeHtml(state.profileMessage)}</p>` : ""}
    <div class="profile-layout">
      <aside class="profile-card profile-account-panel"><div class="profile-cover" aria-hidden="true"></div><div class="profile-account-body"><div class="profile-identity"><div class="profile-photo photo-${state.user.photoStyle || "placeholder"}" aria-hidden="true">${profilePhotoMarkup()}</div><h2>${escapeHtml(state.user.displayName || state.user.name)}</h2><span class="profile-account-badge">${icon('user-round',14)} Your NextPath account</span></div><div class="profile-contact"><span>${icon('mail',18)} Email address</span><p>${escapeHtml(state.user.email)}</p></div><div class="profile-edit-heading"><h3>Personal details</h3><p>Make this space feel like you.</p></div><form class="profile-form" onsubmit="saveProfile(event)"><label for="display-name">Display name</label><input id="display-name" name="displayName" maxlength="60" autocomplete="nickname" required value="${escapeHtml(state.user.displayName || state.user.name)}"><label for="profile-photo-upload">Profile photo</label><input id="profile-photo-upload" name="photo" type="file" accept="image/jpeg,image/png,image/webp" onchange="previewProfilePhoto(this)"><p class="profile-upload-help">JPG, PNG or WebP, up to 10 MB. Photos are resized automatically.</p><button class="link-btn profile-remove-photo" type="button" onclick="removeProfilePhoto()" ${!(state.profilePhotoDraft !== undefined ? state.profilePhotoDraft : state.user.photoData) ? 'hidden' : ''}>Remove photo</button><p id="profile-photo-status" class="profile-upload-help" role="status"></p><button class="primary-btn" type="submit">${icon('check',17)} Save changes</button></form></div></aside>
      <div class="activity-column">
        <section class="profile-card analytics-overview"><div class="analytics-heading"><div><span class="analytics-eyebrow">YOUR EXPLORATION</span><h2>Activity overview</h2><p>A snapshot of your journey on NextPath.</p></div><span class="analytics-period">All time</span></div><div class="analytics-metrics">${[[totals.page_view || 0, 'Page visits', 'layout-dashboard', 'Visits across NextPath'], [totals.course_view || 0, 'Course views', 'book-open', 'Times you explored a course'], [progress.completedCount || 0, 'Completed matches', 'circle-check', 'Course Match results ready'], [progress.inProgressCount || 0, 'In progress', 'clock-3', 'Saved quizzes to return to']].map(([value,label,symbol,note]) => `<div class="analytics-metric"><span class="analytics-metric-icon" aria-hidden="true">${icon(symbol,22)}</span><strong>${Number(value).toLocaleString()}</strong><h3>${label}</h3><p>${note}</p></div>`).join('')}</div></section><section class="profile-card analytics-history"><div class="analytics-heading"><div><h2>Recent activity</h2><p>Your latest steps, most recent first.</p></div></div>${state.analytics?.recent?.length ? `<ol class="analytics-timeline">${state.analytics.recent.slice(0,5).map(event => { const labels = { page_view: 'Visited a page', course_view: 'Explored a course', quiz_started: 'Started Course Match', quiz_completed: 'Completed Course Match', profile_updated: 'Updated your profile' }; const pages = {dashboard:'Dashboard',explorer:'Explore Courses',details:'Course details',quiz:'Course Match',about:'About NextPath',profile:'My Profile'}; const course = courses.find(item=>item.id===event.courseId); return `<li><span class="analytics-event-dot" aria-hidden="true"></span><div><strong>${escapeHtml(labels[event.type] || 'Activity recorded')}</strong><span>${escapeHtml(course?.name || pages[event.page] || 'NextPath')}</span></div><time>${escapeHtml(formatTimestamp(event.occurredAt))}</time></li>`; }).join('')}</ol>` : '<div class="analytics-empty">'+icon('compass',28)+'<p>Your activity will appear here as you explore courses and take Course Match.</p></div>'}</section>
        <section class="profile-card saved-sessions-card"><details class="saved-sessions-dropdown"><summary><span>Saved Course Match sessions</span><span class="saved-sessions-toggle">${sessions.length} ${sessions.length === 1 ? "session" : "sessions"} ${icon("chevron-down", 20)}</span></summary><div class="saved-sessions-content"><div class="saved-sessions-toolbar"><button class="link-btn" type="button" onclick="startNewQuiz()">New quiz ${icon("arrow-right", 15)}</button></div>
          ${sessions.length ? `<div class="saved-sessions">${sessions.map((session) => `<article class="saved-session"><div><strong>${session.status === "completed" ? "Completed Course Match" : "In-progress Course Match"}</strong><span>Updated ${escapeHtml(formatTimestamp(session.updatedAt))}</span><span>${session.status === "completed" ? `${session.answers.length} answers saved` : `Question ${Math.min(session.currentStep + 1, courseMatchQuestions.length)} of ${courseMatchQuestions.length} · ${session.answers.filter(Number.isInteger).length} answers saved`}</span></div>${session.status === "in_progress" ? `<button class="secondary-btn" type="button" onclick="resumeQuiz('${session.id}')">Resume</button>` : `<button class="secondary-btn" type="button" onclick="viewSavedQuiz('${session.id}')">View result</button>`}</article>`).join("")}</div>` : '<p class="activity-empty">Your Course Match progress and completed results will appear here.</p>'}
        </div></details></section>
      </div>
    </div>
  </section>`;
}
function courseMainCategoryId(course) {
  return course.mainCategoryId || courseTaxonomy.getMainCategoryId(course.category) || "";
}
function card(course) {
  const categoryId = courseMainCategoryId(course);
  const category = categories.find(item => item.id === categoryId);
  return `<article class="course-card" data-category="${escapeHtml(categoryId)}"><div class="course-card-body"><span class="course-icon" aria-hidden="true">${icon(category?.icon || 'book-open',25)}</span><span class="category">${escapeHtml(course.category)}</span><h3>${escapeHtml(course.name)}</h3><p>${escapeHtml(course.description)}</p><button class="link-btn course-explore" type="button" onclick="showDetails('${escapeHtml(course.id)}')">Explore course ${icon('arrow-right',16)}</button></div></article>`;
}
function explorer() {
  const selectedMain = categories.find((category) => category.id === state.browseMainCategory);
  const isShowingCategories = state.browseMode === "category" &&
    !selectedMain && !state.browseQuery.trim() && !state.browseDetailedCategory;
  const details = courseTaxonomy.detailedCategories.filter((category) =>
    !selectedMain || category.mainCategoryId === selectedMain.id
  );
  const mainOptions = categories.map((category) =>
    `<option value="${category.id}" ${state.browseMainCategory === category.id ? "selected" : ""}>${escapeHtml(category.name)}</option>`
  ).join("");
  const detailedOptions = details.map((category) =>
    `<option value="${category.id}" ${state.browseDetailedCategory === category.id ? "selected" : ""}>${escapeHtml(category.name)}</option>`
  ).join("");
  const heading = selectedMain
    ? `<span class="eyebrow">Browse a category</span><h1>${escapeHtml(selectedMain.name)}</h1><p>${escapeHtml(selectedMain.description)}</p>`
    : `<span class="eyebrow">Browse the possibilities</span><h1>${state.browseMode === "all" ? '<span class="gradient-heading-text">All</span> courses' : '<span class="gradient-heading-text">Explore</span> courses'}</h1><p>Browse course categories and discover the programs that match your interests.</p>`;
  const results = isShowingCategories
    ? `<div class="category-grid" id="course-results">${categories.map((category) => {
      const count = courses.filter((course) => course.mainCategoryId === category.id).length;
      return `<button class="category-card" data-category="${category.id}" type="button" onclick="selectCourseCategory('${category.id}')"><span class="category-icon" aria-hidden="true">${icon(category.icon, 27)}</span><span class="category-card-copy"><strong>${escapeHtml(category.name)}</strong><span>${escapeHtml(category.description)}</span></span><span class="category-card-footer"><small>${count} ${count === 1 ? "course" : "courses"}</small><span class="category-card-action">Explore Courses ${icon("arrow-right", 15)}</span></span></button>`;
    }).join("")}</div>`
    : `<div class="course-grid" id="course-results"></div>`;
  const viewOptions = `<div class="course-view-options" role="tablist" aria-label="Course browsing view"><button class="course-view-option${state.browseMode === "category" ? " active" : ""}" type="button" role="tab" aria-selected="${state.browseMode === "category"}" onclick="setBrowseMode('category')">Browse by Category</button><button class="course-view-option${state.browseMode === "all" ? " active" : ""}" type="button" role="tab" aria-selected="${state.browseMode === "all"}" onclick="setBrowseMode('all')">View All Courses</button></div>`;
  const sorting = state.browseMode === "all"
    ? `<label class="course-sort-control">Sort by<select class="filter-select" aria-label="Sort courses" onchange="setCourseSort(this.value)"><option value="mixed" ${state.browseSort === "mixed" ? "selected" : ""}>Mixed categories</option><option value="name-asc" ${state.browseSort === "name-asc" ? "selected" : ""}>Name: A–Z</option><option value="name-desc" ${state.browseSort === "name-desc" ? "selected" : ""}>Name: Z–A</option><option value="category-asc" ${state.browseSort === "category-asc" ? "selected" : ""}>Category: A–Z</option></select></label>`
    : "";
  if (!isShowingCategories) window.requestAnimationFrame(() => filterCourses());
  return `<div class="course-page explorer-page"><div class="view-heading"><div>${heading}</div><button id="back-categories" class="secondary-btn" type="button" onclick="backToCategories()" ${isShowingCategories || state.browseMode === "all" ? "hidden" : ""}>${icon("arrow-left", 15)} Back to Categories</button></div><div class="explorer-tools"><label class="search-box">${icon("search", 17)}<input oninput="filterCourses(this.value)" id="course-search" value="${escapeHtml(state.browseQuery)}" placeholder="Search any course, subject, skill, or career..." aria-label="Search all courses"></label><select class="filter-select" aria-label="Main course category" onchange="setBrowseMainCategory(this.value)"><option value="">All main categories</option>${mainOptions}</select><select class="filter-select" aria-label="Detailed course category" onchange="setBrowseDetailedCategory(this.value)"><option value="">All detailed categories</option>${detailedOptions}</select><button class="secondary-btn clear-course-filters" type="button" onclick="clearCourseFilters()">Clear Filters</button></div>${viewOptions}${sorting}<div class="course-results-summary" id="course-results-summary" ${isShowingCategories ? "hidden" : ""}><strong id="course-count"></strong><span id="course-showing"></span></div>${results}${state.browseMode === "all" ? `<div class="load-more-container" id="load-more-container" hidden><button class="secondary-btn" type="button" onclick="loadMoreCourses()">Load More</button></div>` : ""}</div>`;
}
function selectCourseCategory(categoryId) {
  state.browseMode = "category";
  state.browseMainCategory = categoryId;
  state.browseDetailedCategory = "";
  state.browseQuery = "";
  state.browseDisplayedCount = 12;
  render();
}
function setBrowseMainCategory(categoryId) {
  state.browseMainCategory = categoryId;
  state.browseDetailedCategory = "";
  state.browseDisplayedCount = 12;
  render();
}
function setBrowseDetailedCategory(categoryId) {
  state.browseDetailedCategory = categoryId;
  state.browseDisplayedCount = 12;
  filterCourses();
}
function setBrowseMode(mode) {
  if (mode !== "category" && mode !== "all") return;
  state.browseMode = mode;
  state.browseDisplayedCount = 12;
  render();
}
function setCourseSort(sort) {
  if (!["mixed", "name-asc", "name-desc", "category-asc"].includes(sort)) return;
  state.browseSort = sort;
  state.browseDisplayedCount = 12;
  filterCourses();
}
function clearCourseFilters() {
  state.browseQuery = "";
  state.browseMainCategory = "";
  state.browseDetailedCategory = "";
  state.browseSort = "mixed";
  state.browseDisplayedCount = 12;
  render();
}
function loadMoreCourses() {
  state.browseDisplayedCount += 12;
  filterCourses();
}
function backToCategories() {
  state.browseMainCategory = "";
  state.browseDetailedCategory = "";
  state.browseQuery = "";
  state.browseDisplayedCount = 12;
  render();
}
function filterCourses(query = state.browseQuery) {
  if (query !== state.browseQuery) state.browseDisplayedCount = 12;
  state.browseQuery = query;
  if (state.browseMode === "category" && !query.trim() &&
      !state.browseMainCategory && !state.browseDetailedCategory) {
    render();
    return;
  }
  const mainCategory = state.browseMainCategory;
  const detailedCategory = state.browseDetailedCategory;
  const normalizedQuery = query.trim().toLowerCase();
  const list = courses.filter((course) => {
    const categoryId = course.categoryId || courseTaxonomy.getDetailedCategoryId(course.category);
    const mainCategoryId = course.mainCategoryId || courseTaxonomy.getMainCategoryId(categoryId);
    const searchable = [
      course.name,
      course.abbreviation,
      course.category,
      course.description,
      ...(course.subjects || []),
      ...(course.skills || []),
      ...(course.careers || []),
      ...(course.interests || []),
    ].join(" ").toLowerCase();
    return (!mainCategory || mainCategoryId === mainCategory) &&
      (!detailedCategory || categoryId === detailedCategory) &&
      (!normalizedQuery || searchable.includes(normalizedQuery));
  });
  const compareText = (left, right) => left.localeCompare(right, undefined, { sensitivity: "base" });
  list.sort((left, right) => {
    if (state.browseSort === "name-desc") {
      return compareText(right.name, left.name) || compareText(left.category, right.category);
    }
    if (state.browseSort === "category-asc") {
      return compareText(left.category, right.category) || compareText(left.name, right.name);
    }
    return compareText(left.name, right.name) || compareText(left.category, right.category);
  });
  if (state.browseSort === "mixed") {
    const buckets = new Map(categories.map(category => [category.id, []]));
    for (const course of list) {
      const id = courseMainCategoryId(course);
      if (!buckets.has(id)) buckets.set(id, []);
      buckets.get(id).push(course);
    }
    const mixed = [];
    const groups = [...buckets.values()];
    for (let index = 0; mixed.length < list.length; index++) {
      for (const group of groups) {
        if (index < group.length) mixed.push(group[index]);
      }
    }
    list.splice(0, list.length, ...mixed);
  }
  const visibleCourses = state.browseMode === "all"
    ? list.slice(0, state.browseDisplayedCount)
    : list;
  const results = document.querySelector("#course-results");
  if (!results) return;
  results.className = "course-grid";
  results.innerHTML = visibleCourses.length
    ? visibleCourses.map((course) => card(course)).join("")
    : '<div class="empty">No courses match that search yet. Try a broader term.</div>';
  lucide.createIcons();
  const summary = document.querySelector("#course-results-summary");
  const count = document.querySelector("#course-count");
  const showing = document.querySelector("#course-showing");
  const selectedMain = categories.find((category) => category.id === mainCategory);
  const selectedDetailed = courseTaxonomy.detailedCategories.find((category) => category.id === detailedCategory);
  if (summary && count && showing) {
    summary.hidden = false;
    count.textContent = `${list.length} ${list.length === 1 ? "course" : "courses"} available`;
    if (state.browseMode === "all") {
      showing.textContent = `Showing ${visibleCourses.length} of ${list.length} courses`;
    } else if (selectedMain) {
      showing.textContent = `Showing ${list.length} ${list.length === 1 ? "course" : "courses"} in ${selectedMain.name}`;
    } else if (selectedDetailed) {
      showing.textContent = `Showing ${list.length} ${list.length === 1 ? "course" : "courses"} in ${selectedDetailed.name}`;
    } else {
      showing.textContent = `Showing ${visibleCourses.length} of ${list.length} courses`;
    }
  }
  const backButton = document.querySelector("#back-categories");
  if (backButton) backButton.hidden = state.browseMode !== "category" ||
    (!mainCategory && !detailedCategory && !normalizedQuery);
  const loadMore = document.querySelector("#load-more-container");
  if (loadMore) loadMore.hidden = state.browseMode !== "all" ||
    visibleCourses.length >= list.length;
}
function details() {
  const c = courses.find((course) => course.id === state.selectedCourse) || state.selectedCourseSnapshot;
  if (!c) return `<div class="view-heading"><h1>Course unavailable</h1><p>This course is no longer in the public catalog.</p><button class="secondary-btn" onclick="go('explorer')">Back to courses</button></div>`;
  const relatedCourses = (c.relatedCourseIds || [])
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean);
  return `<button class="detail-back" onclick="go('explorer')">${icon("arrow-left", 16)} Back to courses</button><div class="detail-hero"><div class="detail-hero-content"><span class="category">${escapeHtml(c.category)}</span><h1>${escapeHtml(c.name)}${c.abbreviation ? ` <small>(${escapeHtml(c.abbreviation)})</small>` : ""}</h1><p>${escapeHtml(c.description)}</p><p class="course-duration"><strong>Typical duration:</strong> ${escapeHtml(c.duration || "Varies by school and program")}</p></div></div><div class="detail-layout"><div><section class="detail-panel"><h2>What you will learn</h2><ul>${c.learn.map((item) => `<li>${icon("check-circle", 16)}${escapeHtml(item)}</li>`).join("")}</ul></section><section class="detail-panel"><h2>Major subjects</h2><div class="tag-list">${c.subjects.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div></section><section class="detail-panel"><h2>Required and useful skills</h2><div class="tag-list">${c.skills.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div></section>${relatedCourses.length ? `<section class="detail-panel"><h2>Related college courses</h2><div class="related-course-list">${relatedCourses.map((course) => `<button type="button" class="secondary-btn" onclick="showDetails('${escapeHtml(course.id)}')">${escapeHtml(course.name)}</button>`).join("")}</div></section>` : ""}</div><aside><section class="detail-panel"><h2>Recommended SHS strand</h2><p>${escapeHtml(c.recommendedStrand || "Check the admission requirements of your chosen college.")}</p></section><section class="detail-panel"><h2>Possible career opportunities</h2><ul class="career-list">${c.careers.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section><section class="detail-panel"><h2>Good fit if you...</h2><ul>${c.interests.map((item) => `<li>${icon("sparkle", 16)}${escapeHtml(item)}</li>`).join("")}</ul></section><section class="detail-panel match-card"><h2>Still deciding?</h2><p>Our short quiz can point you toward paths that match your interests.</p><button class="primary-btn" onclick="go('quiz')">Find my fit ${icon("arrow-right", 15)}</button></section></aside></div>`;
}
function quiz() {
  if (state.quizLoading) return '<div class="course-page course-match-page"><div class="view-heading"><div><span class="eyebrow">Course Match</span><h1>Loading your saved progress…</h1></div></div></div>';
  if (state.quizError && !state.quizSessionId) return `<div class="course-page course-match-page"><div class="view-heading"><div><span class="eyebrow">Course Match</span><h1>Progress could not be loaded</h1><p>${escapeHtml(state.quizError)}</p><button class="primary-btn" onclick="loadQuizProgress()">Try again</button></div></div></div>`;
  if (state.quizGenerating) return `<div class="course-page course-match-page"><section class="quiz-box quiz-generating" role="status"><div class="loading-spinner"></div><h1>Finding your best course matches…</h1><p>We are scoring your answers against the active course catalog and preparing personalized explanations.</p></section></div>`;
  if (!state.quizResult) {
    const question = courseMatchQuestions[state.quizStep];
    const progressPercent = Math.round(((state.quizStep + 1) / courseMatchQuestions.length) * 100);
    const answers = question.options.map((option, index) =>
      `<button class="answer${state.quizSelectedAnswer === index ? " selected" : ""}" type="button" aria-pressed="${state.quizSelectedAnswer === index}" onclick="selectCourseMatchAnswer(${index})" ${state.quizSaving ? "disabled" : ""}><span class="answer-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span class="answer-copy">${escapeHtml(option.label)}</span><span class="answer-selection" aria-hidden="true">${state.quizSelectedAnswer === index ? icon("check", 17) : ""}</span></button>`
    ).join("");
    const error = state.quizError ? `<p class="chat-error" role="alert">${escapeHtml(state.quizError)}</p>` : "";
    return `<div class="course-page course-match-page"><div class="view-heading"><div><span class="eyebrow">Course Match · Question ${state.quizStep + 1} of ${courseMatchQuestions.length}</span><h1>Let's find a <span class="gradient-heading-text">path that feels like you.</span></h1><p>Follow your curiosity. Pick what sounds most like you—you can change any answer before submitting.</p></div></div><section class="quiz-box"><div class="quiz-progress-copy"><strong>Question ${state.quizStep + 1} of ${courseMatchQuestions.length}</strong><span>${progressPercent}% Complete</span></div><div class="quiz-progress" role="progressbar" aria-label="Course Match progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progressPercent}"><span class="quiz-progress-fill" style="width:${progressPercent}%"></span></div><p class="quiz-motivation">${icon("compass", 20)} <span>${state.quizStep === 0 ? "Ready to explore? Let’s start with what sparks your curiosity." : state.quizStep === courseMatchQuestions.length - 1 ? "One last choice—your course matches are almost ready!" : state.quizStep >= Math.floor(courseMatchQuestions.length / 2) ? "You’re past halfway! Keep following what feels like you." : "Your path is taking shape. Let’s keep exploring!"}</span></p><h2>${escapeHtml(question.question)}</h2><div class="answer-grid">${answers}</div>${error}<div class="quiz-footer"><button class="secondary-btn" type="button" onclick="previousCourseMatchQuestion()" ${state.quizStep === 0 || state.quizSaving ? "disabled" : ""}>${icon("arrow-left", 15)} Previous</button><span class="step-label">${state.quizSaving ? "Saving your answer…" : `${state.quizAnswers.filter(Number.isInteger).length} of ${courseMatchQuestions.length} answers saved`}</span><button class="primary-btn" type="button" onclick="nextCourseMatchQuestion()" ${state.quizSelectedAnswer === null || state.quizSaving ? "disabled" : ""}>${state.quizStep === courseMatchQuestions.length - 1 ? "Get recommendations" : "Next"} ${icon("arrow-right", 15)}</button></div></section></div>`;
  }
  return `<div class="course-page course-match-page"><div class="view-heading course-match-results-heading"><div><span class="eyebrow">Course Match</span><h1 class="standard-page-title"><span class="gradient-heading-text">Your course</span> recommendations</h1><p>Your answers were scored against the active course catalog. Review your best match and other compatible options to explore the courses that fit your interests.</p></div><button class="secondary-btn retake-course-match-button" type="button" onclick="resetQuiz()">Retake Course Match</button></div>${results()}</div>`;
  const isComplete = Boolean(state.quizResult);
  return `<div class="view-heading"><div><span class="eyebrow">Course Match</span><h1>Find a path that feels like you.</h1><p>Tell us what you enjoy or hope to do. We will talk it through and explore courses together.</p></div></div><section class="quiz-box course-match-chat"><div class="chat-messages" aria-live="polite" aria-label="Course Match conversation">${greeting}${conversation}${pending}</div>${error}<form class="chat-form" onsubmit="sendCourseMatchMessage(event)"><label class="sr-only" for="course-match-message">Your message</label><textarea id="course-match-message" name="message" maxlength="1200" placeholder="Share an interest, subject, or question…" oninput="updateQuizDraft(this.value)" ${isComplete || state.quizSending ? "disabled" : ""}><${escapeHtml(state.quizDraft)}></textarea><button class="primary-btn" type="submit" ${isComplete || state.quizSending || !state.quizDraft.trim() ? "disabled" : ""}>${state.quizSending ? "Thinking…" : "Send"} ${icon("arrow-right", 15)}</button></form><p class="chat-notice">Course Match is here to help you explore, not to make the decision for you. Avoid sharing passwords or private information.</p></section>${state.quizResult ? results() : ""}<div style="text-align:center;margin-top:25px"><button class="secondary-btn" onclick="resetQuiz()">Start a new conversation</button></div>`;
}
function legacyResults() {
  const best = state.quizResult[0];
  const renderCourse = (item, index) => `<article class="result-card course-match-result-card" data-category="${escapeHtml(courseMainCategoryId(item.course))}"><div class="result-course-heading"><span class="category">${index === 0 ? "Best Match" : `Compatible Course ${index + 1}`}</span><span class="score">${item.score}% compatible</span></div><h3>${escapeHtml(item.course.name)}</h3><p class="result-course-description">${escapeHtml(item.course.description)}</p><p><strong>Why this course matches you</strong><br>${escapeHtml(item.reason)}</p><div class="result-course-details"><div><strong>Relevant subjects</strong><ul>${item.course.subjects.map((subject) => `<li>${escapeHtml(subject)}</li>`).join("")}</ul></div><div><strong>Skills developed</strong><ul>${item.course.skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join("")}</ul></div><div><strong>Possible careers</strong><ul>${item.course.careers.map((career) => `<li>${escapeHtml(career)}</li>`).join("")}</ul></div></div><button class="primary-btn" onclick="showDetails('${escapeHtml(item.course.id)}')">Explore this course ${icon("arrow-up-right", 15)}</button></article>`;
  return `<section class="course-match-results"><div class="result-head"><span class="eyebrow">Your Best Match</span><h2>${escapeHtml(best.course.name)}</h2><p>${best.score}% compatibility · Your highest-scoring course based on all ${courseMatchQuestions.length} answers.</p></div><div class="result-card-list">${renderCourse(best, 0)}${state.quizResult.slice(1).map((item, index) => renderCourse(item, index + 1)).join("")}</div><p class="compatibility-note">Compatibility is calculated consistently from how many of your selected answers align with each course. Results are suggestions to support your decision.</p><div class="result-head why-courses-match"><span class="eyebrow">Why These Courses Match You</span><p>Explanations are grounded in the answers you selected and each course's published catalog details${state.quizResult.some((item) => item.explanationSource === "ai") ? " and refined by the AI assistant" : ""}.</p></div></section>`;
  return `<div class="result-head"><span class="eyebrow">Your NextPath recommendations</span><h1>Some promising directions.</h1><p>Based on what you shared, these courses may be worth exploring next. Notice what sparks your curiosity.</p></div><div>${state.quizResult.map((item, index) => `<article class="result-card"><div><span class="category">${index === 0 ? "Recommended course" : "Also worth exploring"}${item.course.isActive === false ? " · Saved result" : ""}</span><h3>${escapeHtml(item.course.name)}</h3><p>${escapeHtml(item.reason || item.course.description)}</p></div>${Number.isInteger(item.score) ? `<div class="score">${item.score}%</div>` : ""}<button class="primary-btn" onclick="showDetails('${escapeHtml(item.course.id)}')">${item.course.isActive === false ? "View saved details" : "Explore"} ${icon("arrow-up-right", 15)}</button></article>`).join("")}</div>`;
}
function results() {
  const [best, ...others] = state.quizResult;
  const factorLabels = [
    ["interests", "Interests"],
    ["skills", "Skills"],
    ["careerGoals", "Career Goals"],
    ["personalPreferences", "Personal Preferences"],
  ];
  const renderMatchTags = (item) => {
  const tags = [
    ...(item.matchingInterests || []).map((answer) => ["Interest", answer]),
    ...(item.matchingSkills || []).map((answer) => ["Strength", answer]),
  ].filter(([, answer], index, values) =>
    values.findIndex(([, value]) => value === answer) === index
  ).slice(0, 5);
  return `<div class="matching-evidence"><strong>Your matching interests &amp; skills</strong><div class="match-evidence-tags">${tags.length
    ? tags.map(([label, answer]) => `<span>${label}: ${escapeHtml(answer)}</span>`).join("")
    : `<span>See how this course connects with your answers</span>`
  }</div></div>`;
  };
  const renderCourse = (item, index) => {
  const strength = item.compatibilityStrength ||
    (item.score >= 75 ? "Strong Match" : item.score >= 50 ? "Good Match" : "Possible Match");
  const progress = `<div class="compatibility-progress" role="progressbar" aria-label="${escapeHtml(item.course.name)} compatibility" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${item.score}"><span style="width:${item.score}%"></span></div>`;
  const courseFacts = `<details class="course-quick-facts"><summary>Subjects, skills &amp; career opportunities</summary><div class="result-course-details"><div><strong>Relevant subjects</strong><ul>${item.course.subjects.map((subject) => `<li>${escapeHtml(subject)}</li>`).join("")}</ul></div><div><strong>Skills developed</strong><ul>${item.course.skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join("")}</ul></div><div><strong>Possible careers</strong><ul>${item.course.careers.map((career) => `<li>${escapeHtml(career)}</li>`).join("")}</ul></div></div></details>`;
  if (index === 0) {
    return `<article class="result-card course-match-result-card best-match-card" data-match-rank="1" data-category="${escapeHtml(courseMainCategoryId(item.course))}"><div class="best-match-content"><span class="recommendation-rank">Your Best Match</span><h2>${escapeHtml(item.course.name)}</h2><p class="best-match-score">${item.score}% compatibility <span>· Your highest-ranked course based on all ${courseMatchQuestions.length} answers.</span></p>${progress}<p class="personalized-match-reason"><strong>Why this course matches you</strong><br>${escapeHtml(item.reason)}</p>${renderMatchTags(item)}</div><aside class="best-match-score-panel"><span class="score-panel-label">Compatibility</span><strong class="best-match-percentage">${item.score}%</strong><span class="compatibility-strength">${strength}</span><button class="primary-btn" type="button" onclick="showDetails('${escapeHtml(item.course.id)}')">View Course Details ${icon("arrow-right", 15)}</button></aside>${courseFacts}</article>`;
  }
  return `<article class="result-card course-match-result-card supporting-match-card" data-match-rank="${index + 1}" data-category="${escapeHtml(courseMainCategoryId(item.course))}"><div class="supporting-card-heading"><h3>${escapeHtml(item.course.name)}</h3><div class="supporting-score"><strong>${item.score}%</strong><span class="compatibility-strength">${strength}</span></div></div>${progress}<p class="personalized-match-reason"><strong>Why this course matches you</strong><br>${escapeHtml(item.reason)}</p>${renderMatchTags(item)}<button class="secondary-btn course-detail-button" type="button" onclick="showDetails('${escapeHtml(item.course.id)}')">View Course Details ${icon("arrow-right", 14)}</button>${courseFacts}</article>`;
  };
  const scoringWeights = best.factorWeights;
  const scoringMethod = best.factorScores && scoringWeights
  ? `Each factor is normalized across its questions, then weighted: Interests ${scoringWeights.interests}%, Skills ${scoringWeights.skills}%, Career Goals ${scoringWeights.careerGoals}%, and Personal Preferences ${scoringWeights.personalPreferences}%. A direct course match counts as 100% evidence for that answer, a detailed-category match counts as 50%, and no match counts as 0%.`
  : "These saved results use the scoring method that was active when the questionnaire was completed.";
  const factorBreakdown = state.quizResult
  .filter((item) => item.factorScores)
  .map((item) => `<section class="factor-breakdown-course"><strong>${escapeHtml(item.course.name)}</strong><div class="match-factor-scores" aria-label="${escapeHtml(item.course.name)} compatibility by factor">${factorLabels.map(([factor, label]) => `<div><span>${label}</span><strong>${item.factorScores[factor]}%</strong></div>`).join("")}</div></section>`)
  .join("");
  return `<section class="course-match-results"><div class="result-card-list"><div class="best-match-list">${renderCourse(best, 0)}</div>${others.length ? `<section class="other-course-results"><div class="other-courses-heading"><h2>Other compatible courses</h2><p>These courses also match your answers and interests.</p></div><div class="other-course-grid">${others.map((item, index) => renderCourse(item, index + 1)).join("")}</div></section>` : ""}</div><details class="compatibility-note"><summary>How compatibility is calculated</summary><p>${scoringMethod} Strength labels use the displayed score: Strong Match is 75% or higher, Good Match is 50–74%, and Possible Match is below 50%. Ties are ordered by course name, then course ID. Percentages show alignment with your answers, not admission likelihood, academic success, or a guarantee of fit. Recommendations are suggestions to support your decision; your final choice is yours.</p>${factorBreakdown}</details></section>`;
}
function about() {
  return `<div class="about-grid"><section class="about-copy"><span class="eyebrow">The thinking behind Pathfinder</span><h1>You do not have to have it all <span class="gradient-heading-text">figured out.</span></h1><p>Pathfinder was made for the in-between moment: after high school, before a major decision, when every option can feel both exciting and overwhelming.</p><p>We bring course information into one welcoming place so you can compare paths, notice what resonates, and have better conversations with the people supporting you.</p><button class="primary-btn" onclick="go('explorer')">Start exploring ${icon("arrow-right", 15)}</button></section><section class="about-list"><div class="about-point"><span>01</span><div><h3>Curiosity before certainty</h3><p>You are allowed to explore broadly before narrowing down. Every course page is an invitation, not a commitment.</p></div></div><div class="about-point"><span>02</span><div><h3>Real-world context</h3><p>See subjects, skills, and possible jobs together, so the day-to-day shape of a degree feels easier to imagine.</p></div></div><div class="about-point"><span>03</span><div><h3>Your choice, your pace</h3><p>Recommendations are helpful prompts, never a verdict. The best path is the one you make sense of for yourself.</p></div></div></section></div>`;
}
function go(view) {
  if (state.view === "details" && view === "explorer" && state.detailsReturnView === "quiz") {
    view = "quiz";
  }
  const targetView = view === "about" && !state.user ? "landing" : view;
  if (view === "admin-dashboard" && !["admin", "super_admin"].includes(state.user?.role)) {
    state.error = "Administrator access is required.";
    return render();
  }
  if (targetView === "register" && !state.settings.registrationEnabled) {
    state.error = "Public registration is currently disabled.";
    return render();
  }
  if (state.view !== targetView && state.user?.role === "user") {
    trackAnalytics("page_view", targetView);
  }
  state.view = targetView;
  state.error = "";
  render();
  if (targetView === "quiz" && state.user && !state.quizSessionId) loadQuizProgress();
  if (targetView === "profile" && state.user) loadProfileData();
  if (targetView === "admin-dashboard" && ["admin", "super_admin"].includes(state.user?.role)) loadAdminData();
}
async function submitAuth(event) {
  event.preventDefault();
  if (state.view === "verify-email") return verifyRegistration(event);
  const authAction = state.view;
  const email = document.querySelector("#email").value.trim().toLowerCase();
  const password = document.querySelector("#password").value;
  const submitButton = document.querySelector(".form-submit");
  if (submitButton) { submitButton.disabled = true; submitButton.textContent = "Please wait…"; }
  try {
    let endpoint = "/api/auth/login";
    let body = { email, password };
    if (authAction === "register") {
      const firstName = document.querySelector("#firstName").value.trim();
      const lastName = document.querySelector("#lastName").value.trim();
      endpoint = "/api/auth/register";
      body = { ...body, firstName, lastName };
    }
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to complete authentication.");
    if (authAction === "register") {
      state.registrationEmail = email;
      state.view = "verify-email";
      state.success = result.message || "A verification code has been sent to your email address.";
      state.error = "";
      render();
      return;
    }
    state.user = result.user;
    state.success = "";
    state.view = ["admin", "super_admin"].includes(result.user.role) ? "admin-dashboard" : "dashboard";
    state.error = "";
    if (state.user.role === "user") trackAnalytics("page_view", "dashboard");
  } catch (error) {
    state.error = error instanceof TypeError
      ? "Could not reach the local server. Make sure NextPath is running and try again."
      : error.message || "Unable to complete authentication. Please try again.";
  }
  render();
  if (state.view === "admin-dashboard") loadAdminData();
}
function startPasswordReset() {
  state.resetEmail = document.querySelector("#email")?.value.trim().toLowerCase() || "";
  state.resetCode = "";
  state.resetToken = "";
  state.resetStep = "email";
  state.success = "";
  state.error = "";
  state.view = "reset-password";
  render();
}
function backToLoginFromPasswordReset() {
  state.success = "";
  state.error = "";
  go("login");
}
async function requestPasswordReset(event) {
  event.preventDefault();
  const email = new FormData(event.currentTarget).get("email").toString().trim().toLowerCase();
  state.resetEmail = email;
  state.error = "";
  try {
    const response = await fetch("/api/auth/request-password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to request a one-time code.");
    state.resetStep = "code";
    state.success = result.message || "If an active account matches that email, a one-time code has been sent.";
  } catch (error) {
    state.success = "";
    state.error = error instanceof TypeError
      ? "Could not reach the local server. Make sure NextPath is running and try again."
      : error.message || "Unable to request a one-time code.";
  }
  render();
}
async function verifyPasswordReset(event) {
  event.preventDefault();
  state.resetCode = new FormData(event.currentTarget).get("code").toString().trim();
  state.error = "";
  try {
    const response = await fetch("/api/auth/verify-password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: state.resetEmail, code: state.resetCode }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to verify the one-time code.");
    state.resetToken = result.resetToken;
    state.resetStep = "password";
    state.success = result.message;
    state.error = "";
  } catch (error) {
    state.success = "";
    state.error = error instanceof TypeError
      ? "Could not reach the local server. Make sure NextPath is running and try again."
      : error.message || "Unable to verify the one-time code.";
  }
  render();
}
async function requestAnotherPasswordResetCode() {
  state.error = "";
  try {
    const response = await fetch("/api/auth/request-password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: state.resetEmail }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to request a new code.");
    state.resetCode = "";
    state.success = result.message || "If an active account matches that email, a code has been sent.";
  } catch (error) {
    state.success = "";
    state.error = error instanceof TypeError
      ? "Could not reach the local server. Make sure NextPath is running and try again."
      : error.message || "Unable to request a new code.";
  }
  render();
}
function changePasswordResetEmail() {
  state.resetStep = "email";
  state.resetCode = "";
  state.resetToken = "";
  state.error = "";
  state.success = "";
  render();
}
async function submitPasswordReset(event) {
  event.preventDefault();
  const password = new FormData(event.currentTarget).get("password").toString();
  const body = { email: state.resetEmail, resetToken: state.resetToken, password };
  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to reset the password.");
    state.view = "login";
    state.success = result.message;
    state.error = "";
    state.resetToken = "";
    state.resetCode = "";
    state.resetStep = "email";
  } catch (error) {
    state.success = "";
    state.error = error instanceof TypeError
      ? "Could not reach the local server. Make sure NextPath is running and try again."
      : error.message || "Unable to reset the password.";
  }
  render();
}
async function verifyRegistration(event) {
  event.preventDefault();
  const submitButton = document.querySelector(".form-submit");
  if (submitButton) { submitButton.disabled = true; submitButton.textContent = "Verifying…"; }
  state.error = "";
  try {
    const response = await fetch("/api/auth/verify-registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: state.registrationEmail,
        code: document.querySelector("#verification-code").value.trim(),
      }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to verify your email.");
    state.user = result.user;
    state.view = ["admin", "super_admin"].includes(result.user.role) ? "admin-dashboard" : "dashboard";
    state.success = "Your email is verified and your account is ready.";
    state.error = "";
    if (state.user.role === "user") trackAnalytics("page_view", "dashboard");
  } catch (error) {
    state.error = error instanceof TypeError
      ? "Could not reach the local server. Make sure NextPath is running and try again."
      : error.message || "Unable to verify your email. Please try again.";
  }
  render();
}
async function resendRegistrationCode() {
  state.error = "";
  state.success = "";
  try {
    const response = await fetch("/api/auth/resend-registration-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: state.registrationEmail }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to send a new code.");
    state.success = result.message || "A new code has been sent.";
  } catch (error) {
    state.error = error instanceof TypeError
      ? "Could not reach the local server. Make sure NextPath is running and try again."
      : error.message || "Unable to send a new code. Please try again.";
  }
  render();
}
async function logout() {
  try {
    const response = await fetch("/api/auth/session", { method: "DELETE" });
    if (!response.ok) throw new Error(`The server returned ${response.status}.`);
  } catch (error) {
    console.error("Sign out failed:", error);
    state.error = error instanceof TypeError
      ? "Could not reach the local server. Make sure NextPath is running and try again."
      : "Could not sign out. Please try again.";
    state.view = "login";
    render();
    return;
  }
  adminLoadRequest?.controller.abort();
  adminLoadRequest = null;
  state.adminLoading = false;
  state.user = null;
  state.view = "landing";
  state.success = "";
  state.chatMessages = [];
  state.chatError = "";
  state.chatOpen = false;
  state.quizSessionId = null;
  state.analytics = null;
  state.profilePhotoDraft = undefined;
  state.adminOverview = null;
  state.adminUsers = null;
  state.adminCourses = [];
  state.adminSettings = null;
  state.adminSearch = "";
  state.adminError = "";
  state.savedQuizSessions = [];
  render();
}
function showDetails(id) {
  state.detailsReturnView = state.view;
  state.selectedCourse = id;
  state.selectedCourseSnapshot = state.quizResult?.find((item) => item.course.id === id)?.course || null;
  state.view = "details";
  if (state.user) {
    trackAnalytics("page_view", "details");
    trackAnalytics("course_view", "details", id);
  }
  render();
  window.scrollTo(0, 0);
}
async function resetQuiz() {
  await startNewQuiz();
}
function selectCourseMatchAnswer(optionIndex) {
  const question = courseMatchQuestions[state.quizStep];
  if (!question || !Number.isInteger(optionIndex) ||
      optionIndex < 0 || optionIndex >= question.options.length) return;
  state.quizSelectedAnswer = optionIndex;
  state.quizError = "";
  render();
}
async function saveCourseMatchProgress(answers, currentStep) {
  const response = await fetch(`/api/course-match/sessions/${state.quizSessionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers, currentStep }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Could not save your Course Match answer.");
  state.quizAnswers = result.session.answers;
  state.quizStep = result.session.currentStep;
}
async function moveCourseMatchQuestion(nextStep) {
  if (state.quizSaving || !state.quizSessionId ||
      nextStep < 0 || nextStep > courseMatchQuestions.length) return;
  const selectedAnswer = state.quizSelectedAnswer;
  if (nextStep > state.quizStep && !Number.isInteger(selectedAnswer)) {
    state.quizError = "Choose an answer before continuing.";
    render();
    return;
  }
  const answers = [...state.quizAnswers];
  if (Number.isInteger(selectedAnswer)) answers[state.quizStep] = selectedAnswer;
  const finalQuestion = nextStep === courseMatchQuestions.length &&
    state.quizStep === courseMatchQuestions.length - 1;
  if (nextStep === courseMatchQuestions.length && !finalQuestion) return;
  state.quizSaving = true;
  state.quizError = "";
  state.quizGenerating = finalQuestion;
  render();
  try {
    await saveCourseMatchProgress(answers, nextStep);
    state.quizSelectedAnswer = Number.isInteger(state.quizAnswers[nextStep])
      ? state.quizAnswers[nextStep]
      : null;
    if (finalQuestion) {
      state.quizGenerating = true;
      render();
      const response = await fetch(`/api/course-match/sessions/${state.quizSessionId}/complete`, { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not generate Course Match recommendations.");
      applyQuizSession({
        id: state.quizSessionId,
        status: result.status,
        answers: result.answers,
        currentStep: courseMatchQuestions.length,
        result: result.result,
        conversation: [],
      });
      state.quizChatUnavailable = !result.chatAvailable;
    }
  } catch (error) {
    if (finalQuestion) {
      state.quizStep = courseMatchQuestions.length - 1;
      state.quizSelectedAnswer = state.quizAnswers[state.quizStep] ?? null;
    }
    state.quizError = error instanceof TypeError
      ? "Could not connect to the local server. Try again when it is available."
      : error.message || "Could not save your Course Match answer.";
  } finally {
    state.quizSaving = false;
    state.quizGenerating = false;
    render();
  }
}
function previousCourseMatchQuestion() {
  if (state.quizStep > 0) moveCourseMatchQuestion(state.quizStep - 1);
}
function nextCourseMatchQuestion() {
  moveCourseMatchQuestion(state.quizStep + 1);
}
function answerCourseMatch(optionIndex) {
  selectCourseMatchAnswer(optionIndex);
}
function updateQuizDraft(value) {
  state.quizDraft = value;
  const submitButton = document.querySelector(".course-match-results-chat .chat-form button[type='submit']");
  if (submitButton) submitButton.disabled = state.quizSending || !value.trim();
}
function handleCourseMatchKeydown(event) {
  if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    event.currentTarget.form.requestSubmit();
  }
}
async function sendCourseMatchMessage(event) {
  event.preventDefault();
  if (state.quizSending || !state.quizResult || !state.quizSessionId ||
      state.quizStep < courseMatchQuestions.length || state.quizAnswers.length !== courseMatchQuestions.length) return;
  const message = event.currentTarget.querySelector("#course-match-message").value.trim();
  if (!message) return;
  state.quizConversation.push({ role: "user", content: message });
  state.quizSending = true;
  state.quizError = "";
  render();
  try {
    await new Promise((resolve) => setTimeout(resolve, 0));
    const response = await fetch("/api/course-match/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: state.quizSessionId, message }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Course Match could not answer right now.");
    const returnedTurns = result.conversation;
    const userTurn = Array.isArray(returnedTurns) ? returnedTurns.at(-2) : null;
    const assistantTurn = Array.isArray(returnedTurns) ? returnedTurns.at(-1) : null;
    if (userTurn?.role !== "user" || userTurn.content !== message ||
        assistantTurn?.role !== "assistant" || typeof assistantTurn.content !== "string" ||
        !assistantTurn.content.trim()) {
      throw new Error("NextPath AI returned an unexpected response. Your question is still here; please try again.");
    }
    state.quizDraft = "";
    state.quizConversation.push({ role: "assistant", content: assistantTurn.content });
    state.quizChatUnavailable = false;
  } catch (error) {
    state.quizError = error instanceof TypeError
      ? "Sorry, I could not connect to NextPath. Your question is still here—please try again."
      : `Sorry, I could not get an answer just now. Your question is still here—please try again. ${error.message || ""}`.trim();
    console.error("Course Match chatbot request failed:", error);
    if (/temporarily unavailable|nvidia|rate-limit|timed out/i.test(state.quizError)) {
      state.quizChatUnavailable = true;
    }
  } finally {
    state.quizSending = false;
    render();
  }
}
async function startNewQuiz() {
  state.quizLoading = true;
  state.quizSaving = false;
  state.quizError = "";
  state.quizSessionId = null;
  state.quizStep = 0;
  state.quizAnswers = [];
  state.quizResult = null;
  state.quizConversation = [];
  state.quizDraft = "";
  state.quizSending = false;
  state.quizGenerating = false;
  state.quizSelectedAnswer = null;
  state.quizChatUnavailable = false;
  state.view = "quiz";
  render();
  try {
    const response = await fetch("/api/course-match/sessions", { method: "POST" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not create a Course Match session.");
    applyQuizSession(result.session);
    state.quizLoading = false;
  } catch (error) {
    state.quizLoading = false;
    state.quizError = error.message || "Could not create a Course Match session.";
  }
  render();
}
async function loadQuizProgress() {
  state.quizLoading = true;
  state.quizError = "";
  render();
  try {
    const response = await fetch("/api/course-match/sessions");
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not load saved Course Match progress.");
    const activeSession = result.sessions.find((session) => session.status === "in_progress");
    if (activeSession) {
      applyQuizSession(activeSession);
    } else {
      const createResponse = await fetch("/api/course-match/sessions", { method: "POST" });
      const created = await createResponse.json();
      if (!createResponse.ok) throw new Error(created.error || "Could not create a Course Match session.");
      applyQuizSession(created.session);
    }
    state.quizLoading = false;
  } catch (error) {
    state.quizLoading = false;
    state.quizError = error.message || "Could not load saved Course Match progress.";
  }
  render();
}
function applyQuizSession(session) {
  state.quizSessionId = session.id;
  state.quizAnswers = session.answers;
  state.quizStep = session.currentStep;
  state.quizSelectedAnswer = Number.isInteger(session.answers[state.quizStep])
    ? session.answers[state.quizStep]
    : null;
  state.quizSaving = false;
  state.quizConversation = session.conversation || [];
  state.quizDraft = "";
  state.quizSending = false;
  state.quizResult = session.result
    ? session.result.map((item) => ({
      course: courses.find((course) => course.id === item.courseId) || {
        id: item.courseId,
        ...(item.course || {
          name: item.courseId,
          category: "Saved course",
          description: "This course is no longer in the active catalog.",
          learn: [],
          subjects: [],
          skills: [],
          careers: [],
          interests: [],
        }),
        isActive: false,
      },
      score: item.score,
      reason: item.reason,
      explanationSource: item.explanationSource || "fallback",
    }))
    : null;
  state.quizChatUnavailable = false;
}
async function resumeQuiz(sessionId) {
  try {
    const response = await fetch("/api/course-match/sessions");
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not load saved sessions.");
    const session = result.sessions.find((item) => item.id === sessionId && item.status === "in_progress");
    if (!session) throw new Error("That saved session is no longer available.");
    applyQuizSession(session);
    state.view = "quiz";
    render();
  } catch (error) {
    state.profileMessage = error.message || "Could not resume Course Match.";
    loadProfileData();
  }
}
async function viewSavedQuiz(sessionId) {
  try {
    const response = await fetch("/api/course-match/sessions");
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not load saved results.");
    const session = result.sessions.find((item) => item.id === sessionId && item.status === "completed");
    if (!session) throw new Error("That saved result is no longer available.");
    applyQuizSession(session);
    state.view = "quiz";
    render();
  } catch (error) {
    state.profileMessage = error.message || "Could not load saved result.";
    loadProfileData();
  }
}
async function loadProfileData() {
  const userId = state.user?.id;
  try {
    await pendingAnalytics;
    const [analyticsResponse, sessionsResponse] = await Promise.all([
      fetch("/api/analytics"),
      fetch("/api/course-match/sessions"),
    ]);
    const [analytics, sessions] = await Promise.all([
      analyticsResponse.json(),
      sessionsResponse.json(),
    ]);
    if (!analyticsResponse.ok) throw new Error(analytics.error || "Could not load activity analytics.");
    if (!sessionsResponse.ok) throw new Error(sessions.error || "Could not load saved Course Match sessions.");
    if (state.user?.id !== userId) return;
    state.analytics = analytics;
    state.savedQuizSessions = sessions.sessions;
    render();
  } catch (error) {
    state.profileMessage = error.message || "Could not load profile activity.";
    render();
  }
}
function profilePhotoMarkup() {
  const photo = state.profilePhotoDraft !== undefined ? state.profilePhotoDraft : state.user.photoData;
  return photo ? '<img src="' + escapeHtml(photo) + '" alt="">'
    : escapeHtml((state.user.displayName || state.user.name || 'S').trim().split(/\s+/).slice(0,2).map(part => part[0] || '').join('').toUpperCase());
}
function updateProfilePhotoPreview() {
  const avatar = document.querySelector('.profile-identity .profile-photo');
  if (avatar) avatar.innerHTML = profilePhotoMarkup();
  const remove = document.querySelector('.profile-remove-photo');
  if (remove) remove.hidden = !(state.profilePhotoDraft !== undefined ? state.profilePhotoDraft : state.user.photoData);
}
function removeProfilePhoto() {
  state.profilePhotoDraft = null;
  const input = document.querySelector('#profile-photo-upload');
  if (input) input.value = '';
  updateProfilePhotoPreview();
  document.querySelector('#profile-photo-status').textContent = 'Photo removed. Save changes to confirm.';
}
async function previewProfilePhoto(input) {
  const file = input.files?.[0];
  if (!file) return;
  const userId = state.user.id;
  const status = document.querySelector('#profile-photo-status');
  const save = input.form.querySelector('button[type="submit"]');
  state.profilePhotoProcessing = true;
  save.disabled = true;
  status.textContent = 'Preparing your photo...';
  try {
    if (!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) throw Error('Choose a JPG, PNG or WebP image smaller than 10 MB.');
    const source = await new Promise((resolve,reject) => {
      const reader = new FileReader(); reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(Error('The photo could not be read.')); reader.readAsDataURL(file);
    });
    const picture = await new Promise((resolve,reject) => {
      const img = new Image(); img.onload = () => resolve(img);
      img.onerror = () => reject(Error('This file could not be opened as a photo.')); img.src = source;
    });
    const canvas = document.createElement('canvas'); canvas.width = 384; canvas.height = 384;
    const drawing = canvas.getContext('2d');
    drawing.fillStyle = '#ffffff'; drawing.fillRect(0,0,384,384);
    const side = Math.min(picture.naturalWidth,picture.naturalHeight);
    drawing.drawImage(picture,(picture.naturalWidth-side)/2,(picture.naturalHeight-side)/2,side,side,0,0,384,384);
    const photo = canvas.toDataURL('image/jpeg',.85);
    if (photo.length > 350000) throw Error('Try a smaller photo.');
    if (state.user?.id !== userId) return;
    state.profilePhotoDraft = photo;
    updateProfilePhotoPreview();
    status.textContent = 'Photo ready. Save changes to update your profile.';
  } catch (error) { status.textContent = error.message; input.value = ''; }
  finally { state.profilePhotoProcessing = false; save.disabled = false; }
}
async function saveProfile(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const displayName = form.elements.displayName.value.trim();
  if (state.profilePhotoProcessing) return;
  const photoStyle = state.user.photoStyle || "placeholder";
  try {
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, photoStyle, ...(state.profilePhotoDraft !== undefined ? { photoData: state.profilePhotoDraft } : {}) }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not update profile.");
    state.user = result.user;
    state.profilePhotoDraft = undefined;
    state.profileMessage = "Profile updated.";
    await loadProfileData();
  } catch (error) {
    state.profileMessage = error.message || "Could not update profile.";
    render();
  }
}
let pendingAnalytics = Promise.resolve();
function trackAnalytics(eventType, page, courseId = null) {
  if (!state.user) return Promise.resolve();
  const userId = state.user.id;
  pendingAnalytics = pendingAnalytics.then(async () => {
    // Keep writes ordered so activity reads include the latest navigation.
    if (state.user?.id !== userId) return;
    try {
      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventType, page, courseId }),
      });
      if (!response.ok) throw new Error(`Analytics event returned ${response.status}.`);
    } catch (error) {
      console.warn("Could not save usage analytics:", error);
    }
  });
  return pendingAnalytics;
}
function toggleMenu() {
  const menu = document.querySelector("#main-navigation");
  const button = document.querySelector(".mobile-menu");
  if (!menu || !button) return;
  const isOpen = menu.classList.toggle("open");
  button.setAttribute("aria-expanded", String(isOpen));
  button.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}
const publicChatSuggestions = [
  "How do I explore courses?",
  "How does Course Match work?",
  "How is my account data stored?",
];
function scriptedChatResponse(message, isSignedIn = Boolean(state.user)) {
  const question = message.toLowerCase();
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(question)) {
    return "Hi! I can give quick answers about exploring courses, Course Match, accounts, and how NextPath handles your data. What would you like to know?";
  }
  if (/\b(thank(s| you)|appreciate it)\b/.test(question)) {
    return "You’re welcome! Ask me anytime about exploring courses, Course Match, or using NextPath.";
  }
  if (/\b(what can you do|what do you help with|who are you)\b/.test(question)) {
    return "I’m the NextPath help assistant. I can answer common questions about browsing courses, the Course Match quiz, accounts, and how your data is stored.";
  }
  const courseTopic = [
    { id: "technology-computing", matches: /\b(information technology|information tech|it[- ]related|\bit\b|bsit|computing|computer science|software|programming|cybersecurity)\b/ },
    { id: "business-management", matches: /\b(business|management|marketing|finance|accounting|accountancy|entrepreneurship)\b/ },
    { id: "engineering-architecture", matches: /\b(engineering|engineer|architecture|architect|construction|civil)\b/ },
    { id: "health-medical", matches: /\b(health|medical|medicine|nursing|nurse|allied health|healthcare|caregiving|pharmacy)\b/ },
    { id: "education", matches: /\b(education|teaching|teacher|teaching-related)\b/ },
    { id: "arts-design-communication", matches: /\b(arts?|design|multimedia|communication|journalism|broadcasting|media)\b/ },
    { id: "social-public-service", matches: /\b(social science|humanities|public service|public administration|political science|psychology|sociology|criminology)\b/ },
    { id: "science-environment", matches: /\b(science|biology|chemistry|physics|environment|agriculture|agricultural)\b/ },
  ].find(({ matches }) => matches.test(question));
  const asksAboutCourses = /\b(course|courses|program|programs|degree|degrees|related|study|studies)\b/.test(question) ||
    /\b(do you have|do you offer|is there|are there|available|offer(?:ed)?)\b/.test(question);
  if (courseTopic && asksAboutCourses) {
    const topicCategory = categories.find((category) => category.id === courseTopic.id);
    const topicCourses = courses.filter((course) =>
      course.isActive !== false &&
      (course.mainCategoryId || courseTaxonomy.getMainCategoryId(course.categoryId || course.category)) === courseTopic.id
    );
    if (topicCourses.length) {
      const examples = topicCourses.slice(0, 7).map((course) => `“${course.name}”`).join(", ");
      const more = topicCourses.length > 7 ? `, and ${topicCourses.length - 7} more` : "";
      return `Yes! The catalog has ${topicCourses.length} course${topicCourses.length === 1 ? "" : "s"} in ${topicCategory?.name || "this field"}. Examples include ${examples}${more}. Choose Explore courses to browse them all.`;
    }
    return `I can’t find active courses in ${topicCategory?.name || "that field"} in the current catalog. You can check the latest listings in Explore courses.`;
  }
  if (/\b(course match|quiz|recommend|fit|interests)\b/.test(question)) {
    return "Choose Course Match to answer ten questions about your interests, strengths, hobbies, learning preferences, personality, and career goals. NextPath scores the catalog courses against your answers, then offers personalized explanations and an optional AI chat. Signed-in sessions can be resumed or reviewed.";
  }
  if (/\b(how do i|where can i|how can i)\b.*\b(browse|explore|find|see)\b.*\b(course|courses|catalog)\b/.test(question) ||
      /\b(where|how)\b.*\b(course catalog|explore courses)\b/.test(question)) {
    return "Choose “Explore courses” to browse the course catalog. Open a course to see what you’ll learn, possible subjects, skills, and related careers.";
  }
  if (/\b(register|registration|sign up|create an account|log ?in|login|password|account)\b/.test(question)) {
    return "Create an account with your first name, last name, email, and password, or log in with your email and password. NextPath stores a salted password hash, not your plain-text password.";
  }
  if (/\b(database|sqlite|firebase|save|saved|store|stored|privacy|data|messages)\b/.test(question)) {
    return "NextPath stores account details, hashed login sessions, saved Course Match answers and results with timestamps, and basic usage analytics in the MySQL database on the server. Assistant messages are not saved by NextPath.";
  }
  if (/^(help|what can you help me with|what can you do|what is nextpath|what does nextpath do)\??$/.test(question.trim())) {
    return isSignedIn
      ? "I can help with questions about NextPath, your course options, Course Match, your account, and how the app stores data. What would you like to know?"
      : "I can answer common questions about browsing courses, Course Match, accounts, and how NextPath handles data. Sign in to ask the AI assistant other NextPath questions.";
  }
  return null;
}
function handleChatKeydown(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    event.currentTarget.form.requestSubmit();
  }
}
async function sendSuggestedChatQuestion(index) {
  if (!Number.isInteger(index) || !publicChatSuggestions[index]) return;
  if (state.chatBusy) return;
  const lastMessage = state.chatMessages.at(-1);
  if (lastMessage?.role === "assistant" && lastMessage.suggestions) {
    delete lastMessage.suggestions;
  }
  await submitChatQuestion(publicChatSuggestions[index]);
}
async function sendChatMessage(event) {
  event.preventDefault();
  if (state.chatBusy) return;
  const input = document.querySelector("#chat-message");
  await submitChatQuestion(input.value);
}
async function retryChatMessage() {
  if (state.chatBusy || !state.chatRetryMessage) return;
  const message = state.chatRetryMessage;
  const lastMessage = state.chatMessages.at(-1);
  if (lastMessage?.role === "user" && lastMessage.content === message) state.chatMessages.pop();
  state.chatRetryMessage = "";
  await submitChatQuestion(message);
}
async function submitChatQuestion(rawMessage) {
  if (state.chatBusy) return;
  const message = rawMessage.trim();
  if (!message) return;

  if (state.chatRetryMessage) {
    const previousMessage = state.chatMessages.at(-1);
    if (previousMessage?.role === "user" && previousMessage.content === state.chatRetryMessage) state.chatMessages.pop();
    state.chatRetryMessage = "";
  }
  state.chatMessages.push({ role: "user", content: message });
  state.chatBusy = true;
  state.chatError = "";
  render();
  try {
    const scriptedAnswer = scriptedChatResponse(message, Boolean(state.user));
    if (scriptedAnswer || !state.user) {
      const assistantMessage = {
        role: "assistant",
        content: scriptedAnswer || "I can answer common NextPath questions about exploring courses, Course Match, accounts, and data storage. For other NextPath questions, please sign in to use the AI assistant.",
      };
      if (!scriptedAnswer) assistantMessage.suggestions = publicChatSuggestions;
      state.chatMessages.push(assistantMessage);
      return;
    }
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history: state.chatMessages
          .filter((item) => item.role === "user")
          .slice(-5, -1)
          .map((item) => item.content),
      }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "The assistant could not answer right now.");
    state.chatMessages.push({ role: "assistant", content: result.answer });
  } catch (error) {
    state.chatError = error instanceof TypeError
      ? "Could not connect to the local server. Try again when it is available."
      : /timed out/i.test(error.message || "")
        ? "The AI service didn’t respond in time. You’re still signed in; try again shortly."
        : error.message || "The assistant could not answer right now.";
    state.chatRetryMessage = message;
  } finally {
    state.chatBusy = false;
    render();
  }
}
async function restoreSession() {
  let shouldLoadAdminData = false;
  try {
    const response = await fetch("/api/auth/session");
    if (!response.ok) throw new Error(`The server returned ${response.status}.`);
    const result = await response.json();
    state.user = result.user;
    if (state.user && ["landing", "login", "register"].includes(state.view)) {
      state.view = ["admin", "super_admin"].includes(state.user.role) ? "admin-dashboard" : "dashboard";
    }
    shouldLoadAdminData = Boolean(state.user && ["admin", "super_admin"].includes(state.user.role) &&
      state.view === "admin-dashboard");
    if (state.user?.role === "user") trackAnalytics("page_view", state.view);
  } catch (error) {
    console.error("Could not restore local session:", error);
    state.error = "Could not connect to the local server. Make sure NextPath is running and try again.";
    state.view = "login";
  }
  render();
  if (shouldLoadAdminData) loadAdminData();
}
async function loadCatalog() {
  try {
    const response = await fetch("/api/courses");
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not load the course catalog.");
    courses = result.courses;
    categories = courseTaxonomy.mainCategories;
  } catch (error) {
    console.error("Could not load the course catalog:", error);
  }
}
async function loadPublicSettings() {
  try {
    const response = await fetch("/api/settings/public");
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not load system settings.");
    state.settings = result;
  } catch (error) {
    console.error("Could not load public settings:", error);
  }
}
render();
Promise.all([loadCatalog(), loadPublicSettings()]).then(() => {
  render();
  return restoreSession();
});
