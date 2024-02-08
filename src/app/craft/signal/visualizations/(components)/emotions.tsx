import React, { useContext } from "react";
import { SignalDataContext } from "../page";
import EmotionBarGraph from "./emotionBarGraph";

const Emotions = () => {
  const data = useContext(SignalDataContext);
  const emotions = data?.emotions;

  return (
    <div>
      <h1>emotions</h1>
      <EmotionBarGraph></EmotionBarGraph>
    </div>
  );
};

export default Emotions;
