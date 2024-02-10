"use client";
import { Group } from "@visx/group";
import React, { useContext, useMemo } from "react";
import { SignalDataContext } from "../page";
import { scaleBand, scaleRadial } from "@visx/scale";
import { Arc } from "@visx/shape";
import { Text } from "@visx/text";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { tooltipStyles } from "./messagesSent";
import { localPoint } from "@visx/event";
import { days, shadeColor } from "./messagesSentHeatMap";

const RadialBarsMesssagesDaysOfWeek = () => {
  const data = useContext(SignalDataContext);
  const width = 350;
  const height = 350;

  const radiusMax = Math.min(width, height) / 2 - 30;
  const innerRadius = radiusMax / 3 - 30;

  const messages = data?.messages_per_day[data.cid];
  const processedMessages = useMemo(() => {
    return messages
      ? Object.keys(messages).reduce((acc: number[], key) => {
          const message = messages[key];
          const total = Object.keys(message).reduce((acc, key) => {
            return acc + message[key];
          }, 0);
          const date = new Date(key);
          const day = date.getDay();
          acc[day] = (acc[day] || 0) + total;
          return acc;
        }, [])
      : [];
  }, [messages]);

  const xScale = useMemo(
    () =>
      scaleBand<number>({
        range: [0, 2 * Math.PI],
        domain: processedMessages.map((_, i) => i),
        padding: 0.1,
      }),
    [processedMessages]
  );

  const yScale = useMemo(
    () =>
      scaleRadial<number>({
        range: [innerRadius, radiusMax],
        domain: [0, Math.max(...processedMessages)],
      }),
    [innerRadius, radiusMax, processedMessages]
  );
  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<any>({
    // initial tooltip state
    tooltipOpen: true,
    // tooltipLeft: width / 3,
    // tooltipTop: height / 3,
    tooltipData: null,
  });

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });
  if (!data || !messages) {
    return <></>;
  }

  //   return <>{JSON.stringify(processedMessages)}</>;

  return (
    <div className="relative">
      <svg width={width} height={height} ref={containerRef}>
        <Group top={height / 2} left={width / 2}>
          {processedMessages.map((d, i) => {
            const startAngle = xScale(i);
            if (!startAngle) {
              return <></>;
            }
            const midAngle = startAngle + xScale.bandwidth() / 2;
            const endAngle = startAngle + xScale.bandwidth();

            const outerRadius = yScale(d) ?? 0;

            // convert polar coordinates to cartesian for drawing labels
            const textRadius = outerRadius + 4;
            const textX = textRadius * Math.cos(midAngle - Math.PI / 2);
            const textY = textRadius * Math.sin(midAngle - Math.PI / 2);

            return (
              <>
                <Arc
                  key={d}
                  cornerRadius={4}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
                  fill={"#4975E8"}
                  onMouseMove={(event) => {
                    const coords = localPoint(event);
                    if (!coords) return;
                    console.log("Hi", coords);
                    showTooltip({
                      tooltipData: { d, i },
                      tooltipLeft: coords.x,
                      tooltipTop: coords.y,
                    });
                  }}
                  onMouseLeave={() => {
                    hideTooltip();
                  }}
                />
                <Text
                  x={textX}
                  y={textY}
                  dominantBaseline="end"
                  textAnchor="middle"
                  fontSize={16}
                  fontWeight="bold"
                  fill={"#4975E8"}
                  angle={(midAngle * 180) / Math.PI}
                >
                  {days[i]}
                </Text>
              </>
            );
          })}
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...tooltipStyles,
            backgroundColor: shadeColor("#5374E0", 1.4),
          }}
        >
          <p className="font-medium text-lg">
            {days[tooltipData.i]} - {tooltipData.d} messages
          </p>
        </TooltipInPortal>
      )}
    </div>
  );
};

export default RadialBarsMesssagesDaysOfWeek;
