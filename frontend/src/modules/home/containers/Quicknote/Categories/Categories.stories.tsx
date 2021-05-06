import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// import { Meta, Story } from "@storybook/react";
import { Story, Meta } from "@storybook/react";

import Categories from "./Categories";

export default {
  title: "Home/Component/container/QuickNote/Categories",
  component: Categories,
} as Meta;

const Template: Story = () => <Categories />;