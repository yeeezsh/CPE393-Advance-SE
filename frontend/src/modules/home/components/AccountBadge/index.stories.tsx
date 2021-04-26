import React from "react";
import { Meta, Story } from "@storybook/react";
import AccountBadge, { AccountBadgeProps } from ".";

export default {
  title: "Module/Home/Components/AccountBadge",
  component: AccountBadge,
} as Meta;

const AccountBadgeStory: Story<AccountBadgeProps> = (args) => (
  <>
    <div style={{ height: 50 }}>
      <AccountBadge {...args} />
    </div>
  </>
);

const DEFAULT_ARGS = {
  username: "John1234",
  email: "john@doe.com",
  displayname: "John Doe",
  overlayPosition: "left",
  overlay: false,
} as AccountBadgeProps;

export const Default = AccountBadgeStory.bind({});
Default.args = {
  ...DEFAULT_ARGS,
} as AccountBadgeProps;

export const WithOverlayDefault = AccountBadgeStory.bind({});
WithOverlayDefault.args = {
  ...DEFAULT_ARGS,
  overlay: true,
} as AccountBadgeProps;

export const Right = AccountBadgeStory.bind({});
Right.args = {
  ...DEFAULT_ARGS,
  overlayPosition: "right",
  overlay: false,
} as AccountBadgeProps;

export const WithOverylayRight = AccountBadgeStory.bind({});
WithOverylayRight.args = {
  ...DEFAULT_ARGS,
  overlayPosition: "right",
  overlay: true,
} as AccountBadgeProps;
