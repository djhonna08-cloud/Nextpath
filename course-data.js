(function defineCourseData(root) {
const taxonomy = typeof module === "object" && module.exports
  ? require("./course-taxonomy")
  : root.courseTaxonomy;

const courseGroups = [
  {
    category: "Computing & Information Technology",
    icon: "cpu",
    strand: "STEM or ICT",
    subjects: ["Programming", "Data and information systems", "Computing fundamentals", "Project work"],
    skills: ["Problem solving", "Digital literacy", "Logical thinking", "Teamwork"],
    careers: ["Software developer", "IT specialist", "Systems analyst", "Technology support professional"],
    interests: ["Enjoy solving practical problems", "Curious about technology", "Like learning by making and testing"],
    matchTags: ["technology", "computing"],
    courses: [
      { id: "it", name: "BS Information Technology", abbreviation: "BSIT", legacyNames: ["Information Technology"], focus: "websites, networks, databases, and secure digital services", subjects: ["Web development", "Networking", "Database management", "Cybersecurity basics"], careers: ["IT support specialist", "Systems administrator", "Web developer", "Technology consultant"] },
      { id: "cs", name: "BS Computer Science", abbreviation: "BSCS", legacyNames: ["Computer Science"], focus: "programming, algorithms, software, and intelligent systems", subjects: ["Programming", "Data structures", "Artificial intelligence", "Software engineering"], careers: ["Software engineer", "Data analyst", "Mobile app developer", "AI engineer"] },
      { id: "information-systems", name: "BS Information Systems", abbreviation: "BSIS", focus: "using technology and data to improve how organizations work" },
      { id: "computer-engineering", name: "BS Computer Engineering", abbreviation: "BSCpE", focus: "computer hardware, electronics, and the software that connects them", subjects: ["Digital logic", "Computer architecture", "Embedded systems", "Electronics"] },
      { id: "data-science", name: "BS Data Science", abbreviation: "BSDS", focus: "finding useful patterns in data and explaining what they mean", subjects: ["Statistics", "Data visualization", "Machine learning", "Database systems"], careers: ["Data analyst", "Data scientist", "Business intelligence analyst", "Research analyst"] },
      { id: "cybersecurity", name: "BS Cybersecurity", abbreviation: "BSCyberSec", focus: "protecting computers, networks, and information from digital threats", subjects: ["Network security", "Digital forensics", "Secure systems", "Risk management"], careers: ["Security analyst", "Digital forensics associate", "Security operations specialist", "IT auditor"] },
      { id: "software-engineering", name: "BS Software Engineering", abbreviation: "BSSE", focus: "planning, building, testing, and improving dependable software", subjects: ["Software design", "Programming", "Quality assurance", "Project management"], careers: ["Software engineer", "Quality assurance engineer", "Application developer", "DevOps associate"] },
      { id: "artificial-intelligence", name: "BS Artificial Intelligence", abbreviation: "BSAI", focus: "building computer systems that learn from data and assist people", subjects: ["Machine learning", "Statistics", "Programming", "Responsible AI"], careers: ["AI developer", "Machine learning associate", "Data analyst", "AI research assistant"] },
      { id: "game-development", name: "BS Game Development", abbreviation: "BSGD", focus: "designing and programming interactive games and simulations", subjects: ["Game programming", "Game design", "3D graphics", "Interactive storytelling"], careers: ["Game developer", "Gameplay programmer", "Level designer", "Technical artist"] },
      { id: "entertainment-multimedia-computing", name: "BS Entertainment and Multimedia Computing", abbreviation: "BSEMC", focus: "combining computing with animation, games, and interactive media", subjects: ["Multimedia programming", "Animation", "Game design", "Interactive media"], careers: ["Multimedia developer", "Game designer", "Animation technical artist", "Interactive media producer"] },
    ],
  },
  {
    category: "Business & Management",
    icon: "briefcase-business",
    strand: "ABM",
    subjects: ["Management", "Marketing", "Business communication", "Entrepreneurship"],
    skills: ["Planning", "Communication", "Leadership", "Decision-making"],
    careers: ["Management trainee", "Marketing associate", "Business analyst", "Small business owner"],
    interests: ["Enjoy organizing people or projects", "Interested in how organizations grow", "Like solving practical business problems"],
    matchTags: ["business", "leadership"],
    courses: [
      { id: "business", name: "BS Business Administration", abbreviation: "BSBA", legacyNames: ["Business Administration"], focus: "how teams, markets, and organizations create value", subjects: ["Marketing", "Finance", "Management", "Entrepreneurship"], careers: ["Business analyst", "Marketing coordinator", "Entrepreneur", "Operations manager"] },
      { id: "entrepreneurship", name: "BS Entrepreneurship", abbreviation: "BSEntrep", focus: "turning a useful idea into a responsible, sustainable business" },
      { id: "marketing-management", name: "BSBA Marketing Management", abbreviation: "BSBA-MM", focus: "understanding customers and communicating the value of products and services" },
      { id: "human-resource-management", name: "BSBA Human Resource Management", abbreviation: "BSBA-HRM", focus: "supporting people, hiring, training, and healthy workplaces" },
    ],
  },
  {
    category: "Accountancy & Finance",
    icon: "chart-no-axes-combined",
    strand: "ABM",
    subjects: ["Accounting", "Business law", "Economics", "Financial management"],
    skills: ["Numeracy", "Attention to detail", "Ethical judgment", "Clear reporting"],
    careers: ["Accountant", "Financial analyst", "Auditor", "Banking associate"],
    interests: ["Like working carefully with numbers", "Notice details and patterns", "Want to help people or organizations plan"],
    matchTags: ["business", "numbers"],
    courses: [
      { id: "accountancy", name: "BS Accountancy", abbreviation: "BSA", focus: "recording and checking financial information and helping organizations meet reporting rules", subjects: ["Financial accounting", "Auditing", "Taxation", "Business law"], careers: ["Accountant", "External auditor", "Tax associate", "Management accountant"] },
      { id: "management-accounting", name: "BS Management Accounting", abbreviation: "BSMA", focus: "using budgets and cost information to support business decisions" },
      { id: "banking-finance", name: "BSBA Financial Management", abbreviation: "BSBA-FM", focus: "saving, investing, lending, and planning money responsibly", subjects: ["Corporate finance", "Investment analysis", "Banking", "Financial markets"] },
    ],
  },
  {
    category: "Engineering",
    icon: "cog",
    strand: "STEM",
    subjects: ["Mathematics", "Physics", "Engineering design", "Laboratory work"],
    skills: ["Analytical thinking", "Precision", "Design", "Collaboration"],
    careers: ["Design engineer", "Project engineer", "Technical officer", "Engineering associate"],
    interests: ["Enjoy building or improving things", "Like math and science challenges", "Prefer testing ideas in practical projects"],
    matchTags: ["engineering", "technology", "science"],
    courses: [
      { id: "engineering", name: "Engineering", abbreviation: "BSE", legacyNames: ["BS Engineering"], focus: "applying math and science to design and test useful solutions", subjects: ["Calculus", "Physics", "Engineering design", "Materials science"] },
      { id: "civil-engineering", name: "BS Civil Engineering", abbreviation: "BSCE", focus: "planning and designing roads, buildings, bridges, and water systems" },
      { id: "mechanical-engineering", name: "BS Mechanical Engineering", abbreviation: "BSME", focus: "designing machines, energy systems, and moving parts" },
      { id: "electrical-engineering", name: "BS Electrical Engineering", abbreviation: "BSEE", focus: "working with electricity, power systems, and electronic equipment" },
      { id: "electronics-engineering", name: "BS Electronics Engineering", abbreviation: "BSECE", focus: "designing communication, control, and electronic systems" },
    ],
  },
  {
    category: "Architecture & Built Environment",
    icon: "drafting-compass",
    strand: "STEM or Arts and Design",
    subjects: ["Design studio", "Building materials", "Environmental planning", "Technical drawing"],
    skills: ["Spatial thinking", "Creative problem solving", "Drawing", "Presentation"],
    careers: ["Architectural designer", "Urban planning assistant", "Building design associate", "Landscape designer"],
    interests: ["Like imagining and drawing spaces", "Care about how communities are designed", "Enjoy creative work with practical limits"],
    matchTags: ["engineering", "design", "environment"],
    courses: [
      { id: "architecture", name: "BS Architecture", abbreviation: "BSArch", duration: "5 years", focus: "designing safe, useful, and welcoming buildings and spaces" },
      { id: "landscape-architecture", name: "BS Landscape Architecture", abbreviation: "BSLA", focus: "planning outdoor places that work well for people and nature" },
      { id: "environmental-planning", name: "BS Environmental Planning", abbreviation: "BSEP", focus: "helping communities plan land use, transport, and growth responsibly" },
    ],
  },
  {
    category: "Health Sciences",
    icon: "heart-pulse",
    strand: "STEM or Health Allied",
    subjects: ["Human biology", "Public health", "Nutrition", "Health research"],
    skills: ["Careful observation", "Empathy", "Research", "Responsibility"],
    careers: ["Public health officer", "Health educator", "Nutrition associate", "Community health worker"],
    interests: ["Want to support people's wellbeing", "Interested in biology and communities", "Like careful, service-oriented work"],
    matchTags: ["health", "science", "service"],
    courses: [
      { id: "health", name: "BS Health Sciences", abbreviation: "BSHS", legacyNames: ["Health Sciences"], focus: "understanding health, prevention, and the needs of communities", subjects: ["Anatomy", "Public health", "Nutrition", "Medical terminology"] },
      { id: "public-health", name: "BS Public Health", abbreviation: "BSPH", focus: "preventing illness and improving health in whole communities" },
      { id: "nutrition-dietetics", name: "BS Nutrition and Dietetics", abbreviation: "BSND", focus: "how food and nutrition support health at different stages of life" },
      { id: "nursing", name: "BS Nursing", abbreviation: "BSN", focus: "providing patient care and supporting people through illness and recovery", subjects: ["Nursing care", "Anatomy and physiology", "Community health", "Clinical practice"], careers: ["Registered nurse", "Community health nurse", "School nurse", "Clinical care associate"] },
    ],
  },
  {
    category: "Medical & Allied Health",
    icon: "stethoscope",
    strand: "STEM or Health Allied",
    subjects: ["Anatomy and physiology", "Patient care", "Health assessment", "Clinical practice"],
    skills: ["Empathy", "Observation", "Communication", "Careful practice"],
    careers: ["Pharmacist", "Physical therapist", "Medical technologist", "Radiologic technologist"],
    interests: ["Enjoy helping people directly", "Can focus on careful procedures", "Interested in how the body works"],
    matchTags: ["health", "medical", "service"],
    courses: [
      { id: "medical-technology", name: "BS Medical Technology", abbreviation: "BSMT", focus: "testing blood and other samples to help doctors understand health conditions", subjects: ["Clinical chemistry", "Hematology", "Microbiology", "Laboratory practice"], careers: ["Medical technologist", "Clinical laboratory scientist", "Research laboratory associate", "Laboratory quality officer"] },
      { id: "pharmacy", name: "BS Pharmacy", abbreviation: "BSPh", focus: "how medicines work and how to use them safely", subjects: ["Pharmacology", "Pharmaceutical chemistry", "Patient counseling", "Pharmacy practice"] },
      { id: "physical-therapy", name: "BS Physical Therapy", abbreviation: "BSPT", focus: "helping people improve movement and recover after injury or illness" },
      { id: "radiologic-technology", name: "BS Radiologic Technology", abbreviation: "BSRT", focus: "using imaging equipment to help health teams examine the body" },
      { id: "occupational-therapy", name: "BS Occupational Therapy", abbreviation: "BSOT", focus: "helping people take part in everyday activities after health challenges" },
    ],
  },
  {
    category: "Education",
    icon: "book-open-check",
    strand: "Any SHS strand, depending on specialization",
    subjects: ["Learning psychology", "Teaching methods", "Lesson planning", "Assessment"],
    skills: ["Patience", "Clear communication", "Adaptability", "Mentoring"],
    careers: ["Teacher", "Learning support assistant", "Training facilitator", "Learning materials developer"],
    interests: ["Enjoy explaining ideas", "Want to help others grow", "Like planning activities and working with people"],
    matchTags: ["education", "service", "communication"],
    courses: [
      { id: "education", name: "Bachelor of Elementary Education", abbreviation: "BEEd", legacyNames: ["Education"], focus: "teaching children and supporting their early learning" },
      { id: "secondary-education-english", name: "Bachelor of Secondary Education major in English", abbreviation: "BSEd-English", focus: "teaching English, reading, writing, and communication to secondary students" },
      { id: "secondary-education-math", name: "Bachelor of Secondary Education major in Mathematics", abbreviation: "BSEd-Math", focus: "helping secondary students understand math and solve problems" },
      { id: "early-childhood-education", name: "BS Early Childhood Education", abbreviation: "BSECEd", focus: "supporting young children's learning, play, and development" },
    ],
  },
  {
    category: "Arts & Fine Arts",
    icon: "brush",
    strand: "Arts and Design",
    subjects: ["Drawing", "Art history", "Studio practice", "Visual communication"],
    skills: ["Creative thinking", "Observation", "Craft", "Self-expression"],
    careers: ["Fine artist", "Illustrator", "Art teacher", "Gallery assistant"],
    interests: ["Enjoy making original work", "Notice color, shape, and detail", "Like sharing ideas through art"],
    matchTags: ["arts", "design", "creativity"],
    courses: [
      { id: "design", name: "Bachelor of Fine Arts", abbreviation: "BFA", legacyNames: ["Arts and Design"], focus: "developing your own artistic practice through studio work and critique" },
      { id: "theater-arts", name: "BA Theater Arts", abbreviation: "BA Theater", focus: "creating live performances through acting, directing, and production" },
      { id: "music", name: "Bachelor of Music", abbreviation: "BM", focus: "performing, composing, and understanding music in different settings" },
    ],
  },
  {
    category: "Design & Multimedia",
    icon: "pen-tool",
    strand: "Arts and Design or ICT",
    subjects: ["Graphic design", "Digital illustration", "Animation", "User experience"],
    skills: ["Visual communication", "Creative thinking", "Digital tools", "Storytelling"],
    careers: ["Graphic designer", "Animator", "UX designer", "Multimedia artist"],
    interests: ["Enjoy drawing or making digital art", "Like combining technology and creativity", "Care about how people experience a design"],
    matchTags: ["design", "creativity", "technology"],
    courses: [
      { id: "multimedia-arts", name: "BA Multimedia Arts", abbreviation: "BAMMA", focus: "combining images, sound, video, and interactive media" },
      { id: "animation", name: "BS Animation", abbreviation: "BSAni", focus: "bringing characters, objects, and stories to life through motion" },
      { id: "interior-design", name: "BS Interior Design", abbreviation: "BSID", focus: "planning indoor spaces that are practical, safe, and comfortable" },
      { id: "industrial-design", name: "BS Industrial Design", abbreviation: "BSIDes", focus: "designing useful products with attention to people, materials, and form" },
    ],
  },
  {
    category: "Communication & Media",
    icon: "megaphone",
    strand: "Arts and Design, HUMSS, or any strand",
    subjects: ["Writing", "Media studies", "Public relations", "Broadcasting"],
    skills: ["Writing", "Presentation", "Listening", "Creative strategy"],
    careers: ["Content writer", "Public relations officer", "Journalist", "Broadcast producer"],
    interests: ["Love stories and conversation", "Notice how messages affect people", "Enjoy writing or presenting"],
    matchTags: ["communication", "creativity", "service"],
    courses: [
      { id: "communication", name: "BA Communication", abbreviation: "BA Comm", legacyNames: ["Communication"], focus: "creating clear, ethical messages for different audiences and media" },
      { id: "journalism", name: "BA Journalism", abbreviation: "BA Journ", focus: "researching and reporting accurate stories for the public" },
      { id: "broadcasting", name: "BA Broadcasting", abbreviation: "BA Broadcast", focus: "producing audio and video programs for radio, television, and online channels" },
      { id: "development-communication", name: "BS Development Communication", abbreviation: "BSDC", focus: "using communication to share useful information and support community development" },
    ],
  },
  {
    category: "Natural & Physical Sciences",
    icon: "flask-conical",
    strand: "STEM",
    subjects: ["Scientific methods", "Laboratory work", "Statistics", "Research"],
    skills: ["Curiosity", "Evidence-based reasoning", "Observation", "Data analysis"],
    careers: ["Laboratory analyst", "Research assistant", "Science educator", "Quality assurance analyst"],
    interests: ["Ask how the natural world works", "Enjoy evidence and experiments", "Like careful research"],
    matchTags: ["science", "research"],
    courses: [
      { id: "biology", name: "BS Biology", abbreviation: "BS Bio", focus: "living things, ecosystems, and the processes that support life" },
      { id: "chemistry", name: "BS Chemistry", abbreviation: "BS Chem", focus: "the materials and reactions that shape products and the natural world" },
      { id: "mathematics", name: "BS Mathematics", abbreviation: "BS Math", focus: "patterns, logic, and mathematical tools used to solve problems" },
      { id: "physics", name: "BS Physics", abbreviation: "BS Physics", focus: "matter, energy, motion, and the rules that describe the universe" },
    ],
  },
  {
    category: "Agriculture & Environmental Sciences",
    icon: "sprout",
    strand: "STEM or Agri-Fishery Arts",
    subjects: ["Ecology", "Soil and water", "Sustainable agriculture", "Field research"],
    skills: ["Observation", "Environmental awareness", "Research", "Practical problem solving"],
    careers: ["Agricultural technologist", "Environmental officer", "Forestry associate", "Fisheries researcher"],
    interests: ["Care about food and the environment", "Enjoy outdoor or field-based learning", "Want to protect natural resources"],
    matchTags: ["science", "environment", "service"],
    courses: [
      { id: "agriculture", name: "BS Agriculture", abbreviation: "BS Agr", focus: "growing crops and raising food sustainably using science and technology" },
      { id: "environmental-science", name: "BS Environmental Science", abbreviation: "BSES", focus: "studying environmental challenges and practical ways to reduce harm" },
      { id: "forestry", name: "BS Forestry", abbreviation: "BSF", focus: "caring for forests, watersheds, and the communities that depend on them" },
      { id: "fisheries", name: "BS Fisheries", abbreviation: "BS Fish", focus: "aquatic life, responsible fishing, and sustainable coastal resources" },
    ],
  },
  {
    category: "Social Sciences & Humanities",
    icon: "users-round",
    strand: "HUMSS",
    subjects: ["Human behavior", "Society and culture", "Research methods", "Social issues"],
    skills: ["Listening", "Critical thinking", "Research", "Empathy"],
    careers: ["Community development worker", "Research assistant", "Human resources associate", "Social services officer"],
    interests: ["Want to understand people and communities", "Enjoy discussion and research", "Care about fairness and wellbeing"],
    matchTags: ["social-sciences", "service", "communication"],
    courses: [
      { id: "psychology", name: "BS Psychology", abbreviation: "BS Psych", legacyNames: ["Psychology"], focus: "how people think, feel, learn, and behave" },
      { id: "sociology", name: "BA Sociology", abbreviation: "BA Socio", focus: "how groups, institutions, and social change shape everyday life" },
      { id: "political-science", name: "BA Political Science", abbreviation: "BA PolSci", focus: "government, public ideas, laws, and how decisions affect communities" },
      { id: "social-work", name: "BS Social Work", abbreviation: "BSW", focus: "helping individuals and communities access support and solve challenges" },
    ],
  },
  {
    category: "Public Administration & Public Service",
    icon: "landmark",
    strand: "HUMSS",
    subjects: ["Public administration", "Governance", "Community development", "Public policy"],
    skills: ["Service", "Communication", "Organization", "Ethical judgment"],
    careers: ["Local government staff", "Public program officer", "Community organizer", "Public safety professional"],
    interests: ["Want to contribute to your community", "Enjoy organizing public projects", "Care about fairness and public service"],
    matchTags: ["public-service", "social-sciences", "leadership"],
    courses: [
      { id: "public-administration", name: "BS Public Administration", abbreviation: "BSPA", focus: "how public programs and local government services are planned and delivered" },
      { id: "criminology", name: "BS Criminology", abbreviation: "BSCrim", focus: "crime prevention, public safety, and the justice system" },
      { id: "international-studies", name: "BA International Studies", abbreviation: "BAIS", focus: "relationships among countries, global issues, and international cooperation" },
      { id: "community-development", name: "BS Community Development", abbreviation: "BSCD", focus: "working with communities to plan inclusive, lasting improvements" },
    ],
  },
];

const courses = [];
for (const group of courseGroups) {
  const detailedCategory = taxonomy.detailedCategories.find((category) => category.name === group.category);
  if (!detailedCategory) throw new Error(`Unknown course category: ${group.category}`);
  const relatedCourseIds = group.courses.map((course) => course.id);
  for (const entry of group.courses) {
    const subjects = entry.subjects || group.subjects;
    const careers = entry.careers || group.careers;
    courses.push({
      id: entry.id,
      legacyNames: entry.legacyNames || [],
      name: entry.name,
      abbreviation: entry.abbreviation,
      category: group.category,
      categoryId: detailedCategory.id,
      mainCategoryId: detailedCategory.mainCategoryId,
      icon: group.icon,
      description: `${entry.name} introduces students to ${entry.focus}. You will build useful knowledge through classes, projects, and practical activities.`,
      duration: entry.duration || "4 years (varies by school and program)",
      learn: subjects.map((subject) => `Explore ${subject.toLowerCase()} through classes, projects, and practical activities`),
      subjects,
      skills: group.skills,
      recommendedStrand: group.strand,
      careers,
      interests: group.interests,
      relatedCourseIds: relatedCourseIds.filter((id) => id !== entry.id),
      matchTags: [...new Set([...group.matchTags, detailedCategory.id])],
    });
  }
}

if (new Set(courses.map((course) => course.id)).size !== courses.length) {
  throw new Error("Course catalog contains duplicate course IDs.");
}

if (typeof module === "object" && module.exports) {
  module.exports = courses;
} else {
  root.courseCatalog = courses;
}
})(globalThis);
