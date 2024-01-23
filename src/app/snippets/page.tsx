"use client";
import useSWR, { Fetcher } from "swr";
import { AllSnippets, LyricSubmissionWithSongData } from "./api/route";
import { LinkSubmission, QuoteSubmission } from "@prisma/client";
import LyricCard from "./(components)/LyricCard";
import LinkCard from "./(components)/LinkCard";
import QuoteCard from "./(components)/QuoteCard";
import { useState } from "react";
import BorderCard from "@/components/ui/bordercard";
import useScreenSize from "@/lib/hooks/useScreenSize";

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
          key={snippet.dateCreated.toString()}
          data={snippet as LyricSubmissionWithSongData}
        />
      );
    } else if ("link" in snippet) {
      return (
        <LinkCard
          key={snippet.dateCreated.toString()}
          data={snippet as LinkSubmission}
        />
      );
    } else {
      return (
        <QuoteCard
          key={snippet.dateCreated.toString()}
          data={snippet as QuoteSubmission}
        />
      );
    }
  });
  return cps;
};

const getXColumn = (data: any[], x: number) => {
  const xColumn: any[][] = [];
  for (let i = 0; i < x; i++) {
    xColumn.push([]);
  }
  for (let i = 0; i < data.length; i++) {
    xColumn[i % x].push(data[i]);
  }
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${x}, minmax(0, 1fr))` }}
    >
      {xColumn.map((column) => {
        return (
          <div className="flex flex-col gap-4" key={x}>
            {column}
          </div>
        );
      })}
    </div>
  );
};

const Page = () => {
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const { data, error, isLoading } = useSWR("/snippets/api", fetcher);
  const dateOrdered = data && getDateOrderedArray(data);
  const screenSize = useScreenSize();
  const x = screenSize === "sm" ? 1 : screenSize === "md" ? 2 : 3;
  const xColumn = dateOrdered && getXColumn(dateOrdered, x);

  const mainContent = isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div className="w-full h-full">
      <h1>Something went wrong - sorry!</h1>
      <h2>Feel free to report this to me at a22chen [at] uwaterloo.ca.</h2>
    </div>
  ) : (
    xColumn
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-10 gap-4">
        <BorderCard className="col-span-10 md:col-span-4 py-6 text-3xl bg-accent">
          curated bits of the internet
        </BorderCard>
        <BorderCard className="col-span-6 py-6 bg-accent-orange hidden  md:block">
          <span className="text-2xl">
            homepage on {displayDate.toDateString()}
          </span>
        </BorderCard>
      </div>
      {mainContent}
    </div>
  );
};

export default Page;
