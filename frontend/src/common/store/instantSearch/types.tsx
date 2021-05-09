import { BookmarkDto } from "../../services/generate/generate-types";

export const INSTANT_SEARCH = "INSTANT_SEARCH";

export type InstantSearchReducer = {
  results: BookmarkDto[];
  word: string;
  loading: boolean;
};
