import { createContext } from "react";
import { SignalData } from "../../types";
import { SignalPerson } from "../page";

export const SignalDataContext = createContext<
  | (SignalData & {
      cid: string;
      people: SignalPerson[];
    })
  | null
>(null);
