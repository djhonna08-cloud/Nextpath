(function defineCourseTaxonomy() {
  const mainCategories = [
    {
      id: "technology-computing",
      name: "Technology & Computing",
      description: "Create software, digital tools, data systems, and connected devices.",
      icon: "cpu",
    },
    {
      id: "business-management",
      name: "Business & Management",
      description: "Build organizations, manage people, and make smart financial decisions.",
      icon: "briefcase-business",
    },
    {
      id: "engineering-architecture",
      name: "Engineering & Architecture",
      description: "Design, build, and improve the structures and systems around us.",
      icon: "drafting-compass",
    },
    {
      id: "health-medical",
      name: "Health & Medical Sciences",
      description: "Support health, recovery, wellness, and better care for communities.",
      icon: "heart-pulse",
    },
    {
      id: "education",
      name: "Education",
      description: "Help learners of different ages grow, discover, and reach their goals.",
      icon: "book-open-check",
    },
    {
      id: "arts-design-communication",
      name: "Arts, Design & Communication",
      description: "Make visual work, media, and messages that connect with people.",
      icon: "palette",
    },
    {
      id: "science-environment",
      name: "Science & Environment",
      description: "Explore how nature works and help care for land, water, and resources.",
      icon: "leaf",
    },
    {
      id: "social-public-service",
      name: "Social Sciences & Public Service",
      description: "Understand people and communities, and help make society stronger.",
      icon: "landmark",
    },
  ];

  const detailedCategories = [
    { id: "computing-information-technology", name: "Computing & Information Technology", mainCategoryId: "technology-computing" },
    { id: "business-management", name: "Business & Management", mainCategoryId: "business-management" },
    { id: "accountancy-finance", name: "Accountancy & Finance", mainCategoryId: "business-management" },
    { id: "engineering", name: "Engineering", mainCategoryId: "engineering-architecture" },
    { id: "architecture-built-environment", name: "Architecture & Built Environment", mainCategoryId: "engineering-architecture" },
    { id: "health-sciences", name: "Health Sciences", mainCategoryId: "health-medical" },
    { id: "medical-allied-health", name: "Medical & Allied Health", mainCategoryId: "health-medical" },
    { id: "education", name: "Education", mainCategoryId: "education" },
    { id: "arts-fine-arts", name: "Arts & Fine Arts", mainCategoryId: "arts-design-communication" },
    { id: "design-multimedia", name: "Design & Multimedia", mainCategoryId: "arts-design-communication" },
    { id: "communication-media", name: "Communication & Media", mainCategoryId: "arts-design-communication" },
    { id: "natural-physical-sciences", name: "Natural & Physical Sciences", mainCategoryId: "science-environment" },
    { id: "agriculture-environment", name: "Agriculture & Environmental Sciences", mainCategoryId: "science-environment" },
    { id: "social-sciences-humanities", name: "Social Sciences & Humanities", mainCategoryId: "social-public-service" },
    { id: "public-administration-service", name: "Public Administration & Public Service", mainCategoryId: "social-public-service" },
  ];

  const detailByName = new Map(detailedCategories.map((category) => [category.name, category]));
  const detailById = new Map(detailedCategories.map((category) => [category.id, category]));
  const mainById = new Map(mainCategories.map((category) => [category.id, category]));
  const taxonomy = {
    mainCategories,
    detailedCategories,
    getMainCategory(detailedCategoryName) {
      const detailed = detailByName.get(detailedCategoryName);
      return detailed ? mainById.get(detailed.mainCategoryId) : null;
    },
    getMainCategoryId(detailedCategoryName) {
      return detailByName.get(detailedCategoryName)?.mainCategoryId
        || detailById.get(detailedCategoryName)?.mainCategoryId
        || null;
    },
    getDetailedCategoryId(detailedCategoryName) {
      return detailByName.get(detailedCategoryName)?.id
        || detailById.get(detailedCategoryName)?.id
        || null;
    },
  };

  if (typeof module === "object" && module.exports) {
    module.exports = taxonomy;
  } else {
    globalThis.courseTaxonomy = taxonomy;
  }
})();
