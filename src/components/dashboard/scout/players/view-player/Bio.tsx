"use client";

import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Loader } from "@mantine/core";

import ProfileIcon from "@/public/icons/Player Bio Profile.svg";
import DobIcon from "@/public/icons/Player Bio Dob.svg";
import CountryIcon from "@/public/icons/Player Bio Country.svg";
import FootIcon from "@/public/icons/Player Bio Foot.svg";
import HeightIcon from "@/public/icons/Player Bio Height.svg";
import WeightIcon from "@/public/icons/Player Bio Weight.svg";
import FBIcon from "@/public/icons/Facebook Icon.svg";
import TTIcon from "@/public/icons/Tiktok Icon.svg";
import IGIcon from "@/public/icons/IG Icon.svg";

import { convertDateFull } from "@/functions/dateFunctions";
import { iPlayerResponse } from "@/hooks/player";

const Bio: FC<{ data: iPlayerResponse | null }> = ({ data }) => {
  if (!data) {
    return (
      <div className="w-full h-96 shadow-custom rounded-2xl bg-white grid place-content-center">
        <Loader color="primary.6" />
      </div>
    );
  }

  const bioData = [
    { icon: ProfileIcon, text: data.fullName, label: "Full Name" },
    { icon: DobIcon, text: convertDateFull(data.dob), label: "Date of Birth" },
    { icon: CountryIcon, text: data.nationality, label: "Nationality" },
    { icon: FootIcon, text: data.preferredFoot, label: "Preferred Foot" },
    { icon: HeightIcon, text: `${data.height}cm`, label: "Height" },
    { icon: WeightIcon, text: `${data.weight}kg`, label: "Weight" },
  ];

  const socialLinks = [
    {
      href: data.igUrl,
      icon: IGIcon,
      label: "Instagram",
    },
    { href: data.ticTokUrl, icon: TTIcon, label: "Tiktok" },
    { href: data.facebookUrl, icon: FBIcon, label: "Facebook" },
  ];

  return (
    <div className="w-full h-fit shadow-custom rounded-2xl pt-5 pb-6 bg-white flex flex-col gap-4">
      <h2 className="text-lg text-dark font-bold px-5">Player Details</h2>
      <div className="flex flex-col w-full gap-4 px-5">
        <h3 className="text-dark text-base font-medium">Biography</h3>
        <p className="text-sm text-dark leading-relaxed">
          {data.biography || "No biography available."}
        </p>
      </div>

      <hr className="bg-[#E0E0E0] w-full" />
      <div className="px-5 flex flex-col gap-2">
        <h3 className="text-dark text-base font-medium">About</h3>
        {bioData.map(
          (item) =>
            item.text && (
              <div key={item.label} className="flex items-center gap-3">
                <Image
                  src={item.icon}
                  alt={`${item.label} icon`}
                  width={28}
                  height={28}
                  className="size-7"
                />
                <p className="text-sm text-dark font-medium">{item.text}</p>
              </div>
            )
        )}
      </div>

      <hr className="bg-[#E0E0E0] w-full" />
      <div className="px-5 flex flex-col gap-3">
        <h3 className="text-dark text-base font-medium">Social Media</h3>
        {/* Flex-wrap allows buttons to wrap on small screens */}
        <div className="flex flex-wrap items-center gap-2">
          {socialLinks.map(
            (link) =>
              link.href && (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border-gray rounded-full px-3 h-8 flex justify-center items-center gap-1.5 hover:bg-gray-100 transition-colors"
                >
                  <Image
                    src={link.icon}
                    alt={`${link.label} icon`}
                    className="size-5"
                    width={20}
                    height={20}
                  />
                  <p className="font-medium text-dark text-xs">{link.label}</p>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Bio;