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
 * Delays in minutes before each synchronization with the API
 * @type {number}
 */
export const TIME_TO_RELOAD = 1;
