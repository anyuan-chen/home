import BorderCard from "@/components/ui/bordercard";
import path from "path";
import React from "react";
import fs from "fs";
import { Main } from "next/document";

async function getData() {
  //get all folder names in the current folder
  const POSTS_PATH = path.join(process.cwd(), "/src/app/writing/(articles)");

  const files: string[] = [];
  const findMDX = async (dir: string) => {
    fs.readdirSync(dir).map((fileName) => {
      if (fs.statSync(dir + "/" + fileName).isDirectory()) {
        files.push(fileName);
      }
    });
  };

  await findMDX(POSTS_PATH);
  const metaData: any = await Promise.all(
    files.map(async (fileName) => {
      const { metadata } = await import(
        "./(articles)/" + fileName + "/page.mdx"
      );
      return {
        ...metadata,
        slug: fileName,
      };
    })
  );
  return metaData;
}
// {"title":"Cycle Detection","date":"11/22","tags":"technical","cover":"/blog/cycledetection/d5.png","slug":"cycledetection"}
const tagColor: Record<string, string> = {
  technical: "bg-accent-green",
  personal: "bg-accent-purple",
};
const Writing = (props: {
  title: string;
  date: string;
  tags: string[];
  cover: string;
  slug: string;
  className?: string;
}) => {
  return (
    <a href={"/writing/" + props.slug}>
      <BorderCard
        className={
          "w-full h-[150px] flex bg-accent-darker flex-col items-start rounded-3xl p-8 " +
          props.className
        }
      >
        <div className="mt-auto flex w-full items-end gap-x-4">
          <span className="mt-auto text-5xl font-medium">{props.title}</span>
          <span className="mt-auto flex font-medium">
            {props.tags.map((tag) => {
              return (
                <span
                  key={tag}
                  className={
                    "text-gray-500 px-2 py-1 rounded-full text-sm border " +
                    tagColor[tag]
                  }
                >
                  {tag}
                </span>
              );
            })}
          </span>
          <span className="ml-auto text-gray-500 font-medium">
            {props.date}
          </span>
        </div>
      </BorderCard>
    </a>
  );
};

const Page = async () => {
  const data = await getData();
  return (
    <div className="p-8 gap-8 flex flex-col">
      <BorderCard className="bg-accent">
        <h1 className="text-lg text-gray-500 font-medium">writing</h1>
      </BorderCard>
      <div className="flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-medium text-xl">featured</h1>
          <Writing {...data[0]} />
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="font-medium text-xl">the rest</h1>
          <BorderCard className="bg-accent-lighter">
            <div className="flex flex-wrap gap-4">
              {data.slice(1).map((article: any) => {
                return (
                  <div key={article.slug} className="flex-grow">
                    <Writing {...article} className="bg-accent-darker" />
                  </div>
                );
              })}
            </div>
          </BorderCard>
        </div>
      </div>
    </div>
  );
};

export default Page;
