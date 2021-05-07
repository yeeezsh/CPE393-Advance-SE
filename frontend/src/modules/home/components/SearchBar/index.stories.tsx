import { Meta, Story } from "@storybook/react";
import { Searchbar } from ".";
export default {
  title: "Module/Home/Components/Search",
  component: Searchbar,
} as Meta;

const SearchStory: Story = () => (
  <>
    <Searchbar />
  </>
);

export const Default = SearchStory.bind({});
