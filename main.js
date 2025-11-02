import { player, generateFamily } from "./player.js";
import { updateLifeStage } from "./lifeStages.js";
import { scenarios } from "./scenarios.js";
import { getAvailableMenu, performActivity } from "./menu.js";
import { initCharacterSelection } from "./characterSelection.js";

// Initialize Character Selector
initCharacterSelection();

const startModal = document.getElementById("start-modal");
const playerForm = document.getElementById("player-form");
const gameContainer = document.getElementById("game-container");

playerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  player.firstName = document.getElementById("firstName").value;
  player.middleName = document.getElementById("middleName").value;
  player.surname = document.getElementById("surname").value;
  player.gender = document.getElementById("gender").value;
  player.nationality = document.getElementById("nationality").value;

  generateFamily();
  startModal.classList.add("hidden");
  gameContainer.classList.remove("hidden");

  updateGameUI();
});

function updateGameUI() {
  document.getElementById("age").textContent = player.age;
  document.getElementById("lifeStage").textContent = player.lifeStage;
  for (const stat in player.stats) {
    document.getElementById(stat).textContent = player.stats[stat];
  }
}

export function advanceMonth() {
  player.month++;
  if (player.month > 12) {
    player.month = 1;
    player.age++;
    updateLifeStage(player);
    triggerRandomScenario();
    updateGameUI();
  }
}

function triggerRandomScenario() {
  const stageScenarios = scenarios[player.lifeStage];
  if (!stageScenarios) return;

  const scenario = stageScenarios[Math.floor(Math.random() * stageScenarios.length)];
  applyScenario(scenario);
  console.log(`Age ${player.age}: ${scenario.desc}`);
}

function applyScenario(scenario) {
  if (scenario.effect.stats) {
    for (const stat in scenario.effect.stats)
      player.stats[stat] += scenario.effect.stats[stat];
  }
  if (scenario.effect.skills) {
    for (const skill in scenario.effect.skills)
      player.skills[skill] += scenario.effect.skills[skill];
  }
  if (scenario.effect.money)
    player.money += scenario.effect.money;
}
