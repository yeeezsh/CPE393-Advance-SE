import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BookmarkEditInputDto,
  useGetBookmarkByTagsQuery,
} from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import Cards from "../../components/Cards/Cards";
import { MOCK_TAGS } from "../../components/Tags";

const BookmarkContainer: React.FC = () => {
  const userId = useSelector((s: Store) => s.user.user._id);
  const bookmarkTags = useSelector((s: Store) => s.bookmark.selectedTag);

  const { data, loading, error } = useGetBookmarkByTagsQuery({
    variables: {
      opts: {
        owner: userId,
        tags: [bookmarkTags],
      },
    },
  });

  const onEdit = (data: BookmarkEditInputDto) => {};

  return (
    <div>
      {loading && <p>loading ...</p>}
      {data?.searchFilterText.results.map((el) => (
        <Cards
          _id={el._id}
          domain={el.domain}
          original={el.original}
          note={el.note}
          tags={MOCK_TAGS}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default BookmarkContainer;
