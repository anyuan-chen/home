"use client";
import React from "react";
import { animate, motion } from "framer-motion";

const underline = {
  initial: {
    width: 0,
  },
  animate: {
    width: "100%",
    transition: {
      duration: 0.1,
    },
  },
};
const UnderlineAnimation = ({ classNames, children }: any) => {
  return (
    <motion.div initial="initial" animate="initial" whileHover="animate">
      {children}
      <motion.div
        className="h-[6px] bg-primary rounded pt-1 mt-1"
        variants={underline}
      ></motion.div>
    </motion.div>
  );
};

export default UnderlineAnimation;
