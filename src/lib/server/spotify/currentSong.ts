import { GetAndrewChenAccessToken } from "./token";
import jumpthenfall from "./assets/jumpthenfall.json";

export interface SongProps {
  image: string;
  album: string;
  name: string;
  artists: string;
  timeFetched: Date;
}
export async function GetCurrentSong(): Promise<SongProps | null> {
  let andrewAccessToken;
  try {
    andrewAccessToken = await GetAndrewChenAccessToken();
  } catch (e) {
    console.log(e);
    return null;
  }
  const current_song_req = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: "Bearer " + andrewAccessToken,
      },
      next: {
        revalidate: 1,
      },
    }
  );

  let data;

  if (!current_song_req.ok) {
    return null;
  } else if (current_song_req.status === 204) {
    data = {
      ...jumpthenfall,
      timeFetched: new Date(),
    };
  }

  data = {
    ...(await current_song_req.json()),
    timeFetched: new Date(),
  };

  const image = data.item?.album.images[0].url;
  const album = data.item?.album?.name;
  const name = data.item?.name;
  const artists = data.item?.artists.reduce((acc: string, curr: any) => {
    return acc + curr.name + ", ";
  }, "");
  return {
    image,
    album,
    name,
    artists,
    timeFetched: new Date(),
  };
}
