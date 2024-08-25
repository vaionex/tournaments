import { supabase } from "@/supabase/client";
import { uploadPublicImage } from "./public-images";
import { pickBy } from "lodash";
import { v4 } from "uuid";
import { getUserId } from "@/supabase/utils";
import { api } from "@/utils/api";

export async function createTournament({
  banner: bannerFile,
  prizes: _prizes,
  ...rest
}) {
  const banner = bannerFile
    ? await uploadPublicImage(bannerFile, `/tournaments/${v4()}`)
    : undefined;

  const prizes = _prizes
    ? await Promise.all(
        _prizes.map(async (prize) => ({
          ...prize,
          giftCard: prize.giftCard?.file
            ? {
                ...prize.giftCard,
                file: await uploadGiftCard(prize.giftCard.file, v4()),
              }
            : undefined,
        })),
      )
    : undefined;

  const { data } = await api.post(
    "tournament/create",
    pickBy(
      { ...rest, banner, user_id: await getUserId(), prizes },
      (value) => value != undefined,
    ),
  );
  return data;
}

export async function updateTournament({ banner: bannerFile, ...rest }) {
  const banner = bannerFile
    ? await uploadPublicImage(bannerFile, `/tournaments/${v4()}`)
    : undefined;

  await api.post(
    "tournament/update",
    pickBy({ ...rest, banner }, (value) => value != undefined),
  );
}

export async function deleteTournament(id) {
  await api.post("tournament/delete", { id });
}

export async function getTournaments({
  limit = 25,
  page = 1,
  minimum_prize_pool = 0,
  maximum_prize_pool = 99999999,
} = {}) {
  console.log({ minimum_prize_pool, maximum_prize_pool });
  const { data } = await supabase
    .from("Tournament")
    .select("*, Game (*)")
    .range(limit * (page - 1), limit * page - 1)
    .lte("prize_pool", maximum_prize_pool)
    .gte("prize_pool", minimum_prize_pool)
    .order("start", { ascending: false })
    .throwOnError();

  const { count } = await supabase
    .from("Tournament")
    .select("", { count: "exact", head: true })
    .lte("prize_pool", maximum_prize_pool)
    .gte("prize_pool", minimum_prize_pool);

  const tournaments = data.map(({ start, end, ...rest }) => ({
    ...rest,
    start: new Date(start),
    end: new Date(end),
  }));

  return { tournaments, total: count };
}

export async function getUpcomingTournaments() {
  const { data } = await supabase
    .from("Tournament")
    .select("*, Game (*)")
    .eq("status", "Approved")
    .gt("start", new Date().toISOString())
    .order("start")
    .throwOnError();
  return data;
}

export async function getPastTournaments({ limit = 9 } = {}) {
  const { data } = await supabase
    .from("Tournament")
    .select("*, Game (*)")
    .eq("status", "Approved")
    .lt("end", new Date().toISOString())
    .order("end", { ascending: false })
    .limit(limit)
    .throwOnError();
  return data;
}

export async function getPendingTournaments() {
  const { data } = await supabase
    .from("Tournament")
    .select("*, Game (*)")
    .eq("status", "Pending")
    .order("created_at")
    .throwOnError();
  return data;
}

export async function getTournament(id) {
  const { data } = await supabase
    .from("Tournament")
    .select("*, Game (*)")
    .eq("id", id)
    .throwOnError();
  return data[0];
}

export async function getParticipants(id) {
  const { data } = await supabase
    .from("Participant")
    .select("*, User (*)")
    .eq("tournament_id", id)
    .throwOnError();
  return data;
}

export async function joinTournament(tournament_id) {
  await api.post("tournament/join", { tournament_id });
}

export async function endTournament({ tournament_id, winners }) {
  await api.post("tournament/end", { tournament_id, winners });
}

export async function getTournamentChat(id) {
  const { data } = await supabase
    .from("TournamentChat")
    .select("*, User (*)")
    .eq("tournament_id", id)
    .order("created_at")
    .throwOnError();
  return data;
}

export async function sendTournamentChatMessage(id, message) {
  await supabase
    .from("TournamentChat")
    .insert({ tournament_id: id, message })
    .throwOnError();
}

export async function uploadGiftCard(file, path) {
  const GIFT_CARD_BUCKET = "gift-cards";

  const { data, error } = await supabase.storage
    .from(GIFT_CARD_BUCKET)
    .upload(path, file);

  if (error) throw error;
  const { path: filePath } = data;
  const {
    data: { publicUrl },
  } = supabase.storage.from(GIFT_CARD_BUCKET).getPublicUrl(filePath);
  return publicUrl + `?id=${Math.random().toString()}`;
}
