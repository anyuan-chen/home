import React, { useContext, useEffect, useState } from "react";
import MessagesSentHeatMap from "./messagesSentHeatMap";
import { SignalDataContext } from "../(components)/context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PerDay = () => {
  const data = useContext(SignalDataContext);
  const [whoseData, setWhoseData] = useState<string | null>(null);
  const cid = data?.cid;
  const [choices, setChoices] = useState<string[]>([]);
  useEffect(() => {
    if (data && cid) {
      Object.keys(data.messages_per_day[cid])
        .slice(0, 1)
        .forEach((person) => {
          setWhoseData(Object.keys(data.messages_per_day[cid][person])[0]);
          const ppl = Object.keys(
            data.messages_per_day[cid][
              Object.keys(data.messages_per_day[cid])[0]
            ]
          );
          console.log("MSGPDAY", ppl);
          setChoices(ppl);
        });
    }
  }, [cid]);

  if (!data || !cid) {
    return <></>;
  }

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col space-y-2">
        <div className="text-2xl font-medium">what days do we talk?</div>
        <Select
          value={whoseData || ""}
          onValueChange={(e) => {
            setWhoseData(e);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {choices.map((person) => (
              <SelectItem
                key={person}
                onClick={() => setWhoseData(person)}
                value={person}
              >
                {person}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <MessagesSentHeatMap whoseData={whoseData}></MessagesSentHeatMap>
    </div>
  );
};

export default PerDay;
