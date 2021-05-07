import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../../common/store";
import { instantSearchActions } from "../../../../common/store/instantSearch";
import { useSearchQuery } from "../../../../common/services/generate/generate-types";
import { Input } from "antd";

const InstantSearch: React.FC = () => {
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
    //   preventing from load all list
    // if (onSearch !== '') {
    dispatch(
      instantSearchActions.onData({
        data: data?.allTextSearchBookmark.results || [],
        loading,
      })
    );
    // }
  }, [onSearch, loading]);

  return (
    <Input
      placeholder="Search"
      prefix={<SearchOutlined />}
      onChange={(e) =>
        dispatch(instantSearchActions.onSearch({ word: e.target.value }))
      }
    />
  );
};

export default InstantSearch;
