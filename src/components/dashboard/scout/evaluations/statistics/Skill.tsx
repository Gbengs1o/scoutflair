"use client";

import { iPlayerFullDetails } from "@/hooks/scout";
import React, { FC } from "react";

interface iMetric {
  name: string;
  value: number;
}

const SkillMetrics: FC<{ data: iPlayerFullDetails | null }> = ({ data }) => {
  if (data === null) {
    return <> </>;
  }

  const metrics: iMetric[] = [
    {
      name: "LONG SHOTS",
      value: data.longShots,
    },
    {
      name: "DIRECT FREE KICKS",
      value: data.freeKicks,
    },
    {
      name: "AERIAL DUELS",
      value: data.skillAerialDuels,
    },
    {
      name: "DRIBBLING",
      value: data.skillDribbling,
    },
    {
      name: "ONE-ON-ONE",
      value: data.oneToOne,
    },
    {
      name: "HEADER",
      value: data.header,
    },
    {
      name: "FITNESS",
      value: data.fitness,
    },
    {
      name: "ACCURACY",
      value: data.accuracy,
    },
    {
      name: "SHOT POWER",
      value: data.shotPower,
    },
  ];

  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 px-5 gap-5 bg-white flex flex-col justify-between">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-dark font-bold text-16-19">Skill Metrics</h2>
        <p className="text-12-14 font-medium text-dark">Edit</p>
      </div>
      <div className="flex flex-col w-full gap-3">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="w-full text-dark px-1 flex items-center justify-between rounded py-1.5"
          >
            <p className="text-12-14 font-semibold">{metric.name}</p>
            <p className="text-10-12 font-medium">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillMetrics;
