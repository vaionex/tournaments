import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";
import { property } from "lodash";
import { z } from "zod";

export async function POST(req) {
  const tournamentData = await req.json();
  const { is_admin, id: user_id } = await getUserDetails();

  const schema = z
    .object({
      name: z.string().min(1, "Name is required"),
      description: z.string({ message: "Description is required" }),
      banner: z.string({ message: "Banner is required" }),
      format: z.string({ message: "Format is required" }),
      game_id: z.string({ message: "Game is required" }),
      matchmaking_key: z.string().default(""),
      server_ip: z.string().default(""),
      start: z.string({ message: "Start date is required" }),
      end: z.string({ message: "End date is required" }),
      max_players: z.number().min(1, "Atleast 1 player is required"),
      min_rank: z.string(),
      max_rank: z.string(),
      prizes: z
        .array(
          z.object({
            xp: z.number().min(0).optional().default(0),
            cash: z.number().min(0).optional().default(0),
            giftCard: z
              .object({
                label: z.string().min(1),
                file: z.string(),
              })
              .optional(),
            sponsorshipPercentage: z.number().min(0).max(100),
          }),
        )
        .nonempty({ message: "Atleast one prize is required" })
        .refine(
          (prizes) =>
            prizes
              .map(property("sponsorshipPercentage"))
              .reduce((a, b) => a + b, 0) == 100,
          "Total sponsorship percentage must be 100%",
        ),
      rules: z
        .array(
          z.object({
            title: z.string(),
            description: z.string(),
          }),
        )
        .default([]),
      sponsorship_target: z.number().min(0).optional().default(0),
      entry_fee: z.number().default(0),
    })
    .refine(
      ({ prizes, max_players }) => prizes.length <= max_players,
      "Max players cannot be less than prizes",
    )
    .refine(
      ({ matchmaking_key, server_ip }) => !!matchmaking_key || !!server_ip,
      "Either matchmaking key or server ip is required",
    );

  const { error, data: parsedData } = schema.safeParse(tournamentData);
  const status = is_admin ? "Approved" : "Pending";
  if (error) return Response.json({ error: error[0].message }, { status: 400 });

  const { data } = await admin
    .from("Tournament")
    .insert({ ...parsedData, status, user_id })
    .select()
    .throwOnError();

  return Response.json(data[0]);
}
