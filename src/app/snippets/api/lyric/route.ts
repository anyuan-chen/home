import { prisma } from "@/lib/utils";
import { addSongToDB } from "@/lib/server/spotify/database";
import {
  GetSpotifySong,
  GetSpotifySongByID,
} from "@/lib/server/spotify/search";
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
  const song = await GetSpotifySongByID(body.spotify_id);
  if (!song) {
    return new Response("no song exists with this id", {
      status: 400,
    });
  }
  addSongToDB(song);

  const quote = await prisma.lyricSubmission.create({
    data: {
      song_id: song.id,
      content: body.content,
    },
  });
  return NextResponse.json(quote, {
    status: 200,
  });
}
