import Container from "@/components/ui/container";
import Logo from "@/components/ui/logo";
import { DISCORD_URL } from "@/utils/constants";
import Link from "next/link";

const links = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Responsible Gaming and Security", href: "/responsible-gaming" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Accessibility", href: "/accessibility" },
  { name: "Discord", href: DISCORD_URL },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="mt-32 pb-16">
      <div className="mb-16 h-0.5 w-full bg-transparent bg-gradient-to-r from-transparent via-white" />
      <Container>
        <footer className="pt-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <Logo className="h-12" />
            <div className="max-w-3xl text-center text-xl">
              Your source for the latest gaming news, hardware reviews and esports coverage
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-800 py-14 md:flex-row">
            <div>© {currentYear} Tournaments.com | All rights reserved.</div>
            <div className="flex flex-wrap gap-8">
              {links.map(({ name, href }, index) => (
                <Link href={href} key={index}>
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
}