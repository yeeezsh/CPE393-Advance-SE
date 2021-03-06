import { Story, Meta } from "@storybook/react";
import { TagType } from "../Tags";
import Cards, { CardProps } from "./Cards";

const MOCK_TAGS: TagType = [
  { _id: "1", label: "t1", checked: false, createAt: new Date() },
  { _id: "2", label: "t2", checked: true, createAt: new Date() },
  { _id: "3", label: "t3", checked: false, createAt: new Date() },
];

export default {
  title: "Module/Home/Components/Cards",
  component: Cards,
} as Meta;

const CardsStory: Story<CardProps> = (args) => (
  <>
    <Cards {...args} />
  </>
);

export const Default = CardsStory.bind({});
Default.args = {
  domain: "google.com",
  tags: MOCK_TAGS,
  original: "https://google.com",
  note:
    "test very very very very very very very very very very very very very very very very very long note",
} as CardProps;
