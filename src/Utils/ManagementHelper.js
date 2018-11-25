
/**
 * calculates the skid of a task
 * @param estimated (second)
 * @param imputed (second)
 * @param raf (second)
 * @returns {number}
 */
export function getSkid(estimated: number, imputed: number, raf: number) {
  return (imputed + raf) - estimated;
}

/**
 * Calculate the progress of a task
 * @param imputed (second)
 * @param raf (second)
 * @returns {number}
 */
export function getProgress(imputed: number, raf: number) {
  return (imputed / (imputed / raf));
}

/**
 * Calculate the % progress of a task
 * @param imputed (second)
 * @param raf (second)
 * @returns {string}
 */
export function getPourcentProgress(imputed: number, raf: number) {
  return `${getProgress(imputed, raf) * 100}%`;
}
