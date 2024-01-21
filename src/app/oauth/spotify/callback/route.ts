import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";
import { prisma } from "@/app/layout";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  //get access token from spotify
  //store access token in the DB
  const searchParams = new URLSearchParams(new URL(req.url).search);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  console.log(searchParams, code, state);
  if (!code || Array.isArray(code) || !state) {
    console.log("something went wrong w/spotify oauth");
    return new Response(
      JSON.stringify({
        error: "bad state",
      })
    );
  }
  const buffer = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
  );
  const redirect_uri_i: string = process.env.SPOTIFY_REDIRECT_URI || "";
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirect_uri_i,
  });
  const token_response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: params,
    headers: {
      Authorization: "Basic " + buffer.toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (token_response.status !== 200) {
    const error = await token_response.text();
    return new Response(
      JSON.stringify({
        error: "token fetch fail",
      })
    );
  }

  const token = await token_response.json();

  const access_token = token.access_token;
  const token_type = token.token_type;
  const expires_in = token.expires_in;
  const refresh_token = token.refresh_token;

  const user_info_response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: token_type + " " + access_token,
    },
  });
  const user_info = await user_info_response.json();

  const email = user_info.email;
  const user = await prisma.spotifyUser.findFirst({
    where: { email },
  });
  if (user) {
    return new Response(JSON.stringify({ error: "user already exists" }));
  }
  console.log(email, access_token, refresh_token, token_type, expires_in);
  await prisma.spotifyUser.create({
    data: {
      email,
      access_token,
      refresh_token,
      token_type,
      expiry_time: moment(
        new Date().getTime() + expires_in * 1000
      ).toISOString(),
    },
  });
  return NextResponse.redirect(process.env.BASE_URL + "/playground");
}
