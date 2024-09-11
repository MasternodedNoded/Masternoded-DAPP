export const isTimesUp = (startTime, lockupDuration) => {
  try {
    const secondsInDay = parseFloat(24 * 60 * 60);
    let durationInSeconds = parseFloat(lockupDuration);
    let daysToAdd = parseFloat(durationInSeconds / secondsInDay);

    if (daysToAdd < 1) {
      lockupDuration = 0;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const endTime = Number(startTime) + Number(lockupDuration);

    const diffInSeconds = endTime - currentTime;

    if (diffInSeconds <= 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};

export function timeDifference(startTime, lockupDuration) {
  try {
    const secondsInDay = parseFloat(24 * 60 * 60);
    let durationInSeconds = parseFloat(lockupDuration);
    let daysToAdd = parseFloat(durationInSeconds / secondsInDay);

    if (daysToAdd < 1) {
      lockupDuration = 0;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const endTime = Number(startTime) + Number(lockupDuration);

    const diffInSeconds = endTime - currentTime;

    if (diffInSeconds <= 0) {
      return "0D 0H 0M 0S";
    }

    const days = Math.floor(diffInSeconds / (24 * 60 * 60));
    const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(diffInSeconds % 60);

    return `${days}D ${hours}H ${minutes}M ${seconds}S`;
  } catch (error) {
    console.log(error);
  }
}
