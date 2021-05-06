// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// import { Meta, Story } from "@storybook/react";
import { Story, Meta } from "@storybook/react";
import Cards from "./Cards";


export default {
  title: "Module/Home/Components/Cards",
  component: Cards,
} as Meta;

// const Template: Story = () => <QuickNote />;

const CardsStory: Story = () => (
  <>
    <Cards />
  </>
);

export const Default = CardsStory.bind({});
