import { DM_Sans } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Providers from "./(landing)/providers";

const dmSans = DM_Sans({ subsets: ["latin"] });

const title = "Gaming News & Reviews | Tournaments.com";
const description = "Your source for the latest gaming news, hardware reviews and esports coverage.";

export const metadata = {
  title,
  description,
  openGraph: {
    url: "https://tournaments.com",
    title,
    description,
    images: [
      {
        url: `https://tournaments.com/card.webp`,
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
    creator: "@Tournaments",
    images: [`https://tournaments.com/card.webp`],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black text-white">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
           defer
           data-domain="tournaments.com"
           src="https://plausible.ensidian.com/js/script.js"
         ></script>
      </head>
      <body className={dmSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
