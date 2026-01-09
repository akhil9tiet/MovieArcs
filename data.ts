
import { DetailedDataPoint, DataPoint, MovieKey, MovieMetadata } from './types';
import * as d3 from 'd3';

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

export const movieMetadata: Record<MovieKey, MovieMetadata> = {
  'Following': { year: 1998, boxOffice: 48482, imdbRating: 7.5, genre: "Neo-noir, Thriller" },
  'Memento': { year: 2000, boxOffice: 40047078, imdbRating: 8.4, genre: "Mystery, Thriller" },
  'Insomnia': { year: 2002, boxOffice: 113758770, imdbRating: 7.2, genre: "Psychological Thriller, Crime" },
  'Batman Begins': { year: 2005, boxOffice: 373672993, imdbRating: 8.2, genre: "Superhero, Action" },
  'The Prestige': { year: 2006, boxOffice: 109676311, imdbRating: 8.5, genre: "Drama, Mystery, Thriller" },
  'The Dark Knight': { year: 2008, boxOffice: 1006234167, imdbRating: 9.0, genre: "Superhero, Crime, Thriller" },
  'Inception': { year: 2010, boxOffice: 870792649, imdbRating: 8.8, genre: "Science Fiction, Action, Thriller" },
  'The Dark Knight Rises': { year: 2012, boxOffice: 1081169825, imdbRating: 8.4, genre: "Superhero, Action, Thriller" },
  'Interstellar': { year: 2014, boxOffice: 773430538, imdbRating: 8.7, genre: "Science Fiction, Adventure, Drama" },
  'Dunkirk': { year: 2017, boxOffice: 527016307, imdbRating: 7.9, genre: "War, Drama, Thriller" },
  'Tenet': { year: 2020, boxOffice: 365304105, imdbRating: 7.3, genre: "Science Fiction, Action, Thriller" },
  'Oppenheimer': { year: 2023, boxOffice: 960428540, imdbRating: 8.4, genre: "Biographical Drama, Historical" },
};

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
  { x: 6, value: -1, label: "Natalie tests Leonard", emotion: "Disgust" },
  { x: 7, value: -5, label: "Remembering his wife's death", emotion: "Trauma" },
  { x: 8, value: 3, label: "Finding the Jaguar and suit", emotion: "Transformation" },
  { x: 9, value: 1, label: "Chasing Dodd", emotion: "Adrenaline" },
  { x: 10, value: -6, label: "Discovering he attacked Dodd", emotion: "Guilt" },
  { x: 11, value: 2, label: "Sleeping with Natalie", emotion: "Intimacy" },
  { x: 12, value: -8, label: "Burning his wife's possessions", emotion: "Grief" },
  { x: 13, value: -7, label: "Hiring the escort to reenact", emotion: "Despair" },
  { x: 14, value: -4, label: "Meeting Teddy at the warehouse", emotion: "Distrust" },
  { x: 15, value: -2, label: "Arriving at the abandoned building", emotion: "Tension" },
  { x: 16, value: -9, label: "Killing Jimmy Grantz", emotion: "Horror" },
  { x: 17, value: -10, label: "Jimmy whispers 'Sammy'", emotion: "Shock" },
  { x: 18, value: -8, label: "Teddy reveals the truth", emotion: "Betrayal" },
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
  { x: 24, value: 6, label: "The Midnight Sun fades", emotion: "Rest" },
];

export const batmanBeginsData: DetailedDataPoint[] = [
  { x: 1, value: -2, label: "Falling into the well", emotion: "Fear" },
  { x: 2, value: -4, label: "Parent's murder", emotion: "Trauma" },
  { x: 3, value: -6, label: "Chill's trial / Falcone confrontation", emotion: "Impotence" },
  { x: 4, value: -2, label: "Training with Ra's al Ghul", emotion: "Empowerment" },
  { x: 5, value: 1, label: "Refusing to execute the prisoner", emotion: "Integrity" },
  { x: 6, value: 3, label: "Returning to Gotham", emotion: "Purpose" },
  { x: 7, value: 2, label: "Assembling the gear", emotion: "Preparation" },
  { x: 8, value: 5, label: "First night out (Falcone shipment)", emotion: "Triumph" },
  { x: 9, value: 2, label: "Investigating the drugs", emotion: "Detective" },
  { x: 10, value: -3, label: "Scarecrow toxins Batman", emotion: "Panic" },
  { x: 11, value: -5, label: "Saved by Alfred / Antidote", emotion: "Recovery" },
  { x: 12, value: 1, label: "Rachel discovers Dr. Crane", emotion: "Revelation" },
  { x: 13, value: 4, label: "Batman saves Rachel (Tumbler chase)", emotion: "Action" },
  { x: 14, value: 0, label: "Wayne Manor party / Earle fires Fox", emotion: "Conflict" },
  { x: 15, value: -2, label: "Ra's al Ghul returns", emotion: "Betrayal" },
  { x: 16, value: -8, label: "Wayne Manor burns", emotion: "Loss" },
  { x: 17, value: -6, label: "Gotham plunges into fear", emotion: "Chaos" },
  { x: 18, value: -3, label: "Gordon takes the Tumbler", emotion: "Hope" },
  { x: 19, value: 2, label: "Battle on the train", emotion: "Combat" },
  { x: 20, value: 6, label: "I won't kill you, but I don't have to save you", emotion: "Justice" },
  { x: 21, value: 8, label: "Train crash / Ra's defeat", emotion: "Victory" },
  { x: 22, value: 5, label: "Buying back the bank", emotion: "Success" },
  { x: 23, value: 4, label: "Talking to Gordon on the roof", emotion: "Alliance" },
  { x: 24, value: 6, label: "The Joker card", emotion: "Anticipation" },
];

export const thePrestigeData: DetailedDataPoint[] = [
  { x: 1, value: 0, label: "The transported man trick", emotion: "Wonder" },
  { x: 2, value: -2, label: "Julia dies in the water tank", emotion: "Tragedy" },
  { x: 3, value: -5, label: "The rivalry begins", emotion: "Hate" },
  { x: 4, value: -1, label: "Borden's secret life", emotion: "Mystery" },
  { x: 5, value: 2, label: "Angier spies on Borden", emotion: "Obsession" },
  { x: 6, value: 3, label: "Angier sabotages Borden", emotion: "Revenge" },
  { x: 7, value: -2, label: "Borden sabotages Angier", emotion: "Retaliation" },
  { x: 8, value: 1, label: "Meeting Tesla", emotion: "Hope" },
  { x: 9, value: -3, label: "Olivia double cross", emotion: "Deception" },
  { x: 10, value: -4, label: "Borden's Transported Man success", emotion: "Envy" },
  { x: 11, value: -6, label: "Angier becomes desperate", emotion: "Desperation" },
  { x: 12, value: 2, label: "Tesla's machine works", emotion: "Power" },
  { x: 13, value: 5, label: "The Real Transported Man", emotion: "Triumph" },
  { x: 14, value: 1, label: "Borden investigates backstage", emotion: "Suspicion" },
  { x: 15, value: -7, label: "Angier drowns (The duplicate)", emotion: "Horror" },
  { x: 16, value: -9, label: "Borden framed for murder", emotion: "Injustice" },
  { x: 17, value: -8, label: "Borden in prison", emotion: "Helplessness" },
  { x: 18, value: 4, label: "Lord Caldlow revealed as Angier", emotion: "Shock" },
  { x: 19, value: 6, label: "Fallon is the twin", emotion: "Revelation" },
  { x: 20, value: 8, label: "Borden shoots Angier", emotion: "Climax" },
  { x: 21, value: -2, label: "The prestige of the trick revealed", emotion: "Awe" },
  { x: 22, value: -5, label: "The tanks of dead clones", emotion: "Horror" },
  { x: 23, value: 1, label: "Borden reunites with daughter", emotion: "Peace" },
  { x: 24, value: 0, label: "Abracadabra", emotion: "Mystery" },
];

export const theDarkKnightData: DetailedDataPoint[] = [
  { x: 1, value: 5, label: "The Bank Heist", emotion: "Chaos" },
  { x: 2, value: 3, label: "Batman takes down Scarecrow", emotion: "Competence" },
  { x: 3, value: 4, label: "Harvey Dent's campaign", emotion: "Hope" },
  { x: 4, value: -2, label: "Joker crashes the mob meeting", emotion: "Threat" },
  { x: 5, value: 1, label: "Batman extracts Lau", emotion: "Success" },
  { x: 6, value: -4, label: "Joker kills 'Batman' copycat", emotion: "Terror" },
  { x: 7, value: -3, label: "Wayne penthouse party crash", emotion: "Danger" },
  { x: 8, value: -1, label: "Saving Rachel", emotion: "Relief" },
  { x: 9, value: -5, label: "Gordon 'killed' protecting Mayor", emotion: "Loss" },
  { x: 10, value: -2, label: "Dent claims he is Batman", emotion: "Sacrifice" },
  { x: 11, value: 2, label: "The chase sequence", emotion: "Action" },
  { x: 12, value: 6, label: "Truck flip / Gordon alive", emotion: "Victory" },
  { x: 13, value: -4, label: "Interrogation room", emotion: "Intensity" },
  { x: 14, value: -9, label: "Rachel dies / Dent burns", emotion: "Devastation" },
  { x: 15, value: -7, label: "Joker blows up hospital", emotion: "Anarchy" },
  { x: 16, value: -8, label: "Gotham evacuations / Two-Face rampage", emotion: "Fear" },
  { x: 17, value: -5, label: "The ferries dilemma", emotion: "Tension" },
  { x: 18, value: 2, label: "Sonar vision activation", emotion: "Determination" },
  { x: 19, value: 4, label: "Prewitt building assault", emotion: "Focus" },
  { x: 20, value: 7, label: "Joker captured / Ferries safe", emotion: "Triumph" },
  { x: 21, value: -6, label: "Standoff for Gordon's family", emotion: "Despair" },
  { x: 22, value: -3, label: "Dent falls / Batman takes blame", emotion: "Martyrdom" },
  { x: 23, value: 0, label: "The Dark Knight runs", emotion: "Legend" },
  { x: 24, value: 2, label: "A watchful protector", emotion: "Resolve" },
];

export const inceptionData: DetailedDataPoint[] = [
  { x: 1, value: -2, label: "Washed up on shore", emotion: "Confusion" },
  { x: 2, value: 2, label: "The extraction (Saito)", emotion: "Action" },
  { x: 3, value: -3, label: "Mal sabotages the dream", emotion: "Failure" },
  { x: 4, value: 1, label: "Saito's offer (Inception)", emotion: "Opportunity" },
  { x: 5, value: 3, label: "Recruiting the team", emotion: "Excitement" },
  { x: 6, value: 0, label: "Training Ariadne / Physics bending", emotion: "Wonder" },
  { x: 7, value: -4, label: "Cobb reveals Mal's projection", emotion: "Guilt" },
  { x: 8, value: 4, label: "The flight begins", emotion: "Anticipation" },
  { x: 9, value: -2, label: "Level 1: Rain / Kidnap", emotion: "Panic" },
  { x: 10, value: -5, label: "Saito shot / Limbo risk revealed", emotion: "Stakes" },
  { x: 11, value: 2, label: "Level 2: Hotel / Fischer hook", emotion: "Deception" },
  { x: 12, value: -3, label: "Mr. Charles routine", emotion: "Tension" },
  { x: 13, value: 3, label: "Level 3: Snow fortress", emotion: "Scale" },
  { x: 14, value: 5, label: "Zero-G hallway fight", emotion: "Spectacle" },
  { x: 15, value: -6, label: "Mal shoots Fischer", emotion: "Disaster" },
  { x: 16, value: -8, label: "All is lost (Mission failed?)", emotion: "Hopelessness" },
  { x: 17, value: -4, label: "Entering Limbo", emotion: "Risk" },
  { x: 18, value: -1, label: "Confronting Mal", emotion: "Catharsis" },
  { x: 19, value: 2, label: "Fischer saved / The Kick chain", emotion: "Momentum" },
  { x: 20, value: 6, label: "Waking up levels", emotion: "Relief" },
  { x: 21, value: 1, label: "Finding old Saito", emotion: "Resolution" },
  { x: 22, value: 5, label: "Waking on the plane", emotion: "Success" },
  { x: 23, value: 7, label: "Through customs", emotion: "Freedom" },
  { x: 24, value: 4, label: "The spinning top", emotion: "Ambiguity" },
];

export const darkKnightRisesData: DetailedDataPoint[] = [
  { x: 1, value: 2, label: "Plane extraction", emotion: "Spectacle" },
  { x: 2, value: -3, label: "Reclusive Bruce Wayne", emotion: "Decay" },
  { x: 3, value: -1, label: "Selina Kyle steals pearls", emotion: "Intrigue" },
  { x: 4, value: -4, label: "Bane attacks stock exchange", emotion: "Threat" },
  { x: 5, value: 1, label: "The Bat returns (Tunnel chase)", emotion: "Action" },
  { x: 6, value: -2, label: "Bruce loses his fortune", emotion: "Loss" },
  { x: 7, value: 0, label: "Trusting Miranda Tate", emotion: "Romance" },
  { x: 8, value: -5, label: "Catwoman leads Batman to Bane", emotion: "Betrayal" },
  { x: 9, value: -9, label: "Bane breaks the Bat", emotion: "Defeat" },
  { x: 10, value: -10, label: "Waking up in the Pit", emotion: "Despair" },
  { x: 11, value: -8, label: "Gotham under siege", emotion: "Oppression" },
  { x: 12, value: -6, label: "Gordon's resistance", emotion: "Struggle" },
  { x: 13, value: -4, label: "Attempting the climb (Fail)", emotion: "Failure" },
  { x: 14, value: -2, label: "The leap of faith (Rise)", emotion: "Resurrection" },
  { x: 15, value: 3, label: "Batman returns to Gotham", emotion: "Hope" },
  { x: 16, value: 5, label: "Freeing the police", emotion: "Rally" },
  { x: 17, value: 4, label: "War in the streets", emotion: "Battle" },
  { x: 18, value: 2, label: "Batman fights Bane", emotion: "Strength" },
  { x: 19, value: -7, label: "Talia al Ghul revealed", emotion: "Shock" },
  { x: 20, value: -3, label: "Chasing the bomb truck", emotion: "Urgency" },
  { x: 21, value: 6, label: "Flying the bomb over the bay", emotion: "Sacrifice" },
  { x: 22, value: -2, label: "Funeral", emotion: "Grief" },
  { x: 23, value: 7, label: "Blake finds the cave", emotion: "Legacy" },
  { x: 24, value: 8, label: "Alfred sees Bruce in Florence", emotion: "Peace" },
];

export const interstellarData: DetailedDataPoint[] = [
  { x: 1, value: -2, label: "Earth dying / Dust storms", emotion: "Desolation" },
  { x: 2, value: -1, label: "Murph's ghost / The coordinates", emotion: "Mystery" },
  { x: 3, value: 2, label: "Discovering NASA", emotion: "Wonder" },
  { x: 4, value: 0, label: "The mission choice", emotion: "Duty" },
  { x: 5, value: -5, label: "Leaving Murph behind", emotion: "Heartbreak" },
  { x: 6, value: 4, label: "Launch / Leaving Earth", emotion: "Awe" },
  { x: 7, value: 3, label: "Wormhole travel", emotion: "Transcendence" },
  { x: 8, value: 0, label: "Miller's Planet (Waves)", emotion: "Danger" },
  { x: 9, value: -6, label: "23 years lost", emotion: "Grief" },
  { x: 10, value: -4, label: "Messages from home", emotion: "Regret" },
  { x: 11, value: -1, label: "Mann's Planet debate", emotion: "Conflict" },
  { x: 12, value: -7, label: "Dr. Mann's betrayal", emotion: "Shock" },
  { x: 13, value: -5, label: "Docking sequence", emotion: "Intensity" },
  { x: 14, value: -3, label: "Slingshot maneuver", emotion: "Desperation" },
  { x: 15, value: -8, label: "Cooper detaches", emotion: "Sacrifice" },
  { x: 16, value: 5, label: "Inside the Tesseract", emotion: "Revelation" },
  { x: 17, value: 7, label: "Communicating with Murph", emotion: "Connection" },
  { x: 18, value: 6, label: "Murph solves gravity", emotion: "Eureka" },
  { x: 19, value: 3, label: "Tesseract closes", emotion: "Peace" },
  { x: 20, value: 4, label: "Cooper Station rescue", emotion: "Relief" },
  { x: 21, value: 5, label: "Reuniting with elderly Murph", emotion: "Closure" },
  { x: 22, value: 2, label: "No parent should watch their child die", emotion: "Bittersweet" },
  { x: 23, value: 6, label: "Stealing the ship", emotion: "Adventure" },
  { x: 24, value: 7, label: "Finding Brand", emotion: "Hope" },
];

export const dunkirkData: DetailedDataPoint[] = [
  { x: 1, value: -4, label: "Paper flyers / Ambush", emotion: "Fear" },
  { x: 2, value: -2, label: "The Beach (The Mole)", emotion: "Isolation" },
  { x: 3, value: 1, label: "Mr. Dawson's boat departs", emotion: "Duty" },
  { x: 4, value: 0, label: "Farrier in the Spitfire", emotion: "Focus" },
  { x: 5, value: -3, label: "Dive bombers attack beach", emotion: "Helplessness" },
  { x: 6, value: -1, label: "Picking up the shivering soldier", emotion: "Tension" },
  { x: 7, value: -5, label: "Torpedo hits the medical ship", emotion: "Panic" },
  { x: 8, value: 2, label: "Dogfight success", emotion: "Victory" },
  { x: 9, value: -6, label: "Soldiers hiding in the trawler", emotion: "Claustrophobia" },
  { x: 10, value: -4, label: "Tide rising / Holes in hull", emotion: "Dread" },
  { x: 11, value: 3, label: "Moonstone rescues pilot", emotion: "Relief" },
  { x: 12, value: -2, label: "George injured", emotion: "Tragedy" },
  { x: 13, value: 4, label: "Little ships arrive", emotion: "Hope" },
  { x: 14, value: -3, label: "Oil in the water", emotion: "Danger" },
  { x: 15, value: 5, label: "Farrier shoots down bomber", emotion: "Heroism" },
  { x: 16, value: -5, label: "Farrier out of fuel", emotion: "Sacrifice" },
  { x: 17, value: 2, label: "Rescuing soldiers from oil", emotion: "Action" },
  { x: 18, value: 6, label: "Evacuation success", emotion: "Triumph" },
  { x: 19, value: -1, label: "Farrier lands in enemy zone", emotion: "Acceptance" },
  { x: 20, value: 3, label: "Train ride home", emotion: "Anxiety" },
  { x: 21, value: 5, label: "Reading Churchill's speech", emotion: "Pride" },
  { x: 22, value: 4, label: "George is a hero", emotion: "Honor" },
  { x: 23, value: 2, label: "Farrier captured", emotion: "Stoicism" },
  { x: 24, value: 6, label: "The Spirit of Dunkirk", emotion: "Survival" },
];

export const tenetData: DetailedDataPoint[] = [
  { x: 1, value: 2, label: "Opera siege", emotion: "Action" },
  { x: 2, value: -3, label: "Torture / Cyanide pill", emotion: "Test" },
  { x: 3, value: 0, label: "Waking up / 'Tenet'", emotion: "Mystery" },
  { x: 4, value: 1, label: "Inverted bullets lab", emotion: "Curiosity" },
  { x: 5, value: -1, label: "Meeting Neil in Mumbai", emotion: "Alliance" },
  { x: 6, value: 2, label: "Bungee jump into Priya's", emotion: "Spectacle" },
  { x: 7, value: -2, label: "Meeting Kat / The painting", emotion: "Leverage" },
  { x: 8, value: 3, label: "Plane crash heist (Oslo)", emotion: "Heist" },
  { x: 9, value: 1, label: "Fighting inverted self", emotion: "Confusion" },
  { x: 10, value: -4, label: "Sator threatens Kat", emotion: "Threat" },
  { x: 11, value: 2, label: "Highway chase / Algorithm", emotion: "Intensity" },
  { x: 12, value: -6, label: "Sator shoots Kat (Inverted)", emotion: "Shock" },
  { x: 13, value: 0, label: "Inverting to save Kat", emotion: "Risk" },
  { x: 14, value: -1, label: "Return to Oslo Freeport", emotion: "Stealth" },
  { x: 15, value: 3, label: "Sator's plan revealed", emotion: "Stakes" },
  { x: 16, value: 1, label: "Temporal Pincer Movement plan", emotion: "Strategy" },
  { x: 17, value: 4, label: "Stalsk-12 battle begins", emotion: "Scale" },
  { x: 18, value: -2, label: "Tripwire / Volkov", emotion: "Obstacle" },
  { x: 19, value: -5, label: "Neil unlocks the gate (dies?)", emotion: "Sacrifice" },
  { x: 20, value: 6, label: "Protagonist secures Algorithm", emotion: "Victory" },
  { x: 21, value: 5, label: "Kat kills Sator", emotion: "Revenge" },
  { x: 22, value: 2, label: "Neil reveals he was recruited by Protag", emotion: "Friendship" },
  { x: 23, value: 4, label: "Neil walks back to die", emotion: "Fate" },
  { x: 24, value: 6, label: "Protagonist saves Kat / End", emotion: "Protector" },
];

export const oppenheimerData: DetailedDataPoint[] = [
  { x: 1, value: 0, label: "Prometheus stealing fire", emotion: "Foreboding" },
  { x: 2, value: -2, label: "Poison apple / Anxiety", emotion: "Instability" },
  { x: 3, value: 2, label: "Meeting Bohr / New Physics", emotion: "Inspiration" },
  { x: 4, value: 1, label: "Teaching at Berkeley", emotion: "Passion" },
  { x: 5, value: -1, label: "Jean Tatlock affair", emotion: "Complexity" },
  { x: 6, value: 3, label: "Groves recruits Oppenheimer", emotion: "Opportunity" },
  { x: 7, value: 4, label: "Building Los Alamos", emotion: "Creation" },
  { x: 8, value: 0, label: "Recruiting scientists", emotion: "Camaraderie" },
  { x: 9, value: -3, label: "Security clearance issues", emotion: "Suspicion" },
  { x: 10, value: -5, label: "Jean Tatlock suicide", emotion: "Guilt" },
  { x: 11, value: 1, label: "Trinity test preparations", emotion: "Focus" },
  { x: 12, value: -2, label: "Teller's H-bomb distraction", emotion: "Conflict" },
  { x: 13, value: 3, label: "The rain stops", emotion: "Relief" },
  { x: 14, value: 8, label: "Trinity Test detonation", emotion: "Awe" },
  { x: 15, value: 5, label: "Success speech / Hallucination", emotion: "Horror" },
  { x: 16, value: -4, label: "Bombing of Hiroshima/Nagasaki", emotion: "Weight" },
  { x: 17, value: -6, label: "Meeting Truman ('Crybaby')", emotion: "Humiliation" },
  { x: 18, value: -3, label: "Strauss animosity grows", emotion: "Politics" },
  { x: 19, value: -7, label: "Security clearance hearing", emotion: "Persecution" },
  { x: 20, value: -8, label: "Betrayal by Teller", emotion: "Isolation" },
  { x: 21, value: -9, label: "Clearance revoked", emotion: "Defeat" },
  { x: 22, value: 2, label: "Einstein conversation revealed", emotion: "Perspective" },
  { x: 23, value: 4, label: "Fermi Award / Rehabilitation", emotion: "Legacy" },
  { x: 24, value: -5, label: "Chain reaction of destruction", emotion: "Prophecy" },
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

export const cardBackgroundSections = [
  { section: 1, genre: "Neo-noir", color: "#000000" },
  { section: 2, genre: "Thriller", color: "#708090" },
  { section: 3, genre: "Mystery", color: "#4B0082" },
  { section: 4, genre: "Psychological Thriller", color: "#800000" },
  { section: 5, genre: "Crime", color: "#A52A2A" },
  { section: 6, genre: "Superhero", color: "#FF0000" },
  { section: 7, genre: "Action", color: "#FF4500" },
  { section: 8, genre: "Drama", color: "#4682B4" },
  { section: 9, genre: "Science Fiction", color: "#00FF7F" },
  { section: 10, genre: "Adventure", color: "#FFA500" },
  { section: 11, genre: "War", color: "#556B2F" },
  { section: 12, genre: "Biographical Drama", color: "#8B4513" },
  { section: 13, genre: "Historical", color: "#B8860B" },
  { section: 14, genre: "Thriller", color: "#708090" },
  { section: 15, genre: "Action", color: "#FF4500" },
  { section: 16, genre: "Drama", color: "#4682B4" },
  { section: 17, genre: "Science Fiction", color: "#00FF7F" },
  { section: 18, genre: "Superhero", color: "#FF0000" },
  { section: 19, genre: "Thriller", color: "#708090" },
  { section: 20, genre: "Action", color: "#FF4500" },
  { section: 21, genre: "Drama", color: "#4682B4" },
  { section: 22, genre: "Science Fiction", color: "#00FF7F" }
];

// Helper to interpolate colors
const interpolateColor = (color1: string, color2: string, factor: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color1);
    const result2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color2);
    if (!result || !result2) return color1;

    const r1 = parseInt(result[1], 16);
    const g1 = parseInt(result[2], 16);
    const b1 = parseInt(result[3], 16);

    const r2 = parseInt(result2[1], 16);
    const g2 = parseInt(result2[2], 16);
    const b2 = parseInt(result2[3], 16);

    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const getRatingColor = (rating: number): string => {
    // Range roughly 7.2 to 9.0
    // Tone: Cool (Blue) -> Cyan -> Green -> Yellow -> Orange -> Red (Hot/High Intensity)
    // Scale:
    // 7.2 - 7.5: Blue to Cyan
    // 7.5 - 8.0: Cyan to Green
    // 8.0 - 8.5: Green to Yellow
    // 8.5 - 9.0: Yellow to Red/Purple
    
    if (rating <= 7.2) return '#3b82f6'; // Blue 500
    if (rating >= 9.0) return '#b91c1c'; // Red 700

    if (rating < 7.5) {
        // 7.2 to 7.5
        const t = (rating - 7.2) / 0.3;
        return interpolateColor('#3b82f6', '#06b6d4', t); // Blue -> Cyan
    } else if (rating < 8.0) {
        // 7.5 to 8.0
        const t = (rating - 7.5) / 0.5;
        return interpolateColor('#06b6d4', '#22c55e', t); // Cyan -> Green
    } else if (rating < 8.5) {
        // 8.0 to 8.5
        const t = (rating - 8.0) / 0.5;
        return interpolateColor('#22c55e', '#eab308', t); // Green -> Yellow
    } else {
        // 8.5 to 9.0
        const t = (rating - 8.5) / 0.5;
        return interpolateColor('#eab308', '#ef4444', t); // Yellow -> Red
    }
};

export const movieColors: Record<MovieKey, string> = movies.reduce((acc, movie) => {
    const rating = movieMetadata[movie].imdbRating;
    acc[movie] = getRatingColor(rating);
    return acc;
}, {} as Record<MovieKey, string>);

export const getMovieData = (movie: MovieKey): DetailedDataPoint[] => {
  switch (movie) {
    case 'Following': return followingData;
    case 'Memento': return mementoData;
    case 'Insomnia': return insomniaData;
    case 'Batman Begins': return batmanBeginsData;
    case 'The Prestige': return thePrestigeData;
    case 'The Dark Knight': return theDarkKnightData;
    case 'Inception': return inceptionData;
    case 'The Dark Knight Rises': return darkKnightRisesData;
    case 'Interstellar': return interstellarData;
    case 'Dunkirk': return dunkirkData;
    case 'Tenet': return tenetData;
    case 'Oppenheimer': return oppenheimerData;
    default: return inceptionData;
  }
};

export const getMovieYear = (movie: MovieKey): number => {
    return movieMetadata[movie]?.year || 0;
};
