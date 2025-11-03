// ===================== IMPORTS ===================== //
import { player, generateFamily } from "./player.js";
import { updateLifeStage } from "./lifeStages.js";
import { scenarios } from "./scenarios.js";
import { getAvailableMenu, performActivity } from "./menu.js";
import { initCharacterSelection } from "./characterSelection.js";

// ===================== GAME INITIALIZATION ===================== //
window.addEventListener("DOMContentLoaded", () => {
  // --- Elements ---
  const startModal = document.getElementById("start-modal");
  const startBtn = document.getElementById("start-game-btn");
  const nameInput = document.getElementById("player-name");
  const playerForm = document.getElementById("player-form");
  const gameContainer = document.getElementById("game-container");

  // --- Step 1: Start Button ---
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      const name = nameInput?.value.trim();
      if (!name) {
        alert("Please enter your name!");
        return;
      }

      // Save name and hide modal
      player.firstName = name;
      startModal.classList.add("hidden");

      // Launch character selection screen
      initCharacterSelection();
    });
  }

  // --- Step 2: Player Form Submission ---
  if (playerForm) {
    playerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Collect data
      player.firstName = document.getElementById("firstName").value;
      player.middleName = document.getElementById("middleName").value;
      player.surname = document.getElementById("surname").value;
      player.gender = document.getElementById("gender").value;
      player.nationality = document.getElementById("nationality").value;

      // Generate family data
      generateFamily();

      // Hide start modal and show main game container
      startModal.classList.add("hidden");
      gameContainer.classList.remove("hidden");

      // Initialize UI
      updateGameUI();
    });
  }
});

// ===================== UI UPDATES ===================== //
function updateGameUI() {
  document.getElementById("age").textContent = player.age;
  document.getElementById("lifeStage").textContent = player.lifeStage;

  // Update all stats
  for (const stat in player.stats) {
    const statEl = document.getElementById(stat);
    if (statEl) statEl.textContent = player.stats[stat];
  }

  // Update money display if you have an element for it
  const moneyEl = document.getElementById("money");
  if (moneyEl) moneyEl.textContent = `$${player.money.toLocaleString()}`;
}

// ===================== TIME PROGRESSION ===================== //
export function advanceMonth() {
  player.month++;

  if (player.month > 12) {
    player.month = 1;
    player.age++;

    // Update life stage (e.g., baby → child → teen, etc.)
    updateLifeStage(player);

    // Trigger random life scenario
    triggerRandomScenario();
  }

  // Refresh the display
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
  // Apply stat changes
  if (scenario.effect.stats) {
    for (const stat in scenario.effect.stats) {
      player.stats[stat] += scenario.effect.stats[stat];
    }
  }

  // Apply skill changes
  if (scenario.effect.skills) {
    for (const skill in scenario.effect.skills) {
      player.skills[skill] += scenario.effect.skills[skill];
    }
  }

  // Apply money changes
  if (scenario.effect.money) {
    player.money += scenario.effect.money;
  }
}

// ===================== DEBUG (Optional) ===================== //
console.log("Available Menu:", getAvailableMenu());
performActivity("Martial Arts");
