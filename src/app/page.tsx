"use client";
import { motion } from "framer-motion";
import BorderCard from "@/components/ui/bordercard";
import CurrentlyPlaying from "./(components)/ipod";
import UnderlineAnimation from "@/components/ui/UnderlineAnimation";

export default function DialogDemo() {
  return (
    <div className="p-8 gap-8 flex flex-col">
      <div className="flex lg:gap-x-8 gap-x-4">
        <h1 className="text-3xl lg:text-3xl xl:text-5xl font-medium text-gray-700">
          welcome to andrew&apos;s digital workshop
        </h1>
        <BorderCard className="flex flex-col flex-grow p-8 gap-16 bg-accent">
          <h1 className="text-xl lg:text-3xl text-gray-400">
            a workshop [wurk-shaap] is a place of reflection, growth, and
            production
          </h1>
          <div className="mt-auto flex flex-row-reverse text-gray-500">
            <span className="block">currently in waterloo, canada</span>
          </div>
        </BorderCard>
      </div>
      <div className="flex gap-8 ">
        <BorderCard className="text-5xl p-8 bg-accent-green flex-grow text-gray-400">
          {" "}
        </BorderCard>
        <CurrentlyPlaying></CurrentlyPlaying>
      </div>
      <div className="flex lg:gap-x-8 gap-x-4">
        <BorderCard className="min-w-[200px] bg-accent-lighter">
          i write
        </BorderCard>
        <BorderCard className="flex flex-col flex-grow p-8 gap-16 bg-accent-purple-lighter">
          <div></div>
          <div>see more</div>
        </BorderCard>
      </div>
    </div>
  );
}
