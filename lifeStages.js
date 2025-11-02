export const lifeStages = [
    { name: "baby", minAge: 0, maxAge: 2 },
    { name: "toddler", minAge: 3, maxAge: 6 },
    { name: "kid", minAge: 7, maxAge: 12 },
    { name: "teen", minAge: 13, maxAge: 17 },
    { name: "college", minAge: 18, maxAge: 22 },
    { name: "adult", minAge: 23, maxAge: 60 },
    { name: "elderly", minAge: 61, maxAge: 120 }
];

export function updateLifeStage(player) {
    for (const stage of lifeStages) {
        if (player.age >= stage.minAge && player.age <= stage.maxAge) {
            player.lifeStage = stage.name;
            break;
        }
    }
}
