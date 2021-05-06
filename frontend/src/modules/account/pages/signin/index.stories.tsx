import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { Story, Meta } from "@storybook/react";
import { apolloClient } from "../../../../common/services/apollo.client";
import AccountSignInPage from ".";
import SignInPage from "../../../../pages/signInPage";

export default {
  title: "Pages/signin",
  component: AccountSignInPage,
} as Meta;

const SignInPageStory: Story = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <SignInPage />
    </ApolloProvider>
  );
};

export const Default = SignInPageStory.bind({});
