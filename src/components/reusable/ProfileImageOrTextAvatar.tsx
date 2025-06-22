import React, { FC } from "react";

// The props interface remains the same to avoid breaking changes where the component is used.
// The 'image' prop will now be ignored.
const ProfileImageOrTextAvatar: FC<{
  image: string;
  name:string;
  radius: string;
  size: string;
  text?: string;
}> = ({ name, size, radius, text }) => {
  // All state, effects, and SVG designs have been removed as they are no longer needed.

  // The return statement is now simplified to always show the text-based initial.
  return (
    <div
      className={`${radius} ${size} text-white ${
        text !== undefined ? `${text}` : "text-16-19"
      } font-bold bg-primary-2 grid place-content-center`}
    >
      {/* It always displays the first letter of the 'name' prop */}
      {name.substring(0, 1)}
    </div>
  );
};

export default ProfileImageOrTextAvatar;