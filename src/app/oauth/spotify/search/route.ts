import { GetSpotifySong } from "@/lib/server/spotify/search";
import { GetAndrewChenAccessToken } from "@/lib/server/spotify/token";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = await GetAndrewChenAccessToken();
  if (!token) {
    return new Response("no token", {
      status: 500,
    });
  }
  const params = new URLSearchParams(
    request.url.substring(request.url.indexOf("?"))
  );

  console.log(params, request.url);
  if (!params.get("query") || !params.get("limit")) {
    console.log(params.get("query"), params.get("limit"));
    return new Response("bad query params", {
      status: 400,
    });
  }
  const limit = parseInt(params.get("limit") || "");
  if (Number.isNaN(limit)) {
    return new Response("limit is not an integer", {
      status: 400,
    });
  }
  const query = params.get("query") || "";
  const songs = await GetSpotifySong(token, query, limit);
  console.log(songs)
  if (!songs) {
    return new Response("songs is null", {
      status: 500,
    });
  }
  return NextResponse.json(songs);
}
