"use client";
import React, { useContext } from "react";
import { SignalDataContext } from "../page";
import moment from "moment-timezone";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";
import { Group } from "@visx/group";

const formatTime = (minutes: number) => {
  let mins = (minutes % 60).toString();
  const hours = Math.floor(minutes / 60).toString();
  if (mins.length === 1) {
    mins = `0${mins}`;
  }
  return `${hours}:${mins}`;
};

type GoodMorningBarChartProps = {
  dataKey: "goodmorning" | "sleepschedule";
};
const GoodMorningBarChart = ({
  dataKey = "goodmorning",
}: GoodMorningBarChartProps) => {
  const data = useContext(SignalDataContext);
  const goodMorning = data ? data[dataKey] : {};
  const cid = data?.cid;
  const height = 300;
  const shapedData =
    goodMorning && cid
      ? Object.keys(goodMorning[cid]).map((key, idx) => {
          const timestamp = goodMorning[cid][key].timestamp;
          //convert timestamp to eastern time with moment.js
          const easternTime = moment(timestamp).tz("America/New_York");
          const minutes = easternTime.minutes() + 60 * easternTime.hours();
          console.log(minutes, easternTime.hours());
          return {
            x: key,
            y: minutes,
          };
        })
      : [];
  const tickLabelOffset = 10;

  const accessors = {
    xAccessor: (d: any) => new Date(d.x),
    yAccessor: (d: any) => d.y,
  };

  console.log(shapedData);
  return (
    <XYChart
      height={270}
      width={500}
      margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
      xScale={{ type: "time" }}
      yScale={{ type: "linear" }}
    >
      <AnimatedGrid
        columns={false}
        numTicks={4}
        lineStyle={{
          stroke: "#e1e1e1",
          strokeLinecap: "round",
          strokeWidth: 1,
        }}
        strokeDasharray="0, 4"
      />
      <AnimatedAxis
        hideAxisLine
        hideTicks
        orientation="bottom"
        tickLabelProps={() => ({ dy: tickLabelOffset })}
        left={30}
        numTicks={4}
      />
      <AnimatedAxis
        hideAxisLine
        hideTicks
        orientation="left"
        numTicks={4}
        tickLabelProps={() => ({ dx: -10 })}
      >
        {(props) => {
          const tickLabelSize = 10;
          const tickRotate = 45;
          const tickColor = "#8e205f";
          const axisCenter = (props.axisToPoint.x - props.axisFromPoint.x) / 2;
          return (
            <g className="my-custom-bottom-axis">
              {props.ticks.map((tick, i) => {
                const tickX = tick.to.x - 20;
                const tickY = tick.to.y + tickLabelSize;
                const mins = tick.value % 60;
                const hours = Math.floor(tick.value / 60);
                const formattedValue = `${hours}:${mins}`;
                tick.formattedValue = formattedValue;
                return (
                  <Group
                    key={`vx-tick-${tick.value}-${i}`}
                    className={"vx-axis-tick"}
                  >
                    <text
                      transform={`translate(${tickX}, ${tickY})`}
                      fontSize={tickLabelSize}
                      textAnchor="middle"
                      fill={tickColor}
                    >
                      {formatTime(tick.value)}
                    </text>
                  </Group>
                );
              })}
              <text
                textAnchor="middle"
                transform={`translate(${axisCenter}, 50)`}
                fontSize="8"
              >
                {props.label}
              </text>
            </g>
          );
        }}
      </AnimatedAxis>

      <AnimatedLineSeries
        stroke="#4975E8"
        dataKey="primary_line"
        data={shapedData}
        {...accessors}
      />
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showSeriesGlyphs
        glyphStyle={{
          fill: "#4975E8",
          strokeWidth: 0,
        }}
        renderTooltip={({ tooltipData }) => {
          if (!tooltipData) return <></>;
          return (
            <div>
              {Object.entries(tooltipData.datumByKey).map((lineDataArray) => {
                const [key, value] = lineDataArray;
                if (!value.datum.hasOwnProperty("x")) {
                  return;
                }
                return (
                  <div className="row" key={key}>
                    <div className="value">
                      {new Date(
                        (value.datum as { x: number }).x
                      ).toDateString()}
                      <br></br>
                      {formatTime(accessors.yAccessor(value.datum))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }}
      />
    </XYChart>
  );
};

export default GoodMorningBarChart;
