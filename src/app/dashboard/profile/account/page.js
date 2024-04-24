"use client";
import UpdateProfileSection from "./update-profile-section";
import UpdateAvatar from "./update-avatar";
import UpdateBannerSection from "./update-banner-section";
import useUser from "@/hooks/auth/useUser";

export default function ProfileAccount() {
  const { data: user } = useUser();
  return (
    <div>
      <UpdateBannerSection />
      <div className="-mt-10 flex items-end justify-between">
        <div className="flex items-end gap-6">
          <UpdateAvatar />
          <div>
            <div className="mb-2">
              <div className="w-fit rounded-full bg-neutral-800 px-3 py-1 text-neutral-400">
                Strategic Genius
              </div>
            </div>
            <div className="text-3xl font-semibold">{user.username}</div>
            <div className="text-neutral-400">{user.email}</div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="divide-y-[1px] divide-neutral-800 [&_>_div]:py-6">
        <div>
          <h2 className="text-lg font-semibold">Account</h2>
          <div className="text-sm text-neutral-400">
            Control your profile, email address, and security
          </div>
        </div>
        <UpdateProfileSection />
        {/* <ChangePasswordSection /> */}
      </div>
    </div>
  );
}
