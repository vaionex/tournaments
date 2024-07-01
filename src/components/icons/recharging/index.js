export default function Recharging(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        clipPath="url(#a)"
      >
        <path
          stroke="#959595"
          d="M4.692 3a6 6 0 0 0-1.663 1.647M2.124 6.806a6 6 0 0 0 0 2.339M3 11.308a6 6 0 0 0 1.647 1.663"
        />
        <path
          stroke="currentColor"
          d="M6.806 13.876a6 6 0 0 0 2.333 0M11.308 13a6 6 0 0 0 1.663-1.647M13.876 9.194a6 6 0 0 0 0-2.339M13 4.692a6 6 0 0 0-1.647-1.663M9.194 2.124a6 6 0 0 0-2.339-.013M8 5.333 6.667 8h2.666L8 10.667"
        />
        <path stroke="currentColor" d="M8 14A6 6 0 1 0 8 2" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="currentColor" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
