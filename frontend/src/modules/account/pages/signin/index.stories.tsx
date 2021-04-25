import React from "react";
import "./antd/dist/antd.css";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import SignInPage from ".";

export default {
  title: "Account/Pages/SignIn",
  component: SignInPage,
} as Meta;

const Template: Story = () => <SignInPage />;

export const LoggedIn = Template.bind({});
// LoggedIn.args = {
//   ...HeaderStories.LoggedIn.args,
// };

export const LoggedOut = Template.bind({});
// LoggedOut.args = {
//   ...HeaderStories.LoggedOut.args,
// };
