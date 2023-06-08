import { DefState } from "./stateGeneric";

export type InfoState = DefState & {
  token: string | null;
}

export type RequestInfo = {
  token: string;
  type: string;
  searchKey?: string;
}