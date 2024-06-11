"use client";
import UpdateProfileSection from "./update-profile-section";
import UpdateAvatar from "./update-avatar";
import useUser from "@/hooks/auth/useUser";
import ChangePasswordSection from "./change-password-section";
import ChangeEmailSection from "./change-email-section";
import Social from "./Social";
import Steam from "@/components/icons/steam";
import EA from "@/components/icons/ea";
import Epic from "@/components/icons/epic";
import RankIcon from "@/components/icons/rank-icon";
import Row from "./row";
import { Button } from "@/components/ui/button";
import { Eye, LinkExternal01, Share06 } from "untitledui-js-base";

const socials = [
  { name: "Steam", id: "steam_id", icon: Steam },
  { name: "Electronic Arts", id: "ea_id", icon: EA },
  { name: "Epic Games", id: "epic_id", icon: Epic },
];

export default function ProfileAccount() {
  const { data: user } = useUser();

  return (
    <div>
      <div className="mt-10 flex items-end justify-between border-b border-white/10 pb-12">
        <div className="flex items-end gap-6">
          <UpdateAvatar />
          <div>
            <div className="mb-2">
              <div className="flex w-fit items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-neutral-400">
                <RankIcon rank={user.rank} className="size-5" />
                {user.rank}
              </div>
            </div>
            <div className="text-3xl font-semibold">{user.username}</div>
            <div className="text-neutral-400">User ID: {user.id}</div>
          </div>
        </div>
        <div className="space-x-4">
          <Button size="sm" variant="black" className="px-4 py-2.5">
            <Share06 className="size-5" />
            Share
          </Button>
          <Button size="sm" variant="black" className="px-4 py-2.5">
            <Eye className="size-5" />
            View Profile
            <LinkExternal01 className="size-5" />
          </Button>
        </div>
      </div>
      <div className="divide-y-[1px] divide-neutral-800 [&_>_div]:py-12">
        <UpdateProfileSection />

        <Row>
          <div>Social</div>

          <div className="space-y-2">
            {socials.map((social) => (
              <Social {...social} key={social.id} />
            ))}
          </div>
        </Row>
        {user?.identities?.some((identity) => identity.provider != "email") && (
          <>
            <ChangePasswordSection />
            <ChangeEmailSection />
          </>
        )}
      </div>
    </div>
  );
}
