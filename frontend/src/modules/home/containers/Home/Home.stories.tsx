import { Meta, Story } from "@storybook/react";
import React from "react";
import "../../../../index.css";
import HomeContainer, { HomeLayoutProps } from "./Home.container";

export default {
  title: "Module/Home/Container/Home",
  component: HomeContainer,
} as Meta;

const HomeLayoutStory: Story<HomeLayoutProps> = (args) => (
  <>
    <HomeContainer {...args} />
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
