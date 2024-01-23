import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export interface SnippetLinkProps {
  link: string;
  linkText: string;
}
export async function POST(req: Request) {
  const body: SnippetLinkProps = await req.json();
  if (!body.link || !body.linkText) {
    return new Response("incorrect body types", {
      status: 400,
    });
  }
  const link = await prisma.linkSubmission.create({
    data: {
      link: body.link,
      linkText: body.linkText,
    },
  });
  return NextResponse.json(link, {
    status: 200,
  });
}
