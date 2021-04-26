import { Meta, Story } from "@storybook/react";
import React from "react";
import CharacterBadge, { CharacterBadgeProps } from ".";

export default {
  title: "Common/Components/CharacterBadge",
  component: CharacterBadge,
  args: {
    children: "1",
  },
} as Meta;

const CharacterBadgeStory: Story<CharacterBadgeProps & { text: string }> = (
  args
) => (
  <>
    <div style={{ width: 55, border: "1px solid red" }}>
      <CharacterBadge {...args} />
    </div>
  </>
);

export const Default = CharacterBadgeStory.bind({});
