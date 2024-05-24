export default function LogoMark({ color, ...props }) {
  return (
    <svg
      width="72"
      height="35"
      viewBox="0 0 72 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.375L29.6515 32.3165L9.16005 22.8836L0 0.375Z"
        fill={color || "url(#paint0_linear_346_3518)"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71.1091 0.375L61.949 22.8836L41.4576 32.3165L71.1091 0.375Z"
        fill={color || "url(#paint1_linear_346_3518)"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.1399 15.2168L35.5137 34.132L21.8875 15.2168L35.4679 25.8283L49.1399 15.2168Z"
        fill={color || "url(#paint2_linear_346_3518)"}
      />
      <defs>
        <linearGradient
          id="paint0_linear_346_3518"
          x1="35.5545"
          y1="0.375"
          x2="35.5545"
          y2="32.3165"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2E90FA" />
          <stop offset="1" stopColor="#1D4DF8" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_346_3518"
          x1="35.5545"
          y1="0.375"
          x2="35.5545"
          y2="32.3165"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2E90FA" />
          <stop offset="1" stopColor="#1D4DF8" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_346_3518"
          x1="35.5137"
          y1="15.2168"
          x2="35.5137"
          y2="34.132"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#999999" />
        </linearGradient>
      </defs>
    </svg>
  );
}
