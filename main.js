// ===================== IMPORTS ===================== //
import { player, generateFamily } from "./player.js";
import { updateLifeStage } from "./lifeStages.js";
import { scenarios } from "./scenarios.js";
import { getAvailableMenu, performActivity } from "./menu.js";
import { initCharacterSelection } from "./characterSelection.js";

// ===================== MAIN INITIALIZATION ===================== //
window.addEventListener("DOMContentLoaded", () => {
  // --- Elements ---
  const startModal = document.getElementById("start-modal");
  const playerForm = document.getElementById("player-form");
  const gameContainer = document.getElementById("game-container");

  const openCharacterBtn = document.getElementById("open-character-btn");
  const addYearBtn = document.getElementById("add-year-btn");
  const characterTab = document.getElementById("character-tab");

  // ===================== FORM SUBMISSION ===================== //
  if (playerForm) {
    playerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Collect player data
      player.firstName = document.getElementById("firstName").value.trim();
      player.middleName = document.getElementById("middleName").value.trim();
      player.surname = document.getElementById("surname").value.trim();
      player.gender = document.getElementById("gender").value;
      player.nationality = document.getElementById("nationality").value.trim();

      // Generate family background
      generateFamily();

      // Hide modal and show game
      startModal.classList.add("hidden");
      gameContainer.classList.remove("hidden");

      // Initialize first UI update
      updateGameUI();

      // Initialize character selection
      initCharacterSelection();
    });
  }

  // ===================== OPEN CHARACTER TAB ===================== //
  if (openCharacterBtn && characterTab) {
    openCharacterBtn.addEventListener("click", () => {
      characterTab.classList.toggle("hidden");
      openCharacterBtn.textContent = characterTab.classList.contains("hidden")
        ? "Open Character Tab"
        : "Close Character Tab";
    });
  }

  // ===================== ADD YEAR BUTTON ===================== //
  if (addYearBtn) {
    addYearBtn.addEventListener("click", () => {
      player.age++;
      updateLifeStage(player);
      triggerRandomScenario();
      updateGameUI();
    });
  }
});

// ===================== UI UPDATES ===================== //
function updateGameUI() {
  document.getElementById("age").textContent = player.age;
  document.getElementById("lifeStage").textContent = player.lifeStage;

  // Update all player stats
  for (const stat in player.stats) {
    const el = document.getElementById(stat);
    if (el) el.textContent = player.stats[stat];
  }

  // Optional: display money
  const moneyEl = document.getElementById("money");
  if (moneyEl) moneyEl.textContent = `$${player.money.toLocaleString()}`;
}

// ===================== TIME PROGRESSION ===================== //
export function advanceMonth() {
  player.month++;
  if (player.month > 12) {
    player.month = 1;
    player.age++;
    updateLifeStage(player);
    triggerRandomScenario();
  }
  updateGameUI();
}

// ===================== SCENARIOS ===================== //
function triggerRandomScenario() {
  const stageScenarios = scenarios[player.lifeStage];
  if (!stageScenarios || stageScenarios.length === 0) return;

  const scenario =
    stageScenarios[Math.floor(Math.random() * stageScenarios.length)];

  applyScenario(scenario);
  console.log(`Age ${player.age}: ${scenario.desc}`);
}

function applyScenario(scenario) {
  if (scenario.effect.stats) {
    for (const stat in scenario.effect.stats) {
      player.stats[stat] += scenario.effect.stats[stat];
    }
  }

  if (scenario.effect.skills) {
    for (const skill in scenario.effect.skills) {
      player.skills[skill] += scenario.effect.skills[skill];
    }
  }

  if (scenario.effect.money) {
    player.money += scenario.effect.money;
  }
}

// ===================== DEBUG ===================== //
console.log("Available Menu:", getAvailableMenu());
performActivity("Martial Arts");
