// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// import { Meta, Story } from "@storybook/react";
import { Story, Meta } from "@storybook/react";
import QuickNote from "./QuickNote";


export default {
  title: "Module/Home/Components/QuickNote",
  component: QuickNote,
} as Meta;

// const Template: Story = () => <QuickNote />;

const QuickNoteStory: Story = () => (
  <>
    <QuickNote />
  </>
);

export const Default = QuickNoteStory.bind({});
