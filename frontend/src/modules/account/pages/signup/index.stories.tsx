import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { Provider } from "react-redux";
import AccountSignUpPage from ".";
import { apolloClient } from "../../../../common/services/apollo.client";
import { store } from "../../../../common/store";
import SignUpPage from "../../../../pages/signUpPage";

export default {
  title: "Pages/signup",
  component: AccountSignUpPage,
} as Meta;

const SignUpPageStory: Story = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <SignUpPage />
      </ApolloProvider>
    </Provider>
  );
};

export const Default = SignUpPageStory.bind({});
