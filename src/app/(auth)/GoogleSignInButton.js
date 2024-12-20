"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/supabase/client";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure not to include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url.slice(0, url.length - 1) : url;
  return url;
};

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  async function handleClick() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getURL() + redirect,
      },
    });
    if (error) toast.error(error.message ?? "An unexpected error occured");
    window.location.href = data.url;
  }
  return (
    <Button variant="white" onClick={handleClick}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_507_567)">
          <path
            d="M24.2663 12.7764C24.2663 11.9607 24.2001 11.1406 24.059 10.3381H12.7402V14.9591H19.222C18.953 16.4494 18.0888 17.7678 16.8233 18.6056V21.6039H20.6903C22.9611 19.5139 24.2663 16.4274 24.2663 12.7764Z"
            fill="#4285F4"
          />
          <path
            d="M12.7401 24.5008C15.9766 24.5008 18.7059 23.4382 20.6945 21.6039L16.8276 18.6055C15.7517 19.3375 14.3627 19.752 12.7445 19.752C9.61388 19.752 6.95946 17.6399 6.00705 14.8003H2.0166V17.8912C4.05371 21.9434 8.2029 24.5008 12.7401 24.5008Z"
            fill="#34A853"
          />
          <path
            d="M6.00277 14.8003C5.50011 13.3099 5.50011 11.6961 6.00277 10.2057V7.11481H2.01674C0.314734 10.5056 0.314734 14.5004 2.01674 17.8912L6.00277 14.8003Z"
            fill="#FBBC04"
          />
          <path
            d="M12.7401 5.24966C14.4509 5.2232 16.1044 5.86697 17.3434 7.04867L20.7695 3.62262C18.6001 1.5855 15.7208 0.465534 12.7401 0.500809C8.2029 0.500809 4.05371 3.05822 2.0166 7.11481L6.00264 10.2058C6.95064 7.36173 9.60947 5.24966 12.7401 5.24966Z"
            fill="#EA4335"
          />
        </g>
        <defs>
          <clipPath id="clip0_507_567">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0.5 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
      Sign in with Google
    </Button>
  );
}
