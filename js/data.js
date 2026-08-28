export const CATEGORY_TITLES = {
  Action: [
    "Doom Eternal","God of War Ragnarok","Devil May Cry 5","Bayonetta 3","Sekiro: Shadows Die Twice",
    "Batman: Arkham Knight","Control","Nier: Automata","Ghost of Tsushima","Cyberpunk 2077",
    "Star Wars Jedi: Fallen Order","Titanfall 2","The Last of Us Part II","Spider-Man","Uncharted 4: A Thief's End",
    "Resident Evil 4","Halo Infinite","Metroid Dread","Dishonored 2","Watch Dogs: Legion"
  ],
  Adventure: [
    "The Legend of Zelda: Breath of the Wild","Horizon Zero Dawn","Genshin Impact","Uncharted 4: A Thief's End",
    "Assassin's Creed Valhalla","Red Dead Redemption 2","The Witcher 3: Wild Hunt","Life is Strange","Firewatch",
    "Lara Croft and the Guardian of Light","The Outer Worlds","Death Stranding","The Last of Us",
    "The Walking Dead: Season One","Kingdom Hearts III","Ori and the Will of the Wisps","A Plague Tale: Innocence","Horizon Forbidden West"
  ],
  RPG: [
    "The Witcher 3: Wild Hunt","Elden Ring","Persona 5 Royal","Disco Elysium","Mass Effect 2",
    "Final Fantasy VII Remake","Skyrim","Dragon Age: Inquisition","Cyberpunk 2077","Fallout 4",
    "Divinity: Original Sin 2","Pillars of Eternity","Baldur's Gate 3","Yakuza: Like a Dragon","Monster Hunter: World",
    "Dragon Quest XI","Nioh 2","Kingdom Hearts III","The Outer Worlds","Starfield"
  ],
  Simulation: [
    "Stardew Valley","Animal Crossing: New Horizons","The Sims 4","Cities: Skylines","Two Point Hospital",
    "Microsoft Flight Simulator","Planet Coaster","Euro Truck Simulator 2","Kerbal Space Program","House Flipper",
    "Farming Simulator 22","SnowRunner","RollerCoaster Tycoon 3","Banished","Planet Zoo",
    "Surgeon Simulator 2","Tiny Tina's Wonderlands","The Sims 3","Subnautica","Planet Coaster: Console Edition","Two Point Campus"
  ],
  Strategy: [
    "Civilization VI","Age of Empires II","XCOM 2","Total War: Warhammer III","Into the Breach",
    "Stellaris","Crusader Kings III","Company of Heroes 2","Northgard","Anno 1800",
    "StarCraft II","Cities: Skylines","Frostpunk","Shadow Tactics","Warhammer 40,000: Dawn of War III",
    "Fire Emblem: Three Houses","Halo Wars 2","Hearts of Iron IV","Endless Legend","Europa Universalis IV","Battletech"
  ],
  Indie: [
    "Hollow Knight","Celeste","Hades","Untitled Goose Game","Cuphead",
    "Slay the Spire","Inside","Oxenfree","Hyper Light Drifter","Dead Cells",
    "Return of the Obra Dinn","Katana ZERO","Ghostrunner","A Short Hike","Spiritfarer",
    "Gris","Limbo","Shovel Knight","Bastion","Transistor","The Messenger"
  ],
  Multiplayer: [
    "Among Us","Fortnite","Overcooked! 2","It Takes Two","Fall Guys",
    "Call of Duty: Warzone","Apex Legends","Rocket League","Rainbow Six Siege","Valorant",
    "Destiny 2","Halo Infinite","Sea of Thieves","Deep Rock Galactic","Phasmophobia",
    "Battlefield V","Minecraft","Team Fortress 2","Counter-Strike: Global Offensive","Paladins","Dead by Daylight"
  ],
  Family: [
    "Minecraft","Mario Kart 8 Deluxe","Animal Crossing: New Horizons","Overcooked! 2","Kirby and the Forgotten Land",
    "LEGO Star Wars: The Skywalker Saga","Spyro Reignited Trilogy","Sonic Mania","Yoshi's Crafted World","Super Mario Odyssey",
    "Rayman Legends","Plants vs. Zombies: Battle for Neighborville","Just Dance 2022","Paw Patrol: Mighty Pups","Disney Dreamlight Valley",
    "Disney Infinity","Cuphead","Ratchet & Clank","Crash Bandicoot 4","Spyro 2: Ripto's Rage","Pokemon Sword"
  ]
};
export const CATEGORIES = CATEGORY_TITLES;
export const SUBCATS = ["Best Sellers","New Releases","Top Rated","Under $20","Editor's Picks"];
export const EMOJI = ["🎮","🕹️","👾","🐉","🚀","🏰","⚔️","🌲","🧩","🪐","🎯","🏆"];
export const PLACEHOLDERS = {
  hero: {
    title: "Games worth honking about.",
    copy: "One flock, every genre. Thousands of games, friendly prices, and zero geese harmed in the making of this storefront.",
    ctaPrimary: "Start exploring →",
    ctaSecondary: "See today's deals"
  }
};
const EDITION_VARIANTS = [
  "Standard Edition","Deluxe Edition","Ultimate Edition","Complete Edition","Collector's Edition",
  "Director's Cut","Remastered","Anniversary Edition","Digital Deluxe","Legacy Edition",
  "Game of the Year Edition","Season Pass Bundle"
];
const REVIEW_AUTHORS = ["HonkMaster","ArcadeAce","GameGuru","PixelPilot","IndieInsider","QuestSeeker","CriticCore","PlayerOne","LunaPlays","RetroRaven"];
const REVIEW_CLOSERS = ["The pacing gives those strengths room to land.", "It feels considered rather than assembled by checklist.", "That restraint is what makes the good ideas memorable.", "I kept thinking about its choices after I stopped playing.", "It understands when to add detail and when to get out of the way.", "The result is confident without pretending to be flawless.", "There is enough personality here to make the familiar feel fresh.", "It rewards curiosity more than simply demanding more hours."];
const REVIEW_HEADLINES = {
  Action: ["A confident action showcase", "The combat earns its spotlight", "Big set pieces, sharp momentum"],
  Adventure: ["A world worth getting lost in", "The journey has real texture", "Strong atmosphere and discovery"],
  RPG: ["A rewarding long-haul adventure", "Excellent sense of progression", "Build variety keeps it fresh"],
  Simulation: ["A surprisingly absorbing loop", "Small decisions, satisfying results", "Relaxing without feeling empty"],
  Strategy: ["Smart systems with real tension", "Every decision has consequences", "A rewarding tactical challenge"],
  Indie: ["Distinctive from the first minute", "Small scale, big personality", "A memorable little gem"]
};
const REVIEW_DETAILS = {
  Action: ["The encounters keep changing shape, and the strongest moments come from how quickly the game asks you to adapt.", "Its best sequences understand that momentum is a design tool, not just a faster animation.", "The combat has enough texture to reward attention without burying the fun under unnecessary systems."],
  Adventure: ["The environments communicate as much through their details as the dialogue does, which makes exploring feel purposeful.", "There is a satisfying rhythm between quiet discovery and the moments that push the story forward.", "It gives the world room to breathe, then knows exactly when to pull the player toward the next reveal."],
  RPG: ["Progression feels meaningful because new abilities change how I approach problems rather than simply making numbers larger.", "The strongest part is the sense that my choices create a personal route through the adventure.", "It respects a long play session with layered systems that stay readable even when the scope gets ambitious."],
  Simulation: ["The loop is calm, but the small choices have enough consequence to keep the next in-game day interesting.", "It turns routine tasks into a satisfying rhythm and gives improvement a clear, tangible shape.", "The charm comes from how many little systems quietly support the main activity without competing for attention."],
  Strategy: ["The most satisfying victories come from reading the situation correctly, not from waiting for a stronger unit.", "Its systems create genuine trade-offs, so even a successful turn leaves something interesting to solve next.", "The interface stays understandable while the decisions become wonderfully difficult."],
  Indie: ["The personality is immediate, and the unusual choices feel intentional instead of decorative.", "It has the kind of focused design where a small mechanic can carry a surprisingly large emotional beat.", "The presentation is modest in scale but confident in voice, which makes the whole experience stick."]
};

function randomItem(list){
  return list[Math.floor(Math.random()*list.length)];
}

function hashText(str){
  return [...str].reduce((hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0);
}

function deterministicPrice(title, category){
  const baseSeed = Math.abs(hashText(`${title}|${category}`));
  const base = 19 + (baseSeed % 42);
  const cents = ((Math.abs(hashText(`${category}|${title}`)) % 90) + 10).toString().padStart(2, '0');
  return parseFloat(`${base}.${cents}`);
}

function deterministicDealSeed(title){
  return Math.abs(hashText(`${title}|deal`)) % 100;
}

function deterministicEditionCount(title){
  return 1 + (Math.abs(hashText(`${title}|edition`)) % 4);
}

function buildReview(title, category, i){
  const seed = Math.abs(hashText(`${title}|review|${i}`));
  const rating = 3.5 + ((seed % 4) * 0.5);
  const details = REVIEW_DETAILS[category] || REVIEW_DETAILS.Indie;
  const headlines = REVIEW_HEADLINES[category] || REVIEW_HEADLINES.Indie;
  return {
    id: i + 1,
    author: REVIEW_AUTHORS[seed % REVIEW_AUTHORS.length],
    rating,
    headline: headlines[seed % headlines.length],
    body: `${details[seed % details.length]} ${REVIEW_CLOSERS[i % REVIEW_CLOSERS.length]}${seed % 3 === 0 ? ` ${title} makes that focus especially clear.` : ''}`,
    date: `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][seed % 12]} ${10 + (seed % 20)}, 202${seed % 6}`
  };
}

function buildLongDescription(name, category){
  return `Step into the world of ${name} with a detailed, placeholder-rich product page built to feel like an actual storefront. This ${category.toLowerCase()} title offers layered gameplay, beautiful environments, and many curated editions. Ideal for players who want a confident, polished experience with fun seasonal deals and a full game library feel. Explore the story, compare editions, read reviews, and choose your favorite build of ${name}.`;
}

function buildReviews(title, category){
  const count = 5 + (Math.abs(hashText(`${title}|review-count`)) % 4);
  return Array.from({length: count}, (_, i) => buildReview(title, category, i));
}

export function buildGames(){
  const games = [];
  let id = 1;
  Object.keys(CATEGORY_TITLES).forEach(category => {
    const titles = CATEGORY_TITLES[category];
    titles.forEach(base => {
      // Create a single game entry per base title, with multiple edition variants
      const basePrice = deterministicPrice(base, category);
      let dealType = null;
      let price = basePrice;
      let oldPrice = null;
      let endsAt = null;
      const dealSeed = deterministicDealSeed(base);
      if(dealSeed < 35){
        dealType = "50% OFF";
        price = parseFloat((basePrice * 0.5).toFixed(2));
        oldPrice = basePrice;
      } else if(dealSeed < 65){
        dealType = "10% OFF";
        price = parseFloat((basePrice * 0.9).toFixed(2));
        oldPrice = basePrice;
      } else if(dealSeed < 80 && basePrice <= 20){
        dealType = "2 FOR $20";
        // price remains basePrice; oldPrice not shown
      }
      if(dealType){
        endsAt = Date.now() + (1000*60*60*(2 + (Math.abs(hashText(`${base}|ends`)) % 20)));
      }
      const editionCount = deterministicEditionCount(base);
      const editions = ["Standard Edition"];
      // shuffle a copy of EDITION_VARIANTS and take next items
      const pool = EDITION_VARIANTS.slice();
      for(let i=0;i<editionCount-1;i++){
        const pick = pool.splice(Math.floor(Math.random()*pool.length),1)[0];
        if(pick) editions.push(pick);
      }
      const reviews = buildReviews(base, category);
      const average = (reviews.reduce((s,r)=>s+r.rating, 0) / reviews.length).toFixed(1);
      const tags = [];
      if(Math.random() < 0.22) tags.push(randomItem(SUBCATS));
      if(Math.random() < 0.12) tags.push('Best Sellers');
      if(Math.random() < 0.08) tags.push('New Releases');

      games.push({
        id: id++,
        name: base,
        category,
        basePrice,
        price,
        oldPrice,
        dealType,
        endsAt,
        emoji: EMOJI[Math.floor(Math.random()*EMOJI.length)],
        rating: average,
        reviewCount: reviews.length,
        editions,
        tags,
        description: buildLongDescription(base, category),
        reviews,
        summary: `${base} is a standout ${category.toLowerCase()} release with premium presentation and engaging moments.`,
        platforms: ["PC","PS5","Xbox Series X"],
        about: `${base} delivers a high-energy ${category.toLowerCase()} experience with responsive controls and varied playstyles. Whether you're after action, story, or strategy, this listing gives you the feel of a major marketplace product page.`
      });
    });
  });
  return games;
}
