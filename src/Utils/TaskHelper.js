import { STATUS, TYPES } from '../config';

/**
 * Return the status of a task
 * This function is useful because the state of a task
 * is in Labels attribute or in state attribute if its opened or closed
 * @param labels
 * @param state
 * @returns {string}
 */
export function getStatus(labels, state) {
  let status = null;
  labels.forEach((element) => {
    if (STATUS.includes(element)) status = element;
  });
  return status || state;
}


/**
 * Return the type of a task
 * @param labels
 * @param state
 * @returns {string}
 */
export function getTypeTask(labels) {
  let status = null;
  labels.forEach((element) => {
    if (TYPES.includes(element)) status = element;
  });
  return status;
}
