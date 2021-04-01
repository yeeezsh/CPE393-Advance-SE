import { Meta, Story } from "@storybook/react";
import HomeLayout, { HomeLayoutProps } from "./Home.Layout";
import React from "react";

export default {
  title: "Components/HomeLayout",
  component: HomeLayout,
} as Meta;

const HomeLayoutStory: Story<HomeLayoutProps> = (args) => (
  <>
    <HomeLayout {...args} />
  </>
);

export const Default = HomeLayoutStory.bind({});
Default.args = {
  collapse: false,
};

export const Open = HomeLayoutStory.bind({});
Open.args = {
  collapse: false,
};

export const Close = HomeLayoutStory.bind({});
Close.args = {
  collapse: true,
};
