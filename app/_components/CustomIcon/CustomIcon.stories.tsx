import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Icon from ".";
import "../../_styles/globals.scss";

export default {
  title: "Components/CustomIcon",
  component: Icon,
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args) => {
  console.log(args);
  return (
    <div>
      <Icon
        style={{ backgroundColor: args.color === "white" ? "#3950EE" : "" }}
        {...args}
      />
    </div>
  );
};

const AllIcon: StoryFn<typeof Icon> = (args) => {
  return (
    <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
      <Icon icon="addImage" />
      <Icon icon="airConditioner" />
      <Icon icon="beverages" />
      <Icon icon="calendar" />
      <Icon icon="calendarCheck" />
      <Icon icon="change" />
      <Icon icon="changeImage" />
      <Icon icon="check" />
      <Icon icon="clock" />
      <Icon icon="close" />
      <Icon icon="computer" />
      <Icon icon="customers" />
      <Icon icon="deleteImage" />
      <Icon icon="download" />
      <Icon icon="drag" />
      <Icon icon="dropDown" />
      <Icon icon="dropper" />
      <Icon icon="edit" />
      <Icon icon="email" />
      <Icon icon="eye" />
      <Icon icon="eyeOff" />
      <Icon icon="facebook" />
      <Icon icon="filter" />
      <Icon icon="gaming" />
      <Icon icon="gps" />
      <Icon icon="home" />
      <Icon icon="instagram" />
      <Icon icon="left" />
      <Icon icon="music" />
      <Icon icon="parking" />
      <Icon icon="phone" />
      <Icon icon="plus" />
      <Icon icon="preview" />
      <Icon icon="reading" />
      <Icon icon="restroom" />
      <Icon icon="search" />
      <Icon icon="security" />
      <Icon icon="selfie" />
      <Icon icon="services" />
      <Icon icon="snacks" />
      <Icon icon="tiktok" />
      <Icon icon="trash" />
      <Icon icon="tv" />
      <Icon icon="twitter" />
      <Icon icon="user" />
      <Icon icon="venue" />
      <Icon icon="visa" />
      <Icon icon="whatsapp" />
      <Icon icon="wifi" />
      <Icon icon="youtube" />
    </div>
  );
};

export const AllIcons = AllIcon.bind({});

export const GPSIconGraySmall = Template.bind({});

GPSIconGraySmall.args = {
  icon: "gps",
  color: "gray",
};

export const GPSIconWhiteSmall = Template.bind({});

GPSIconWhiteSmall.args = {
  icon: "gps",
  color: "white",
};

export const GPSIconErrorSmall = Template.bind({});

GPSIconErrorSmall.args = {
  icon: "gps",
  color: "error",
};
export const GPSIconGrayMedium = Template.bind({});

GPSIconGrayMedium.args = {
  icon: "gps",
  color: "gray",
};

export const GPSIconWhiteMedium = Template.bind({});

GPSIconWhiteMedium.args = {
  icon: "gps",
  color: "white",
};

export const GPSIconErrorMedium = Template.bind({});

GPSIconErrorMedium.args = {
  icon: "gps",
  color: "error",
};
