const RookieOrganizer = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 45 50"
    {...props}
  >
    <g filter="url(#a)" opacity={0.4}>
      <path
        fill="#155EEF"
        d="M43.5 45.172c-.375-.525-.9-.825-1.5-.825H23.475c1.725.9 2.85 2.625 2.85 4.65v.45h17.85v-2.025c0-.9-.225-1.65-.675-2.25Z"
      />
    </g>
    <g filter="url(#b)">
      <path
        fill="url(#c)"
        d="M21.15 45.322H4.5a3.681 3.681 0 0 0-3.675 3.675v.45h24v-.45a3.681 3.681 0 0 0-3.675-3.675Z"
      />
    </g>
    <g filter="url(#d)">
      <path
        fill="url(#e)"
        d="M4.5 43.747h16.875c1.8-4.425.075-8.025-1.725-11.85-1.575-3.375-3.225-6.825-2.625-11.1H8.55c.6 4.275-1.05 7.725-2.625 11.1-1.8 3.825-3.45 7.425-1.725 11.85h.3Z"
      />
      <path
        fill="#fff"
        d="M4.5 43.747h16.875c1.8-4.425.075-8.025-1.725-11.85-1.575-3.375-3.225-6.825-2.625-11.1H8.55c.6 4.275-1.05 7.725-2.625 11.1-1.8 3.825-3.45 7.425-1.725 11.85h.3Z"
      />
    </g>
    <g filter="url(#f)">
      <path fill="url(#g)" d="M5.325 15.172h15v4.05h-15v-4.05Z" />
    </g>
    <g filter="url(#h)">
      <path
        fill="url(#i)"
        d="M13.793 13.517a6.074 6.074 0 1 0-1.944-11.992 6.074 6.074 0 0 0 1.944 11.992Z"
      />
    </g>
    <path
      fill="url(#j)"
      d="M17.4 13.597h3.675c.45 0 .75.375.75.75v5.625c0 .45-.375.75-.75.75H18.6c-.6 3.975.9 7.125 2.475 10.5 1.65 3.525 3.375 7.2 2.25 11.55H40.5c.45-7.65-3.6-11.475-7.425-14.775-3-2.625-5.4-4.65-2.55-8.925 2.25 3.15 5.775 2.325 5.775 2.325.225 0 .45.075.6.15l2.55 2.1h2.025l2.55-2.025v-2.625l-6-6.75a.852.852 0 0 1-.225-.6c0-.225.15-.45.3-.525l1.125-.75-2.775-3-2.925-1.425c-.225-.075-.45-.3-.45-.6L32.7 2.722c0-.225-.3-.3-.45-.075l-1.575 2.1a.713.713 0 0 1-.75.3c-.075 0-5.175-.825-9.6 1.5.075.3.075.6.075.975a7.23 7.23 0 0 1-3 6.075Zm15.075-3.6c.3-.3.825-.3 1.125 0l1.125 1.05c.3.3.3.825 0 1.125a.852.852 0 0 1-.6.225.68.68 0 0 1-.525-.225l-1.125-1.05c-.3-.3-.3-.75 0-1.125Z"
    />
    <defs>
      <linearGradient
        id="c"
        x1={26.605}
        x2={25.087}
        y1={49.685}
        y2={41.487}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1E1D1D" />
        <stop offset={1} stopColor="#4A4A4A" />
      </linearGradient>
      <linearGradient
        id="e"
        x1={23.521}
        x2={0.838}
        y1={45.068}
        y2={27.952}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1E1D1D" />
        <stop offset={1} stopColor="#4A4A4A" />
      </linearGradient>
      <linearGradient
        id="g"
        x1={21.438}
        x2={19.204}
        y1={19.455}
        y2={11.78}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1E1D1D" />
        <stop offset={1} stopColor="#4A4A4A" />
      </linearGradient>
      <linearGradient
        id="i"
        x1={20.79}
        x2={6.651}
        y1={13.091}
        y2={3.679}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1E1D1D" />
        <stop offset={1} stopColor="#4A4A4A" />
      </linearGradient>
      <linearGradient
        id="j"
        x1={30.713}
        x2={30.713}
        y1={2.512}
        y2={42.772}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0C3689" />
        <stop offset={1} stopColor="#155EEF" />
      </linearGradient>
      <filter
        id="a"
        width={23.058}
        height={7.458}
        x={22.295}
        y={43.167}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1.178} dy={1.178} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.928409 0 0 0 0 0.978523 0 0 0 0 1 0 0 0 0.26 0" />
        <feBlend in2="shape" result="effect1_innerShadow_3024_36527" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-1.18} dy={-1.18} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend
          in2="effect1_innerShadow_3024_36527"
          result="effect2_innerShadow_3024_36527"
        />
      </filter>
      <filter
        id="b"
        width={122.032}
        height={102.157}
        x={-48.191}
        y={-3.694}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={24.508} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3024_36527"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_3024_36527"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1.178} dy={1.178} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.928409 0 0 0 0 0.978523 0 0 0 0 1 0 0 0 0.26 0" />
        <feBlend in2="shape" result="effect2_innerShadow_3024_36527" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-1.18} dy={-1.18} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend
          in2="effect2_innerShadow_3024_36527"
          result="effect3_innerShadow_3024_36527"
        />
      </filter>
      <filter
        id="d"
        width={116.696}
        height={120.982}
        x={-45.544}
        y={-28.218}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={24.508} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3024_36527"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_3024_36527"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1.178} dy={1.178} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.928409 0 0 0 0 0.978523 0 0 0 0 1 0 0 0 0.26 0" />
        <feBlend in2="shape" result="effect2_innerShadow_3024_36527" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-1.18} dy={-1.18} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend
          in2="effect2_innerShadow_3024_36527"
          result="effect3_innerShadow_3024_36527"
        />
      </filter>
      <filter
        id="f"
        width={113.032}
        height={102.082}
        x={-43.691}
        y={-33.843}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={24.508} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3024_36527"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_3024_36527"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1.178} dy={1.178} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.928409 0 0 0 0 0.978523 0 0 0 0 1 0 0 0 0.26 0" />
        <feBlend in2="shape" result="effect2_innerShadow_3024_36527" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-1.18} dy={-1.18} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend
          in2="effect2_innerShadow_3024_36527"
          result="effect3_innerShadow_3024_36527"
        />
      </filter>
      <filter
        id="h"
        width={110.183}
        height={110.182}
        x={-42.271}
        y={-47.571}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={24.508} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3024_36527"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_3024_36527"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1.178} dy={1.178} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.928409 0 0 0 0 0.978523 0 0 0 0 1 0 0 0 0.26 0" />
        <feBlend in2="shape" result="effect2_innerShadow_3024_36527" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-1.18} dy={-1.18} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend
          in2="effect2_innerShadow_3024_36527"
          result="effect3_innerShadow_3024_36527"
        />
      </filter>
    </defs>
  </svg>
);
export default RookieOrganizer;
