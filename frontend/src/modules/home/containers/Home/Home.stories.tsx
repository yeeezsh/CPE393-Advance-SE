import { Meta, Story } from "@storybook/react";
import React from "react";
import "../../../../index.css";
import HomeContainer, { HomeLayoutProps } from "./Home.container";

export default {
  title: "Components/Container/HomeLayout",
  component: HomeContainer,
} as Meta;

const HomeLayoutStory: Story<HomeLayoutProps> = (args) => (
  <>
    <div style={{ width: "70vw", border: "1px solid red" }}>
      <HomeContainer {...args} />
    </div>
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
