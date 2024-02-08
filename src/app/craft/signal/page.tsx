"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [conversations, setConversations] = useState<string[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text: string = e.target?.result as string;
        const data = JSON.parse(text);
        localStorage.setItem("signal_data", JSON.stringify(data));
        const names = Object.keys(data.contacts).map((cid: string) => {
          return data.contacts[cid].name;
        });
        setConversations(names);
      };
      reader.readAsText(files[0]);
    }
  }, [files]);

  return (
    <div className="p-8 flex flex-col gap-y-24">
      <div className="flex flex-col gap-y-4">
        <div className="pb-16">
          <h1 className="text-3xl">noise</h1>
        </div>
        <h1 className="text-6xl font-medium">
          text message insights for Signal
        </h1>
        <p className="text-xl text-gray-500">
          don&apos;t believe me? turn off your wifi while using this site. we
          don&apos;t send any of your messages or analytics about them to a
          server.
        </p>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-6 max-w-[1000px]">
          <div className="flex">
            <div className="w-16">
              <h2 className="text-xl font-medium">1.</h2>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium">
                Run the message extraction script on a computer synced to your
                messages
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                This packages your message data into files interpretable by this
                app. If you use a phone, install Signal on your computer, and
                sync messages with your phone. <br></br>
                <a className="underline">download the script here</a>
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="w-16">
              <h2 className="text-lg font-medium">2.</h2>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium">Upload the file produced</h2>
              <div className="mt-4">
                <Input
                  multiple
                  type="file"
                  onChange={(e) => {
                    setFiles(e.target.files);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={`flex ${files ? "text-black" : "text-gray-500"}`}>
            <div className="w-16">
              <h2 className="text-xl font-medium">3.</h2>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium">Select the conversation</h2>
              <Select
                disabled={files == null}
                onValueChange={(value) => {
                  setSelectedConversation(value);
                  console.log(value);
                }}
              >
                <SelectTrigger id="conversation">
                  <SelectValue placeholder="Select conversation" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {conversations.map((conversation) => {
                    return (
                      <SelectItem key={conversation} value={conversation}>
                        {conversation}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button
          disabled={selectedConversation == null}
          onClick={() => {
            window.location.href = `/craft/signal/visualizations?convo_name=${selectedConversation}`;
          }}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default Home;
