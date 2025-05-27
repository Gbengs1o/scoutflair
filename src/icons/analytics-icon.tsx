import { IconProps } from "./types";

export const AnalyticsIcon = ({ color, width, height }: IconProps) => {
  return (
    <svg
    width={width ?? "148"}
      height={height ?? "106"}
      viewBox="0 0 138 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.92">
        <path
          d="M102.333 109V95.6667M69 109V89M35.6667 109V75.6667M29 35.6667C50.3133 57.4534 77.2267 62.8733 103.273 55.6133M93.5867 45.48L107.413 52.2534C109.053 53.06 109.493 54.92 108.4 56.4134L99.18 69"
          stroke="currentColor"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.6665 69C5.6665 39.1467 5.6665 24.2134 14.9398 14.94C24.2132 5.66669 39.1398 5.66669 68.9998 5.66669C98.8532 5.66669 113.786 5.66669 123.06 14.94C132.333 24.2134 132.333 39.14 132.333 69C132.333 98.8534 132.333 113.787 123.06 123.06C113.786 132.333 98.8598 132.333 68.9998 132.333C39.1465 132.333 24.2132 132.333 14.9398 123.06C5.6665 113.787 5.6665 98.86 5.6665 69Z"
          stroke="currentColor"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};
