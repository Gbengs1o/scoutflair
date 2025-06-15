"use client";

import { iPlayerFullDetails } from "@/hooks/scout";
import React, { FC, useState, useEffect, useRef } from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";

interface iTrait {
  name: string;
  value: number;
}

const traitNames = [
  "Speed", "Stamina", "Leadership", "Work Rate",
  "Composure", "Agility", "Tactical Awareness",
];

const getInitialTraits = (): iTrait[] => {
  return traitNames.map(name => ({ name, value: 0 }));
};

const generateRandomTraits = (): iTrait[] => {
  return traitNames.map((name) => ({
    name: name,
    value: Math.floor(Math.random() * 5) + 1,
  }));
};

// Component now accepts the `isLoading` prop
const Traits: FC<{ data: iPlayerFullDetails | null; isLoading: boolean; }> = ({ data, isLoading }) => {
  const [displayTraits, setDisplayTraits] = useState<iTrait[]>(getInitialTraits);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (data) {
      const realTraits: iTrait[] = [
        { name: "Speed", value: data.speed || 0 },
        { name: "Stamina", value: data.stamina || 0 },
        { name: "Leadership", value: data.leader || 0 },
        { name: "Work Rate", value: data.workRate || 0 },
        { name: "Composure", value: data.composure || 0 },
        { name: "Agility", value: data.agility || 0 },
        { name: "Tactical Awareness", value: data.tacticalAwareness || 0 },
      ];
      setDisplayTraits(realTraits);
    } 
    // This condition is met when the parent loader disappears but there's no data
    else if (!isLoading) {
      // Wait 1 second, then generate random data
      timeoutRef.current = setTimeout(() => {
        setDisplayTraits(generateRandomTraits());
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, isLoading]);

  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 px-4 sm:px-5 gap-5 bg-white flex flex-col justify-between">
      <div className="w-full flex justify-between items-center gap-4">
        <h2 className="text-dark font-bold text-16-19">Player Traits</h2>
        <p className="text-12-14 font-medium text-dark">Edit</p>
      </div>
      <div className="flex flex-col w-full gap-3">
        {displayTraits.map((trait, i) => (
          <div key={i} className="w-full flex items-center justify-between gap-2">
            <p className="text-12-14 text-dark">{trait.name}</p>
            <div className="w-fit flex gap-0.5 items-center">
              {Array(5)
                .fill(0)
                .map((_, id) =>
                  trait.value >= id + 1 ? (
                    <FaStar key={id} className="text-14-16 text-secondary-3" />
                  ) : (
                    <FaRegStar
                      key={id}
                      className="text-14-16 text-placeholder"
                    />
                  )
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Traits;