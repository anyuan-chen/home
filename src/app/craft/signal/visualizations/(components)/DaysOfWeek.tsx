import React from "react";
import RadialBarsMesssagesDaysOfWeek from "./radialBarsMesssagesDaysOfWeek";

const DaysOfWeek = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="text-2xl font-medium">
        what days are we talking more on?
      </div>
      <RadialBarsMesssagesDaysOfWeek></RadialBarsMesssagesDaysOfWeek>
    </div>
  );
};

export default DaysOfWeek;
