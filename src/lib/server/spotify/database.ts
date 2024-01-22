import { prisma } from "@/app/layout";
import { Artist, SimplifiedArtist, Track } from "@spotify/web-api-ts-sdk";

export async function addSongToDB(song: Track) {
  const existingSong = await prisma.spotifySong.upsert({
    where: {
      id: song.id,
    },
    create: {
      id: song.id,
      duration_ms: song.duration_ms,
      explicit: song.explicit,
      href: song.href,
      name: song.name,
      popularity: song.popularity,
    },
    update: {},
  });
  const artists = await Promise.all(
    song.artists.map((artist) => {
      return prisma.spotifyArtist.upsert({
        where: {
          id: artist.id,
        },
        create: {
          id: artist.id,
          name: artist.name,
          uri: artist.uri,
          href: artist.href,
        },
        update: {
          id: artist.id,
          name: artist.name,
          uri: artist.uri,
          href: artist.href,
        },
      });
    })
  );
  if (song.album.images.length > 0) {
    const images = prisma.spotifyAlbumImage.upsert({
      where: {
        album_id: song.album.id,
      },
      create: {
        url: song.album.images[0].url,
        width: song.album.images[0].width,
        height: song.album.images[0].height,
        album_id: song.album.id,
      },
      update: {
        url: song.album.images[0].url,
        width: song.album.images[0].width,
        height: song.album.images[0].height,
        album_id: song.album.id,
      },
    });
  }
  const relationship = await Promise.all(
    song.artists.map(() => {
      return prisma.spotifyRelationship.upsert({
        where: {
          artist_id_song_id_album_id: {
            artist_id: song.artists[0].id,
            song_id: song.id,
            album_id: song.album.id,
          },
        },
        create: {
          artist_id: song.artists[0].id,
          song_id: song.id,
          album_id: song.album.id,
        },
        update: {},
      });
    })
  );
}
