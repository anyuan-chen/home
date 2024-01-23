import { prisma } from "@/lib/utils";
import { SpotifyUser } from "@prisma/client";
import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import moment from "moment";

const GetAndrewChenAccessToken = async () => {
  const user = await prisma.spotifyUser.findFirst({
    where: { email: "a22chen@uwaterloo.ca" },
  });
  if (moment(user?.expiry_time).isAfter(moment())) {
    console.log("not expired");
    return user?.access_token;
  }
  if (!user) {
    throw new Error("user not found");
    return;
  }
  const newTokens = await RefreshSpotifyTokens(user.refresh_token, user.email);
  if (!newTokens) {
    console.log("refresh fail");
    throw new Error("refresh failed");
    return;
  }
  return newTokens.access_token;
};

const GetAndrewChenFullAccessToken = async () => {
  const user = await prisma.spotifyUser.findFirst({
    where: { email: "a22chen@uwaterloo.ca" },
  });
  if (moment(user?.expiry_time).isAfter(moment())) {
    console.log("not expired");
    return user;
  }
  if (!user) {
    throw new Error("user not found");
    return;
  }
  const newTokens = await RefreshSpotifyTokens(user.refresh_token, user.email);
  if (!newTokens) {
    console.log("refresh fail");
    throw new Error("refresh failed");
    return;
  }
  return newTokens;
};

const GetAuthorizedSDK = async () => {
  const token: SpotifyUser | null | undefined =
    await GetAndrewChenFullAccessToken();
  if (!token) {
    return null;
  }
  const accessToken: AccessToken = {
    access_token: token.access_token,
    expires_in: 2400, //dummy value because refresh flow handled outside sdk
    refresh_token: token.refresh_token,
    token_type: token.token_type,
  };
  const sdk = SpotifyApi.withAccessToken(
    process.env.SPOTIFY_ACCESS_TOKEN || "",
    accessToken
  );
  return sdk;
};

const RefreshSpotifyTokens = async (refresh_token: string, email: string) => {
  const buffer = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
  );
  const body = new URLSearchParams({
    refresh_token,
    grant_type: "refresh_token",
  });
  const token_response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body,
    headers: {
      Authorization: "Basic " + buffer.toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
  });
  if (token_response.status !== 200) {
    console.log("failed to refresh token");
    return;
  }
  const token = await token_response.json();
  const access_token = token.access_token;
  const token_type = token.token_type;
  const expires_in = token.expires_in;
  refresh_token = token.refresh_token ? token.refresh_token : refresh_token;
  return await prisma.spotifyUser.update({
    where: { email },
    data: {
      access_token,
      refresh_token,
      token_type,
      expiry_time: moment().add(expires_in, "milliseconds").toISOString(),
    },
  });
};

export {
  GetAndrewChenAccessToken,
  GetAndrewChenFullAccessToken,
  RefreshSpotifyTokens,
  GetAuthorizedSDK,
};
