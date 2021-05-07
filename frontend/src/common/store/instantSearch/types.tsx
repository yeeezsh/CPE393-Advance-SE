export const INSTANT_SEARCH = "INSTANT_SEARCH";
export type InstantSearchReducer = {
  results: { _id: string }[];
  word: string;
  loading: boolean;
};
