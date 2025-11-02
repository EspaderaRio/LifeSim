import { player, generateFamily } from "./player.js";
import { updateLifeStage } from "./lifeStages.js";
import { scenarios } from "./scenarios.js";
import { getAvailableMenu, performActivity } from "./menu.js";

const startModal = document.getElementById("start-modal");
const playerForm = document.getElementById("player-form");
const gameContainer = document.getElementById("game-container");

playerForm.addEventListener("submit", function(e){
    e.preventDefault();

    // Collect input values
    player.firstName = document.getElementById("firstName").value;
    player.middleName = document.getElementById("middleName").value;
    player.surname = document.getElementById("surname").value;
    player.gender = document.getElementById("gender").value;
    player.nationality = document.getElementById("nationality").value;

    // Generate family automatically
    generateFamily();

    // Hide modal and show game
    startModal.classList.add("hidden");
    gameContainer.classList.remove("hidden");

    // Initialize display
    updateGameUI();
});


function updateGameUI() {
    document.getElementById("age").textContent = player.age;
    document.getElementById("lifeStage").textContent = player.lifeStage;
    document.getElementById("happiness").textContent = player.stats.happiness;
    document.getElementById("intelligence").textContent = player.stats.intelligence;
    document.getElementById("health").textContent = player.stats.health;
    document.getElementById("appearance").textContent = player.stats.appearance;
    document.getElementById("popularity").textContent = player.stats.popularity;
}

const player = {
  appearance: {}
};

const characterImg = document.getElementById("character-image");
const hairOptions = document.querySelectorAll("#hair-options .option-svg");
const outfitSelection = document.getElementById("outfit-selection");
const outfitOptionsContainer = document.getElementById("outfit-options");
const saveBtn = document.getElementById("save-character");

// Define which outfits belong to each hair type
const outfitsByHair = {
  hair1: ["outfit1", "outfit2"],
  hair2: ["outfit1", "outfit2"],
  hair3: ["outfit1", "outfit2"]
};

// STEP 1: Choose Hair
hairOptions.forEach(option => {
  option.addEventListener("click", () => {
    const selectedHair = option.dataset.hair;
    player.appearance.hair = selectedHair;

    // Update preview
    characterImg.src = `assets/svgs/${selectedHair}/base.svg`;

    // Lock hair and go to outfit selection
    document.getElementById("hair-selection").classList.add("hidden");
    outfitSelection.classList.remove("hidden");

    // Populate outfits for chosen hairstyle
    outfitOptionsContainer.innerHTML = "";
    const outfits = outfitsByHair[selectedHair];
    outfits.forEach(outfit => {
      const img = document.createElement("img");
      img.src = `assets/svgs/${selectedHair}/${outfit}.svg`;
      img.dataset.outfit = outfit;
      img.classList.add("option-svg");
      outfitOptionsContainer.appendChild(img);

      img.addEventListener("click", () => {
        player.appearance.outfit = outfit;
        characterImg.src = `assets/svgs/${selectedHair}/${outfit}.svg`;
        saveBtn.classList.remove("hidden");
      });
    });
  });
});

// STEP 2: Save Character
saveBtn.addEventListener("click", () => {
  document.getElementById("character-tab").classList.add("hidden");
  alert(`Character saved! Hairstyle: ${player.appearance.hair}, Outfit: ${player.appearance.outfit}`);
  console.log("Final Character:", player.appearance);
});


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
