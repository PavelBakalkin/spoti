export type FetchInfoError = {
  message: string;
};

export type DefState = {
  status: "loading" | "idle";
  error: string | null;
};

export type ResponseType = {
  data: any;
};
