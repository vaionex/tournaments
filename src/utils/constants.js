export const DISCORD_URL = "https://discord.gg/Sm2UTKFeaM";

export const SponsorshipShare = {
  Organizer: 0.2,
  Tournaments: 0.03,
  Winners: 0.77,
};

if (Object.values(SponsorshipShare).reduce((a, b) => a + b, 0) != 1)
  throw new Error("SponsorshipShare must add up to 1");
