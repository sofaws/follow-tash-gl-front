
export function secondsToHms(d) {
  let Day = Number(d);
  if (Day < 0) Day *= -1;
  const h = Math.floor(Day / 3600);
  const m = Math.floor((Day % 3600) / 60);

  const hDisplay = h > 0 ? `${h}h` : '00h';
  const mDisplay = m > 0 ? m : '00';
  return hDisplay + mDisplay;
}

