
import { DetailedDataPoint, DataPoint, MovieKey } from './types';

export const storyArcRaw = [
  { point: 1,  label: "Opening image",          value: 1 },
  { point: 2,  label: "Setup",                   value: 2 },
  { point: 3,  label: "Theme stated",            value: 1 },
  { point: 4,  label: "Inciting incident",       value: -3 },
  { point: 5,  label: "Debate",                  value: -5 },
  { point: 6,  label: "Break into Act II",       value: 0 },
  { point: 7,  label: "B story",                 value: 2 },
  { point: 8,  label: "Fun and games begins",    value: -2 },
  { point: 9,  label: "Rising complications",    value: -4 },
  { point: 10, label: "Mid-crisis setup",        value: -6 },
  { point: 11, label: "Hope spot",               value: -3 },
  { point: 12, label: "Midpoint (reversal)",     value: 0 },
  { point: 13, label: "Escalation",              value: 1 },
  { point: 14, label: "Tension mounts",          value: -1 },
  { point: 15, label: "Bad guys close in",       value: -3 },
  { point: 16, label: "All is lost",             value: -8 },
  { point: 17, label: "Dark night of the soul",  value: -6 },
  { point: 18, label: "Break into Act III",      value: -2 },
  { point: 19, label: "Final approach",          value: 3 },
  { point: 20, label: "Climax",                  value: 6 },
  { point: 21, label: "Payoff",                  value: 8 },
  { point: 22, label: "Falling action",          value: 6 },
  { point: 23, label: "Denouement",              value: 4 },
  { point: 24, label: "Final image",             value: 7 }
];

export const storyArcData: DataPoint[] = storyArcRaw.map(item => ({
  x: item.point,
  value: item.value,
  label: item.label
}));

export const followingData: DetailedDataPoint[] = [
  { x: 1, value: 0, label: "Bill shadowing strangers", emotion: "Curiosity" },
  { x: 2, value: 1, label: "Setting the rules of following", emotion: "Control" },
  { x: 3, value: -1, label: "Everyone has a box (Theme)", emotion: "Obsession" },
  { x: 4, value: -3, label: "Caught by Cobb in the diner", emotion: "Embarrassment" },
  { x: 5, value: 2, label: "Cobb invites Bill to burgle", emotion: "Intrigue" },
  { x: 6, value: 4, label: "First break-in together", emotion: "Thrill" },
  { x: 7, value: 3, label: "Obsessing over the Blonde", emotion: "Infatuation" },
  { x: 8, value: 5, label: "Adopting Cobb's lifestyle", emotion: "Transformation" },
  { x: 9, value: 2, label: "Dating the Blonde", emotion: "Connection" },
  { x: 10, value: -4, label: "Blonde reveals blackmail plot", emotion: "Concern" },
  { x: 11, value: -2, label: "Planning to rob the safe", emotion: "Determination" },
  { x: 12, value: -6, label: "The robbery / Photos found", emotion: "Shock" },
  { x: 13, value: -5, label: "Realizing the danger", emotion: "Fear" },
  { x: 14, value: -8, label: "The hammer murder scene", emotion: "Horror" },
  { x: 15, value: -6, label: "Police suspicion grows", emotion: "Paranoia" },
  { x: 16, value: -9, label: "Framed for the murder", emotion: "Trapped" },
  { x: 17, value: -10, label: "Cobb disappears completely", emotion: "Abandonment" },
  { x: 18, value: -7, label: "Confessing to police", emotion: "Desperation" },
  { x: 19, value: -5, label: "Story doesn't add up", emotion: "Confusion" },
  { x: 20, value: -8, label: "Police search Bill's apartment", emotion: "Doom" },
  { x: 21, value: -9, label: "Evidence found planted", emotion: "Betrayal" },
  { x: 22, value: -10, label: "Bill realizes he is the mark", emotion: "Defeat" },
  { x: 23, value: -4, label: "Cobb watching in the crowd", emotion: "Coldness" },
  { x: 24, value: -8, label: "Alone in prison", emotion: "Isolation" },
];

export const mementoData: DetailedDataPoint[] = [
  { x: 1, value: 4, label: "Killing Teddy (The end is the beginning)", emotion: "Vengeance" },
  { x: 2, value: -2, label: "Waking up in the motel room", emotion: "Confusion" },
  { x: 3, value: -3, label: "Talking to 'Sammy' on the phone", emotion: "Loneliness" },
  { x: 4, value: 2, label: "Tattooing 'Fact 5'", emotion: "Purpose" },
  { x: 5, value: -4, label: "Meeting Natalie at the bar", emotion: "Suspicion" },
  { x: 6, value: -1, label: "Natalie tests Leonard (Spit drink)", emotion: "Disgust" },
  { x: 7, value: -5, label: "Remembering his wife's death", emotion: "Trauma" },
  { x: 8, value: 3, label: "Finding the Jaguar and suit", emotion: "Transformation" },
  { x: 9, value: 1, label: "Chasing Dodd (or being chased?)", emotion: "Adrenaline" },
  { x: 10, value: -6, label: "Discovering he attacked Dodd", emotion: "Guilt" },
  { x: 11, value: 2, label: "Sleeping with Natalie (False comfort)", emotion: "Intimacy" },
  { x: 12, value: -8, label: "Burning his wife's possessions", emotion: "Grief" },
  { x: 13, value: -7, label: "Hiring the escort to reenact the night", emotion: "Despair" },
  { x: 14, value: -4, label: "Meeting Teddy at the warehouse", emotion: "Distrust" },
  { x: 15, value: -2, label: "Arriving at the abandoned building", emotion: "Tension" },
  { x: 16, value: -9, label: "Killing Jimmy Grantz", emotion: "Horror" },
  { x: 17, value: -10, label: "Jimmy whispers 'Sammy'", emotion: "Shock" },
  { x: 18, value: -8, label: "Teddy reveals the truth (You're Sammy)", emotion: "Betrayal" },
  { x: 19, value: -5, label: "Leonard rejects the truth", emotion: "Denial" },
  { x: 20, value: -3, label: "Deciding to set up Teddy", emotion: "Calculation" },
  { x: 21, value: 0, label: "Writing 'Don't believe his lies'", emotion: "Determination" },
  { x: 22, value: 3, label: "Driving away, closing his eyes", emotion: "Relief" },
  { x: 23, value: 5, label: "The tattoo shop: 'I have to believe...'", emotion: "Hope" },
  { x: 24, value: 2, label: "Now... where was I?", emotion: "Identity" },
];

export const insomniaData: DetailedDataPoint[] = [
  { x: 1, value: 0, label: "Flying over glaciers", emotion: "Awe" },
  { x: 2, value: -1, label: "Arrival in Nightmute", emotion: "Discomfort" },
  { x: 3, value: -2, label: "Good cop can't sleep (Theme)", emotion: "Unease" },
  { x: 4, value: 1, label: "Setting the trap for the killer", emotion: "Focus" },
  { x: 5, value: -3, label: "Chasing into the fog", emotion: "Disorientation" },
  { x: 6, value: -9, label: "Dormer shoots Hap by mistake", emotion: "Horror" },
  { x: 7, value: -5, label: "Ellie investigates the scene", emotion: "Anxiety" },
  { x: 8, value: -4, label: "Hiding the shell casing", emotion: "Guilt" },
  { x: 9, value: -6, label: "Killer calls: 'I saw you'", emotion: "Paranoia" },
  { x: 10, value: -8, label: "Insomnia hallucination begins", emotion: "Exhaustion" },
  { x: 11, value: -2, label: "Meeting Finch on the ferry", emotion: "Suspicion" },
  { x: 12, value: -7, label: "Finch admits it / Blackmails Dormer", emotion: "Trapped" },
  { x: 13, value: -6, label: "Helping frame the boyfriend", emotion: "Corruption" },
  { x: 14, value: -5, label: "Ellie finds the 9mm casing", emotion: "Tension" },
  { x: 15, value: -8, label: "Finch's manipulation tightens", emotion: "Suffocation" },
  { x: 16, value: -9, label: "Dormer's guilt consumes him", emotion: "Despair" },
  { x: 17, value: -4, label: "Confessing to the hotel owner", emotion: "Unburdening" },
  { x: 18, value: -2, label: "Ellie goes to the lake house", emotion: "Danger" },
  { x: 19, value: 2, label: "Rushing to save Ellie", emotion: "Adrenaline" },
  { x: 20, value: 4, label: "Shootout at the lake house", emotion: "Climax" },
  { x: 21, value: 1, label: "Finch dead, Dormer shot", emotion: "Resolution" },
  { x: 22, value: 3, label: "'Let me sleep'", emotion: "Peace" },
  { x: 23, value: 5, label: "Stopping Ellie from hiding evidence", emotion: "Redemption" },
  { x: 24, value: 6, label: "The Midnight Sun fades (metaphorically)", emotion: "Rest" },
];

export const batmanBeginsData: DetailedDataPoint[] = [
  { x: 1, value: -5, label: "Young Bruce falls into the well", emotion: "Fear" },
  { x: 2, value: -9, label: "Parents murdered in the alley", emotion: "Trauma" },
  { x: 3, value: -6, label: "Chill's parole hearing", emotion: "Injustice" },
  { x: 4, value: -4, label: "Leaving Gotham to explore criminal mind", emotion: "Lost" },
  { x: 5, value: -3, label: "Bhutan prison fight", emotion: "Rage" },
  { x: 6, value: 2, label: "Ducard offers a path", emotion: "Hope" },
  { x: 7, value: 4, label: "Training with League of Shadows", emotion: "Growth" },
  { x: 8, value: 5, label: "Refusing to execute the criminal", emotion: "Integrity" },
  { x: 9, value: 3, label: "Saving Ducard from fire", emotion: "Compassion" },
  { x: 10, value: 6, label: "Return to Gotham with purpose", emotion: "Determination" },
  { x: 11, value: 4, label: "Meeting Gordon / Lucius Fox", emotion: "Alliance" },
  { x: 12, value: 7, label: "Creating the Batman persona", emotion: "Identity" },
  { x: 13, value: 8, label: "First night out: Falcone captured", emotion: "Success" },
  { x: 14, value: -2, label: "Scarecrow encounter, fear toxin", emotion: "Setback" },
  { x: 15, value: -4, label: "Faking drunken behavior at party", emotion: "Sacrifice" },
  { x: 16, value: -7, label: "Poisoned by Crane, on fire", emotion: "Fear" },
  { x: 17, value: 0, label: "Saved by Fox, antidote", emotion: "Recovery" },
  { x: 18, value: -6, label: "League attacks Gotham", emotion: "Crisis" },
  { x: 19, value: -8, label: "Wayne Manor burns down", emotion: "Loss" },
  { x: 20, value: 2, label: "Saving guests, gearing up", emotion: "Heroism" },
  { x: 21, value: 5, label: "Monorail fight vs Ra's al Ghul", emotion: "Climax" },
  { x: 22, value: 6, label: "I won't kill you, but I don't have to save you", emotion: "Resolution" },
  { x: 23, value: 7, label: "Buying back the company", emotion: "Restoration" },
  { x: 24, value: 8, label: "Gordon signals the Joker card", emotion: "The Call" },
];

export const prestigeData: DetailedDataPoint[] = [
  { x: 1, value: 0, label: "The water tank trick / Opening monologue", emotion: "Mystery" },
  { x: 2, value: 3, label: "Angier & Borden working as shills", emotion: "Friendship" },
  { x: 3, value: -8, label: "Julia dies in the water tank", emotion: "Tragedy" },
  { x: 4, value: -7, label: "Angier blames Borden at funeral", emotion: "Conflict" },
  { x: 5, value: -5, label: "The Bullet Catch sabotage", emotion: "Rivalry" },
  { x: 6, value: -4, label: "Borden meets Sarah / The secret", emotion: "Obsession" },
  { x: 7, value: -6, label: "The Transported Man debut", emotion: "Jealousy" },
  { x: 8, value: 2, label: "Angier travels to find Tesla", emotion: "Hope" },
  { x: 9, value: 4, label: "Borden's happy life with Sarah", emotion: "Love" },
  { x: 10, value: -3, label: "Sabotaging the bird cage trick", emotion: "Revenge" },
  { x: 11, value: 5, label: "Angier's new Transported Man", emotion: "Success" },
  { x: 12, value: -7, label: "Borden interferes, Angier breaks leg", emotion: "Cruelty" },
  { x: 13, value: -2, label: "Angier sends Olivia to spy", emotion: "Deceit" },
  { x: 14, value: 6, label: "Tesla's machine works (cloning)", emotion: "Power" },
  { x: 15, value: 8, label: "Angier's Real Transported Man", emotion: "Triumph" },
  { x: 16, value: -4, label: "Borden baffled and defeated", emotion: "Defeat" },
  { x: 17, value: -9, label: "Sarah commits suicide", emotion: "Tragedy" },
  { x: 18, value: -5, label: "Borden investigates backstage", emotion: "Trap" },
  { x: 19, value: -7, label: "Angier dies, Borden framed", emotion: "Twist" },
  { x: 20, value: -8, label: "Borden in prison, Lord Caldlow reveal", emotion: "Betrayal" },
  { x: 21, value: 5, label: "Fallon reveals himself as Borden", emotion: "Reveal" },
  { x: 22, value: 2, label: "Shooting Angier in the theater", emotion: "Revenge" },
  { x: 23, value: 6, label: "The secret of the twins explained", emotion: "Clarification" },
  { x: 24, value: 4, label: "The rows of tanks, abracadabra", emotion: "Awe" },
];

export const darkKnightData: DetailedDataPoint[] = [
  { x: 1, value: -2, label: "Joker's bank heist", emotion: "Chaos" },
  { x: 2, value: 5, label: "Batman stops Scarecrow / copycats", emotion: "Control" },
  { x: 3, value: 4, label: "Bruce believes in Harvey Dent", emotion: "Hope" },
  { x: 4, value: -3, label: "Joker kills Gambol", emotion: "Threat" },
  { x: 5, value: 7, label: "Lau extraction from Hong Kong", emotion: "Triumph" },
  { x: 6, value: -5, label: "Joker kills judge & commissioner", emotion: "Fear" },
  { x: 7, value: 6, label: "Bruce throws fundraiser for Dent", emotion: "Alliance" },
  { x: 8, value: -4, label: "Joker crashes the party", emotion: "Terror" },
  { x: 9, value: 2, label: "Batman saves Rachel", emotion: "Relief" },
  { x: 10, value: -7, label: "Loeb's funeral / Gordon 'dies'", emotion: "Loss" },
  { x: 11, value: -3, label: "Batman interrogates Maroni", emotion: "Desperation" },
  { x: 12, value: 8, label: "Truck flip chase / Gordon lives", emotion: "Victory" },
  { x: 13, value: -2, label: "Interrogation room with Joker", emotion: "Conflict" },
  { x: 14, value: -6, label: "Rachel & Dent kidnapped", emotion: "Panic" },
  { x: 15, value: -10, label: "Rachel dies in explosion", emotion: "Devastation" },
  { x: 16, value: -9, label: "Dent disfigured (Two-Face)", emotion: "Tragedy" },
  { x: 17, value: -5, label: "Joker targets Reese / Hospital blown", emotion: "Chaos" },
  { x: 18, value: -4, label: "The Ferry dilemma", emotion: "Tension" },
  { x: 19, value: 6, label: "Citizens refuse to blow up ferries", emotion: "Humanity" },
  { x: 20, value: 7, label: "Batman captures Joker", emotion: "Success" },
  { x: 21, value: -6, label: "Two-Face holds Gordon's family", emotion: "Horror" },
  { x: 22, value: -3, label: "Batman kills Dent to save boy", emotion: "Sacrifice" },
  { x: 23, value: -1, label: "Taking the blame / The Lie", emotion: "Burden" },
  { x: 24, value: 5, label: "Running into the dark / A Legend", emotion: "Myth" },
];

export const inceptionMovieData: DetailedDataPoint[] = [
  { x: 1, value: -2, label: "Waking up on the beach, confusion", emotion: "Unease" },
  { x: 2, value: -4, label: "Failed extraction mission against Saito", emotion: "Frustration" },
  { x: 3, value: -6, label: "Cobol Engineering threat, fleeing", emotion: "Anxiety" },
  { x: 4, value: 3, label: "Saito makes the offer for Inception", emotion: "Hope" },
  { x: 5, value: 5, label: "Recruiting Ariadne in Paris, dream physics", emotion: "Joy" },
  { x: 6, value: -5, label: "Mal sabotages the bridge test", emotion: "Fear" },
  { x: 7, value: 2, label: "Recruiting Eames and Yusuf", emotion: "Confidence" },
  { x: 8, value: -3, label: "Chase in Mombasa, narrow escape", emotion: "Tension" },
  { x: 9, value: 4, label: "Saito buys the airline, plan set", emotion: "Triumph" },
  { x: 10, value: 1, label: "Boarding the flight, mission begins", emotion: "Focus" },
  { x: 11, value: -6, label: "Train hits in rainy city, kidnapping goes wrong", emotion: "Shock" },
  { x: 12, value: -8, label: "Saito shot, limbo revelation", emotion: "Despair" },
  { x: 13, value: 3, label: "Eames impersonates Browning, planting idea", emotion: "Relief" },
  { x: 14, value: -2, label: "Van chase, defending the dreamer", emotion: "Tension" },
  { x: 15, value: 1, label: "Entering the Hotel level", emotion: "Focus" },
  { x: 16, value: 4, label: "Gravity shift fight hallway sequence", emotion: "Excitement" },
  { x: 17, value: 2, label: "Infiltrating the Snow Fortress", emotion: "Hope" },
  { x: 18, value: -9, label: "Mal shoots Fischer, mission failing", emotion: "Devastation" },
  { x: 19, value: -5, label: "Ariadne & Cobb drop into Limbo", emotion: "Uncertainty" },
  { x: 20, value: 7, label: "Confronting Mal, letting her go", emotion: "Catharsis" },
  { x: 21, value: 8, label: "Riding the kicks back up levels", emotion: "Thrill" },
  { x: 22, value: 6, label: "Waking up on the plane, silent nods", emotion: "Relief" },
  { x: 23, value: 9, label: "Through customs, arrival home", emotion: "Happiness" },
  { x: 24, value: 10, label: "Spinning the top, children turn around", emotion: "Elation" },
];

export const darkKnightRisesData: DetailedDataPoint[] = [
  { x: 1, value: -3, label: "Plane heist, Bane introduced", emotion: "Threat" },
  { x: 2, value: -5, label: "Dent Day, Bruce is a recluse", emotion: "Stagnation" },
  { x: 3, value: 0, label: "Selina Kyle steals pearls", emotion: "Intrigue" },
  { x: 4, value: -4, label: "Bane attacks stock exchange", emotion: "Violence" },
  { x: 5, value: 4, label: "The Bat returns to chase Bane", emotion: "Hope" },
  { x: 6, value: -3, label: "Bruce bankrupt, Daggett's plan", emotion: "Failure" },
  { x: 7, value: 2, label: "Trusting Miranda Tate", emotion: "Trust" },
  { x: 8, value: -5, label: "Catwoman leads Batman to Bane's trap", emotion: "Danger" },
  { x: 9, value: -10, label: "Bane breaks Batman's back", emotion: "Defeat" },
  { x: 10, value: -9, label: "Bruce wakes in the Pit", emotion: "Despair" },
  { x: 11, value: -8, label: "Gotham under siege, stadium explosion", emotion: "Chaos" },
  { x: 12, value: -7, label: "Police trapped underground", emotion: "Hopelessness" },
  { x: 13, value: -6, label: "Bruce fails the climb", emotion: "Failure" },
  { x: 14, value: 6, label: "Rising without the rope", emotion: "Triumph" },
  { x: 15, value: 5, label: "Return to Gotham on ice", emotion: "Determination" },
  { x: 16, value: 4, label: "Freeing the police force", emotion: "Rally" },
  { x: 17, value: 0, label: "War in the streets", emotion: "Conflict" },
  { x: 18, value: 5, label: "Batman defeats Bane", emotion: "Victory" },
  { x: 19, value: -7, label: "Talia al Ghul reveal", emotion: "Betrayal" },
  { x: 20, value: 2, label: "Chasing the bomb truck", emotion: "Tension" },
  { x: 21, value: 8, label: "Flying the bomb over the bay", emotion: "Sacrifice" },
  { x: 22, value: -4, label: "Alfred weeps at the grave", emotion: "Grief" },
  { x: 23, value: 7, label: "Blake finds the Batcave", emotion: "Legacy" },
  { x: 24, value: 10, label: "Alfred sees Bruce in Florence", emotion: "Happiness" },
];

export const interstellarMovieData: DetailedDataPoint[] = [
  { x: 1, value: -4, label: "Opening on Earth, dust storms, failing crops", emotion: "Frustration" },
  { x: 2, value: -2, label: "Cooper with family, school conflict", emotion: "Unease" },
  { x: 3, value: 2, label: "Discovering NASA’s secret base", emotion: "Hope" },
  { x: 4, value: -7, label: "Decision to leave family behind", emotion: "Anxiety" },
  { x: 5, value: 5, label: "Launch into space", emotion: "Joy" },
  { x: 6, value: 3, label: "Arrival at Saturn wormhole", emotion: "Confidence" },
  { x: 7, value: -6, label: "First planet (Miller’s water world), disaster", emotion: "Sadness" },
  { x: 8, value: -8, label: "Doyle’s death, time dilation shock", emotion: "Betrayal" },
  { x: 9, value: -9, label: "Return to Endurance, decades lost", emotion: "Devastation" },
  { x: 10, value: -7, label: "Watching Murph’s angry video messages", emotion: "Anxiety" },
  { x: 11, value: 1, label: "Journey to Mann’s planet", emotion: "Relief" },
  { x: 12, value: -8, label: "Mann’s betrayal", emotion: "Deep sadness" },
  { x: 13, value: -5, label: "Mann’s sabotage, Endurance damaged", emotion: "Tension" },
  { x: 14, value: 6, label: "Docking sequence (Cooper saves Endurance)", emotion: "Achievement" },
  { x: 15, value: -3, label: "Cooper decides to sacrifice himself", emotion: "Conflict" },
  { x: 16, value: -10, label: "Entering the black hole", emotion: "Despair" },
  { x: 17, value: 4, label: "Tesseract reveal, communication with Murph", emotion: "Satisfaction" },
  { x: 18, value: 8, label: "Cooper realizes love bridges dimensions", emotion: "Triumph" },
  { x: 19, value: 9, label: "Murph solves equation on Earth", emotion: "Celebration" },
  { x: 20, value: 6, label: "Cooper rescued near Saturn", emotion: "Relief" },
  { x: 21, value: 7, label: "Reunion with elderly Murph", emotion: "Happiness" },
  { x: 22, value: 2, label: "Murph urges Cooper to find Brand", emotion: "Hope" },
  { x: 23, value: 5, label: "Brand on Edmunds’ planet, new beginning", emotion: "Joy" },
  { x: 24, value: 10, label: "Closing image: humanity’s survival assured", emotion: "Elation" },
];

export const dunkirkData: DetailedDataPoint[] = [
  { x: 1, value: -6, label: "Propaganda leaflets falling, alone", emotion: "Isolation" },
  { x: 2, value: -8, label: "Ambushed at the barricade, running", emotion: "Terror" },
  { x: 3, value: -3, label: "Meeting Gibson, burying the soldier", emotion: "Solidarity" },
  { x: 4, value: -5, label: "Attempting to board with stretcher", emotion: "Rejection" },
  { x: 5, value: -9, label: "Hospital ship torpedoed, drowning", emotion: "Panic" },
  { x: 6, value: 2, label: "Mr. Dawson departs on the Moonstone", emotion: "Duty" },
  { x: 7, value: 0, label: "Farrier engages in first dogfight", emotion: "Focus" },
  { x: 8, value: -4, label: "Rescuing the Shivering Soldier", emotion: "Trauma" },
  { x: 9, value: -7, label: "The Mole under dive bomber attack", emotion: "Despair" },
  { x: 10, value: -5, label: "Hiding in the beached trawler", emotion: "Suspicion" },
  { x: 11, value: -8, label: "Collins ditches plane, canopy stuck", emotion: "Claustrophobia" },
  { x: 12, value: -6, label: "Shivering Soldier causes George's injury", emotion: "Conflict" },
  { x: 13, value: -5, label: "Target practice on the trawler", emotion: "Tension" },
  { x: 14, value: 5, label: "Farrier shoots down Heinkel", emotion: "Victory" },
  { x: 15, value: -8, label: "Trawler sinks, Gibson drowns", emotion: "Horror" },
  { x: 16, value: -9, label: "George dies on the boat", emotion: "Tragedy" },
  { x: 17, value: 3, label: "Seeing the Little Ships arrive", emotion: "Hope" },
  { x: 18, value: 4, label: "Moonstone rescues oil-slick survivors", emotion: "Relief" },
  { x: 19, value: 2, label: "Farrier out of fuel, gliding", emotion: "Sacrifice" },
  { x: 20, value: 6, label: "Soldiers board the Moonstone", emotion: "Salvation" },
  { x: 21, value: 5, label: "Collins saved by Peter", emotion: "Gratitude" },
  { x: 22, value: -2, label: "Train ride home, fearing scorn", emotion: "Anxiety" },
  { x: 23, value: 7, label: "Reading Churchill's speech", emotion: "Pride" },
  { x: 24, value: 8, label: "Farrier burns plane, captured", emotion: "Resilience" },
];

export const tenetData: DetailedDataPoint[] = [
  { x: 1, value: -4, label: "Opera House siege", emotion: "Confusion" },
  { x: 2, value: -6, label: "Torture and suicide pill", emotion: "Pain" },
  { x: 3, value: 2, label: "Waking up, 'Welcome to the Afterlife'", emotion: "Curiosity" },
  { x: 4, value: 1, label: "Learning about Inversion bullets", emotion: "Intrigue" },
  { x: 5, value: 4, label: "Bungee jumping into Mumbai penthouse", emotion: "Boldness" },
  { x: 6, value: -2, label: "Meeting Sator, threat established", emotion: "Danger" },
  { x: 7, value: 3, label: "Freeport plane crash heist", emotion: "Excitement" },
  { x: 8, value: -3, label: "Fighting inverted self in hallway", emotion: "Disorientation" },
  { x: 9, value: -5, label: "Sator threatens Kat on yacht", emotion: "Tension" },
  { x: 10, value: 5, label: "Tallinn highway heist success", emotion: "Adrenaline" },
  { x: 11, value: -7, label: "Sator captures Kat, temporal pincer", emotion: "Fear" },
  { x: 12, value: -8, label: "Inverted car crash, hypothermia", emotion: "Defeat" },
  { x: 13, value: -4, label: "Inverting to save Kat", emotion: "Desperation" },
  { x: 14, value: 1, label: "Fight in Freeport (other perspective)", emotion: "Realization" },
  { x: 15, value: 4, label: "Neil reveals he knew, friendship", emotion: "Trust" },
  { x: 16, value: -9, label: "Sator's dead man switch activated", emotion: "Doom" },
  { x: 17, value: 2, label: "Stalsk-12 temporal pincer begins", emotion: "War" },
  { x: 18, value: -5, label: "Ives and Protagonist trapped in tunnel", emotion: "Trapped" },
  { x: 19, value: -6, label: "The locked gate, Sator shoots Kat", emotion: "Frustration" },
  { x: 20, value: 6, label: "Inverted corpse unlocks gate (Neil)", emotion: "Sacrifice" },
  { x: 21, value: 8, label: "Retrieving algorithm, Kat kills Sator", emotion: "Victory" },
  { x: 22, value: -3, label: "Neil reveals he has to go back to die", emotion: "Tragedy" },
  { x: 23, value: 5, label: "Killing Priya to protect Kat", emotion: "Resolution" },
  { x: 24, value: 9, label: "Protagonist realizes he's the boss", emotion: "Mastery" },
];

export const oppenheimerData: DetailedDataPoint[] = [
  { x: 1, value: -5, label: "Young Oppie, visions, poison apple", emotion: "Anxiety" },
  { x: 2, value: 2, label: "Studying in Europe, quantum physics", emotion: "Growth" },
  { x: 3, value: 4, label: "Meeting Jean Tatlock", emotion: "Passion" },
  { x: 4, value: 6, label: "Teaching at Berkeley, theory expanison", emotion: "Ambition" },
  { x: 5, value: 5, label: "Groves recruits Oppenheimer", emotion: "Opportunity" },
  { x: 6, value: 7, label: "Building Los Alamos", emotion: "Creation" },
  { x: 7, value: -2, label: "Security clearance issues begin", emotion: "Suspicion" },
  { x: 8, value: -8, label: "Jean Tatlock's suicide", emotion: "Guilt" },
  { x: 9, value: -3, label: "Tension mounting before Trinity", emotion: "Stress" },
  { x: 10, value: -6, label: "The dark night before the test", emotion: "Dread" },
  { x: 11, value: 8, label: "Trinity Test detonation", emotion: "Awe" },
  { x: 12, value: -4, label: "Victory speech, visions of skin peeling", emotion: "Horror" },
  { x: 13, value: -7, label: "Bombing of Hiroshima/Nagasaki", emotion: "Conflict" },
  { x: 14, value: -5, label: "'Blood on my hands' with Truman", emotion: "Shame" },
  { x: 15, value: -3, label: "Strauss animosity grows (Isotopes)", emotion: "Politics" },
  { x: 16, value: 2, label: "Post-war fame", emotion: "Recognition" },
  { x: 17, value: -4, label: "Opposing the H-Bomb", emotion: "Resistance" },
  { x: 18, value: -9, label: "Security hearing begins, humiliation", emotion: "Persecution" },
  { x: 19, value: -6, label: "Roger Robb's interrogation", emotion: "Exposure" },
  { x: 20, value: 3, label: "Kitty testifies with strength", emotion: "Solidarity" },
  { x: 21, value: -8, label: "Clearance revoked, betrayal", emotion: "Defeat" },
  { x: 22, value: 5, label: "Hill testifies against Strauss", emotion: "Justice" },
  { x: 23, value: 6, label: "Strauss denied cabinet position", emotion: "Vindication" },
  { x: 24, value: -2, label: "Einstein conversation: We destroyed the world", emotion: "Acceptance" },
];

export const movies: MovieKey[] = [
    'Following',
    'Memento',
    'Insomnia',
    'Batman Begins', 
    'The Prestige', 
    'The Dark Knight', 
    'Inception', 
    'The Dark Knight Rises', 
    'Interstellar',
    'Dunkirk',
    'Tenet',
    'Oppenheimer'
];

export const movieColors: Record<MovieKey, string> = {
  'Following': '#f1f5f9', // Slate 100 (B&W feel)
  'Memento': '#34d399', // Emerald 400
  'Insomnia': '#7dd3fc', // Sky 300 (Ice Blue)
  'Batman Begins': '#94a3b8', // Slate
  'The Prestige': '#14b8a6', // Teal
  'The Dark Knight': '#3b82f6', // Blue
  'Inception': '#ef4444', // Red
  'The Dark Knight Rises': '#f97316', // Orange
  'Interstellar': '#6366f1', // Indigo
  'Dunkirk': '#06b6d4', // Cyan
  'Tenet': '#eab308', // Yellow
  'Oppenheimer': '#a855f7', // Purple
};

export const getMovieData = (key: MovieKey): DetailedDataPoint[] => {
    switch (key) {
        case 'Following': return followingData;
        case 'Memento': return mementoData;
        case 'Insomnia': return insomniaData;
        case 'Batman Begins': return batmanBeginsData;
        case 'The Prestige': return prestigeData;
        case 'The Dark Knight': return darkKnightData;
        case 'Inception': return inceptionMovieData;
        case 'The Dark Knight Rises': return darkKnightRisesData;
        case 'Interstellar': return interstellarMovieData;
        case 'Dunkirk': return dunkirkData;
        case 'Tenet': return tenetData;
        case 'Oppenheimer': return oppenheimerData;
        default: return interstellarMovieData;
    }
}

export const getMovieYear = (key: MovieKey): string => {
    switch (key) {
        case 'Following': return '1998';
        case 'Memento': return '2000';
        case 'Insomnia': return '2002';
        case 'Batman Begins': return '2005';
        case 'The Prestige': return '2006';
        case 'The Dark Knight': return '2008';
        case 'Inception': return '2010';
        case 'The Dark Knight Rises': return '2012';
        case 'Interstellar': return '2014';
        case 'Dunkirk': return '2017';
        case 'Tenet': return '2020';
        case 'Oppenheimer': return '2023';
        default: return '';
    }
}
