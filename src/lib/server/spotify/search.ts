const GetSpotifySong = async (access_token: string, search_query: string) => {
  const song = await fetch(
    `https://api.spotify.com/v1/search?q=${search_query}&type=track&limit=1`,
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
  if (song_data.tracks.items.length === 0) {
    return null;
  }
  if (song_data.tracks.items[0].album.images.length === 0) {
    return null;
  }
  return song_data.tracks.items[0].album.images[0].url;
};

export { GetSpotifySong };
