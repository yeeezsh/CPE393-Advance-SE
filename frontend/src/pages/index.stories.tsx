import { ApolloProvider } from "@apollo/client";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { Provider } from "react-redux";
import IndexPage, { IndexPageProps } from ".";
import { apolloClient } from "../common/services/apollo.client";
import { store } from "../common/store";

export default {
  title: "Pages/Home",
  component: IndexPage,
} as Meta;

const IndexPageStory: Story<IndexPageProps> = (args) => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <IndexPage {...args} enableAuth={false} />
    </ApolloProvider>
  </Provider>
);
export const Default = IndexPageStory.bind({});
