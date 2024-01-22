const GetSpotifySong = async (
  access_token: string,
  search_query: string,
  number_of_songs: number = 1
) => {
  const song = await fetch(
    `https://api.spotify.com/v1/search?q=${search_query}&type=track&limit=${number_of_songs}`,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );
  if (song.status !== 200) {
    const error = await song.text();
    console.log(error);
    return null;
  }
  const song_data = await song.json();
  // if (song_data.tracks.items.length === 0) {
  //   return null;
  // }
  // if (song_data.tracks.items[0].album.images.length === 0) {
  //   return null;
  // }
  return song_data.tracks;
};

export const GetSpotifySongByID = async (access_token: string, spotify_id: string) => {
  // console.log(spotify_id)
  const res = await fetch(`https://api.spotify.com/v1/tracks/${spotify_id}`, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });
  const track = await res.json();
  if (res.status !== 200) {
    // console.log(track, res);
    return null;
  }
  return track;
};

export { GetSpotifySong };
