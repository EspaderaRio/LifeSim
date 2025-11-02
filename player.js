export let player = {
    firstName: "",
    middleName: "",
    surname: "",
    gender: "",
    nationality: "",
    appearance: {
        hairColor: "",
        eyeColor: "",
        style: ""
    },
    stats: {
        happiness: 50,
        intelligence: 50,
        health: 100,
        appearance: 50,
        popularity: 50
    },
    age: 0,
    month: 1,
    lifeStage: "baby",
    skills: {
        athletic: 0,
        acting: 0,
        music: 0,
        modeling: 0
    },
    family: {
        father: {},
        mother: {},
        siblings: []
    },
    profession: null,
    education: null,
    clubs: [],
    pets: []
};

export function generateFamily() {
    const firstNames = ["John", "Alice", "Emma", "Liam", "Sophia"];
    player.family.father = {
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        middleName: randomMiddleName(),
        surname: player.surname,
        occupation: "Engineer",
        wealth: Math.floor(Math.random() * 100000)
    };
    player.family.mother = {
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        middleName: player.middleName,
        surname: player.surname,
        occupation: "Teacher",
        wealth: Math.floor(Math.random() * 100000)
    };
    const siblingCount = Math.floor(Math.random() * 3); // 0-2 siblings
    player.family.siblings = Array.from({ length: siblingCount }, () => ({
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        middleName: player.middleName,
        surname: player.surname,
        age: Math.floor(Math.random() * 10) + 5
    }));
}

function randomMiddleName() {
    const middleNames = ["James", "Marie", "Lee", "Anne", "Paul"];
    return middleNames[Math.floor(Math.random() * middleNames.length)];
}
