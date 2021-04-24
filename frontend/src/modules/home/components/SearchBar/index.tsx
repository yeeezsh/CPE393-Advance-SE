import { Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import onEnterKey from "../../../../common/utils/onEnterKey";

export type SearchbarProps = {
  onSearch?: (s: string) => void;
};

const SearchIcon: React.FC = () => (
  <div style={{ marginRight: 8 }}>
    <SearchOutlined />
  </div>
);

export const Searchbar: React.FC<SearchbarProps> = (props) => {
  const onSearch = (e?: string) => {
    props.onSearch && e && props.onSearch(e);
  };

  return (
    <Input
      placeholder="Search"
      size="large"
      prefix={<SearchIcon />}
      onKeyPress={onEnterKey(onSearch)}
    />
  );
};
