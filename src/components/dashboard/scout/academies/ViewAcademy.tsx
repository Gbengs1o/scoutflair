import React, { FC } from "react";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { iAcademyResponse } from "@/hooks/academy";

const ViewAcademy: FC<{ academy: iAcademyResponse; onClose: () => void }> = ({
  academy,
  onClose,
}) => {
  const academyData = [
    { key: "Academy Name", value: academy.name },
    { key: "Coach Name", value: academy.principalOrCoach },
    { key: "Address", value: academy.address },
    { key: "Description", value: academy.description },
    { key: "State", value: academy.state },
    { key: "L.G.A", value: academy.lga },
    { key: "Geo Location", value: `${academy.latitude}, ${academy.longitude}` },
    { key: "Number of Players", value: academy.playersCount },
    { key: "Total Matches", value: academy.totalMatches },
    { key: "Win Count", value: academy.winCount },
    { key: "Lost Count", value: academy.lostCount },
    { key: "Graduated Count", value: academy.graduatedCount },
    { key: "Completed Count", value: academy.completedCount },
  ];

  const handleEdit = () => {
    const payload = Buffer.from(JSON.stringify(academy)).toString("base64");
    window.location.assign(`/dashboard/scout/academies/edit?data=${payload}`);
  };

  return (
    // This structure is PERFECT. `h-full` takes the height from the flexbox parent,
    // and `overflow-y-auto` ensures the content scrolls internally without breaking the layout.
    <div className="w-full p-4 sm:p-6 flex flex-col gap-5 bg-white h-full overflow-y-auto">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <IoMdArrowBack className="text-dark" size={24} />
          </button>
          <h2 className="text-dark/75 font-bold text-lg">Academy Details</h2>
        </div>
        <button onClick={handleEdit} className="p-1 rounded-full hover:bg-gray-100">
          <MdEdit className="text-dark" size={22} />
        </button>
      </div>

      <Image
        src={academy.imageUrl || "/images/placeholder.png"} // Fallback image
        alt={`${academy.name} image`}
        width={500}
        height={300}
        className="rounded-xl w-full h-48 object-cover bg-gray-200"
      />

      <div className="w-full flex flex-col divide-y divide-gray-200">
        {academyData.map((data, i) => (
          // Filtering out items with no value for a cleaner look
          data.value ? (
            <div key={i} className="grid grid-cols-2 items-start gap-4 py-3 text-sm">
                <p className="text-dark/70 font-medium">{data.key}:</p>
                <p className="text-dark font-semibold text-right">{data.value}</p>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default ViewAcademy;