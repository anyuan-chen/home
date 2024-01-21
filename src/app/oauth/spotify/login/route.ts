import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  //redirect user to spotify login page
  const state = randomUUID();
  const scope =
    "user-read-currently-playing user-read-private user-read-email user-read-playback-state";
  return NextResponse.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID || "",
        scope,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI || "",
        state,
      }).toString()
  );
}
