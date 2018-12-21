import { STATUS, TYPES } from "../config";

/**
 * Return the status of a task
 * This function is useful because the state of a task
 * is in Labels attribute or in state attribute if its opened or closed
 * @param labels
 * @param state
 * @returns {string}
 */
export function getStatus(labels, state) {
  const status = labels.find(element => STATUS.includes(element));
  return status || state;
}

/**
 * Return the type of a task
 * @param labels
 * @returns {string}
 */
export function getTypeTask(labels) {
  const type = labels.find(element => TYPES.includes(element));
  return type;
}
