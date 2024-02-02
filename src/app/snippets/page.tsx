"use client";
import useSWR, { Fetcher } from "swr";
import { AllSnippets, LyricSubmissionWithSongData } from "./api/route";
import { LinkSubmission, QuoteSubmission } from "@prisma/client";
import LyricCard from "./(components)/LyricCard";
import LinkCard from "./(components)/LinkCard";
import QuoteCard from "./(components)/QuoteCard";
import { useEffect, useState } from "react";
import BorderCard from "@/components/ui/bordercard";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { Button } from "@/components/ui/button";

 const fetcher: Fetcher<AllSnippets, string> = (...args) =>
  fetch(...args).then((res) => res.json());

const orderByDate = (a: any, b: any) => {
  return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
};

const getDateOrderedArray = (data: AllSnippets) => {
  const { lyrics, links, quotes } = data;
  const allData = [...lyrics, ...links, ...quotes];
  const snippets = allData.sort(orderByDate);
  const cps = snippets.map((snippet) => {
    if ("song" in snippet) {
      return (
        <LyricCard
          key={snippet.id}
          data={snippet as LyricSubmissionWithSongData}
        />
      );
    } else if ("link" in snippet) {
      return (
        <LinkCard
          key={snippet.id}
          data={snippet as LinkSubmission}
          className="w-[500px]"
        />
      );
    } else {
      return <QuoteCard key={snippet.id} data={snippet as QuoteSubmission} />;
    }
  });
  return cps;
};

const Page = () => {
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const { data, error, isLoading } = useSWR("/snippets/api", fetcher);
  const screenSize = useScreenSize();

  const [type, setType] = useState<"lyrics" | "links" | "quotes">("lyrics");

  const mainContent = isLoading ? (
    <div>Loading...</div>
  ) : data ? (
    <div className="flex flex-col space-y-4 items-start justify-between">
      {data[type].map((snippet) => {
        if ("song" in snippet) {
          return (
            <LyricCard
              key={snippet.id}
              data={snippet as LyricSubmissionWithSongData}
            />
          );
        } else if ("link" in snippet) {
          return (
            <LinkCard
              key={snippet.id}
              data={snippet as LinkSubmission}
              className="w-[500px]"
            />
          );
        } else {
          return (
            <QuoteCard key={snippet.id} data={snippet as QuoteSubmission} />
          );
        }
      })}
    </div>
  ) : (
    <div className="w-full h-full">
      <h1>Something went wrong - sorry!</h1>
      <h2>Feel free to report this to me at a22chen [at] uwaterloo.ca.</h2>
    </div>
  );
  return (
    <div className="flex flex-col gap-8">
      <BorderCard className="bg-accent">
        <div className="text-5xl">curated bits of the internet</div>
      </BorderCard>
      <div className="flex flex-col gap-4">
        <div className="flex gap-x-2">
          <Button
            variant="outline-green"
            onClick={() => {
              setType("lyrics");
            }}
          >
            Lyrics
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setType("links");
            }}
          >
            Links
          </Button>
          <Button
            variant="outline-purple"
            onClick={() => {
              setType("quotes");
            }}
          >
            Quotes
          </Button>
        </div>
        <div className="max-w-[800px]">{mainContent}</div>
      </div>
    </div>
  );
};

export default Page;
