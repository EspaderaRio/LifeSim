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

const hairOptions = document.querySelectorAll("#hair-options .option-svg");
const outfitSelection = document.getElementById("outfit-selection");
const outfitOptionsContainer = document.getElementById("outfit-options");
const saveBtn = document.getElementById("save-character");
const hairLayer = document.getElementById("hair-layer");
const outfitLayer = document.getElementById("outfit-layer");

// Example outfits mapped to hair
const outfitsByHair = {
    hair1: ["outfit1", "outfit2"],
    hair2: ["outfit3", "outfit4"],
    hair3: ["outfit5", "outfit6"]
};

// Step 1: Choose Hair
hairOptions.forEach(option => {
    option.addEventListener("click", () => {
        player.appearance.hairColor = option.dataset.hair;
        hairLayer.src = `assets/svgs/${player.appearance.hairColor}.svg`;

        // Lock hair and move to outfit selection
        document.getElementById("hair-selection").classList.add("hidden");
        outfitSelection.classList.remove("hidden");

        // Populate outfit options based on chosen hair
        outfitOptionsContainer.innerHTML = ""; // clear previous
        const outfits = outfitsByHair[player.appearance.hairColor];
        outfits.forEach(outfit => {
            const img = document.createElement("img");
            img.src = `assets/svgs/${outfit}.svg`;
            img.dataset.outfit = outfit;
            img.classList.add("option-svg");
            outfitOptionsContainer.appendChild(img);

            img.addEventListener("click", () => {
                player.appearance.style = outfit;
                outfitLayer.src = `assets/svgs/${outfit}.svg`;

                // Show save button
                saveBtn.classList.remove("hidden");
            });
        });
    });
});

// Step 2: Save Character
saveBtn.addEventListener("click", () => {
    document.getElementById("character-tab").classList.add("hidden");
    alert("Character saved!");
    console.log("Final Character:", player.appearance);
});

function updateCharacterPreview() {
    document.getElementById("hair-layer").src = `assets/svgs/${player.appearance.hairColor}.svg`;
    document.getElementById("outfit-layer").src = `assets/svgs/${player.appearance.style}.svg`;
}

// Call update whenever the player selects a new hair/eye/style
hairOptions.forEach(option => {
    option.addEventListener("click", () => {
        player.appearance.hairColor = option.dataset.hair;
        updateCharacterPreview();
    });
});
eyeOptions.forEach(option => {
    option.addEventListener("click", () => {
        player.appearance.eyeColor = option.dataset.eye;
        updateCharacterPreview();
    });
});

faceOptions.forEach(option => {
    option.addEventListener("click", () => {
        player.appearance.face = option.dataset.face;
        updateCharacterPreview();
    });
});

styleOptions.forEach(option => {
    option.addEventListener("click", () => {
        player.appearance.style = option.dataset.style;
        updateCharacterPreview();
    });
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
