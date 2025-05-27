import { IconProps } from "./types";

export const ViewIcon = ({ color, width, height }: IconProps) => {
  return (
    <svg
      width={width ?? "16"}
      height={height ?? "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99967 10.6654C9.47243 10.6654 10.6663 9.47146 10.6663 7.9987C10.6663 6.52594 9.47243 5.33203 7.99967 5.33203C6.52692 5.33203 5.33301 6.52594 5.33301 7.9987C5.33301 9.47146 6.52692 10.6654 7.99967 10.6654Z"
        fill={color ?? "#4BBAC1"}
      />
      <path
        d="M14 7.99935C14 7.99935 13.3333 2.66602 8 2.66602C2.66667 2.66602 2 7.99935 2 7.99935"
        stroke={color ?? "#4BBAC1"}
        stroke-width="1.33333"
      />
    </svg>
  );
};
