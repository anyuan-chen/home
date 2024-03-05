import React, { useContext } from "react";
import { SignalDataContext } from "../(components)/context";
import EmotionBarGraph from "./emotionBarGraph";

const Emotions = () => {
  const data = useContext(SignalDataContext);
  const cid = data?.cid;
  const emotions = data?.emotions[cid || ""];
  if (!emotions) {
    return <></>;
  }
  const sorted = Object.keys(emotions).sort(
    (a, b) => emotions[b] - emotions[a]
  );

  return (
    <div className="flex justify-between w-full space-x-12">
      <div className="flex flex-col space-between space-y-4">
        <h1 className="font-medium text-2xl">emotions</h1>
        <p>your primary emotions are</p>
        <div>
          {sorted.map((sorted) => {
            return (
              <p key={sorted}>
                {sorted}: {emotions[sorted]}
              </p>
            );
          })}
        </div>
        <p> umm.... this may not be accurate (please don&apos;t be accurate)</p>
      </div>
      <EmotionBarGraph></EmotionBarGraph>
    </div>
  );
};

export default Emotions;
