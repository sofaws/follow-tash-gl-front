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

  const hDisplay = h > 0 ? `${h}h` : '00h';
  const mDisplay = m > 0 ? m : '00';
  return hDisplay + mDisplay;
}

