import { IconProps } from "./types";

export const MoreIcon = ({ color, width, height }: IconProps) => {
  return (
    <svg
      width={width ?? "4"}
      height={height ?? "18"}
      viewBox="0 0 4 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8">
        <path
          d="M1.83891 15.6667H1.82394"
          stroke={color ?? "#313734"}
          strokeWidth="3.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.83915 9.00004H1.82418"
          stroke={color ?? "#313734"}
          strokeWidth="3.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.83915 2.33329H1.82418"
          stroke={color ?? "#313734"}
          strokeWidth="3.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
