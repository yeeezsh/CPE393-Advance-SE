import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../../common/store";
import { instantSearchActions } from "../../../../common/store/instantSearch";
import { useSearchLazyQuery } from "../../../../common/services/generate/generate-types";
import { Input } from "antd";

const SearchIcon: React.FC = () => (
  <div style={{ marginRight: 8 }}>
    <SearchOutlined />
  </div>
);

export const Searchbar: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector((s: Store) => s.user.user._id);
  const onSearch = useSelector((s: Store) => s.instantSearch.word);
  const bookmarkSelectedTags = useSelector(
    (s: Store) => s.bookmark.selectedTag
  );
  const searchValue = useSelector((s: Store) => s.instantSearch.word);
  const [searchTrigger, { data, loading }] = useSearchLazyQuery({
    variables: {
      word: {
        owner: userId,
        text: "",
        tags: [],
      },
    },
  });

  useEffect(() => {
    dispatch(
      instantSearchActions.onData({
        data: data?.allTextSearchBookmark.results || [],
        loading,
      })
    );
  }, [onSearch, data, loading, dispatch, searchTrigger]);

  useEffect(() => {
    searchTrigger({
      variables: {
        word: {
          owner: userId,
          text: onSearch,
          tags: [bookmarkSelectedTags],
        },
      },
    });
  }, [searchTrigger, userId, onSearch, bookmarkSelectedTags]);

  return (
    <Input
      style={{ width: "100%", display: "flex" }}
      placeholder="Search"
      size="large"
      prefix={<SearchIcon />}
      value={searchValue}
      onChange={(e) => {
        dispatch(instantSearchActions.onSearch({ word: e.target.value }));
      }}
    />
  );
};
