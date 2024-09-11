export function secondsToDays(seconds) {
  const secondsInMinute = 60;
  const secondsInHour = 60 * 60;
  const secondsInDay = 24 * 60 * 60;
  const secondsInMonth = 30 * secondsInDay; // Approximation of 1 month as 30 days
  const secondsInYear = 365 * secondsInDay;

  seconds = Number(seconds); // Convert BigInt to Number if necessary

  if (seconds < secondsInMinute) {
    return `${seconds}S`;
  } else if (seconds < secondsInHour) {
    const minutes = Math.floor(seconds / secondsInMinute);
    return `${minutes}M`;
  } else if (seconds < secondsInDay) {
    const hours = Math.floor(seconds / secondsInHour);
    return `${hours}H`;
  } else if (seconds < secondsInMonth) {
    const days = Math.floor(seconds / secondsInDay);
    return `${days}D`;
  } else if (seconds < secondsInYear) {
    const months = Math.floor(seconds / secondsInMonth);
    return `${months}MO`;
  } else {
    const years = Math.floor(seconds / secondsInYear);
    return `${years}Y`;
  }
}
