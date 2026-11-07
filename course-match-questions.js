(function defineCourseMatchQuestions() {
  const courseMatchQuestions = [
    {
      question: "Which kinds of challenges sound most interesting?",
      factor: "interests",
      options: [
        { label: "Solving puzzles with logic and technology", matches: ["it", "cs", "engineering"], matchesCategories: ["computing-information-technology", "engineering", "natural-physical-sciences"] },
        { label: "Understanding people and helping them grow", matches: ["education", "health"], matchesCategories: ["education", "health-sciences", "medical-allied-health", "social-sciences-humanities"] },
        { label: "Creating designs, stories, or new ideas", matches: ["design", "communication"], matchesCategories: ["arts-fine-arts", "design-multimedia", "communication-media"] },
        { label: "Organizing projects and making plans happen", matches: ["business", "communication"], matchesCategories: ["business-management", "accountancy-finance", "public-administration-service"] },
      ],
    },
    {
      question: "Where would you most enjoy spending your time?",
      factor: "personalPreferences",
      options: [
        { label: "Working with computers, tools, or technical systems", matches: ["it", "cs", "engineering"], matchesCategories: ["computing-information-technology", "engineering", "architecture-built-environment"] },
        { label: "Collaborating and communicating with people", matches: ["business", "education", "communication"], matchesCategories: ["business-management", "education", "communication-media", "social-sciences-humanities"] },
        { label: "Making or designing something hands-on", matches: ["design", "engineering", "it"], matchesCategories: ["design-multimedia", "arts-fine-arts", "engineering", "architecture-built-environment"] },
        { label: "Researching ideas and figuring out how things work", matches: ["cs", "health", "engineering"], matchesCategories: ["natural-physical-sciences", "health-sciences", "medical-allied-health", "agriculture-environment"] },
      ],
    },
    {
      question: "Which strengths feel most like you?",
      factor: "skills",
      options: [
        { label: "Analyzing problems and finding patterns", matches: ["cs", "engineering", "business"], matchesCategories: ["computing-information-technology", "engineering", "accountancy-finance", "natural-physical-sciences"] },
        { label: "Listening, explaining, and supporting others", matches: ["education", "health", "communication"], matchesCategories: ["education", "health-sciences", "medical-allied-health", "social-sciences-humanities"] },
        { label: "Imagining possibilities and expressing ideas", matches: ["design", "communication"], matchesCategories: ["arts-fine-arts", "design-multimedia", "communication-media"] },
        { label: "Staying organized and paying attention to details", matches: ["business", "it", "health"], matchesCategories: ["business-management", "accountancy-finance", "computing-information-technology", "medical-allied-health"] },
      ],
    },
    {
      question: "What kind of impact would you like your work to have?",
      factor: "careerGoals",
      options: [
        { label: "Build useful technology or solve technical problems", matches: ["it", "cs", "engineering"], matchesCategories: ["computing-information-technology", "engineering", "architecture-built-environment"] },
        { label: "Improve people's health, learning, or wellbeing", matches: ["health", "education"], matchesCategories: ["health-sciences", "medical-allied-health", "education"] },
        { label: "Create experiences, designs, or media people enjoy", matches: ["design", "communication"], matchesCategories: ["arts-fine-arts", "design-multimedia", "communication-media"] },
        { label: "Help teams, organizations, or communities work better", matches: ["business", "education", "communication"], matchesCategories: ["business-management", "accountancy-finance", "education", "social-sciences-humanities", "public-administration-service"] },
      ],
    },
    {
      question: "Which activities do you enjoy in your free time?",
      factor: "interests",
      options: [
        { label: "Building, fixing, coding, or experimenting with gadgets", matches: ["it", "cs", "engineering"], matchesCategories: ["computing-information-technology", "engineering"] },
        { label: "Planning events, keeping groups organized, or selling ideas", matches: ["business", "communication"], matchesCategories: ["business-management", "accountancy-finance", "public-administration-service"] },
        { label: "Drawing, crafting, photography, or making digital art", matches: ["design", "communication"], matchesCategories: ["arts-fine-arts", "design-multimedia", "communication-media"] },
        { label: "Volunteering, tutoring, or caring for people", matches: ["education", "health"], matchesCategories: ["education", "health-sciences", "medical-allied-health", "social-sciences-humanities", "public-administration-service"] },
      ],
    },
    {
      question: "Which school subjects would you most like to explore further?",
      factor: "interests",
      options: [
        { label: "Computing, mathematics, or physics", matches: ["cs", "it", "engineering"], matchesCategories: ["computing-information-technology", "engineering", "natural-physical-sciences"] },
        { label: "Biology, health, or human development", matches: ["health", "education"], matchesCategories: ["health-sciences", "medical-allied-health", "education", "natural-physical-sciences"] },
        { label: "Visual arts, writing, or media", matches: ["design", "communication"], matchesCategories: ["arts-fine-arts", "design-multimedia", "communication-media"] },
        { label: "Economics, entrepreneurship, or social studies", matches: ["business", "communication", "education"], matchesCategories: ["business-management", "accountancy-finance", "social-sciences-humanities", "public-administration-service"] },
      ],
    },
    {
      question: "How do you prefer to learn something new?",
      factor: "personalPreferences",
      options: [
        { label: "Trying it hands-on and building a real project", matches: ["engineering", "it", "design"], matchesCategories: ["computing-information-technology", "engineering", "architecture-built-environment", "design-multimedia"] },
        { label: "Discussing ideas and explaining them to others", matches: ["education", "communication", "business"], matchesCategories: ["education", "communication-media", "business-management", "social-sciences-humanities"] },
        { label: "Studying evidence, data, and how things work", matches: ["cs", "health", "engineering"], matchesCategories: ["computing-information-technology", "health-sciences", "natural-physical-sciences", "agriculture-environment"] },
        { label: "Planning steps and working toward a clear goal", matches: ["business", "it", "education"], matchesCategories: ["business-management", "accountancy-finance", "computing-information-technology", "education", "public-administration-service"] },
      ],
    },
    {
      question: "What kind of role feels most comfortable to you?",
      factor: "personalPreferences",
      options: [
        { label: "A focused problem-solver who works independently", matches: ["cs", "engineering", "it"], matchesCategories: ["computing-information-technology", "engineering", "natural-physical-sciences", "accountancy-finance"] },
        { label: "A supportive teammate people can rely on", matches: ["health", "education", "business"], matchesCategories: ["health-sciences", "medical-allied-health", "education", "social-sciences-humanities"] },
        { label: "A creative thinker who shares fresh perspectives", matches: ["design", "communication"], matchesCategories: ["arts-fine-arts", "design-multimedia", "communication-media"] },
        { label: "A coordinator who brings people and plans together", matches: ["business", "education", "communication"], matchesCategories: ["business-management", "education", "communication-media", "public-administration-service"] },
      ],
    },
    {
      question: "Which work environment sounds most appealing?",
      factor: "personalPreferences",
      options: [
        { label: "A technology lab, studio, or engineering workspace", matches: ["cs", "it", "engineering", "design"], matchesCategories: ["computing-information-technology", "engineering", "natural-physical-sciences", "design-multimedia"] },
        { label: "A school, clinic, or community setting", matches: ["education", "health"], matchesCategories: ["education", "health-sciences", "medical-allied-health", "social-sciences-humanities"] },
        { label: "A collaborative office or organization", matches: ["business", "communication"], matchesCategories: ["business-management", "accountancy-finance", "public-administration-service"] },
        { label: "A creative studio or media production space", matches: ["design", "communication"], matchesCategories: ["arts-fine-arts", "design-multimedia", "communication-media"] },
      ],
    },
    {
      question: "What would you most like your future career to let you do?",
      factor: "careerGoals",
      options: [
        { label: "Design, build, or improve technology and systems", matches: ["it", "cs", "engineering"], matchesCategories: ["computing-information-technology", "engineering", "architecture-built-environment"] },
        { label: "Support people's health, learning, or development", matches: ["health", "education"], matchesCategories: ["health-sciences", "medical-allied-health", "education", "social-sciences-humanities"] },
        { label: "Create visual work, stories, or messages that connect", matches: ["design", "communication"], matchesCategories: ["arts-fine-arts", "design-multimedia", "communication-media"] },
        { label: "Lead projects, solve business needs, or grow an organization", matches: ["business", "communication"], matchesCategories: ["business-management", "accountancy-finance", "public-administration-service"] },
      ],
    },
  ];

  if (typeof module === "object" && module.exports) {
    module.exports = courseMatchQuestions;
  } else {
    globalThis.courseMatchQuestions = courseMatchQuestions;
  }
})();
