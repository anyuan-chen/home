import { Track } from "@spotify/web-api-ts-sdk";
import { GetAuthorizedSDK } from "./token";
import { SpotifyRange } from "@/lib/utils";

const GetSpotifySong = async (
  search_query: string,
  number_of_songs: number = 1
) => {
  const sdk = await GetAuthorizedSDK();
  if (!sdk) {
    return null;
  }
  const tracks = await sdk.search(
    search_query,
    ["track"],
    undefined,
    number_of_songs as SpotifyRange
  );
  return tracks.tracks;
};

export const GetSpotifySongByID = async (spotify_id: string) => {
  const sdk = await GetAuthorizedSDK();
  if (!sdk) {
    return null;
  }
  const track: Track = await sdk.tracks.get(spotify_id);
  return track;
};

export { GetSpotifySong };
