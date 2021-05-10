import { BookmarkDtoSearch } from "../../services/generate/generate-types";

export const INSTANT_SEARCH = "INSTANT_SEARCH";

export type InstantSearchReducer = {
  results: BookmarkDtoSearch[];
  word: string;
  loading: boolean;
};
