export const getFutureDate = (startTime, lockupDurations, index) => {
  if (index < 0 || index >= lockupDurations.length) {
    throw new Error("Invalid index");
  }

  const secondsInDay = BigInt(24 * 60 * 60);
  const durationInSeconds =
    BigInt(lockupDurations[index]) >= secondsInDay
      ? BigInt(lockupDurations[index])
      : BigInt(0);
  const startTimestamp = BigInt(startTime);
  const futureTimestamp = startTimestamp + durationInSeconds;

  const futureDate = new Date(Number(futureTimestamp) * 1000);

  return futureDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
