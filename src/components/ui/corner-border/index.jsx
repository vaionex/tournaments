export default function CornerBorder({ children, ...props }) {
  return (
    <div
      className="bg-gradient-to-br from-white p-px"
      style={{
        background: "radial-gradient(at top left, white, black)",
      }}
    >
      <div className="bg-black">{children}</div>
    </div>
  );
}
