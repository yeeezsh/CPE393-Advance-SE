import { BookmarkDto } from "../../services/generate/generate-types";

export type BookmarkStore = {
  loading: boolean;
  data: BookmarkDto[];
};

export type AddBookmark = {
  data: BookmarkDto[];
};
