import { DefState } from "./stateGeneric";

export type InfoState = DefState & {
  token: string | null;
  data: any;
}

export type RequestInfo = {
  token: string;
  type: string;
  searchKey?: string;
}