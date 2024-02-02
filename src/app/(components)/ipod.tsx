"use client";
import { GetCurrentSong, SongProps } from "@/lib/server/spotify/currentSong";
import { Progress } from "@/components/ui/progress";
import moment from "moment";
import useSWR, { Fetcher } from "swr";
import { useEffect, useState } from "react";
import { Laptop } from "lucide-react";
import Marquee from "react-fast-marquee";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

function formatTime(ms: number) {
  const seconds = moment.duration(ms).seconds();
  if (seconds < 10) {
    return moment.duration(ms).minutes() + ":0" + moment.duration(ms).seconds();
  }
  return moment.duration(ms).minutes() + ":" + moment.duration(ms).seconds();
}
const fetcher: Fetcher<SongProps, string> = (...args) =>
  fetch(...args).then((res) => res.json());

const CurrentlyPlaying = () => {
  const { data, error, isLoading } = useSWR(
    "/oauth/spotify/currentlyPlaying",
    fetcher
  );
  const [song, setSong] = useState<SongProps>();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (song) {
        if (song.progress_ms < song.duration_ms) {
          setSong({ ...song, progress_ms: song?.progress_ms + 1000 });
        } else {
          clearInterval(interval);
          const newSongReq = await fetch("/oauth/spotify/currentlyPlaying");
          const newSong = await newSongReq.json();
          setSong(newSong);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [song]);

  useEffect(() => {
    if (data) {
      setSong(data);
    }
    setSong(data);
  }, [data]);

  if (isLoading) {
    return (
      <Skeleton className="flex flex-col gap-4 border border-gray-300 p-8 bg-accent-green rounded-xl shadow-md min-w-[250px] w-[250px] h-[400px] grow-1"></Skeleton>
    );
  }

  if (!song) {
    return <div className="min-w-[250px] h-[400px]">Failed to fetch data</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4 border border-gray-300 p-8 bg-accent-green rounded-xl shadow-md min-w-[250px] w-[250px] h-[400px] grow-1"
    >
      <img
        src={song.image}
        alt={song.name}
        className="h-48 w-48 rounded-xl"
      ></img>
      <div className="flex flex-col h-16">
        {song.name.length < 20 ? (
          <span className="text-lg font-medium">
            {song.name.substring(0, 36)}
          </span>
        ) : (
          <Marquee speed={20}>
            <div className="px-2">{song.name}</div>
          </Marquee>
        )}
        <span>{song.artists.substring(0, 30)}</span>
      </div>
      <div className="flex flex-col w-full gap-y-1">
        <Progress
          className="bg-gray-400 h-1"
          value={(100 * song.progress_ms) / song.duration_ms}
        ></Progress>
        <div className="flex justify-between w-full">
          <span className="block text-gray-600">
            {formatTime(song.progress_ms)}
          </span>
          <span className="block text-gray-600">
            {formatTime(song.duration_ms)}
          </span>
        </div>
      </div>
      <div className="flex gap-2 text-gray-600 text-xs items-end">
        <Laptop className="h-4 w-4"></Laptop>
        andrew&apos;s macbook pro
      </div>
    </motion.div>
  );
};

export default CurrentlyPlaying;
