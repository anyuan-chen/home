"use client";
import React, { useContext, useEffect, useState } from "react";
import { SignalDataContext } from "../page";
import { SignalXPerDay } from "../../types";
import { Group } from "@visx/group";
import { HeatmapCircle, HeatmapRect } from "@visx/heatmap";
import { scaleLinear } from "@visx/scale";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { tooltipStyles } from "./messagesSent";
import { localPoint } from "@visx/event";

interface ShapedMessagesSent {
  key: string;
  value: number;
  day: string;
  row: number;
  column: number;
}

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function shadeColor(color: string, percent: number) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = (R * (100 + percent)) / 100;
  G = (G * (100 + percent)) / 100;
  B = (B * (100 + percent)) / 100;

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  R = Math.round(R);
  G = Math.round(G);
  B = Math.round(B);

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

interface MessagesSentHeatMapProps {
  whoseData: string | null;
}
const MessagesSentHeatMap = ({ whoseData }: MessagesSentHeatMapProps) => {
  const data = useContext(SignalDataContext);
  const [key, setKey] = useState(data?.contacts[0]);
  const [colors, setColors] = useState<string[]>(["#4975E8", "#4975E8"]);
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

  useEffect(() => {
    let idxWho = 0;
    data?.people.forEach((person, i) => {
      if (person.name === whoseData) {
        idxWho = i;
      }
    });
    if (data) {
      setColors([
        shadeColor(data.people[idxWho].color, -40),
        data.people[idxWho].color,
      ]);
    }
  }, [data, whoseData]);

  if (!data) {
    return null;
  }
  const cid = data?.cid;
  const messagesSent = data?.messages_per_day[cid];

  const reshapeMessagesSent = (messagesSent: SignalXPerDay) => {
    if (!messagesSent) {
      return [];
    }

    let finalData: any = [
      {
        bin: 0,
        bins: [],
      },
      {
        bin: 1,
        bins: [],
      },
      {
        bin: 2,
        bins: [],
      },
      {
        bin: 3,
        bins: [],
      },
      {
        bin: 4,
        bins: [],
      },
      {
        bin: 5,
        bins: [],
      },
      {
        bin: 6,
        bins: [],
      },
    ];
    Object.keys(messagesSent).forEach((key, idx) => {
      // console.log(messagesSent[key]);
      let day = new Date(key).getDay();
      while (idx === 0 && day > 0) {
        day--;
        finalData[day].bins.push({
          count: 0,
          day: days[day],
          bin: 150,
        });
      }
      day = new Date(key).getDay();
      finalData[day].bins.push({
        count: messagesSent[key][whoseData || ""],
        day: days[day],
        date: key,
        bin: 150,
      });
    });

    // console.log(finalData);
    return finalData;
  };

  const reshapedMessagesSent = reshapeMessagesSent(messagesSent);

  const x = (d: ShapedMessagesSent) => d.row;
  const y = (d: ShapedMessagesSent) => d.column;
  const z = (data: ShapedMessagesSent) => data.value;

  //   const xMax = Math.max(...reshapedMessagesSent.map((r) => r.row));
  //   const yMax = Math.max(...reshapedMessagesSent.map((r) => r.column));
  //   const zMax = Math.max(...reshapedMessagesSent.map((r) => r.value));

  const width = 500;
  const height = 500;

  const xMax = width;
  const bucketSizeMax = reshapedMessagesSent.reduce(
    (mx: number, r: any) => Math.max(mx, r.bins.length),
    0
  );

  const zMax = reshapedMessagesSent.reduce((max: number, r: any) => {
    const tmp = r.bins.reduce(
      (max: number, r: any) => Math.max(max, r.count),
      0
    );
    return Math.max(max, tmp);
  }, 0);

  const xScale = scaleLinear<number>({
    domain: [0, reshapedMessagesSent.length],
    range: [0, width],
  });
  const yScale = scaleLinear<number>({
    domain: [0, bucketSizeMax],
    range: [0, height],
  });

  const circleColorScale = scaleLinear<string>({
    range: [colors[0], colors[1]],
    domain: [0, zMax],
  });

  const opacityScale = scaleLinear<number>({
    range: [0.1, 1],
    domain: [0, zMax],
  });

  const binWidth = width / reshapedMessagesSent.length;
  const binHeight = height / bucketSizeMax;

  return (
    <div className="relative">
      {/* {JSON.stringify(zMax)} */}
      <svg width={width} height={height} ref={containerRef}>
        <Group>
          <HeatmapRect
            data={reshapedMessagesSent}
            xScale={(d) => xScale(d) ?? 0}
            yScale={(d) => yScale(d) ?? 0}
            colorScale={circleColorScale}
            opacityScale={opacityScale}
            // radius={10}
            binWidth={binWidth}
            binHeight={binHeight}
            gap={2}
          >
            {(heatmap) =>
              heatmap.map((heatmapBins) =>
                heatmapBins.map((bin) => (
                  <rect
                    key={`heatmap-circle-${bin.row}-${bin.column}`}
                    className="visx-heatmap-circle"
                    x={bin.x}
                    y={bin.y}
                    fill={bin.color}
                    width={bin.width}
                    height={bin.height}
                    fillOpacity={bin.opacity}
                    onMouseMove={(event) => {
                      const coords = localPoint(event);
                      if (!bin || !coords) return;
                      showTooltip({
                        tooltipData: bin,
                        tooltipLeft: coords.x,
                        tooltipTop: coords.y,
                      });
                    }}
                    onMouseLeave={() => {
                      hideTooltip();
                    }}
                  />
                ))
              )
            }
          </HeatmapRect>
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...tooltipStyles,
            backgroundColor: tooltipData?.color || "black",
          }}
        >
          <p className="font-medium text-lg">
            {new Date(tooltipData["bin"]?.date).toDateString()} <br></br>
            {tooltipData["bin"]?.count} messages
          </p>
        </TooltipInPortal>
      )}
    </div>
  );
};

export default MessagesSentHeatMap;
