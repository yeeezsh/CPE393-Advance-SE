import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BookmarkDto,
  BookmarkEditInputDto,
  useEditBookmarkByIdMutation,
  useGetBookmarkByTagsQuery,
  useGetRecentBookmarkLazyQuery,
} from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import Add from "../../components/Add";
import Cards from "../../components/Cards/Cards";

const BookmarkCard: React.FC<{
  el: BookmarkDto;
  onEdit: (data: BookmarkEditInputDto) => void;
}> = (props) => (
  <Col span={8} key={props.el._id}>
    <Cards
      _id={props.el._id}
      domain={props.el.domain}
      original={props.el.original}
      note={props.el.note}
      tags={props.el.tags.map((t: string) => ({
        _id: "",
        label: t,
        checked: true,
      }))}
      onEdit={props.onEdit}
    />
  </Col>
);

const BookmarkContainer: React.FC = (props) => {
  const userId = useSelector((s: Store) => s.user.user._id);
  const bookmarkTags = useSelector((s: Store) => s.bookmark.selectedTag);
  const searchingWord = useSelector((s: Store) => s.instantSearch.word);
  const searchResults = useSelector((s: Store) => s.instantSearch.results);

  const { data, loading } = useGetBookmarkByTagsQuery({
    variables: {
      opts: {
        owner: userId,
        tags: [bookmarkTags],
      },
    },
  });

  const [recentTrigger, { data: recent }] = useGetRecentBookmarkLazyQuery({
    variables: {
      owner: userId,
    },
    fetchPolicy: "network-only",
  });

  const [editBookmarkByIdMutation] = useEditBookmarkByIdMutation({
    variables: {
      bookmark: {
        _id: "",
        original: "",
        note: "",
        tags: [],
      },
    },
  });

  const onEdit = (data: BookmarkEditInputDto) => {
    editBookmarkByIdMutation({
      variables: {
        bookmark: { ...data, original: data.original },
      },
    });
  };

  const onAdd = () => {
    recentTrigger({ variables: { owner: userId } });
  };

  // on init
  useEffect(() => {
    recentTrigger({ variables: { owner: userId } });
  }, [recentTrigger, userId]);

  return (
    <div style={{ paddingTop: "16px" }}>
      <Row justify="center">
        <Add onAdd={onAdd} />
      </Row>

      {loading && <p>loading ...</p>}
      <Row>
        {/* show cards only recent */}
        {!searchingWord &&
          bookmarkTags === "recent" &&
          recent?.getRecentBookmark.map((el) => (
            <BookmarkCard {...props} el={el} onEdit={onEdit} />
          ))}

        {/* show cards by selected tag */}
        {!searchingWord &&
          data?.searchFilterText.results.map((el) => (
            <BookmarkCard {...props} el={el} onEdit={onEdit} />
          ))}

        {/* show cards from searching results */}
        {searchingWord &&
          searchResults &&
          searchResults.map((el) => (
            <BookmarkCard {...props} el={el} onEdit={onEdit} />
          ))}
      </Row>
    </div>
  );
};

export default BookmarkContainer;
