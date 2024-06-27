export default function Checks(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        clipPath="url(#a)"
      >
        <path d="M4.667 8 8 11.333l6.667-6.666M1.333 8l3.334 3.333M8 8l3.333-3.333" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
