import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

const title = "Tournaments.com";
const description =
  "Join Tournaments.com for the ultimate gaming and earn rewards";
export const metadata = {
  title,
  description,
  openGraph: {
    url: "https://tournaments.com",
    title,
    description,
    images: [
      {
        url: `https://tournaments.com/card.webp`, // Must be an absolute URL
        width: 1200,
        height: 615,
        alt: "Tournaments.com",
      },
    ],
    siteName: "Tournaments.com",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@Tournaments.com",
    images: [`https://tournaments.com/card.webp`],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black text-white">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
