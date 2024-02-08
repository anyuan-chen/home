"use client";
import React, { useContext } from "react";
import { SignalDataContext, SignalPerson } from "../page";

interface HeaderProps {
  // person1: SignalPerson;
  // person2: SignalPerson;
  // setPerson1: (sp: SignalPerson) => void;
  // setPerson2: (sp: SignalPerson) => void;
}
export const getPerson = (person?: SignalPerson) => {
  if (!person) {
    return;
  }
  return <span style={{ color: person.color }}>{person.name}</span>;
};
const Header = () => {
  const data = useContext(SignalDataContext);
  return (
    <div>
      <h1 className="text-5xl font-medium">
        {getPerson(data?.people[0])} and {getPerson(data?.people[1])}
      </h1>
      {/* <div>customize your journey! choose some colors</div> */}
    </div>
  );
};

export default Header;
