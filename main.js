// ===================== IMPORTS ===================== //
import { player, generateFamily, resetPlayer } from "./player.js"; 
import { updateLifeStage } from "./lifeStages.js";
import { scenarios } from "./scenarios.js";
import { getAvailableMenu, performActivity } from "./menu.js";
import { initCharacterSelection } from "./characterSelection.js";

// ===================== MAIN INITIALIZATION ===================== //
window.addEventListener("DOMContentLoaded", () => {
  const startModal = document.getElementById("start-modal");
  const playerForm = document.getElementById("player-form");
  const gameContainer = document.getElementById("game-container");

  const openCharacterBtn = document.getElementById("open-character-btn");
  const openSchoolBtn = document.getElementById("open-school-btn");
  const addYearBtn = document.getElementById("add-year-btn");

  const tabs = {
    character: document.getElementById("character-tab"),
    school: document.getElementById("school-tab")
  };

  // ===================== FORM SUBMISSION ===================== //
  if (playerForm) {
    playerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // --- Collect player data ---
      player.firstName = document.getElementById("firstName").value.trim();
      player.middleName = document.getElementById("middleName").value.trim();
      player.surname = document.getElementById("surname").value.trim();
      player.gender = document.getElementById("gender").value;
      player.nationality = document.getElementById("nationality").value.trim();

      // --- Generate Family ---
      generateFamily();

      // --- Hide Modal & Show Game ---
      startModal.classList.add("hidden");
      gameContainer.classList.remove("hidden");

      // --- Initialize UI ---
      updateGameUI();
      updateSchoolUI();
      initCharacterSelection();
    });
  }

  // ===================== FLOATING TAB MODALS ===================== //
  function openTab(tab) {
    document.body.classList.add("modal-open");
    tab.classList.remove("hidden");
    setTimeout(() => tab.classList.add("active"), 10);
  }

  function closeTab(tab) {
    tab.classList.remove("active");
    document.body.classList.remove("modal-open");
    setTimeout(() => tab.classList.add("hidden"), 200);
  }

  // --- Open buttons ---
  if (openCharacterBtn) openCharacterBtn.addEventListener("click", () => openTab(tabs.character));
  if (openSchoolBtn) openSchoolBtn.addEventListener("click", () => openTab(tabs.school));

  // --- Close buttons ---
  document.querySelectorAll(".close-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.dataset.close;
      closeTab(document.getElementById(tabId));
    });
  });

  // ===================== ADD YEAR BUTTON ===================== //
  if (addYearBtn) {
    addYearBtn.addEventListener("click", () => {
      player.age++;

      // --- School Progression ---
      if (player.age === 5) {
        player.school.name = "Sunrise Elementary";
        player.school.gradeLevel = "Kindergarten";
        alert("You have started school at Sunrise Elementary!");
      }
      if (player.age === 12) {
        player.school.name = "Maplewood Middle School";
        player.school.gradeLevel = "Grade 6";
        alert("You advanced to Maplewood Middle School!");
      }
      if (player.age === 15) {
        player.school.name = "Hillcrest High School";
        player.school.gradeLevel = "Grade 9";
        alert("You are now a student at Hillcrest High!");
      }
      if (player.age === 18) {
        player.school.name = null;
        player.education = "High School Graduate";
        alert("You graduated from high school!");
      }

      updateLifeStage(player);
      triggerRandomScenario();
      updateGameUI();
      updateSchoolUI();
    });
  }

  // ===================== SCHOOL SYSTEM ===================== //
  const joinClubBtn = document.getElementById("join-club-btn");
  const studyBtn = document.getElementById("study-btn");
  const skipBtn = document.getElementById("skip-class-btn");

  if (joinClubBtn) joinClubBtn.addEventListener("click", () => {
    const clubs = ["Basketball", "Drama", "Science", "Music"];
    const randomClub = clubs[Math.floor(Math.random() * clubs.length)];

    if (!player.school.clubs.includes(randomClub)) {
      player.school.clubs.push(randomClub);
      alert(`You joined the ${randomClub} Club!`);
      player.stats.popularity += 5;
    } else alert(`You're already a member of the ${randomClub} Club.`);

    updateSchoolUI();
    updateGameUI();
  });

  if (studyBtn) studyBtn.addEventListener("click", () => {
    player.stats.intelligence += 5;
    player.school.performance += 10;
    player.school.attendance += 2;
    alert("You studied hard and improved your grades!");
    updateSchoolUI();
    updateGameUI();
  });

  if (skipBtn) skipBtn.addEventListener("click", () => {
    player.stats.happiness += 5;
    player.stats.popularity += 3;
    player.school.attendance -= 10;
    player.school.performance -= 5;
    alert("You skipped class. Happiness increased, but performance dropped.");
    updateSchoolUI();
    updateGameUI();
  });
});

// ===================== UPDATE SCHOOL UI ===================== //
function updateSchoolUI() {
  const nameEl = document.getElementById("school-name");
  const gradeEl = document.getElementById("grade-level");
  const attendanceEl = document.getElementById("attendance");
  const performanceEl = document.getElementById("performance");
  const clubsEl = document.getElementById("school-clubs");

  if (!player.school) return;

  if (nameEl) nameEl.textContent = player.school.name || "None";
  if (gradeEl) gradeEl.textContent = player.school.gradeLevel || "N/A";
  if (attendanceEl) attendanceEl.textContent = `${player.school.attendance}%`;
  if (clubsEl)
    clubsEl.textContent = player.school.clubs.length > 0 ? player.school.clubs.join(", ") : "None";

  if (performanceEl) {
    if (player.school.performance >= 75) performanceEl.textContent = "Excellent";
    else if (player.school.performance >= 50) performanceEl.textContent = "Average";
    else performanceEl.textContent = "Poor";
  }
}

// ===================== UPDATE MAIN GAME UI ===================== //
function updateGameUI() {
  document.getElementById("age").textContent = player.age;
  document.getElementById("lifeStage").textContent = player.lifeStage;

  for (const stat in player.stats) {
    const el = document.getElementById(stat);
    if (el) el.textContent = player.stats[stat];
  }

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
  updateSchoolUI();
}

// ===================== SCENARIOS ===================== //
function triggerRandomScenario() {
  const stageScenarios = scenarios[player.lifeStage];
  if (!stageScenarios || stageScenarios.length === 0) return;

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
  if (scenario.effect.money) player.money += scenario.effect.money;
}

// ===================== DEBUG ===================== //
console.log("Available Menu:", getAvailableMenu());
performActivity("Martial Arts");
