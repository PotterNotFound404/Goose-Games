const JOKES = [
  "Why did the goose bring a ladder to the arcade? It heard the games had a high score.",
  "What do you call a goose who loves spreadsheets? An honk-ulator.",
  "Why did the goose cross the road? To prove it was not chicken.",
  "My goose started a podcast. It has a lot of strong bill-iefs.",
  "What is a goose's favorite button? The space bar. It needs room to flap.",
  "Why was the goose bad at hide-and-seek? It always got spotted by its honk.",
  "What do geese use to pay for games? Their bill-fold.",
  "Why did the goose become a DJ? It had excellent beak drops.",
  "I asked a goose for directions. It gave me a very detailed honk-map.",
  "What is a goose's favorite genre? Quack-and-slash.",
  "Why did the goose sit on the controller? It wanted to press its own buttons.",
  "The goose opened a bakery. Business is really taking off: it sells the best flap-jacks.",
  "Why did the goose bring a pencil to game night? To draw its own conclusions.",
  "A goose's favorite snack is a honk-dog. Obviously.",
  "Why did the goose get promoted? It always went the extra flappish mile.",
  "What do you call a goose who tells dad jokes? A full-time pun-der.",
  "The goose was late to class because it got stuck in a honk-traffic jam.",
  "Why did the goose join the orchestra? It wanted to play the bill-ophone.",
  "What does a goose say after a great game? That was eggs-cellent.",
  "The goose downloaded a weather app. Now it always knows when to expect a little fowl weather.",
  "Why did the goose start gardening? It wanted to grow its own spring onions.",
  "A goose opened a clothing store. Its specialty is feather-wear.",
  "Why did the goose bring sunglasses? It was ready for a bright future.",
  "What is a goose's favorite kind of music? Beak-box.",
  "The goose became a detective because it was good at following bird clues.",
  "Why did the goose apply for a job? It wanted to improve its nest egg.",
  "What do you call a goose who solves problems? A honk-sultant.",
  "The goose bought a map but still got lost. It kept taking the wrong tern.",
  "Why did the goose start coding? It wanted to build a better webbed site.",
  "What did the goose say to the slow computer? Hurry up, I am getting impatiently downy.",
  "Why did the goose bring a towel to the game? It heard there would be a water level.",
  "A goose's favorite dance is the wing-and-a-prayer.",
  "Why did the goose become a comedian? It had a natural talent for punch-lines and punch-wings.",
  "What do you call a goose in a suit? Well-dressed poultry.",
  "The goose wanted to play a racing game, but it kept choosing the feather shift.",
  "Why did the goose open a library? It had lots of well-read feathers.",
  "What is a goose's favorite holiday? Thanks-giving, for the snacks.",
  "The goose joined a band and immediately became the front bird.",
  "Why did the goose bring an umbrella? It heard the forecast called for scattered showers and honks.",
  "What is a goose's favorite workout? Cross-beak training.",
  "The goose became a barber because it was great at giving feather cuts.",
  "Why did the goose go to therapy? It had too many unresolved flock issues.",
  "A goose's favorite app is Flap-chat.",
  "Why did the goose win the spelling bee? It knew every word by bill.",
  "The goose opened a restaurant. The reviews say the service is absolutely fowl.",
  "What is a goose's favorite school subject? Geogra-fee.",
  "Why did the goose bring a pillow to the arcade? It planned to wing it.",
  "A goose never loses its keys. It keeps them in a safe beak-up.",
  "Why did the goose get a ticket? It was caught speeding in a school honk.",
  "What do you call a goose who loves math? An alge-bird-ian.",
  "The goose started a construction company. It specializes in building nest-egg homes.",
  "Why did the goose become a photographer? It wanted to capture the perfect bird's-eye view.",
  "A goose's favorite board game is Risk. It is always ready to defend its territory.",
  "Why did the goose bring a ruler? It wanted to measure its wing-span of influence.",
  "What did the goose say after finishing a puzzle? I think I have cracked the case.",
  "The goose opened a gym and called it Fowl Body Fitness.",
  "Why did the goose go online? To check its feather-mail.",
  "What do you call a goose who tells secrets? A down-low informant.",
  "The goose bought a new phone because its old one had too many missed honks.",
  "Why did the goose become a pilot? It wanted to take its career to new heights.",
  "A goose's favorite movie is The Fast and the Furriest.",
  "Why did the goose bring a blanket? It wanted to stay cozy while it winged the night.",
  "What do geese call a surprise party? A flockbuster event.",
  "The goose opened a museum. Every exhibit was a piece of bird history.",
  "Why did the goose study philosophy? It wanted to know what it means to be down.",
  "A goose's favorite kind of tea is chamomile, because it helps with honk-centration.",
  "Why did the goose take a camera to the pond? For some fresh waterfowl footage.",
  "What did the goose say to the broken controller? You have really let the flock down.",
  "The goose became a mail carrier because it was excellent at delivering the beak news.",
  "Why did the goose bring a suitcase? It was ready for a feather-weather trip.",
  "What do you call a goose who loves astronomy? A space quacker.",
  "The goose started a rock band. Its first album was called Heavy Metal Beak.",
  "Why did the goose take a nap? It needed to recharge its honk-power.",
  "A goose's favorite type of story is a tail with a happy ending.",
  "Why did the goose become a chef? It had a taste for adventure and a flair for the grill.",
  "What do geese use to organize their days? A calendar with plenty of date quacks.",
  "The goose tried stand-up comedy but kept winging every punchline.",
  "Why did the goose buy a toolbox? It wanted to fix its own beak-end problems.",
  "A goose's favorite kind of tree is a game tree. It always has branching choices.",
  "Why did the goose join the choir? It already had the high notes covered.",
  "What do you call a goose that loves history? A past-ure expert.",
  "The goose went to the beach and had a whale of a time, despite being the wrong kind of bird.",
  "Why did the goose become a tailor? It was good at making things fit the flock.",
  "A goose's favorite kind of story has lots of plot twists and feathered friends.",
  "Why did the goose bring a compass? It did not want to lose its sense of direction or its dignity.",
  "What do you call a goose who runs a store? A retail honker.",
  "The goose started learning piano. It was working hard on its bill-tar skills.",
  "Why did the goose sit by the window? It wanted to watch the world go by and judge it loudly.",
  "A goose's favorite kind of sandwich is one with plenty of quackers.",
  "Why did the goose become a scientist? It wanted to put the theory of honk-relativity to the test.",
  "What did the goose say to the rain? You are really pouring it on, feather friend.",
  "The goose got a job at the clock shop because it had great timing.",
  "Why did the goose carry a notebook? It had a lot of important down-time thoughts.",
  "A goose's favorite game mode is co-op. There is always room for one more in the flock.",
  "Why did the goose buy a new chair? Its old one had too many fowl faults.",
  "What is a goose's favorite kind of sandwich? A sub-woof, because it likes to keep its friends close.",
  "The goose started a travel blog. Every post ended with: wish you were here, honk.",
  "Why did the goose learn magic? It wanted to make its problems disappear, but they just kept re-beaking.",
  "A goose's favorite kind of door is one that says push. It loves a clear instruction.",
  "Why did the goose bring a stopwatch? It wanted to make every second count.",
  "What did the goose say when it got a high score? I am on top of the world, and slightly above the pond.",
  "The goose became a motivational speaker. Its advice was simple: spread your wings and commit to the bit.",
  "Why did the goose take a cooking class? It wanted to learn how to spice up its nest.",
  "A goose's favorite kind of joke is one with a strong delivery and a stronger honk.",
  "Why did the goose open a repair shop? It heard every problem has a solution, even a fowl one.",
  "What do you call a goose who loves books? A literary bird of feather.",
  "The goose won an award for best supporting bird. It thanked the whole flock.",
  "Why did the goose bring a flashlight? It wanted to brighten up its next adventure.",
  "A goose's favorite thing about game night is the excellent beak-ginnings.",
  "Why did the goose become a meteorologist? It was tired of being surprised by the weather.",
  "What did the goose say to the arcade cabinet? Do not worry, I have got your back-up.",
  "The goose started a podcast about games. Every episode has a strong opening honk.",
  "Why did the goose go to the dentist? It needed a little bill maintenance.",
  "A goose's favorite kind of joke is a dad joke, because every punchline is already down to earth.",
  "Why did the goose bring snacks to the meeting? It wanted everyone to have a productive peck.",
  "What do you call a goose who loves art? A feathered visual thinker.",
  "The goose bought a hammock and immediately became a professional relaxer.",
  "Why did the goose play a farming game? It wanted to grow its own crop of compliments.",
  "A goose's favorite game review is one that says: worth the honk.",
  "Why did the goose bring a map to the pond? It was planning a very small expedition.",
  "What did the goose say after solving the riddle? That answer was right under my beak.",
  "The goose started a newsletter. It is called The Daily Honk, and it has excellent circulation.",
  "Why did the goose join the debate team? It had a compelling point of view and a loud one.",
  "A goose's favorite kind of weather is partly cloudy with a chance of snacks.",
  "Why did the goose buy a keyboard? It wanted to improve its typing quack-uracy.",
  "What do you call a goose who loves space games? An astro-honker.",
  "The goose became a lifeguard because it was always ready to save the day at the pond.",
  "Why did the goose bring a trophy case? It planned on earning a few more honks of approval.",
  "A goose's favorite game achievement is the one that says: You did it, bird-brain.",
  "Why did the goose become a gardener? It wanted to turn over a new leaf, carefully.",
  "What did the goose say when the game froze? This is a pretty cold reception.",
  "The goose opened a café. Its signature drink is a latte with extra foam and no regrets.",
  "Why did the goose bring a blanket to the computer? It heard there was a cold boot.",
  "A goose's favorite family activity is a good old-fashioned board walk-through.",
  "Why did the goose become a filmmaker? It had a vision and plenty of dramatic pauses.",
  "What do you call a goose who solves mysteries at night? A private fly.",
  "The goose tried to start a fire with two sticks. It only managed a tiny spark of inspiration.",
  "Why did the goose buy a bookmark? It wanted to keep its place in the flock.",
  "A goose's favorite kind of game is one with a great story and a better beak-end.",
  "Why did the goose apply sunscreen? It did not want to get a nasty wing-burn.",
  "What did the goose say after the credits rolled? That ending was eggs-actly what I wanted.",
  "The goose became a librarian because it loved checking out the latest releases.",
  "Why did the goose bring a drum? It wanted to make a little noise about its big entrance.",
  "A goose's favorite computer shortcut is Ctrl-Honk-Delete.",
  "Why did the goose become a coach? It knew how to get the best out of every bird.",
  "What do you call a goose with a five-year plan? An ambitious waterfowl.",
  "The goose ordered a pizza and asked for extra toppings. It wanted to raise the bar, or at least the crust.",
  "Why did the goose bring a telescope? It wanted to see the big picture from a bird's-eye view.",
  "A goose's favorite part of a game is the loading screen. It gets a little down time.",
  "Why did the goose go to the museum? It wanted to brush up on its art of the beak.",
  "What did the goose say after a long day? I am ready to put my feet up and my wings down.",
  "The goose started a delivery service called Wing It Express. It promises fast, feathered shipping.",
  "Why did the goose buy a plant? It wanted something else to watch grow besides its game library.",
  "A goose's favorite game controller is the one with a good grip and excellent quack-ality.",
  "Why did the goose learn to sew? It wanted to patch up a few holes in its schedule.",
  "What do you call a goose who gives good advice? A wise quacker.",
  "The goose became a DJ and announced every song with a dramatic drop of the bill.",
  "Why did the goose bring a fan to game night? The competition was getting fowl.",
  "A goose's favorite kind of story is one that ends with everyone living happily ever after the honk.",
  "Why did the goose open a photo booth? It knew everyone wanted a memorable bird's-eye selfie."
];

const WISE_QUOTES = [
  "A goose who honks at every problem has mistaken volume for leadership.",
  "Wisdom is knowing when to fly away. Experience is knowing you should have left ten minutes ago.",
  "The pond rewards patience, but the bread line rewards strategic elbows.",
  "A serious goose studies the horizon. A wiser goose checks who brought snacks.",
  "Do not chase every opportunity. Some are simply ducks wearing impressive hats.",
  "The feather is light, yet somehow it still becomes paperwork.",
  "A goose may forgive, but it will remember your parking technique.",
  "True confidence is entering the pond as though you personally approved the weather.",
  "The flock has many opinions and one shared brain cell. Consult both before proceeding.",
  "A calm honk can move mountains. A loud honk can move pedestrians.",
  "The wise goose does not fear criticism. It fears being quoted accurately.",
  "Every journey begins with one step, unless the path is wet. Then it begins with suspicion.",
  "A goose who counts every crumb will never enjoy the audit.",
  "You cannot control the wind, but you can blame it with remarkable confidence.",
  "The respectable goose arrives early and leaves before the meeting becomes collaborative.",
  "Ambition is a noble wing. Unfortunately, it still needs a landing permit.",
  "A flock is strongest when everyone agrees, preferably with the goose holding the clipboard.",
  "The pond is temporary. The group chat screenshot is forever.",
  "Do not mistake a long neck for a long-term plan.",
  "The best revenge is success. The second best is a perfectly timed honk.",
  "A goose can survive without answers, but not without a strong position on the matter.",
  "When opportunity knocks, check whether it is carrying bread before opening the door.",
  "A dignified goose never runs. It advances urgently with administrative purpose.",
  "The map is not the territory, and neither is the puddle your cousin claimed.",
  "A wise goose saves for winter. A practical goose saves the good bread for after the argument.",
  "Silence is golden. Honking is more effective in crowded public spaces.",
  "The flock does not need a hero. It needs someone who read the instructions.",
  "A goose who demands perfection has never seen its own reflection in a pond.",
  "Be the goose you wish to see in the world, but preferably one with a plan.",
  "The early goose gets the worm. The late goose gets plausible deniability.",
  "A meeting without snacks is merely a hostage situation with minutes.",
  "The feathered path to enlightenment includes several avoidable detours.",
  "If the plan requires everyone to be reasonable, revise the plan.",
  "A goose should never burn bridges. They are useful for dramatic exits.",
  "The most dangerous words in the pond are: this should be quick.",
  "The flock values transparency, especially when someone else is being blamed.",
  "A wise goose asks questions. A wiser goose asks them after the decision is recorded.",
  "Do not let a minor inconvenience prevent a major overreaction.",
  "Leadership is carrying the torch while insisting it was someone else’s idea.",
  "The goose who expects fairness has not reviewed the history of geese.",
  "A balanced life contains equal parts rest, ambition, and suspicious staring.",
  "The pond does not judge you. The pond has seen worse.",
  "A goose with no enemies is either very kind or extremely difficult to locate.",
  "When in doubt, circle the issue and honk until it becomes policy.",
  "The wise goose travels light, except for emergency bread and emotional baggage.",
  "Every flock has a pecking order. The minutes need not mention it.",
  "A goose should pursue knowledge, but avoid the goose who claims to have all of it.",
  "The shortest distance between two points is a straight line. The funniest is through the flower bed.",
  "You cannot please every goose. Frankly, some geese are committed to being unimpressed.",
  "A good reputation takes years to build and one public honk to complicate.",
  "The goose who says nothing may be wise, asleep, or waiting for you to finish talking.",
  "A polished beak does not guarantee a polished argument.",
  "The future belongs to those who prepare, especially for unexpected bread inspections.",
  "A goose who never changes its mind has confused consistency with furniture.",
  "The flock moves forward one awkward decision at a time.",
  "A wise goose knows that urgency is often just anxiety in a tiny hat.",
  "Do not fear the dark. Fear the goose who knows where the lights are.",
  "The pond teaches humility by reflecting everyone at an unflattering angle.",
  "A goose can be right for the wrong reasons and still demand a parade.",
  "One should always leave room for growth, snacks, and a tactical retreat.",
  "The flock’s greatest strength is its ability to turn a simple task into a constitutional debate.",
  "A wise goose does not chase status. It lets status chase the goose and then complains about the noise.",
  "A budget is a promise made to your future self, who is already disappointed.",
  "The honest goose admits uncertainty. The confident goose schedules a press conference.",
  "Some doors open inward, some outward, and some are simply decorative. Observe before charging.",
  "A goose who fears embarrassment has never fallen into a fountain in front of tourists.",
  "The flock has no useless members, only members assigned to very specific confusion.",
  "A wise goose keeps its counsel. A funny goose keeps it until the worst possible moment.",
  "The pond is full of reflections and surprisingly few actionable insights.",
  "Do not measure your worth by applause. Measure it by how quickly the bread disappears.",
  "A good leader listens to the flock, then quietly chooses the sensible option.",
  "A goose who says ‘trust me’ has created a new administrative burden.",
  "Patience is a virtue, but so is checking whether the gate is actually open.",
  "The wise goose forgives mistakes and documents them thoroughly.",
  "One honk may be an accident. Three honks are a position paper.",
  "The flock’s grandest plans begin with confidence and end near someone’s garden.",
  "A goose should not compare its wings to another’s. One of you is clearly showing off.",
  "The quiet pond is not empty. It is merely declining to participate.",
  "A wise goose knows the difference between a crisis and a goose being dramatic.",
  "To master the art of life, first master the art of not blocking the footpath.",
  "The goose who arrives with solutions is useful. The goose who arrives with pastries is beloved.",
  "A flock without rules is free. A flock without boundaries is in the neighbor’s kitchen.",
  "The best time to reconsider was yesterday. The next best time is before sending the email.",
  "A goose’s dignity is not lost when it slips. It is lost when it pretends that was intentional.",
  "Wisdom rarely shouts. It occasionally honks from behind a hedge.",
  "The pond does not care about your credentials, but it does notice your footwear.",
  "A wise goose leaves a legacy. A practical goose labels the leftovers.",
  "The flock respects courage, especially when courage is accompanied by a clear exit route.",
  "A goose who has never changed course has probably not checked the weather.",
  "Do not confuse being included with being consulted.",
  "The feathered mind seeks truth, then asks whether truth comes with dipping sauce.",
  "A goose may be born to lead, but it still has to answer the group message.",
  "The pond is a mirror, a workplace, and occasionally a courtroom.",
  "If you must make a scene, make it memorable and leave no breadcrumbs.",
  "The wise goose does not seek the last word. It seeks the last snack.",
  "A flock that laughs together can still file a formal complaint together.",
  "The path to greatness is long, winding, and poorly signposted near the reeds.",
  "A serious goose respects tradition. A funny goose asks who approved it.",
  "The finest wisdom is knowing when to speak, when to listen, and when to honk at a cyclist.",
  "Every goose has a purpose. Some purposes are best discovered away from the flower beds.",
  "A wise goose prepares for tomorrow. A legendary goose also brings snacks for today.",
  "The flock survives because someone always knows where the exit is.",
  "May your pond be calm, your bread be fresh, and your enemies slightly inconvenienced."
];

const GOOSE_QUOTES = [
  "To honk or not to honk; that is the question, and the answer is usually yes.",
  "A goose does not seek authority. It simply stands where authority was planning to walk.",
  "The pond’s constitution contains one amendment: the goose was here first.",
  "Every flock has a visionary, a skeptic, and one goose eating the evidence.",
  "A calm honk can move mountains. A loud honk can move pedestrians.",
  "The early goose gets the worm; the late goose gets plausible deniability.",
  "A goose with a clipboard is not necessarily in charge, but it has made a compelling case.",
  "The official goose position is under review, pending snacks and a favorable breeze.",
  "A noble goose protects the weak. A practical goose protects the bread from the weak.",
  "The flock calls it tradition when it remembers the rule, and innovation when it forgets it."
];

const HARRY_POTTER_QUOTES = [
  "It does not do to dwell on dreams and forget to live.",
  "After all this time? Always.",
  "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
  "I solemnly swear that I am up to no good.",
  "The ones that love us never really leave us.",
  "Expecto Patronum!",
  "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
  "Yer a wizard, Harry.",
  "I am what I am, an' I'm not ashamed.",
  "You're a wizard, Harry."
];
const HARRY_POTTER_CREDITS = ['Albus Dumbledore', 'Severus Snape', 'Albus Dumbledore', 'The Marauder’s Map', 'Sirius Black', 'Harry Potter', 'Albus Dumbledore', 'Rubeus Hagrid', 'Hagrid', 'Rubeus Hagrid'];

const PERCY_JACKSON_QUOTES = [
  "What belongs to the sea will always return to the sea.",
  "Even strength has to bow to wisdom sometimes.",
  "A hero’s fate is never happy. It is never anything but tragic.",
  "If my life is going to mean anything, I have to live it myself.",
  "Where’s the glory in repeating something others have done?",
  "Knowing too much of your future is never a good thing.",
  "Immortals are constrained by ancient rules. But a hero can go anywhere, challenge anyone, as long as he has the nerve.",
  "Families are messy. Immortal families are eternally messy. Sometimes the best we can do is to remind each other that we're related for better or for worse...and try to keep the maiming and killing to a minimum.",
  "Good deeds are always dangerous, boss.",
  "Sometimes mortals can be more horrible than monsters."
];
const PERCY_JACKSON_CREDITS = ['Nereid, Percy Jackson and the Lighting Thief', 'Annabeth Chase, Percy Jackson and the Lighting Thief', 'Poseidon, Percy Jackson and the Lighting Thief', 'Sally Jackson, Percy Jackson and the Lighting Thief', 'Luke Castellan, Percy Jackson and the Lighting Thief', 'Chiron, Percy Jackson and the Lighting Thief', 'Chiron, Percy Jackson and the Lighting Thief', 'Hermes, Percy Jackson and the Sea of Monsters', 'Blackjack, Percy Jackson and the Titan’s Curse', 'Zoe Nightshade, Percy Jackson and the Titan’s Curse'];

const DRAGON_PRINCE_POEM = "Do not ask how the ocean's blue,\nOr why the tides their time do keep,\nTo love is simply to know this:\nThe tides are true as the ocean is deep.";
const QUOTE_ENTRIES = [
  ...GOOSE_QUOTES.map(text => ({text, credit: 'GooseGames Editorial Flock, original'})),
  ...HARRY_POTTER_QUOTES.map((text, index) => ({text, credit: `${HARRY_POTTER_CREDITS[index]}, Harry Potter`})),
  ...PERCY_JACKSON_QUOTES.map((text, index) => ({text, credit: PERCY_JACKSON_CREDITS[index]})),
  {text: DRAGON_PRINCE_POEM, credit: 'Callum, The Dragon Prince'}
];

let lastIndex = -1;

function nextJoke(){
  let index = Math.floor(Math.random() * QUOTE_ENTRIES.length);
  while(QUOTE_ENTRIES.length > 1 && index === lastIndex) index = Math.floor(Math.random() * QUOTE_ENTRIES.length);
  lastIndex = index;
  return QUOTE_ENTRIES[index];
}

export function initJokeGenerator(){
  const button = document.getElementById('randomJokeHeaderBtn');
  if(!button || button.dataset.wired === '1') return;
  button.dataset.wired = '1';

  const modal = document.createElement('div');
  modal.id = 'jokeModal';
  modal.className = 'goose-modal-overlay';
  modal.innerHTML = `
    <div class="goose-modal-content joke-modal-content">
      <button class="modal-close-btn" id="closeJokeBtn" type="button" aria-label="Close joke">&times;</button>
      <div class="joke-kicker">FAMOUS WORDS, GOOSE EDITION</div>
      <div class="joke-icon" aria-hidden="true">🪿</div>
      <h2>Goose Games Quote Generator</h2>
      <p class="joke-text" id="jokeText"></p>
      <p class="quote-credit" id="quoteCredit"></p>
      <button class="btn btn-primary" id="anotherJokeBtn" type="button">another one!</button>
    </div>
  `;
  document.body.appendChild(modal);

  const jokeText = modal.querySelector('#jokeText');
  const quoteCredit = modal.querySelector('#quoteCredit');
  const showJoke = () => {
    const quote = nextJoke();
    jokeText.textContent = quote.text;
    quoteCredit.textContent = `— ${quote.credit}`;
    jokeText.classList.remove('joke-pop');
    void jokeText.offsetWidth;
    jokeText.classList.add('joke-pop');
  };
  const close = () => modal.classList.remove('open', 'show');
  button.addEventListener('click', () => { showJoke(); modal.classList.add('open', 'show'); });
  modal.querySelector('#anotherJokeBtn').addEventListener('click', showJoke);
  modal.querySelector('#closeJokeBtn').addEventListener('click', close);
  modal.addEventListener('click', event => { if(event.target === modal) close(); });
}
