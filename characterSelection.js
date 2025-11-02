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
