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

export const Default = AccountBadgeStory.bind({});
Default.args = {
  username: "John",
  overlayPosition: "left",
  overlay: false,
} as AccountBadgeProps;

export const WithOverlayDefault = AccountBadgeStory.bind({});
WithOverlayDefault.args = {
  username: "John",
  overlayPosition: "left",
  overlay: true,
} as AccountBadgeProps;

export const Right = AccountBadgeStory.bind({});
Right.args = {
  username: "John",
  overlayPosition: "right",
  overlay: false,
} as AccountBadgeProps;

export const WithOverylayRight = AccountBadgeStory.bind({});
WithOverylayRight.args = {
  username: "John",
  overlayPosition: "right",
  overlay: true,
} as AccountBadgeProps;
