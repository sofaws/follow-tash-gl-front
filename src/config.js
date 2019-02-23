/**
 * Endpoint where glback API works
 * @type {string}
 */
export const API_URL = "https://gl-back.herokuapp.com";

/**
 * List of different possible statuses for a task on your gitlab
 * @type {string[]}
 */
export const STATUS = ["opened", "To Do", "Doing", "closed", "Blocked"];

/**
 * List of different types of tasks configured on your gitlab
 * @type {string[]}
 */
export const TYPES = ["Front", "Back", "BugFix", "Autres"];

/**
 * List of different lots of tasks configured on your gitlab
 * @type {string[]}
 */
export const LOTS = [
  "Séminaire",
  "Restaurant",
  "Multilingue",
  "Accueil",
  "Légal",
  "Accueil Back-office",
  "Atlas",
  "Authentification",
  "Bons Plans",
  "Accueil",
  "Cercle",
  "Culture & Loisirs",
  "Composant générique",
  "Droits Admin",
  "Fidélité",
  "Entity",
  "Historique",
  "Hôtel",
  "Page Globale"
];

/**
 * List of different ilots of tasks configured on your gitlab
 * @type {string[]}
 */
export const ILOTS = [
  "Ilot des Receptionnistes",
  "Ilot des Cuistos",
  "Ilot des Business-Man",
  "Ilot des Bonnes Affaires",
  "Ilot de la Fidélisation",
  "Ilot Tout-Terrain",
  "Ilot Connexion",
  "Ilot Responsive"
];

/**
 * Delays in minutes before each synchronization with the API
 * @type {number}
 */
export const TIME_TO_RELOAD = 1;

/**
 * GESTION OF COST
 */

const DEVELOPPER_COST = 25;
const INGENIOR_COST = 35;
const MANAGER_COST = 60;

export const DEFAULT_COST_BY_HOUR = DEVELOPPER_COST;
export const OTHERS_COST = {
  sofaws: MANAGER_COST,
  RochezBaptiste: MANAGER_COST,
  Jeremy84: MANAGER_COST,
  kevtro: MANAGER_COST,
  Gogoal: MANAGER_COST,
  benbb96: INGENIOR_COST,
  "cedric.scys": INGENIOR_COST,
  jeremymartinperso: INGENIOR_COST,
  aifedespaix: INGENIOR_COST,
  LMBK: INGENIOR_COST,
  manierka: INGENIOR_COST,
  maximeblanc: INGENIOR_COST,
  rebolaxx: INGENIOR_COST,
  oceanwave06: INGENIOR_COST,
  shosho: INGENIOR_COST,
  juliel: INGENIOR_COST,
  Bobtomses: INGENIOR_COST,
  pduthoit: INGENIOR_COST
};

/**
 * DESCRIPTION DES DEVELOPPEURS
 */
export const DESCRIPTION_DEFAULT =
  "Un grand développeur, comme tous les autres..";

export const DESCRIPTION_MEMBER = {
  sofaws: "Le plus grand développeur de G4",
  aifedespaix: "Le plus nul développeur de G4..",
  MaximeBlanc: "recherche un homme pas très futé"
};

/**
 * Time to alert the user who haven't put imputations.
 * @type {number[]}
 */
export const TIMES_IMPUTATIONS = [11, 15, 18];

/**
 * Members who are excluded from the non-affection list and not imputed list
 * @type {Array}
 */
export const EXCLUDE_MEMBERS = [
  "busbot",
  "le-boss-du-69",
  "sofaws",
  "aifedespaix",
  "Shosho",
  "Benbb96",
  "MaximeBlanc",
  "rebolaxx",
  "Gogoal",
  "jeremymartinperso",
  "Bobtomses",
  "LMBK",
  "kevtro",
  "cedric.scys",
  "pduthoit",
  "JulieL",
  "manierka",
  "OceanWave06",
  "Jeremy84",
  "RochezBaptiste"
];
