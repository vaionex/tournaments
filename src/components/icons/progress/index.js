export default function Progress(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <g
        stroke="#E5E5E5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        clipPath="url(#a)"
      >
        <path d="M6.667 13.851a5.959 5.959 0 0 1-1.654-.646M9.333 2.149a6.002 6.002 0 0 1 0 11.702M3.053 11.395a5.975 5.975 0 0 1-.818-1.728M2.083 7a5.984 5.984 0 0 1 .6-1.783l.112-.204M4.605 3.053a5.97 5.97 0 0 1 2.062-.904" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
