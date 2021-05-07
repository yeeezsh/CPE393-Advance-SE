import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../../common/store";
import { instantSearchActions } from "../../../../common/store/instantSearch";
import { useSearchQuery } from "../../../../common/services/generate/generate-types";
import { Input } from "antd";

const SearchIcon: React.FC = () => (
  <div style={{ marginRight: 8 }}>
    <SearchOutlined />
  </div>
);

export const Searchbar: React.FC = () => {
  const dispatch = useDispatch();
  const onSearch = useSelector((s: Store) => s.instantSearch.word);
  const { data, loading } = useSearchQuery({
    variables: {
      word: {
        owner: "",
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
    // }
  }, [onSearch, data, loading, dispatch]);

  return (
    <Input
      style={{ width: "100%", display: "flex" }}
      placeholder="Search"
      size="large"
      prefix={<SearchIcon />}
      onChange={(e) =>
        dispatch(instantSearchActions.onSearch({ word: e.target.value }))
      }
    />
  );
};
