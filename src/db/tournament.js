import { supabase } from "@/supabase/client";
import { uploadPublicImage } from "./public-images";
import { pickBy } from "lodash";
import { v4 } from "uuid";

export async function createTournament({ banner: bannerFile, ...rest }) {
  const banner = bannerFile
    ? await uploadPublicImage(bannerFile, `/tournaments/${v4()}`)
    : undefined;

  const { data } = await supabase
    .from("Tournament")
    .insert(pickBy({ ...rest, banner }, (value) => value != undefined))
    .select()
    .throwOnError();
  return data[0];
}

export async function getTournaments(supabaseClient = supabase) {
  const { data } = await supabaseClient
    .from("Tournament")
    .select("*")
    .throwOnError();
  return data;
}

export async function getTournament(id) {
  const { data } = await supabase
    .from("Tournament")
    .select("*")
    .eq("id", id)
    .throwOnError();
  return data[0];
}
