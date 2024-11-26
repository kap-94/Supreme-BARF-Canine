import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Typography } from "@/app/_components";
import { TypographyVariant, TypographyColor } from "./interfaces";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "p1",
        "p2",
        "p3",
        "button",
        "overline",
      ],
    },
    color: {
      control: { type: "select" },
      options: [
        "inherit",
        "initial",
        "primary",
        "normal",
        "secondaryElements",
        "blue",
        "white",
        "light",
        "error",
        "secondary",
      ],
    },
    align: {
      control: { type: "select" },
      options: ["inherit", "left", "center", "right", "justify"],
    },
    fontFamily: {
      control: { type: "select" },
      options: ["raleway", "poppins"],
    },
    fontWeight: {
      control: { type: "select" },
      options: ["400", "500", "600", "700", "800", "900"],
    },
    gutterBottom: { control: "boolean" },
    paragraph: { control: "boolean" },
    textTransform: {
      control: { type: "select" },
      options: ["none", "capitalize", "uppercase", "lowercase"],
    },
    children: { control: "text" },
  },
};

export default meta;

// Template base
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    variant: "p1",
    children: "This is a default paragraph (p1)",
    color: "initial",
    align: "inherit",
    fontFamily: "raleway",
    fontWeight: 400,
    gutterBottom: false,
    paragraph: false,
    textTransform: "none",
  },
};

// Variantes de Typography
export const Heading1: Story = {
  args: {
    variant: "h1",
    children: "This is Heading 1",
    fontFamily: "raleway",
  },
};

export const Heading2: Story = {
  args: {
    variant: "h2",
    children: "This is Heading 2",
    fontFamily: "raleway",
  },
};

export const Heading3: Story = {
  args: {
    variant: "h3",
    children: "This is Heading 3",
    fontFamily: "poppins",
  },
};

export const Paragraph1: Story = {
  args: {
    variant: "p1",
    children: "This is Paragraph 1",
    fontFamily: "raleway",
  },
};

export const Paragraph2: Story = {
  args: {
    variant: "p2",
    children: "This is Paragraph 2",
    fontFamily: "raleway",
  },
};

export const ButtonText: Story = {
  args: {
    variant: "button",
    children: "Button Text",
    fontFamily: "raleway",
  },
};

export const OverlineText: Story = {
  args: {
    variant: "overline",
    children: "Overline Text",
    fontFamily: "raleway",
  },
};
