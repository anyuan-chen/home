import { prisma } from "@/app/layout";
import { NextResponse } from "next/server";
import { SnippetLinkProps } from "./link/route";
import { SnippetLyricProps } from "./lyric/route";
import { SnippetQuoteProps } from "./quote/route";
import {
  LinkSubmission,
  LyricSubmission,
  QuoteSubmission,
} from "@prisma/client";

export interface AllSnippets {
  links: LinkSubmission[];
  lyrics: LyricSubmission[];
  quotes: QuoteSubmission[];
}
export async function getSnippets(): Promise<AllSnippets> {
  const all = [
    prisma.linkSubmission.findMany(),
    prisma.lyricSubmission.findMany(),
    prisma.quoteSubmission.findMany(),
  ];
  const res = await Promise.all(all);
  const submissions = {
    links: res[0] as LinkSubmission[],
    lyrics: res[1] as LyricSubmission[],
    quotes: res[2] as QuoteSubmission[],
  };
  return submissions;
}

export async function GET() {
  const submissions = getSnippets();
  return NextResponse.json(submissions);
}
