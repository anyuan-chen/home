"use client";
import React, { useContext, useEffect, useState, createContext } from "react";
import { SignalData } from "../types";
import MessagesSent from "./(components)/messagesSent";
import Header from "./(components)/header";
import MessageLength from "./(components)/messageLength";
import Emotions from "./(components)/emotions";
import PerDay from "./(components)/perDay";
import RadialBarsMesssagesDaysOfWeek from "./(components)/radialBarsMesssagesDaysOfWeek";
import GoodMorningBarChart from "./(components)/goodMorningBarChart";
import DaysOfWeek from "./(components)/DaysOfWeek";
import TimeOfDay from "./(components)/TimeOfDay";
import { SignalDataContext } from "./(components)/context";

export type SignalPerson = {
  name: string;
  color: string;
};

const Page = () => {
  const [cid, setCid] = useState<string | null>(null);
  const [signalData, setSignalData] = useState<SignalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [people, setPeople] = useState<SignalPerson[]>([]);

  useEffect(() => {
    const textData = localStorage.getItem("signal_data");
    if (!textData) {
      return;
    }
    const data: SignalData = JSON.parse(textData);
    setSignalData(data);
  }, []);

  useEffect(() => {
    if (signalData) {
      const searchParams = new URLSearchParams(window.location.search);
      const convo_name = searchParams.get("convo_name");
      const keys = Object.keys(signalData.contacts);
      for (let cid of keys) {
        console.log(signalData.contacts, cid, keys);
        if (signalData.contacts[cid].name === convo_name) {
          const keys = Object.keys(signalData.words_per_person[cid]);
          if (keys.length === 0) {
            //there are no messages, why would you want to do stat analysis here?
            return;
          }
          const people = Object.keys(signalData.words_per_person[cid][keys[0]]);
          setPeople(
            people.map((person, idx) => ({
              name: person,
              color: idx == 0 ? "#4975E8" : "#9D3093",
            }))
          );

          setCid(cid);
          return;
        }
      }
    }
  }, [signalData]);

  useEffect(() => {
    if (cid) {
      setLoading(false);
    }
  }, [cid]);

  if (loading || !signalData || !cid) {
    return <div>Loading... {JSON.stringify(cid)}</div>;
  }

  return (
    <SignalDataContext.Provider
      value={{
        ...signalData,
        cid,
        people,
      }}
    >
      <div className="p-16 flex flex-col gap-32 w-full">
        <Header></Header>
        <MessageLength></MessageLength>
        <Emotions></Emotions>
        <PerDay></PerDay>
        <DaysOfWeek></DaysOfWeek>
        <TimeOfDay></TimeOfDay>
        <div>happy valentines day!</div>
      </div>
    </SignalDataContext.Provider>
  );
};

export default Page;
