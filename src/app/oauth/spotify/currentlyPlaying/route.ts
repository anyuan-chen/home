import { GetCurrentSong } from "@/lib/server/spotify/currentSong";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const track = await GetCurrentSong();
  return NextResponse.json(track);
}
