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

const characterTab = document.getElementById("character-tab");
const hairOptions = document.querySelectorAll("#hair-options .option-svg");
const eyeOptions = document.querySelectorAll("#eye-options .option-svg");
const styleOptions = document.querySelectorAll("#style-options .option-svg");
const saveAppearanceBtn = document.getElementById("save-appearance");

// Helper to select options
function selectOption(group, valueKey, value) {
    group.forEach(option => option.classList.remove("selected"));
    const selected = Array.from(group).find(opt => opt.dataset[valueKey] === value);
    if (selected) selected.classList.add("selected");
}

// Event listeners
hairOptions.forEach(option => {
    option.addEventListener("click", () => {
        player.appearance.hairColor = option.dataset.hair;
        selectOption(hairOptions, "hair", option.dataset.hair);
    });
});

eyeOptions.forEach(option => {
    option.addEventListener("click", () => {
        player.appearance.eyeColor = option.dataset.eye;
        selectOption(eyeOptions, "eye", option.dataset.eye);
    });
});

styleOptions.forEach(option => {
    option.addEventListener("click", () => {
        player.appearance.style = option.dataset.style;
        selectOption(styleOptions, "style", option.dataset.style);
    });
});

// Save button
saveAppearanceBtn.addEventListener("click", () => {
    characterTab.classList.add("hidden");
    alert("Appearance saved!");
    console.log("Player Appearance:", player.appearance);
});

function updateCharacterPreview() {
    document.getElementById("hair-layer").src = `assets/svgs/${player.appearance.hairColor}.svg`;
    document.getElementById("eyes-layer").src = `assets/svgs/${player.appearance.eyeColor}.svg`;
    document.getElementById("face-layer").src = `assets/svgs/${player.appearance.face}.svg`;
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
