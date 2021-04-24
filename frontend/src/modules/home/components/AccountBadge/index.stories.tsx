import React from "react";
import { Meta, Story } from "@storybook/react";
import AccountBadge, { AccountBadgeProps } from ".";

export default {
  title: "Module/Home/Components/AccountBadge",
  component: AccountBadge,
} as Meta;

const AccountBadgeStory: Story<AccountBadgeProps> = (args) => (
  <>
    <div style={{ height: 60 }}>
      <AccountBadge {...args} />
    </div>
  </>
);

export const Default = AccountBadgeStory.bind({});
Default.args = {
  username: "hello",
} as AccountBadgeProps;
