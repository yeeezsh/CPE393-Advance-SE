import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { Provider } from "react-redux";
import AccountSignInPage from ".";
import { apolloClient } from "../../../../common/services/apollo.client";
import { store } from "../../../../common/store";
import SignInPage from "../../../../pages/signInPage";

export default {
  title: "Pages/signin",
  component: AccountSignInPage,
} as Meta;

const SignInPageStory: Story = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <SignInPage />
      </ApolloProvider>
    </Provider>
  );
};

export const Default = SignInPageStory.bind({});
