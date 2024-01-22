import { prisma } from "@/app/layout";
import {
  GetSpotifySong,
  GetSpotifySongByID,
} from "@/lib/server/spotify/search";
import { GetAndrewChenAccessToken } from "@/lib/server/spotify/token";
import { NextResponse } from "next/server";

export interface SnippetLyricProps {
  content: string;
  spotify_id: string;
}

export async function POST(req: Request) {
  const body: SnippetLyricProps = await req.json();
  if (!body.content || !body.spotify_id) {
    return new Response("incorrect body types", {
      status: 400,
    });
  }
  const token = await GetAndrewChenAccessToken();
  if (!token) {
    return new Response("no token available - auth error", {
      status: 500,
    });
  }
  const song = await GetSpotifySongByID(body.spotify_id);
  if (!song) {
    return new Response("no song exists with this id", {
      status: 400,
    });
  }
  console.log("song song song", song);
  let song_from_db = await prisma.spotifySong.findFirst({
    where: {
      id: song.id,
    },
  });

  if (!song_from_db) {
    song_from_db = await prisma.spotifySong.create({
      data: {
        id: song.id,
        duration_ms: song.duration_ms,
        explicit: song.explicit,
        href: song.album.images[0]?.url || "",
        name: song.name,
        popularity: song.popularity,
      },
    });
  }

  const quote = await prisma.lyricSubmission.create({
    data: {
      song_id: song_from_db.id,
      content: body.content,
    },
  });

  return NextResponse.json(quote, {
    status: 200,
  });
}
