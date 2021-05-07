import { Meta, Story } from "@storybook/react";
import React from "react";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { Searchbar } from ".";
import { store } from "../../../../common/store";
import { apolloClient } from "../../../../common/services/apollo.client";
export default {
  title: "Module/Home/Components/Search",
  component: Searchbar,
} as Meta;

const SearchStory: Story = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Searchbar />
      </ApolloProvider>
    </Provider>
  );
};

export const Default = SearchStory.bind({});
