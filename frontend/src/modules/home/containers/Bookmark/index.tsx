import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import {
  BookmarkEditInputDto,
  useEditBookmarkByIdMutation,
  useGetBookmarkByTagsQuery,
  useGetRecentBookmarkQuery,
} from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import Cards from "../../components/Cards/Cards";

const BookmarkContainer: React.FC = () => {
  const userId = useSelector((s: Store) => s.user.user._id);
  const bookmarkTags = useSelector((s: Store) => s.bookmark.selectedTag);

  const { data, loading } = useGetBookmarkByTagsQuery({
    variables: {
      opts: {
        owner: userId,
        tags: [bookmarkTags],
      },
    },
  });

  const { data: recent } = useGetRecentBookmarkQuery({
    variables: {
      owner: userId,
    },
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

  return (
    <div style={{ paddingTop: "16px" }}>
      {loading && <p>loading ...</p>}
      <Row>
        {/* only recent */}
        {bookmarkTags === "recent" &&
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

        {data?.searchFilterText.results.map((el) => (
          <Col span={8} key={el._id}>
            <Cards
              _id={el._id}
              domain={el.domain}
              original={el.original}
              note={el.note}
              tags={el.tags.map((t) => ({ _id: "", label: t, checked: true }))}
              onEdit={onEdit}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BookmarkContainer;
