import { BarChart02, PieChart01, ZoomIn } from "untitledui-js-base";

export default function Brand() {
  const features = [
    {
      title: (
        <div>
          <span className="text-[#66C61C]">Enhance</span> The Visibility Of Your Brand
        </div>
      ),
      description:
        "Partner with Tournaments.com to feature your brand in high-traffic  tournaments viewed by millions globally. Gain unmatched exposure through  live streams, in-game branding, and event promotions.",
      icon: <ZoomIn className="text-[#66C61C]" />,
    },
    {
      title: (
        <div>
          <span className="text-indigo-500">Drive</span> Engagement Through
           Exclusive Sponsorships
        </div>
      ),
      description:
        "As a sponsor, you'll be integrated into the community through custom  contests, featured streams, and player meet-and-greets. Our sponsorship  packages are designed to create meaningful engagement.",
      icon: <BarChart02 className="text-indigo-500" />,
    },
    {
      title: (
        <div>
          <span className="text-[#F04438]">Achieve </span>
          Unparalleled Market Reach 
        </div>
      ),
      description:
        "Tournaments.com offers sponsors direct access to a dedicated demographic  of gamers and tech enthusiasts. Utilize our analytics to gain insights  and tailor your marketing strategies for maximum impact.",
      icon: <PieChart01 className="text-[#F04438]" />,
    },
  ];
  return (
    <div className="mb-24">
      <div className="mb-12 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="flex-1 text-5xl font-bold leading-tight">
          <div className="max-w-lg">
            Empower Your Brand and Engage with Global Gamers
          </div>
        </div>
        <div className="flex-1 text-xl text-gray-300">
          Partner with Tournaments.com to tap into a vibrant and rapidly growing
          esports audience. Leverage our platform to showcase your brand, launch
          new products, and build lasting relationships with gamers worldwide.
        </div>
      </div>
      <div className="grid divide-y divide-white/20 border border-white/20 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {features.map(({ title, description, icon }, index) => (
          <div className="flex flex-col justify-between gap-8 p-6" key={index}>
            <div>
              <div
                className="mb-6 flex size-14 items-center justify-center rounded-lg"
                style={{
                  background:
                    "radial-gradient(at 10% 10%, #ffffff33 0%, #ffffff1f 80%)",
                }}
              >
                {icon}
              </div>
              <div className="text-2xl font-semibold">{title}</div>
            </div>
            <div className="text-gray-400">{description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
