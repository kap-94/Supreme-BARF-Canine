import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Tags, TagsProps } from "../Tags";

export default {
  title: "Components/Tags",
  component: Tags,
} as Meta<typeof Tags>;

const Template: StoryFn<TagsProps> = (args) => {
  return <Tags {...args} />;
};

export const OneTag = Template.bind({});
OneTag.args = {
  tags: ["Tag 1"],
};

export const ThreeTags = Template.bind({});
ThreeTags.args = {
  tags: ["Tag 1", "Tag 2", "Tag 3"],
};
