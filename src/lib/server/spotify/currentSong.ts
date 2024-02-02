import { GetAndrewChenAccessToken, GetAuthorizedSDK } from "./token";
import jumpthenfall from "./assets/jumpthenfall.json";
import { PlaybackState } from "@spotify/web-api-ts-sdk";

export interface SongProps {
  image: string;
  album: string;
  name: string;
  artists: string;
  progress_ms: number;
  duration_ms: number;
  timeFetched: Date;
}
export async function GetCurrentSong(): Promise<SongProps | null> {
  const sdk = await GetAuthorizedSDK();
  let current_song_req: PlaybackState | undefined | any =
    await sdk?.player.getCurrentlyPlayingTrack();
  let image = "";
  console.log("current song: ", current_song_req);
  if (!current_song_req) {
    current_song_req = {
      ...jumpthenfall,
      timeFetched: new Date(),
    };
    image = jumpthenfall.item?.album.images[0].url;
  } else {
    const album = await sdk?.tracks.get(current_song_req?.item.id);
    image = album?.album.images[0].url || "";
  }

  const progress_ms = current_song_req.progress_ms;
  const duration_ms = current_song_req.item.duration_ms;
  const album = current_song_req.item?.album?.name;
  const name = current_song_req.item?.name;
  const artists : string = current_song_req.item?.artists.reduce(
    (acc: string, curr: any) => {
      return acc + curr.name + ", ";
    },
    ""
  );

  return {
    image,
    album,
    name,
    artists: artists.substring(0, artists.length - 2),
    progress_ms,
    duration_ms,
    timeFetched: new Date(),
  };
}
