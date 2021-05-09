import { BookmarkDto } from "../../services/generate/generate-types";

export type SelectingBookmark = Pick<
  BookmarkDto,
  "_id" | "domain" | "note" | "original" | "owner" | "tags" | "createAt"
>;

export type BookmarkStore = {
  selectedTag: string;
  SelectingBookmark?: SelectingBookmark;
};
