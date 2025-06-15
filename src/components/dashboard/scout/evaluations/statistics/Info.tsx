import React, { FC } from "react";
import { convertDateWithSlashes } from "@/functions/dateFunctions";
import { iPlayerFullDetails } from "@/hooks/scout";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";

const Info: FC<{ data: iPlayerFullDetails | null }> = ({ data }) => {
  if (data === null) {
    return <></>;
  }

  const names = data.fullName.split(" ");
  const firstName = names[0],
    lastName = names[1];

  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 px-5 gap-6 bg-white grid grid-cols-[1.5fr_3.5fr] relative">
      <p className="absolute top-2 right-3 text-12-14 font-medium text-dark">
        Edit
      </p>

      <div className="flex items-center gap-4">
        <ProfileImageOrTextAvatar
          size="size-[7rem]"
          image={data.imageUrl}
          name={data.fullName}
          radius="rounded-full"
          text="text-28-33"
        />

        <div className="flex flex-col gap-1">
          <p className="text-14-16 text-dark ">{firstName}</p>
          <h2 className="text-16-19 font-bold text-dark text-opacity-[0.92]">
            {lastName}
          </h2>
          {/* <Image
            className="size-5"
            src={info.country}
            alt={""}
            width={20}
            height={20}
          /> */}
          <h1 className="text-dark font-bold text-28-33">
            #{data.jerseyNumber}
          </h1>
        </div>
      </div>

      <div className="w-full grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-10-12 text-opacity-[0.88] text-dark font-medium">
            DATE OF BIRTH
          </p>
          <div className="border border-border-gray w-full py-1 flex items-center justify-center rounded-md text-14-16 font-medium text-dark">
            {convertDateWithSlashes(new Date(data.dob))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-10-12 text-opacity-[0.88] text-dark font-medium">
            HEIGHT
          </p>
          <div className="border border-border-gray w-full py-1 flex items-center justify-center rounded-md text-14-16 font-medium text-dark">
            {data.height !== "" ? data.height : "0"}cm
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-10-12 text-opacity-[0.88] text-dark font-medium">
            APPEARANCE
          </p>
          <div className="border border-border-gray w-full py-1 flex items-center justify-center rounded-md text-14-16 font-medium text-dark">
            {data.appearances}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-10-12 text-opacity-[0.88] text-dark font-medium">
            POSITION
          </p>
          <div className="border border-border-gray w-full py-1 flex items-center justify-center rounded-md text-14-16 font-medium text-dark">
            {data.position}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-10-12 text-opacity-[0.88] text-dark font-medium">
            WEIGHT
          </p>
          <div className="border border-border-gray w-full py-1 flex items-center justify-center rounded-md text-14-16 font-medium text-dark">
            {data.weight !== "" ? data.weight : "0"}kg
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-10-12 text-opacity-[0.88] text-dark font-medium">
            PREFERRED FOOT
          </p>
          <div className="border border-border-gray w-full py-1 flex items-center justify-center rounded-md text-14-16 font-medium text-dark">
            {data.preferredFoot}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
