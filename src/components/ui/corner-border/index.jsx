export default function CornerBorder({ children, ...props }) {
  return (
    <div className="bg-gradient-to-br from-white p-px">
      <div className="bg-black">{children}</div>
    </div>
  );
}
