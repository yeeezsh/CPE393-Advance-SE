import React from "react";

import { Story, Meta } from "@storybook/react";

import UploadImage from "./UploadImage";

export default {
  title: "Module/Home/Components/Upload-image",
  component: UploadImage,
} as Meta;

const UploadImageStory: Story = () => (
<>
<UploadImage />
</>
);

export const Default = UploadImageStory.bind({});