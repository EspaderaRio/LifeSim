import { player } from "./player.js";

export const menuOptions = {
    kid: ["Martial Arts", "Music Lessons", "Acting Lessons", "Sports"],
    teen: ["Martial Arts", "Music Lessons", "Acting Lessons", "Sports", "Drama Club", "School Clubs"],
    college: ["Gym", "Diet Plan", "Salon", "Pets", "Clubs", "Skill Practice", "Doctor Visit"],
    adult: ["Gym", "Diet Plan", "Salon", "Pets", "Clubs", "Career", "Investments", "Doctor Visit"]
};

export function getAvailableMenu() {
    return menuOptions[player.lifeStage] || [];
}

export function performActivity(activity) {
    switch(activity) {
        case "Martial Arts": player.skills.athletic += 2; player.stats.health += 1; break;
        case "Music Lessons": player.skills.music += 2; player.stats.popularity += 1; break;
        case "Acting Lessons": player.skills.acting += 2; player.stats.popularity += 1; break;
        case "Gym": player.skills.athletic += 3; player.stats.health += 2; break;
        case "Salon": player.stats.appearance += 2; break;
        case "Diet Plan": player.stats.health += 2; break;
        case "School Clubs": player.stats.popularity += 2; break;
        case "Skill Practice": Object.keys(player.skills).forEach(skill => player.skills[skill] += 1); break;
        case "Pets": player.stats.happiness += 2; break;
        case "Doctor Visit": player.stats.health += 5; player.money -= 50; break;
    }
}
