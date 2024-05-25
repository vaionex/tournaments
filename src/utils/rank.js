export const RankDetails = {
  Bronze: {
    xp: 0,
  },
  Silver: {
    xp: 1000,
  },
  Gold: {
    xp: 2500,
  },
  Platinum: {
    xp: 5000,
  },
  Diamond: {
    xp: 10000,
  },
  Master: {
    xp: 20000,
  },
  Grandmaster: {
    xp: 50000,
  },
};

export const Ranks = Object.entries(RankDetails).map(([rank, { xp }]) => ({
  rank,
  startXP: xp,
  endXP: RankDetails[getNextRank(xp)]
    ? RankDetails[getNextRank(xp)]?.xp - 1
    : undefined,
}));

export function getRank(xp) {
  if (xp < 0) return "";

  return Object.entries(RankDetails)
    .reverse()
    .find(([, { xp: rankXP }]) => xp >= rankXP)?.[0];
}

export function getNextRank(xp) {
  const current = getRank(xp);
  const index = Object.keys(RankDetails).findIndex((rank) => rank == current);
  if (index < 0) return "";

  return Object.keys(RankDetails)[index + 1] ?? "";
}

export function getRankProgressPercentage(xp) {
  const current = getRank(xp);
  const next = getNextRank(xp);

  const currentRankXP = RankDetails[current]?.xp;
  const nextRankXP = RankDetails[next]?.xp;

  const total = nextRankXP - currentRankXP;
  return ((xp - currentRankXP) / total) * 100;
}