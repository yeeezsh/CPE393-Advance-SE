import { Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

export type SearchbarProps = {};

const SearchIcon: React.FC = () => (
  <div style={{ marginRight: 8 }}>
    <SearchOutlined />
  </div>
);

export const Searchbar: React.FC<SearchbarProps> = (props) => {
  return <Input placeholder="Search" size="large" prefix={<SearchIcon />} />;
};
