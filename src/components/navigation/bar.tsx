"use client";
import useScreenSize, { isLargerThan } from "@/lib/hooks/useScreenSize";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";

const CircleIconButton = (props: BarButton | BarLink) => {
  if (props.hasOwnProperty("onClick")) {
    const button = props as BarButton;
    return (
      <motion.div
        className="self-end bigger"
        initial={{ width: 40, height: 40 }}
      >
        <motion.button className="flex items-center justify-center h-full w-full rounded-full bg-accent-darker">
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                src={button.iconURL}
                alt={button.tooltip}
                className="h-3/4 w-3/4"
              ></img>
            </TooltipTrigger>
            <TooltipContent>
              <p>{button.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </motion.button>
      </motion.div>
      // <motion.button className="w-12 h-12 bg-gray-600 self-end">
      //   <img src={button.iconURL} alt={button.tooltip}></img>
      // </motion.button>
    );
  }
  const link = props as BarLink;
  return (
    <motion.div
      className="self-end bigger border-10"
      initial={{ width: 40, height: 40 }}
    >
      <motion.a href={link.link} className="block w-full h-full">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center justify-center h-full w-full rounded-full bg-accent-darker shadow-md">
              <img
                className="h-3/4 w-3/4"
                src={link.iconURL}
                alt={link.tooltip}
              ></img>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{link.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </motion.a>
    </motion.div>
  );
};

interface BarButton {
  iconURL: string;
  tooltip: string;
  onClick: () => void | null;
  key: string;
  hasBorder?: boolean; //if the icon already has a border, set it to true
}

interface BarLink {
  iconURL: string;
  tooltip: string;
  link: string;
  key: string;
  hasBorder?: boolean;
}

const first: (BarButton | BarLink)[] = [
  {
    iconURL: "/navbar/finder.svg",
    tooltip: "Finder",
    onClick: () => null,
    key: "finder",
  },
];

const second: (BarButton | BarLink)[] = [
  {
    iconURL: "/navbar/home.svg",
    tooltip: "Home",
    link: "/",
    key: "home",
  },
  {
    iconURL: "/navbar/hammer.svg",
    tooltip: "Craft",
    link: "/craft",
    key: "craft",
  },
  {
    iconURL: "/navbar/pencil.svg",
    tooltip: "Writing",
    link: "/writing",
    key: "writing",
  },
  {
    iconURL: "/navbar/scissors.svg",
    tooltip: "Snippets",
    link: "/snippets",
    key: "snippets",
  },
];

const third: (BarButton | BarLink)[] = [
  {
    iconURL: "/navbar/github.svg",
    tooltip: "Github",
    link: "https://github.com/anyuan-chen",
    key: "github",
  },
  {
    iconURL: "/navbar/linkedin.svg",
    tooltip: "LinkedIn",
    link: "https://www.linkedin.com/in/anyuan-chen/",
    key: "linkedin",
  },
  {
    iconURL: "/navbar/document.svg",
    tooltip: "Resume",
    link: "",
    key: "resume",
  },
];

const Bar = () => {
  const screenSize = useScreenSize();
  const [canDisplay, setCanDisplay] = useState(false);
  const [buttonChildren, setButtonChildren] = useState<HTMLElement[]>([]);
  const [canCallAgain, setCanCallAgain] = useState(true);

  useEffect(() => {
    setCanDisplay(isLargerThan(screenSize, "sm"));
  }, [screenSize]);

  useEffect(() => {
    const target = document.getElementById("bar-nav");
    if (!target) return;
    const allButtonChildren = target.querySelectorAll(".bigger");
    console.log(allButtonChildren);
    const allButtonChildrenArray = Array.from(allButtonChildren);
    const fileterfd = allButtonChildrenArray.filter(
      (child) => child instanceof HTMLElement
    );
    setButtonChildren(fileterfd as HTMLElement[]);
  }, [canDisplay]);

  if (!canDisplay) return <div></div>;

  return (
    <TooltipProvider>
      <motion.div
        className="fixed bottom-4 flex gap-x-4 py-2 px-2 h-14 bg-accent rounded-xl "
        style={{
          transform: "translate(-50%, 0)",
          left: "50%",
        }}
        id="bar-nav"
        onMouseMove={(e) => {
          if (!canCallAgain) return;
          for (let button of buttonChildren) {
            const center =
              button.getBoundingClientRect().left + button.offsetWidth / 2;
            const x = e.clientX;
            const dist = Math.abs(center - x);
            const width = Math.max(40, 80 - (dist / 112.0) * 40);
            animate(
              button,
              {
                width: width,
                height: width,
              },
              { duration: 0.2 }
            );
            setCanCallAgain(false);
            setTimeout(() => {
              setCanCallAgain(true);
            }, 100);
          }
        }}
        onHoverEnd={(e) => {
          buttonChildren.forEach((button: HTMLElement) => {
            animate(
              button,
              {
                width: 40,
                height: 40,
              },
              { duration: 0.2 }
            );
          });
        }}
      >
        {first.map((button) => (
          <CircleIconButton {...button} key={button.key}></CircleIconButton>
        ))}
        <div className="h-full bg-gray-400 w-[1px]"></div>
        <div className="flex gap-x-4">
          {second.map((button) => (
            <CircleIconButton {...button} key={button.key}></CircleIconButton>
          ))}
        </div>
        <div className="h-full bg-gray-400 w-[1px]"></div>
        <div className="flex gap-x-4">
          {third.map((button) => (
            <CircleIconButton {...button} key={button.key}></CircleIconButton>
          ))}
        </div>
      </motion.div>
    </TooltipProvider>
  );
};

export default Bar;
