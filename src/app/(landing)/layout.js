import Footer from "./footer";
import Header from "./header";

export default function LandingLayout({ children }) {
  const links = [
    { name: "Home", href: "" },
    { name: "News", href: "" },
  ];
  return (
    <div className="">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
