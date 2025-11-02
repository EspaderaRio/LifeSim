export const lifeStages = [
    { name: "baby", min: 0, max: 2 },
    { name: "toddler", min: 3, max: 6 },
    { name: "kid", min: 7, max: 12 },
    { name: "teen", min: 13, max: 17 },
    { name: "college", min: 18, max: 22 },
    { name: "adult", min: 23, max: 60 },
    { name: "elderly", min: 61, max: 120 }
];

export function updateLifeStage(player) {
    for (const stage of lifeStages) {
        if (player.age >= stage.min && player.age <= stage.max) {
            player.lifeStage = stage.name;
            break;
        }
    }
}
