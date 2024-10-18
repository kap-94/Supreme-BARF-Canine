import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Button from ".";

export default {
  title: "Components/ButtonsUI/Pills",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => {
  return <Button {...args}>{args.children}</Button>;
};

export const SmallPillPrimary = Template.bind({});

SmallPillPrimary.args = {
  size: "small",
  variant: "primary",
  fullWidth: false,
  pill: true,
  children: <>Pill</>,
};

export const SmallPillGPSPrimary = Template.bind({});

SmallPillGPSPrimary.args = {
  size: "small",
  variant: "primary",
  icon: "gps",
  fullWidth: false,
  pill: true,
  children: <>Pill</>,
};
export const SmallPillSecondary = Template.bind({});

SmallPillSecondary.args = {
  size: "small",
  variant: "secondary",
  fullWidth: false,
  pill: true,
  children: <>Pill</>,
};

export const SmallPillGPSSecondary = Template.bind({});

SmallPillGPSSecondary.args = {
  size: "small",
  variant: "secondary",
  icon: "gps",
  fullWidth: false,
  pill: true,
  children: <>Pill</>,
};

export const MediumPillPrimary = Template.bind({});

MediumPillPrimary.args = {
  size: "medium",
  variant: "primary",
  fullWidth: false,
  pill: true,
  children: <>Pill</>,
};

export const MediumPillGPSPrimary = Template.bind({});

MediumPillGPSPrimary.args = {
  size: "medium",
  variant: "primary",
  icon: "gps",
  fullWidth: false,
  pill: true,
  children: <>Pill</>,
};
export const MediumPillSecondary = Template.bind({});

MediumPillSecondary.args = {
  size: "medium",
  variant: "secondary",
  fullWidth: false,
  pill: true,
  children: <>Pill</>,
};

export const MediumPillGPSSecondary = Template.bind({});

MediumPillGPSSecondary.args = {
  size: "medium",
  variant: "secondary",
  icon: "gps",
  fullWidth: false,
  pill: true,
  children: <>Pill</>,
};
