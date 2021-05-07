import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import {
  BookmarkEditInputDto,
  useEditBookmarkByIdMutation,
  useGetBookmarkByTagsQuery,
} from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import Cards from "../../components/Cards/Cards";
import { MOCK_TAGS } from "../../components/Tags";

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
    console.log("onEdit - card", data);
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
        {data?.searchFilterText.results.map((el) => (
          <Col span={8} key={el._id}>
            <Cards
              _id={el._id}
              domain={el.domain}
              original={el.original}
              note={el.note}
              tags={MOCK_TAGS}
              onEdit={onEdit}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BookmarkContainer;
