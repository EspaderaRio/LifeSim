// -------------------- Player Object --------------------
let player = {
  name: "",
  surname: "",
  gender: "",
  age: 0,
  month: 0,
  happiness: 50,
  health: 100,
  intelligence: 50,
  family: {}
};

// Name pools
const maleNames = ["Liam", "Noah", "Oliver", "Elijah", "James", "William", "Benjamin", "Lucas", "Henry", "Alexander",
"Ethan", "Jacob", "Michael", "Daniel", "Logan", "Jackson", "Levi", "Sebastian", "Mateo", "Jack",
"Owen", "Theodore", "Aiden", "Samuel", "Joseph", "John", "David", "Wyatt", "Matthew", "Luke",
"Asher", "Carter", "Julian", "Grayson", "Leo", "Jayden", "Gabriel", "Isaac", "Lincoln", "Anthony",
"Hudson", "Dylan", "Ezra", "Thomas", "Charles", "Christopher", "Jaxon", "Maverick", "Josiah", "Isaiah",
"Andrew", "Elias", "Joshua", "Nathan", "Caleb", "Ryan", "Adrian", "Miles", "Eli", "Nolan",
"Christian", "Aaron", "Cameron", "Ezekiel", "Colton", "Luca", "Landon", "Hunter", "Jonathan", "Santiago",
"Axel", "Easton", "Cooper", "Jeremiah", "Angel", "Roman", "Connor", "Jameson", "Robert", "Greyson",
"Jordan", "Ian", "Carson", "Jaxson", "Leonardo", "Nicholas", "Dominic", "Austin", "Everett", "Brooks",
"Xavier", "Kai", "Jose", "Parker", "Adam", "Jace", "Wesley", "Kayden", "Silas", "Bennett"];
const femaleNames = ["Olivia", "Emma", "Charlotte", "Amelia", "Sophia", "Isabella", "Ava", "Mia", "Evelyn", "Luna",
"Harper", "Camila", "Gianna", "Elizabeth", "Eleanor", "Ella", "Abigail", "Sofia", "Avery", "Scarlett",
"Emily", "Aria", "Penelope", "Chloe", "Layla", "Mila", "Nora", "Hazel", "Madison", "Ellie",
"Lily", "Nova", "Isla", "Grace", "Violet", "Aurora", "Riley", "Zoey", "Willow", "Emilia",
"Stella", "Zoe", "Victoria", "Hannah", "Addison", "Leah", "Lucy", "Eliana", "Ivy", "Everly",
"Lillian", "Paisley", "Elena", "Naomi", "Maya", "Natalie", "Kinsley", "Delilah", "Claire", "Audrey",
"Aaliyah", "Ruby", "Brooklyn", "Alice", "Aubrey", "Autumn", "Leilani", "Savannah", "Valentina", "Kennedy",
"Madelyn", "Josephine", "Bella", "Skylar", "Genesis", "Sophie", "Hailey", "Sadie", "Natalia", "Quinn",
"Caroline", "Allison", "Gabriella", "Anna", "Serenity", "Nevaeh", "Cora", "Ariana", "Emery", "Lydia",
"Jade", "Sarah", "Eva", "Adeline", "Madeline", "Piper", "Rylee", "Athena", "Peyton", "Clara"];
const surnames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
  "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes",
  "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper",
  "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
  "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
  "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez"
];

// Baby and Kid Life Events
const earlyLifeEvents = [
  {
    ageRange: [0, 2],
    events: [
      "learned to crawl", "said their first word", "took first steps", "played peekaboo", "bonded with family",
      "recognized their name", "learned to clap", "laughed for the first time", "held a toy", "learned to wave",
      "smiled at mom", "smiled at dad", "slept through the night", "got their first tooth", "ate solid food",
      "took a nap with parent", "played with a rattle", "enjoyed tummy time", "imitated sounds", "pulled themselves up",
      "stood alone briefly", "cried for attention", "recognized family members", "enjoyed bath time", "started teething",
      "made baby noises", "watched colorful lights", "grabbed a finger", "learned to point", "played with pets",
      "wore their first outfit", "visited the doctor", "received vaccinations", "took first baby photo", "was held by grandparents",
      "laughed at funny faces", "played with soft toys", "slept in a crib", "held their bottle", "rolled over",
      "got a favorite blanket", "smiled at strangers", "tugged at clothes", "danced to music", "listened to lullabies",
      "made funny faces", "clapped to songs", "took first stroller ride", "attended first birthday", "watched cartoons",
      "played peekaboo with mom", "grabbed food", "splashing during bath", "copied parent’s smile", "learned to hug",
      "tried to feed themselves", "stood with help", "loved soft toys", "got scared by loud sounds", "learned to say ‘mama’",
      "learned to say ‘dada’", "responded to their name", "took first steps barefoot", "sneezed adorably", "got first haircut",
      "wore cute costume", "played with stacking blocks", "hugged family member", "laughed uncontrollably", "explored the floor",
      "watched rain through window", "crawled under furniture", "got first shoes", "hugged a stuffed animal", "had a favorite toy",
      "played with mirror reflection", "took first nap on couch", "played patty-cake", "sat without help", "grabbed their toes",
      "watched animals", "clapped for music", "peeked behind curtains", "was tickled", "slept on parent’s chest",
      "ate mashed fruit", "listened to bedtime story", "played with building blocks", "pouted for first time", "pointed at birds",
      "sang baby gibberish", "hugged another baby", "imitated animal sounds", "pushed toy car", "kissed parent", "watched bubbles",
      "stacked cups", "tried to put on shoes", "played with spoon", "hid under blanket", "danced in baby walker", "smiled in photos"
    ]
  },
  {
    ageRange: [3, 5],
    events: [
      "started preschool", "learned to draw", "made a friend", "loved cartoons", "learned colors and shapes",
      "played hide and seek", "built sandcastles", "dressed up for fun", "attended a birthday party", "colored pictures",
      "learned to count", "sang nursery rhymes", "played pretend games", "helped in the kitchen", "learned simple songs",
      "rode a tricycle", "went to the park", "visited grandparents", "watched animated movies", "played with dolls",
      "learned animal names", "learned alphabet", "made paper crafts", "had favorite TV show", "played in the rain",
      "had favorite snack", "learned to use scissors", "painted a picture", "shared toys with friends", "watched fireworks",
      "went to the zoo", "wore costume on Halloween", "celebrated birthday with cake", "went swimming", "learned to brush teeth",
      "played catch", "danced to music", "sang in front of family", "learned to count to 10", "learned to say please and thank you",
      "visited playground", "watched clouds", "built pillow fort", "pretended to be a superhero", "played with clay",
      "helped water plants", "visited a farm", "played with toy cars", "made handprints", "went to sleepover", "had imaginary friend",
      "had first crush", "colored on walls", "got scolded for mess", "wore favorite clothes", "learned about shapes",
      "played in sandbox", "watched cartoons every morning", "learned to skip", "had favorite bedtime story", "helped bake cookies",
      "played tag", "watched ants crawl", "drew on paper", "tried to whistle", "went fishing with family",
      "saw the beach for first time", "ate ice cream happily", "hugged teacher", "made crafts in class", "recited ABC song",
      "sang in school performance", "slept with stuffed animal", "played dress-up", "got scared of thunder", "watched rainbow",
      "had first sleepover", "helped clean up toys", "played board games", "visited cousins", "helped mom cook", "went to park picnic",
      "wore superhero cape", "played in puddles", "built Lego tower", "watched favorite movie", "helped feed pet", "played puzzle games",
      "tried to write name", "had best friend", "laughed all day", "colored with crayons", "told silly jokes", "took family photo",
      "visited doctor checkup", "got stickers as reward", "ate favorite candy", "sang in the car", "made paper airplane", "hugged everyone"
    ]
  },
  {
    ageRange: [6, 10],
    events: [
      "started elementary school", "played sports", "won a small award", "learned to read well", "had a birthday party",
      "made best friends", "joined a club", "participated in school play", "went on school trip", "learned multiplication",
      "helped a friend", "collected toys", "rode a bike", "learned to swim", "helped with chores",
      "played video games", "read comic books", "watched cartoons", "learned handwriting", "helped teacher",
      "attended school fair", "joined art contest", "broke something accidentally", "visited relatives", "went camping",
      "played soccer", "watched superhero movies", "won spelling bee", "had sleepover", "watched fireworks at night",
      "played basketball", "got favorite backpack", "lost a tooth", "got allowance", "bought candy with savings",
      "sang in talent show", "learned to cook simple meal", "helped younger sibling", "went to family vacation", "played on computer",
      "joined music class", "got first pet", "fed goldfish", "visited science museum", "went hiking", "drew comic strips",
      "built Lego creations", "made class project", "painted school art", "played on swings", "shared lunch with friend",
      "won small competition", "lost school supplies", "helped classmate", "sang with group", "learned to jump rope",
      "participated in parade", "got compliment from teacher", "played tag at recess", "made paper airplane", "attended school party",
      "helped decorate classroom", "visited dentist", "wrote short story", "joined reading challenge", "watched educational video",
      "wore costume for event", "did family game night", "visited park on weekend", "helped wash car", "watched animated series",
      "helped bake cookies", "made new friend at school", "played hide and seek", "learned to tie shoes", "built toy model",
      "watched movie with family", "had first school crush", "got good grades", "lost a toy", "learned magic trick",
      "drew doodles in notebook", "read fairy tale", "took family photo", "played musical instrument", "got praised by parents",
      "visited playground", "helped cook breakfast", "read bedtime story", "played outdoor games", "shared snacks", "won class quiz",
      "wrote thank you card", "visited grandparents", "saw rainbow", "played chess", "helped organize toys", "watched favorite show",
      "learned to whistle", "had art exhibit", "joined dance contest", "made DIY craft", "went to family reunion", "had best day at school"
    ]
  }
];


// -------------------- Functions --------------------

// Gender selection & family setup
function chooseGender(gender){
  const surname = surnames[Math.floor(Math.random()*surnames.length)];
  const firstName = (gender === "Male")
    ? maleNames[Math.floor(Math.random()*maleNames.length)]
    : femaleNames[Math.floor(Math.random()*femaleNames.length)];

  player.gender = gender;
  player.name = `${firstName} ${surname}`;
  player.surname = surname;

  // Random family
  player.family = {
    father: `${maleNames[Math.floor(Math.random()*maleNames.length)]} ${surname}`,
    mother: `${femaleNames[Math.floor(Math.random()*femaleNames.length)]} ${surname}`,
    sibling: Math.random() < 0.5 ? `${maleNames[Math.floor(Math.random()*maleNames.length)]} ${surname}` : `${femaleNames[Math.floor(Math.random()*femaleNames.length)]} ${surname}`
  };

  document.getElementById("playerNameDisplay").textContent = `You are ${player.name} (${gender})`;
  document.getElementById("familyInfo").innerHTML = `
    Father: ${player.family.father}<br>
    Mother: ${player.family.mother}<br>
    Sibling: ${player.family.sibling}
  `;

  document.getElementById("setup").style.display = "none";
  document.getElementById("stats").style.display = "block";
  updateStats();
}

// Update stats
function updateStats(){
  document.getElementById("age").textContent = `Age: ${player.age}`;
  document.getElementById("happiness").textContent = `Happiness: ${player.happiness}`;
  document.getElementById("health").textContent = `Health: ${player.health}`;
  document.getElementById("intelligence").textContent = `Intelligence: ${player.intelligence}`;
}

// Add event to list
function addEvent(text){
  const div = document.getElementById("events");
  const p = document.createElement("p");
  p.textContent = text;
  div.appendChild(p);
  div.scrollTop = div.scrollHeight;
}

// Get event based on age
function getEarlyLifeEvent(){
  for(let stage of earlyLifeEvents){
    if(player.age >= stage.ageRange[0] && player.age <= stage.ageRange[1]){
      const event = stage.events[Math.floor(Math.random()*stage.events.length)];
      return event;
    }
  }
  return null;
}

// Advance one month
function advanceMonth(){
  player.month++;
  if(player.month > 11){
    player.month = 0;
    player.age++;
    if(player.age > 10){
      addEvent(`${player.name} is now 11. Childhood phase complete!`);
      addEvent(`Next stage: Teen years (coming soon...)`);
      updateStats();
      return;
    }

    // Get random event
    const lifeEvent = getEarlyLifeEvent();
    if(lifeEvent){
      addEvent(`${player.name} ${lifeEvent}.`);
    }

    // Stat growth by age
    if(player.age <= 2){
      player.health += Math.floor(Math.random()*2);
      player.happiness += Math.floor(Math.random()*2);
    } else if(player.age <= 5){
      player.intelligence += Math.floor(Math.random()*3);
      player.happiness += Math.floor(Math.random()*2);
    } else if(player.age <= 10){
      player.intelligence += Math.floor(Math.random()*4);
      player.happiness += Math.floor(Math.random()*3);
    }

    // Clamp stats
    player.happiness = Math.min(100, player.happiness);
    player.health = Math.min(100, player.health);
    player.intelligence = Math.min(100, player.intelligence);

    updateStats();
  }
}
