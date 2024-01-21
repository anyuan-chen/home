"use server";
import { Song } from "@prisma/client";

const LastFMToSongmail = (lastfm_song: any): Song => {
  const new_song: Song = {
    artist: lastfm_song.artist,
    title: lastfm_song.name,
    last_fm_url: lastfm_song.url,
  };
  return new_song;
};

const GetLastFMData = async (searchContent: string) => {
  const lastfm_res = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchContent}&api_key=${process.env.LAST_FM_API_KEY}&format=json`
  );
  const lastfm_data = await lastfm_res.json();
  console.log(lastfm_data);
  const filtered_data = lastfm_data.results.trackmatches?.track
    .slice(0, 5)
    .map((track: any) => {
      return LastFMToSongmail(track);
    });
  return filtered_data;
};

export { LastFMToSongmail, GetLastFMData };
