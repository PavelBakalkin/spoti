import { DefState } from "./stateGeneric";

export type TracksState = DefState & {
  token: string | null;
  tracks: any;
};
