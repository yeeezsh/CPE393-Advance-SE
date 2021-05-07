import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { Meta, Story } from "@storybook/react";
import { Provider } from "react-redux";
import { apolloClient } from "../../../../common/services/apollo.client";
import { store } from "../../../../common/store";
import "../../../../index.css";
import HomeContainer, { HomeContainerProps } from "./Home.container";

export default {
  title: "Module/Home/Container/Home",
  component: HomeContainer,
} as Meta;

const HomeLayoutStory: Story<HomeContainerProps> = (args) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <div style={{ border: "1px solid red" }}>
          <HomeContainer {...args} />
        </div>
      </ApolloProvider>
    </Provider>
  );
};

export const Default = HomeLayoutStory.bind({});
Default.args = {
  collapse: false,
};

export const Open = HomeLayoutStory.bind({});
Open.args = {
  collapse: false,
};

export const Close = HomeLayoutStory.bind({});
Close.args = {
  collapse: true,
};
