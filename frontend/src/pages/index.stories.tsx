import { Meta, Story } from "@storybook/react";
import React from "react";
import IndexPage from ".";

export default {
  title: "Pages/Home",
  component: IndexPage,
} as Meta;

const IndexPageStory: Story = (args) => <IndexPage {...args} />;

export const Default = IndexPageStory.bind({});
