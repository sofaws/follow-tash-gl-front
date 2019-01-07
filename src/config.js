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
export const LOTS = ["LOT 1 - Restaurant", "LOT 2 - Hôtel"];

/**
 * List of different ilots of tasks configured on your gitlab
 * @type {string[]}
 */
export const ILOTS = ["Ilôt 1", "Ilôt 2"];

/**
 * Delays in minutes before each synchronization with the API
 * @type {number}
 */
export const TIME_TO_RELOAD = 1;


/**
 * GESTION OF COST
 */

const DEVELOPPER_COST = 60;
const MANAGER_COST = 100;

export const DEFAULT_COST_BY_HOUR = DEVELOPPER_COST;
export const OTHERS_COST = {
    "sofaws": MANAGER_COST,
};
