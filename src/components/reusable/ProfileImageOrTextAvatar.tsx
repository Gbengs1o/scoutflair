import React, { FC } from "react";
import Image from "next/image";

const ProfileImageOrTextAvatar: FC<{
  image: string;
  name: string;
  radius: string;
  size: string;
  text?: string;
}> = ({ name, size, image, radius, text }) => {
  return (
    <div>
      {image.startsWith("https") ? (
        <Image
          src={image}
          alt="user image"
          className={`${radius} ${size} object-cover`}
          width={44}
          height={44}
        />
      ) : (
        <div
          className={`${radius} ${size} text-white ${
            text !== undefined ? `${text}` : "text-16-19"
          } font-bold bg-primary-2 grid place-content-center`}
        >
          {name.substring(0, 1)}
        </div>
      )}
    </div>
  );
};

export default ProfileImageOrTextAvatar;
