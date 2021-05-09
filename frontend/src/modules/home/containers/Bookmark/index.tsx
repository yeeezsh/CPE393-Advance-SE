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
import { TagType } from "../../components/Tags";

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
        createAt: new Date(),
      }))}
      onEdit={props.onEdit}
    />
  </Col>
);

const BookmarkContainer: React.FC = (props) => {
  const userId = useSelector((s: Store) => s.user.user._id);
  const selectedBookmarkTags = useSelector(
    (s: Store) => s.bookmark.selectedTag
  );

  const allTags = useSelector((s: Store) => s.tags.tags);
  const bookmarkTags = useSelector((s: Store) => s.bookmark.selectedTag);
  const searchingWord = useSelector((s: Store) => s.instantSearch.word);
  const searchResults = useSelector((s: Store) => s.instantSearch.results);

  const { data, loading } = useGetBookmarkByTagsQuery({
    variables: {
      opts: {
        owner: userId,
        tags: [selectedBookmarkTags],
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
        bookmark: { ...data, original: data.original, tags: data.tags },
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
        {selectedBookmarkTags === "recent" &&
          allTags &&
          recent?.getRecentBookmark.map((el) => {
            const mappedTags = el.tags.map((el) => {
              const foundTag = allTags.find((f) => f._id === el);
              return {
                _id: el,
                checked: true,
                label: foundTag?.label,
                createAt: foundTag?.createAt,
              };
            }) as TagType;

            return (
              <Col span={8} key={el._id}>
                <Cards
                  _id={el._id}
                  domain={el.domain}
                  original={el.original}
                  note={el.note}
                  tags={mappedTags}
                  onEdit={onEdit}
                />
              </Col>
            );
          })}

        {/* search display */}
        {data?.searchFilterText.results.map((el) => {
          const mappedTags = el.tags.map((el) => {
            const foundTag = allTags.find((f) => f._id === el);
            return {
              _id: el,
              checked: true,
              label: foundTag?.label,
              createAt: foundTag?.createAt,
            };
          }) as TagType;

          return (
            <Col span={8} key={el._id}>
              <Cards
                _id={el._id}
                domain={el.domain}
                original={el.original}
                note={el.note}
                tags={mappedTags}
                onEdit={onEdit}
              />
            </Col>
          );
        })}

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
