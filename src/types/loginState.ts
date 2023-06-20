import { DefState } from "./stateGeneric";

export type LogInState = DefState & {
  token: string | null;
  accInfo: any;
};

export type RequestAccInfo = {
  token: string;
}
