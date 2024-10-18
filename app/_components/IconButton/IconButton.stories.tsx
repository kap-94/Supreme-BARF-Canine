import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CustomIconButton from ".";
import "../../../_styles/globals.scss";

export default {
  title: "Components/CustomIconButton",
  component: CustomIconButton,
} as Meta<typeof CustomIconButton>;

const Template: StoryFn<typeof CustomIconButton> = (args) => {
  return <CustomIconButton {...args} />;
};

export const TrashIcon = Template.bind({});

TrashIcon.args = {
  icon: "trash",
  color: "gray",
  size: "medium",
};

export const CloseIcon = Template.bind({});

CloseIcon.args = {
  icon: "close",
  color: "white",
  size: "large",
};
