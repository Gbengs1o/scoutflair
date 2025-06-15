import Image, { StaticImageData } from "next/image";
import React from "react";
import { MdOutlineUpdate } from "react-icons/md";
// import Pic from "@/public/dashboard/scout/ellipse-2374.png"; // No longer needed
import { convertTime } from "@/functions/dateFunctions";

interface iUpdate {
  id: number;
  image: string | StaticImageData;
  content: string;
  date: Date;
}

const Updates = () => {
  // Array of the image URLs you provided
  const imageUrls = [
    "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002582_793_4993.png",
    "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1948.png",
    "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1973.png",
    "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_2071.png",
    "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1795.png",
  ];

  // Mock data now uses a different image for each update
  const updates: iUpdate[] = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    // Use an image from the array, cycling through if there are more updates than images
    image: imageUrls[i % imageUrls.length],
    content:
      "Scoutflair will roll out new features next month, available for premium users only.",
    date: new Date(),
  }));

  return (
    <div className="w-full shadow-custom rounded-2xl p-4 sm:p-5 bg-white flex flex-col">
      <div className="w-full justify-between items-center flex">
        <div className="flex gap-2 w-fit items-center text-dark">
          <MdOutlineUpdate size={22} />
          <h2 className="font-bold text-base sm:text-lg">Updates</h2>
        </div>
        <h4 className="text-dark text-xs sm:text-sm font-semibold cursor-pointer hover:underline">
          View All
        </h4>
      </div>
      <div className="flex flex-col mt-2">
        {updates.map((update) => (
          <div
            key={update.id}
            className="w-full flex p-3 gap-3 items-center border-t border-border-gray"
          >
            <Image
              src={update.image}
              alt="Update author"
              width={36}
              height={36}
              className="size-9 object-cover rounded-full flex-shrink-0"
            />
            {/* flex-1 allows text to take remaining space and wrap correctly */}
            <p className="flex-1 text-sm text-dark leading-snug">
              {update.content}
            </p>
            <p className="text-placeholder text-xs flex-shrink-0 self-start">
              {convertTime(update.date)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates;