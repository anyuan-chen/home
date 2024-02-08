import React, { useContext } from "react";
import { SignalMessageLength } from "../../types";
import { getPerson } from "./header";
import { SignalDataContext, SignalPerson } from "../page";
import MessagesSent from "./messagesSent";

const MessageLength = () => {
  const data = useContext(SignalDataContext);
  const person1 = data?.people[0];
  const person2 = data?.people[1];
  const messages = data?.message_length[data?.cid] as SignalMessageLength;

  if (!person1 || !person2 || !messages) {
    return <div>loading...</div>;
  }

  const p1_msgs = messages[person1.name].length;
  const p2_msgs = messages[person2.name].length;

  const p1_avg = messages[person1.name].average;
  const p2_avg = messages[person2.name].average;

  const n_messages = p1_msgs + p2_msgs;

  return (
    <div className="flex gap-16 space-between w-full">
      <div className="text-xl flex-col flex gap-y-4">
        <div>
          {getPerson(person1)} and {getPerson(person2)} have exchanged{" "}
          <span>{n_messages}</span> messages
        </div>
        <div>
          {getPerson(person1)} sent
          <span>
            {" "}
            {p1_msgs} ({Math.round((p1_msgs * 1000) / n_messages) / 10}%){" "}
          </span>
          messages. {getPerson(person2)} sent
          <span>
            {" "}
            {p2_msgs} ({Math.round((p2_msgs * 1000) / n_messages) / 10}%){" "}
          </span>{" "}
          messages.
        </div>
        <div></div>
        <div>
          {getPerson(person1)}&apos;s average message length was
          <span> {Math.round(p1_avg)} </span> characters.
        </div>
        <div>
          {getPerson(person2)}&apos;s average message length was
          <span> {Math.round(p2_avg)} </span> characters.
        </div>
      </div>
      <div className="ml-auto">
        <MessagesSent />
      </div>
    </div>
  );
};

export default MessageLength;
