import React from "react";
import { Meta, Story } from "@storybook/react";
import Button, { ButtonProps } from ".";

export default {
  title: "Common/Components/Button",
  component: Button,
  args: {
    children: "Submit",
  },
} as Meta;

const ButtonStory: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = ButtonStory.bind({});

export const Rounded = ButtonStory.bind({});
Rounded.args = {
  rounded: true,
} as ButtonProps;
