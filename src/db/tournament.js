import { supabase } from "@/supabase/client";
import { uploadPublicImage } from "./public-images";
import { pickBy } from "lodash";
import { v4 } from "uuid";
import { getUserId } from "@/supabase/utils";
import { api } from "@/utils/api";

export async function createTournament({ banner: bannerFile, ...rest }) {
  const banner = bannerFile
    ? await uploadPublicImage(bannerFile, `/tournaments/${v4()}`)
    : undefined;

  const { data } = await supabase
    .from("Tournament")
    .insert(
      pickBy(
        { ...rest, banner, user_id: await getUserId() },
        (value) => value != undefined,
      ),
    )
    .select()
    .throwOnError();
  return data[0];
}

export async function updateTournament(id, { banner: bannerFile, ...rest }) {
  const banner = bannerFile
    ? await uploadPublicImage(bannerFile, `/tournaments/${v4()}`)
    : undefined;

  await supabase
    .from("Tournament")
    .update(pickBy({ ...rest, banner }, (value) => value != undefined))
    .eq("id", id)
    .throwOnError();
}

export async function deleteTournament(id) {
  await api.post("tournament/delete", { id });
}

export async function getTournaments() {
  const { data } = await supabase
    .from("Tournament")
    .select("*, Game (*)")
    .throwOnError();
  return data.map(({ start, end, ...rest }) => ({
    ...rest,
    start: new Date(start),
    end: new Date(end),
  }));
}

export async function getUpcomingTournaments() {
  const { data } = await supabase
    .from("Tournament")
    .select("*, Game (*)")
    .gt("start", new Date().toISOString())
    .order("start")
    .throwOnError();
  return data;
}

export async function getPastTournaments({ limit = 9 } = {}) {
  const { data } = await supabase
    .from("Tournament")
    .select("*, Game (*)")
    .lt("end", new Date().toISOString())
    .order("end", { ascending: false })
    .limit(limit)
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
