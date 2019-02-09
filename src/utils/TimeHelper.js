import { TIMES_IMPUTATIONS } from "../config";

/**
 * Transform second to human date (eg. 23h39)
 * @param d (number)
 * @returns {string}
 */
export function secondsToHms(d: number) {
  let Day = Number(d);
  if (Day < 0) Day *= -1;
  const h = Math.floor(Day / 3600);
  const m = Math.floor((Day % 3600) / 60);

  const hDisplay = h > 0 ? `${h}h` : "00h";
  const mDisplay = m > 0 ? m : "00";
  return hDisplay + mDisplay;
}

export function getActiveHour(hour: number) {
  let plageActive = TIMES_IMPUTATIONS.reduce((acc, time) => {
    if (time <= hour) {
      return time;
    }
    return acc;
  }, null);
  if (!plageActive) plageActive = TIMES_IMPUTATIONS[TIMES_IMPUTATIONS.length];
  return plageActive;
}
