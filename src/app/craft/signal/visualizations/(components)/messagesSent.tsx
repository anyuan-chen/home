"use client";
import React, { useCallback, useContext, useState } from "react";
import { SignalMessageLength } from "../../types";
import Pie, { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import { Group } from "@visx/group";
import { motion } from "framer-motion";
import { SignalDataContext, SignalPerson } from "../page";
import { Annotation, CircleSubject, Connector, Label } from "@visx/annotation";
import {
  Tooltip,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
  defaultStyles,
} from "@visx/tooltip";
import { localPoint } from "@visx/event";

export const tooltipStyles = {
  ...defaultStyles,
  color: "white",
  padding: 12,
};

type MessagesSentData = {
  person: string;
  total: number;
  color: string;
};

const MessagesSent = () => {
  const width = 300;
  const height = 300;

  const data = useContext(SignalDataContext);
  //tooltip data
  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<MessagesSentData | null>({
    // initial tooltip state
    tooltipOpen: true,
    tooltipLeft: width / 3,
    tooltipTop: height / 3,
    tooltipData: null,
  });

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });

  const person1 = data?.people[0];
  const person2 = data?.people[1];
  const messages = data?.message_length[data?.cid] as SignalMessageLength;

  if (!person1 || !person2 || !messages) {
    return <div>loading...</div>;
  }

  // return (
  //   <div>{JSON.stringify(messages[person1.name])}</div>
  // )
  const n_p1_msgs = messages[person1.name].length;
  const n_p2_msgs = messages[person2.name].length;
  const total_msgs = n_p1_msgs + n_p2_msgs;
  const arrayFromMessages = Object.keys(messages).map((key) => {
    return {
      person: key,
      total: messages[key].length,
      color: key === person1.name ? person1.color : person2.color,
    };
  });

  return (
    <div className="relative">
      <svg width={width} height={height} ref={containerRef}>
        <Group top={height / 2} left={width / 2}>
          <Pie
            data={arrayFromMessages}
            pieValue={(data) => data.total / total_msgs}
            outerRadius={height / 2}
            innerRadius={height / 4}
            padAngle={0.01}
            onMouseOut={hideTooltip}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                // console.log(pie.path(arc));
                const oldArc = {
                  ...arc,
                  total: 0,
                };
                return (
                  <g key={arc.data.person}>
                    <motion.path
                      initial={{ d: pie.path(oldArc) || "" }}
                      animate={{ d: pie.path(arc) || "" }}
                      whileHover={{ opacity: 0.9 }}
                      fill={arc.data.color}
                      onMouseMove={(event) => {
                        const coords = localPoint(event);
                        if (!coords) return;
                        console.log(coords);
                        showTooltip({
                          tooltipLeft: coords.x,
                          tooltipTop: coords.y,
                          tooltipData: arc.data,
                        });
                      }}
                      onMouseLeave={() => {
                        hideTooltip();
                      }}
                    />
                  </g>
                );
              });
            }}
          </Pie>
        </Group>
      </svg>
      {tooltipOpen && tooltipData?.person && (
        <TooltipInPortal
          // set this to random so it correctly updates with parent bounds
          // key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...tooltipStyles,
            backgroundColor: tooltipData?.color,
          }}
        >
          <p className="font-medium text-lg">{tooltipData?.total} messages</p>
        </TooltipInPortal>
      )}
    </div>
  );
};

export default MessagesSent;
