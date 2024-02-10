"use client";
import React, { useContext, useMemo } from "react";
import { SignalDataContext } from "../page";
import { Bar } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";
import {
  Tooltip,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
  defaultStyles,
} from "@visx/tooltip";
import { localPoint } from "@visx/event";

import { tooltipStyles } from "./messagesSent";
type EmotionTooltipData = {
  emotion: string;
  freq: number;
};
const EmotionBarGraph = () => {
  const data = useContext(SignalDataContext);
  const height = 300;
  const width = 300;
  const xMax = width;
  const yMax = height;
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: Object.keys(data?.emotions[data.cid] || {}),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...Object.values(data?.emotions[data.cid] || 0))],
      }),
    [yMax]
  );
  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<EmotionTooltipData | null>({
    // initial tooltip state
    tooltipOpen: true,
    tooltipLeft: width / 3,
    tooltipTop: height / 3,
    tooltipData: null,
  });
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });
  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div className="relative">
      <svg height={300} width={300} ref={containerRef}>
        {Object.keys(data?.emotions[data.cid]).map((emotion, idx) => {
          const emotion_freq = data?.emotions[data.cid][emotion];
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(emotion_freq) ?? 0);
          const barX = xScale(emotion);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={emotion}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={
                idx % 2 == 0
                  ? data.people[0].color
                  : data.people[1]?.color || "black"
              }
              onMouseMove={(event) => {
                const coords = localPoint(event);
                if (!coords) return;
                console.log(coords);
                showTooltip({
                  tooltipLeft: coords.x,
                  tooltipTop: coords.y,
                  tooltipData: {
                    emotion: emotion,
                    freq: emotion_freq,
                  },
                });
              }}
              onMouseLeave={() => {
                hideTooltip();
              }}
            ></Bar>
          );
        })}
      </svg>
      {tooltipOpen && tooltipData?.emotion && (
        <TooltipInPortal
          // set this to random so it correctly updates with parent bounds
          // key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...tooltipStyles,
            backgroundColor:
              tooltipData.emotion > "hello"
                ? data.people[0].color
                : data.people[1].color,
          }}
        >
          <p className="font-medium text-lg">
            {tooltipData?.emotion} - {tooltipData?.freq} messages
          </p>
        </TooltipInPortal>
      )}
    </div>
  );
};

export default EmotionBarGraph;
