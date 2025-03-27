"use client";

import Avatar from "@/components/ui/avatar";

export default function TestAvatarPage() {
  return (
    <div className="p-10 space-y-8">
      <h1 className="text-2xl font-bold mb-8">Avatar Component Test</h1>
      
      {/* Test 1: Default Avatar */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Test 1: Default Avatar</h2>
        <div className="flex gap-4">
          <Avatar profile_picture={null} src={null} xp={0} />
          <Avatar profile_picture={null} src={null} xp={0} className="size-12" />
          <Avatar profile_picture={null} src={null} xp={0} className="size-16" />
        </div>
      </div>

      {/* Test 2: Avatar with Profile Picture */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Test 2: Avatar with Profile Picture</h2>
        <div className="flex gap-4">
          <Avatar 
            profile_picture="https://supabase.co/storage/v1/object/public/user-public-images/avatars/example.jpg"
            src={null}
            xp={1000}
          />
          <Avatar 
            profile_picture="https://supabase.co/storage/v1/object/public/user-public-images/avatars/example.jpg"
            src={null}
            xp={5000}
            className="size-12"
          />
        </div>
      </div>

      {/* Test 3: Avatar with XP and Rank Border */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Test 3: Avatar with XP and Rank Border</h2>
        <div className="flex gap-4">
          <Avatar profile_picture={null} src={null} xp={100} />
          <Avatar profile_picture={null} src={null} xp={1000} />
          <Avatar profile_picture={null} src={null} xp={5000} />
          <Avatar profile_picture={null} src={null} xp={10000} />
        </div>
      </div>

      {/* Test 4: Avatar with Custom Container Class */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Test 4: Avatar with Custom Container Class</h2>
        <div className="flex gap-4">
          <Avatar 
            profile_picture={null} 
            src={null} 
            xp={0} 
            containerClassName="ring-2 ring-primary" 
          />
          <Avatar 
            profile_picture={null} 
            src={null} 
            xp={0} 
            containerClassName="ring-2 ring-primary rounded-lg" 
          />
        </div>
      </div>
    </div>
  );
} 