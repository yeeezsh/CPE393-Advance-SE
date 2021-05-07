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