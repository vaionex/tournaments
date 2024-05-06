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

export async function getTournaments() {
  const { data } = await supabase.from("Tournament").select("*").throwOnError();
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
