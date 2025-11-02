export const scenarios = {
    baby: [
        { desc: "Took first steps!", effect: { happiness: 5, health: 2 } },
        { desc: "Caught a cold.", effect: { health: -5 } }
    ],
    toddler: [
        { desc: "Played with toys!", effect: { happiness: 3, intelligence: 1 } },
        { desc: "Fell while running.", effect: { health: -3 } }
    ],
    kid: [
        { desc: "Joined soccer club!", effect: { skills: { athletic: 3 }, stats: { popularity: 2 } } },
        { desc: "Studied hard!", effect: { stats: { intelligence: 5, happiness: -1 } } }
    ],
    teen: [
        { desc: "Won debate!", effect: { stats: { intelligence: 3, popularity: 2 } } },
        { desc: "Skipped class.", effect: { stats: { intelligence: -2, popularity: 1 } } }
    ],
    college: [
        { desc: "Attended acting class!", effect: { skills: { acting: 4 }, stats: { popularity: 2 } } },
        { desc: "Part-time job.", effect: { stats: { happiness: -2 }, money: 100 } }
    ],
    adult: [
        { desc: "Promoted at work!", effect: { stats: { happiness: 5 }, money: 500 } },
        { desc: "Injured exercising.", effect: { stats: { health: -10 } } }
    ],
    elderly: [
        { desc: "Time with grandchildren!", effect: { stats: { happiness: 5, popularity: 2 } } },
        { desc: "Health declined.", effect: { stats: { health: -5 } } }
    ]
};
