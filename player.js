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
        popularity: 50
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
        social: 0
    },

    // --- Education & Career ---
    education: null,       // e.g. "High School Graduate"
    profession: null,      // e.g. "Musician", "Engineer", "Athlete"
    occupation: null,      // e.g. "Lead Guitarist", "Software Developer"
    clubs: [],
    school: null,
    college: null,

    // --- Financials ---
    money: 0,
    wealth: 0,             // overall net worth or inheritance
    socialStatus: "Middle", // "Poor", "Middle", "Rich", or "Royal"

    // --- Family ---
    family: { father: {}, mother: {}, siblings: [] },

    // --- Player choices & lifestyle ---
    pets: [],
    residence: "Family Home",
    relationships: [],
    maritalStatus: "Single"
};

// ===================== FAMILY GENERATION ===================== //
export function generateFamily() {
    const firstNames = ["John", "Alice", "Emma", "Liam", "Sophia", "Noah", "Olivia"];
    const occupations = ["Engineer", "Teacher", "Doctor", "Artist", "Entrepreneur", "Lawyer", "Scientist"];
    const socialClasses = ["Poor", "Middle", "Rich", "Royal"];

    // Randomize the family's social status
    const socialStatus = randomItem(socialClasses);
    player.socialStatus = socialStatus;

    // --- Parents ---
    player.family.father = {
        firstName: randomItem(firstNames),
        middleName: randomMiddleName(),
        surname: player.surname,
        occupation: randomItem(occupations),
        wealth: randomWealthByStatus(socialStatus)
    };

    player.family.mother = {
        firstName: randomItem(firstNames),
        middleName: player.middleName,
        surname: player.surname,
        occupation: randomItem(occupations),
        wealth: randomWealthByStatus(socialStatus)
    };

    // --- Calculate Combined Family Wealth ---
    const avgWealth = Math.floor((player.family.father.wealth + player.family.mother.wealth) / 2);
    player.wealth = avgWealth;
    player.money = Math.floor(avgWealth * 0.05); // small allowance at birth (based on family wealth)

    // --- Siblings ---
    const siblingCount = Math.floor(Math.random() * 3); // 0–2 siblings
    player.family.siblings = Array.from({ length: siblingCount }, () => ({
        firstName: randomItem(firstNames),
        middleName: player.middleName,
        surname: player.surname,
        age: Math.floor(Math.random() * 10) + 5
    }));

    // --- Inherit family occupation background (for flavor or events) ---
    player.familyBackground = {
        fatherJob: player.family.father.occupation,
        motherJob: player.family.mother.occupation,
        socialStatus
    };
}

// ===================== HELPERS ===================== //
function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomMiddleName() {
    const middleNames = ["James", "Marie", "Lee", "Anne", "Paul", "Grace", "John"];
    return randomItem(middleNames);
}

function randomWealthByStatus(status) {
    switch (status) {
        case "Poor": return Math.floor(Math.random() * 5000) + 1000;
        case "Middle": return Math.floor(Math.random() * 40000) + 10000;
        case "Rich": return Math.floor(Math.random() * 500000) + 100000;
        case "Royal": return Math.floor(Math.random() * 10000000) + 1000000;
        default: return 0;
    }
}
