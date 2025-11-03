// ============================================================
// PLAYER DATA MODULE
// ============================================================

// ===================== PLAYER DATA ===================== //
export let player = {
  // --- Basic Info ---
  firstName: "",
  middleName: "",
  surname: "",
  gender: "",
  nationality: "",
  appearance: {},

  // --- Core Stats ---
  stats: {
    happiness: 50,
    intelligence: 50,
    health: 100,
    appearance: 50,
    popularity: 50,
  },

  // --- Progression ---
  age: 0,
  month: 1,
  lifeStage: "baby",

  // --- Skills ---
  skills: {
    athletic: 0,
    acting: 0,
    music: 0,
    modeling: 0,
    academic: 0,
    social: 0,
  },

  // --- Education ---
  education: null, // e.g. "Elementary", "High School", "College"
  school: {
    name: null,
    gradeLevel: null,
    attendance: 100,
    performance: 50,
    clubs: [],
  },
  college: null, // assigned later if attending

  // --- Profession & Career ---
  profession: null, // e.g. "Engineer", "Athlete", "Musician"
  occupation: null, // e.g. "Software Developer", "Footballer"

  // --- Financials ---
  money: 0,
  wealth: 0, // inheritance or net worth
  socialStatus: "Middle", // "Poor", "Middle", "Rich", "Royal"

  // --- Family ---
  family: { father: {}, mother: {}, siblings: [] },
  familyBackground: {},

  // --- Lifestyle & Relationships ---
  pets: [],
  residence: "Family Home",
  relationships: [],
  maritalStatus: "Single",
};

// ============================================================
// FAMILY GENERATION LOGIC
// ============================================================ //
export function generateFamily() {
  const firstNames = [
    "John",
    "Alice",
    "Emma",
    "Liam",
    "Sophia",
    "Noah",
    "Olivia",
  ];
  const occupations = [
    "Engineer",
    "Teacher",
    "Doctor",
    "Artist",
    "Entrepreneur",
    "Lawyer",
    "Scientist",
  ];
  const socialClasses = ["Poor", "Middle", "Rich", "Royal"];

  // --- Determine Family Social Status ---
  const socialStatus = randomItem(socialClasses);
  player.socialStatus = socialStatus;

  // --- Parents ---
  player.family.father = {
    firstName: randomItem(firstNames),
    middleName: randomMiddleName(),
    surname: player.surname,
    occupation: randomItem(occupations),
    wealth: randomWealthByStatus(socialStatus),
  };

  player.family.mother = {
    firstName: randomItem(firstNames),
    middleName: player.middleName,
    surname: player.surname,
    occupation: randomItem(occupations),
    wealth: randomWealthByStatus(socialStatus),
  };

  // --- Calculate Combined Wealth ---
  const avgWealth = Math.floor(
    (player.family.father.wealth + player.family.mother.wealth) / 2
  );
  player.wealth = avgWealth;
  player.money = Math.floor(avgWealth * 0.05); // small allowance

  // --- Siblings ---
  const siblingCount = Math.floor(Math.random() * 3); // 0–2 siblings
  player.family.siblings = Array.from({ length: siblingCount }, () => ({
    firstName: randomItem(firstNames),
    middleName: player.middleName,
    surname: player.surname,
    age: Math.floor(Math.random() * 10) + 5,
  }));

  // --- Background Summary ---
  player.familyBackground = {
    fatherJob: player.family.father.occupation,
    motherJob: player.family.mother.occupation,
    socialStatus,
  };
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================ //
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomMiddleName() {
  const middleNames = [
    "James",
    "Marie",
    "Lee",
    "Anne",
    "Paul",
    "Grace",
    "John",
  ];
  return randomItem(middleNames);
}

function randomWealthByStatus(status) {
  switch (status) {
    case "Poor":
      return Math.floor(Math.random() * 5000) + 1000;
    case "Middle":
      return Math.floor(Math.random() * 40000) + 10000;
    case "Rich":
      return Math.floor(Math.random() * 500000) + 100000;
    case "Royal":
      return Math.floor(Math.random() * 10000000) + 1000000;
    default:
      return 0;
  }
}

// ============================================================
// RESET / RESTART FUNCTION
// ============================================================ //
export function resetPlayer() {
  player.age = 0;
  player.month = 1;
  player.lifeStage = "baby";
  player.stats = {
    happiness: 50,
    intelligence: 50,
    health: 100,
    appearance: 50,
    popularity: 50,
  };
  player.skills = {
    athletic: 0,
    acting: 0,
    music: 0,
    modeling: 0,
    academic: 0,
    social: 0,
  };
  player.money = 0;
  player.school = {
    name: null,
    gradeLevel: null,
    attendance: 100,
    performance: 50,
    clubs: [],
  };
  player.education = null;
  player.profession = null;
  player.occupation = null;
  player.family = { father: {}, mother: {}, siblings: [] };
  player.relationships = [];
  player.pets = [];
  player.residence = "Family Home";
  player.maritalStatus = "Single";
}
