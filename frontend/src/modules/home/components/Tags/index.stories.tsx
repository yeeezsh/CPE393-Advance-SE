import { Meta, Story } from "@storybook/react";
import Tags, { TagsProps } from ".";

export default {
  title: "Module/Home/Components/Tags",
  component: Tags,
} as Meta;

const TagStory: Story<TagsProps> = () => (
  <>
    <Tags />
  </>
);

export const Default = TagStory.bind({});
