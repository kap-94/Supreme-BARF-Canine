import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Button from ".";

export default {
  title: "Components/ButtonsUI/Buttons",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => {
  return <Button {...args}>{args.children}</Button>;
};

export const SmallButtonPrimary = Template.bind({});

SmallButtonPrimary.args = {
  size: "small",
  variant: "primary",
  fullWidth: false,
  children: <>Button</>,
};

export const SmallButtonGPSPrimary = Template.bind({});

SmallButtonGPSPrimary.args = {
  size: "small",
  variant: "primary",
  icon: "gps",
  fullWidth: false,
  children: <>Button</>,
};
export const SmallButtonSecondary = Template.bind({});

SmallButtonSecondary.args = {
  size: "small",
  variant: "secondary",
  fullWidth: false,
  children: <>Button</>,
};

export const SmallButtonGPSSecondary = Template.bind({});

SmallButtonGPSSecondary.args = {
  size: "small",
  variant: "secondary",
  icon: "gps",
  fullWidth: false,
  children: <>Button</>,
};

export const MediumButtonPrimary = Template.bind({});

MediumButtonPrimary.args = {
  size: "medium",
  variant: "primary",
  fullWidth: false,
  children: <>Button</>,
};

export const MediumButtonGPSPrimary = Template.bind({});

MediumButtonGPSPrimary.args = {
  size: "medium",
  variant: "primary",
  icon: "gps",
  fullWidth: false,
  children: <>Button</>,
};
export const MediumButtonSecondary = Template.bind({});

MediumButtonSecondary.args = {
  size: "medium",
  variant: "secondary",
  fullWidth: false,
  children: <>Button</>,
};

export const MediumButtonGPSSecondary = Template.bind({});

MediumButtonGPSSecondary.args = {
  size: "medium",
  variant: "secondary",
  icon: "gps",
  fullWidth: false,
  children: <>Button</>,
};
