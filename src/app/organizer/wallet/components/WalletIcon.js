import * as React from "react";
const WalletIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={98}
    height={104}
    fill="none"
    {...props}
  >
    <path
      fill="url(#a-wallet)"
      fillRule="evenodd"
      d="M0 21.292C0 6.219 12.219-6 27.29-6h54.584c18.96 0 27.291 11.165 27.291 32.75H81.875c-12.058 0-21.834 9.775-21.834 21.833 0 12.058 9.776 21.834 21.834 21.834h27.291c0 20.067-8.331 32.75-27.291 32.75H27.29C12.22 103.167 0 90.947 0 75.875V21.292Zm21.833 0a5.458 5.458 0 0 1 5.459-5.459h21.833a5.458 5.458 0 0 1 0 10.917H27.29a5.458 5.458 0 0 1-5.458-5.458Z"
      clipRule="evenodd"
    />
    <path
      fill="url(#b-wallet)"
      fillRule="evenodd"
      d="M109.166 37.667V59.5H81.875c-6.03 0-10.917-4.887-10.917-10.917 0-6.029 4.887-10.916 10.917-10.916h27.291Zm-27.291 5.458a5.458 5.458 0 1 0 0 10.917h5.458a5.458 5.458 0 1 0 0-10.917h-5.458Z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="a-wallet"
        x1={90.062}
        x2={90.062}
        y1={-5.832}
        y2={102.999}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.1} />
        <stop offset={1} stopColor="#666" stopOpacity={0.02} />
      </linearGradient>
      <linearGradient
        id="b-wallet"
        x1={90.062}
        x2={90.062}
        y1={-5.832}
        y2={102.999}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.1} />
        <stop offset={1} stopColor="#666" stopOpacity={0.02} />
      </linearGradient>
    </defs>
  </svg>
);
export default WalletIcon;
