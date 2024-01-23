import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";
import { SnippetLinkProps } from "./link/route";
import { SnippetLyricProps } from "./lyric/route";
import { SnippetQuoteProps } from "./quote/route";
import {
  LinkSubmission,
  LyricSubmission,
  QuoteSubmission,
  SpotifyAlbum,
  SpotifyAlbumImage,
  SpotifyArtist,
  SpotifyRelationship,
  SpotifySong,
} from "@prisma/client";

export type LyricSubmissionWithSongData = LyricSubmission & {
  song: SpotifySong & {
    SpotifyRelationship: SpotifyRelationship &
      {
        SpotifyAlbum: SpotifyAlbum & {
          SpotifyImage: SpotifyAlbumImage[];
        };
        SpotifyArtist: SpotifyArtist;
      }[];
  };
};

export interface AllSnippets {
  links: LinkSubmission[];
  lyrics: LyricSubmissionWithSongData[];
  quotes: QuoteSubmission[];
}
export async function getSnippets(): Promise<AllSnippets> {
  const all = [
    prisma.linkSubmission.findMany(),
    prisma.lyricSubmission.findMany({
      include: {
        song: {
          include: {
            SpotifyRelationship: {
              include: {
                SpotifyAlbum: {
                  include: {
                    SpotifyImage: true,
                  },
                },
                SpotifyArtist: true,
              },
            },
          },
        },
      },
    }),
    prisma.quoteSubmission.findMany(),
  ];
  const res = await Promise.all(all);
  const submissions = {
    links: res[0] as LinkSubmission[],
    lyrics: res[1] as unknown as LyricSubmissionWithSongData[], //convert fail
    quotes: res[2] as QuoteSubmission[],
  };
  return submissions;
}

export async function GET() {
  const submissions = await getSnippets();
  return NextResponse.json(submissions);
}
