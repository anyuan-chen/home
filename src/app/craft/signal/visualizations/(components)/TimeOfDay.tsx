import React from "react";
import GoodMorningBarChart from "./goodMorningBarChart";

const TimeOfDay = () => {
  return (
    <div className="flex justify-between ">
      <div className="flex flex-col">
        <div>this is when we sleep...</div>
        <GoodMorningBarChart dataKey="sleepschedule"></GoodMorningBarChart>
      </div>
      <div className="flex flex-col">
        <div>....and when we wake up</div>
        <GoodMorningBarChart dataKey="goodmorning"></GoodMorningBarChart>
      </div>
    </div>
  );
};

export default TimeOfDay;
