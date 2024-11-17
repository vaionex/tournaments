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
  return (
    <div>
      <div className="to h-0.5 w-full bg-transparent bg-gradient-to-r from-transparent via-white" />
      <Container>
        <footer className="">
          <div className="flex flex-col items-center justify-center space-y-6 py-16">
            <Logo className="h-12" />
            <div className="max-w-3xl text-center text-xl">
              Compete against friends to claim victory on Tournaments.com today!
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 py-14 md:flex-row">
            <div>© 2024 Tournaments.com | All rights reserved.</div>
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
