export default function Connector(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={374}
      fill="none"
      {...props}
    >
      <path stroke="#fff" strokeDasharray="3 3" d="M12 0v104" />
      <g clipPath="url(#a)">
        <rect width={24} height={24} y={108} fill="#737373" rx={12} />
        <circle cx={12} cy={120} r={4} fill="#fff" />
      </g>
      <path stroke="#fff" d="M12 136v238" />
      <defs>
        <clipPath id="a">
          <rect width={24} height={24} y={108} fill="#fff" rx={12} />
        </clipPath>
      </defs>
    </svg>
  );
}
