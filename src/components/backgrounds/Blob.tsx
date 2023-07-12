import * as React from "react"
const Blob = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={1100}
    height={1076}
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fill="#0038FF"
        fillRule="evenodd"
        d="M736.105 301.968c81.359 25.016 185.314 56.807 198.495 146.985 13.105 89.654-101.273 142.301-144.197 224.477-32.74 62.681-16.976 150.789-72.785 190.929-59.909 43.089-139.877 36.826-202.428 7.017-59.12-28.174-77.966-99.684-113.164-157.412-49.294-80.848-155.695-144.539-130.2-241.728 25.497-97.196 144.828-122.228 234.28-155.033 76.742-28.144 154.785-38.361 229.999-15.235Z"
        clipRule="evenodd"
      />
    </g>
    <g filter="url(#b)">
      <path
        fill="#FF00E5"
        fillOpacity={0.4}
        fillRule="evenodd"
        d="M531.197 199.628c76.386 7.394 162.231 8.584 207.027 70.896 43.288 60.214 20.015 141.283-4.072 211.422-20.293 59.091-65.638 97.857-115.203 135.896-77.58 59.538-147.319 162.332-242.121 138.331-102.869-26.043-156.502-140.776-177.99-244.692-20.918-101.161-7.195-215.885 68.137-286.569 67.882-63.694 171.569-34.251 264.222-25.284Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={1027.7}
        height={966.002}
        x={87.939}
        y={109.203}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_2064_45"
          stdDeviation={90}
        />
      </filter>
      <filter
        id="b"
        width={952.434}
        height={954.74}
        x={0}
        y={-5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_2064_45"
          stdDeviation={95}
        />
      </filter>
    </defs>
  </svg>
)
export default Blob
