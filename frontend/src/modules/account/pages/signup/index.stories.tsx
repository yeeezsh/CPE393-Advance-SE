import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { Meta, Story } from "@storybook/react";
import React from "react";
import AccountSignUpPage from ".";
import { apolloClient } from "../../../../common/services/apollo.client";
import SignUpPage from "../../../../pages/signUpPage";

export default {
  title: "Pages/signup",
  component: AccountSignUpPage,
} as Meta;

const SignUpPageStory: Story = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <SignUpPage />
    </ApolloProvider>
  );
};

export const Default = SignUpPageStory.bind({});
