const categories = [
  { name: "FPS", count: 245 },
  { name: "MOBA", count: 89 },
  { name: "Battle Royale", count: 67 },
  { name: "Sports", count: 156 },
  { name: "Racing", count: 94 },
  { name: "Fighting", count: 78 },
  { name: "RPG", count: 312 },
  { name: "Strategy", count: 143 },
];

export default function GameCategories() {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="mb-6 text-xl font-bold">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-white/5"
          >
            <span className="font-medium text-white">{category.name}</span>
            <span className="text-sm text-neutral-400">{category.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}