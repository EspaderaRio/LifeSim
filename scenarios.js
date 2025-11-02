export const scenarios = {
    baby: [
        { desc: "Took first steps!", effect: { stats: { happiness: 5, health: 2 } } },
        { desc: "Caught a cold.", effect: { stats: { health: -5 } } }
    ],
    toddler: [
        { desc: "Played with toys!", effect: { stats: { happiness: 3, intelligence: 1 } } },
        { desc: "Fell while running.", effect: { stats: { health: -3 } } }
    ],
    kid: [
        { desc: "Joined soccer club!", effect: { skills: { athletic: 3 }, stats: { popularity: 2 } } },
        { desc: "Studied hard!", effect: { stats: { intelligence: 5, happiness: -1 } } },
        { desc: "Interacted with classmates.", effect: { stats: { popularity: 2, happiness: 2 } } },
        { desc: "Joined music club!", effect: { skills: { music: 3 }, stats: { popularity: 2 } } }
    ],
    teen: [
        { desc: "Won debate!", effect: { stats: { intelligence: 3, popularity: 2 } } },
        { desc: "Skipped class.", effect: { stats: { intelligence: -2, popularity: 1 } } },
        { desc: "Practiced martial arts!", effect: { skills: { athletic: 4 }, stats: { health: 2 } } },
        { desc: "Joined drama club!", effect: { skills: { acting: 3 }, stats: { popularity: 2 } } }
    ],
    college: [
        { desc: "Attended acting class!", effect: { skills: { acting: 4 }, stats: { popularity: 2 } } },
        { desc: "Part-time job.", effect: { stats: { happiness: -2 }, money: 100 } },
        { desc: "Joined gym.", effect: { skills: { athletic: 3 }, stats: { health: 3 } } }
    ],
    adult: [
        { desc: "Promoted at work!", effect: { stats: { happiness: 5 }, money: 500 } },
        { desc: "Injured exercising.", effect: { stats: { health: -10 } } }
    ],
    elderly: [
        { desc: "Spent time with grandchildren!", effect: { stats: { happiness: 5, popularity: 2 } } },
        { desc: "Health declined.", effect: { stats: { health: -5 } } }
    ]
};
