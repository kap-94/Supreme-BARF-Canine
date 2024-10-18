import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Typography from ".";
import "@/app/styles/globals.scss";
import Layout from "@/app/components/layouts/Layout";

export default {
  title: "Components/Typography",
  component: Typography,
} as Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = (args) => {
  return (
    <>
      <Layout>
        <Typography {...args}>
          Hello, this is the typography component with the&nbsp;
          {args.variant || "normal"} variant and with the&nbsp;
          {args.color || "normal"} color.
        </Typography>
      </Layout>
    </>
  );
};

export const Normal = Template.bind({});

Normal.args = {
  color: "initial",
};

export const Primary = Template.bind({});

Primary.args = {
  color: "primary",
  variant: "h1",
};

export const SecondaryCenterUppercase = Template.bind({});

SecondaryCenterUppercase.args = {
  color: "secondaryElements",
  align: "center",
  fontWeight: 400,
  variant: "p1",
  textTransform: "uppercase",
};
export const SecondaryCenterLowercase = Template.bind({});

SecondaryCenterLowercase.args = {
  color: "secondaryElements",
  align: "center",
  fontWeight: 400,
  variant: "p1",
  textTransform: "lowercase",
  gutterBottom: true,
};

export const Error = Template.bind({});

Error.args = {
  color: "error",
  variant: "button",
};

export const Light = Template.bind({});

Light.args = {
  color: "light",
  variant: "overline",
};

export const Blue = Template.bind({});

Blue.args = {
  color: "blue",
  fontWeight: 700,
  variant: "p3",
};

export const InheritColor = Template.bind({});

InheritColor.args = {
  color: "inherit",
  fontWeight: 500,
  variant: "h5",
  align: "right",
};
