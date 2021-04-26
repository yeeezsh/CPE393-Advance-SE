import React from "react";
import { Meta, Story } from "@storybook/react";
import { Searchbar, SearchbarProps } from ".";
export default {
  title: "Module/Home/Components/Search",
  component: Searchbar,
} as Meta;

const SearchStory: Story<SearchbarProps> = () => (
  <>
    <Searchbar />
  </>
);

export const Default = SearchStory.bind({});
