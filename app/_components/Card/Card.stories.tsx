import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import classNames from "classnames/bind";

import Typography from "../Typography";
import { Card } from "./index";

import "../../_styles/globals.scss";
import "../../_styles/utilities.scss";
import cardStyles from "./Card.module.scss";
import SocialIcons from "../SocialIcons/index";
const cx = classNames.bind(cardStyles);

export default {
  title: "Components/Card",
  component: Card,
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => {
  return <Card {...args} />;
};

export const VenueCard = Template.bind({});
VenueCard.args = {
  style: { maxWidth: "552px" },
  data: {
    id: "1",
    title: "Lorem Ipsum",
    description: "description",
  },
  children: (
    <div className="flex-center">
      <Card.Image width={100} height={100} />
      <Card.Body className="ml-2">
        <div className="flex-start">
          <Card.Title title="Venue Name" />
          <Card.Rating rating={4} className="ml-2" />
        </div>
        <Card.Description description="0000 Street’s Name, Country/Region, 00000, City, State" />
        <Card.Tags tags={["Service", "Service", "Service", "Service"]} />
      </Card.Body>
      <Card.Button size="large" className={cx("Card__button")}>
        View
      </Card.Button>
    </div>
  ),
};

export const ServiceSearch = Template.bind({});
ServiceSearch.args = {
  style: { maxWidth: "552px" },
  data: {
    id: "2",
    title: "Service Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Senectus odio blandit aliquam dictum nibh.",
  },
  children: (
    <div className="flex-center">
      <Card.Image width={100} height={100} />

      <Card.Body className="ml-2">
        <div className="flex-start">
          <Card.Title />
          <a href="#" className="link ml-2">
            Venue's Name
          </a>
        </div>

        <Card.Description />

        <div className="flex-start gap-3">
          <Typography variant="p2">
            Duration <span style={{ color: "#747995" }}>10:00</span>
          </Typography>

          <Typography variant="p1">$00.00 USD</Typography>
        </div>
      </Card.Body>

      <Card.Button size="large" className={cx("Card__button")}>
        Book
      </Card.Button>
    </div>
  ),
};

export const TemplateCard = Template.bind({});
TemplateCard.args = {
  style: { maxWidth: "256px" },
  data: {
    id: "3",
    title: "Template's Name",
  },
  children: (
    <div style={{ flexDirection: "column" }}>
      <Card.Header style={{ paddingBottom: "13px" }}>
        <Card.Image width={256} height={160} />
      </Card.Header>

      <Card.Body className="flex-center" style={{ paddingBottom: "14px" }}>
        <Card.Title />
      </Card.Body>

      <Card.Footer className="space-between" style={{ padding: "0 24px 20px" }}>
        <Card.Button
          size="medium"
          variant="secondary"
          className={`${cx("Card__button")} m-0`}
        >
          Preview
        </Card.Button>

        <Card.Button size="medium" className={`${cx("Card__button")} m-0`}>
          Select this
        </Card.Button>
      </Card.Footer>
    </div>
  ),
};

export const ServiceV2 = Template.bind({});
ServiceV2.args = {
  style: { maxWidth: "264px" },
  data: {
    id: "3",
    title: "Service Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Risus magna urna nunc quam aliquam et pellentesque sit. ",
  },
  children: (
    <div style={{ flexDirection: "column" }}>
      <Card.Header style={{ paddingBottom: "13px" }}>
        <Card.Image width={256} height={160} />
      </Card.Header>

      <Card.Body
        className="flex-center"
        style={{ paddingBottom: "14px", paddingInline: "16px" }}
      >
        <Card.Title variant="h5" style={{ fontSize: "20px" }} />
        <Typography variant="p3">00 mins</Typography>

        <Card.Description />
      </Card.Body>

      <Card.Footer className="space-between" style={{ padding: "0 16px 20px" }}>
        <Typography variant="p1">$00.USD</Typography>

        <Card.Button size="medium" className={`${cx("Card__button")} m-0`}>
          Book Now
        </Card.Button>
      </Card.Footer>
    </div>
  ),
};

export const ServiceSearchV2 = Template.bind({});
ServiceSearchV2.args = {
  style: { maxWidth: "264px" },
  data: {
    id: "3",
    title: "Service Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Risus magna urna nunc quam aliquam et pellentesque sit. ",
  },
  children: (
    <div style={{ flexDirection: "column" }}>
      <Card.Header style={{ paddingBottom: "13px" }}>
        <Card.Image width={256} height={160} />
      </Card.Header>

      <Card.Body
        className="flex-center"
        style={{ paddingBottom: "14px", paddingInline: "16px" }}
      >
        <Card.Title variant="h5" style={{ fontSize: "20px" }} />

        <Typography variant="p3" className="link">
          Venue’s Name
        </Typography>

        <Card.Description />

        <div style={{ alignSelf: "flex-start" }}>
          <Typography variant="p2">Duration: 00:00 mins</Typography>
        </div>
      </Card.Body>

      <Card.Footer className="space-between" style={{ padding: "0 16px 20px" }}>
        <Typography variant="p1">$00.USD</Typography>

        <Card.Button size="medium" className={`${cx("Card__button")} m-0`}>
          Book
        </Card.Button>
      </Card.Footer>
    </div>
  ),
};

export const Professional = Template.bind({});
Professional.args = {
  style: { maxWidth: "264px" },
  data: {
    id: "3",
    title: "Name",
    description: "Speciality",
  },
  children: (
    <div style={{ flexDirection: "column" }}>
      <Card.Header style={{ paddingBottom: "13px" }}>
        <Card.Image width={256} height={160} />
      </Card.Header>

      <Card.Body
        className="flex-center"
        style={{ paddingBottom: "14px", paddingInline: "16px" }}
      >
        <Card.Title variant="h5" style={{ fontSize: "20px" }} />
        <Card.Description />
        <SocialIcons options={["facebook", "twitter", "instagram"]} />
      </Card.Body>

      <Card.Footer className="space-between" style={{ padding: "0 24px 20px" }}>
        <Card.Button
          size="medium"
          variant="secondary"
          className={`${cx("Card__button")} m-0`}
        >
          View More
        </Card.Button>

        <Card.Button size="medium" className={`${cx("Card__button")} m-0`}>
          Book
        </Card.Button>
      </Card.Footer>
    </div>
  ),
};
