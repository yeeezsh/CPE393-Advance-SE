import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BookmarkEditInputDto,
  useEditBookmarkByIdMutation,
  useGetBookmarkByTagsQuery,
  useGetRecentBookmarkLazyQuery,
} from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import Add from "../../components/Add";
import Cards from "../../components/Cards/Cards";

const BookmarkContainer: React.FC = () => {
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
        {/* only recent */}
        {!searchingWord &&
          bookmarkTags === "recent" &&
          recent?.getRecentBookmark.map((el) => (
            <Col span={8} key={el._id}>
              <Cards
                _id={el._id}
                domain={el.domain}
                original={el.original}
                note={el.note}
                tags={el.tags.map((t) => ({
                  _id: "",
                  label: t,
                  checked: true,
                }))}
                onEdit={onEdit}
              />
            </Col>
          ))}

        {!searchingWord &&
          data?.searchFilterText.results.map((el) => (
            <Col span={8} key={el._id}>
              <Cards
                _id={el._id}
                domain={el.domain}
                original={el.original}
                note={el.note}
                tags={el.tags.map((t) => ({
                  _id: "",
                  label: t,
                  checked: true,
                }))}
                onEdit={onEdit}
              />
            </Col>
          ))}

        {searchingWord &&
          searchResults &&
          searchResults.map((el) => (
            <Col span={8} key={el._id}>
              <Cards
                _id={el._id}
                domain={el.domain}
                original={el.original}
                note={el.note}
                tags={el.tags.map((t) => ({
                  _id: "",
                  label: t,
                  checked: true,
                }))}
                onEdit={onEdit}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default BookmarkContainer;
