import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export interface SnippetQuoteProps {
  content: string;
  author: string;
}
export async function POST(req: Request) {
  const body: SnippetQuoteProps = await req.json();
  if (!body.author || !body.content) {
    return new Response("incorrect body types", {
      status: 400,
    });
  }
  const quote = await prisma.quoteSubmission.create({
    data: {
      author: body.author,
      content: body.content,
    },
  });
  return NextResponse.json(quote, {
    status: 200,
  });
}
