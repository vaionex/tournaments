import Container from "@/components/ui/container";
import Logo from "@/components/ui/logo";
import Link from "next/link";

const links = [
  { name: "Tournaments", href: "" },
  { name: "Subscriptions", href: "" },
  { name: "News", href: "" },
  { name: "Discord", href: "" },
];
export default function Footer() {
  return (
    <div>
      <div className="bg-gradient-to-r from-transparent via-white to bg-transparent w-full h-0.5" />
      <Container>
        <footer className="">
          <div className="flex flex-col items-center justify-center space-y-6 py-16">
            <Logo className="h-12" />
            <div className="text-xl max-w-3xl text-center">
              Immerse yourself in adrenaline-pumping battles and compete against
              the best to claim your victory on Tournaments.com today!
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between py-14 border-t border-gray-800 gap-4">
            <div>© 2024 Tournaments.com | All rights reserved.</div>
            <div className="flex gap-8 flex-wrap">
              {links.map(({ name, href }) => (
                <Link href={href} key={href}>{name}</Link>
              ))}
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
}
