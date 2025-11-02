import { player, generateFamily } from "./player.js";
import { updateLifeStage } from "./lifeStages.js";
import { scenarios } from "./scenarios.js";
import { getAvailableMenu, performActivity } from "./menu.js";

generateFamily();

function advanceMonth() {
    player.month++;
    if (player.month > 12) {
        player.month = 1;
        player.age++;
        updateLifeStage(player);
        triggerRandomScenario();
    }
}

function triggerRandomScenario() {
    const stageScenarios = scenarios[player.lifeStage];
    const scenario = stageScenarios[Math.floor(Math.random() * stageScenarios.length)];
    applyScenario(scenario);
    console.log(`Age ${player.age}: ${scenario.desc}`);
}

function applyScenario(scenario) {
    if (scenario.effect.stats) {
        for (const stat in scenario.effect.stats) player.stats[stat] += scenario.effect.stats[stat];
    }
    if (scenario.effect.skills) {
        for (const skill in scenario.effect.skills) player.skills[skill] += scenario.effect.skills[skill];
    }
    if (scenario.effect.money) player.money = (player.money || 0) + scenario.effect.money;
}

// --- Example Usage ---
console.log(player);
console.log("Available Menu:", getAvailableMenu());
performActivity("Martial Arts");
advanceMonth();
