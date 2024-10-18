import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Rating, RatingProps } from "../Rating";

export default {
	title: "Components/Rating",
	component: Rating,
} as Meta<typeof Rating>;

const Template: StoryFn<RatingProps> = args => {
	return <Rating {...args} />;
};

export const EmptyRating = Template.bind({});
EmptyRating.args = {
	rating: 0,
};

export const RatingWith1Star = Template.bind({});
RatingWith1Star.args = {
	rating: 1,
};

export const RatingWith2Stars = Template.bind({});
RatingWith2Stars.args = {
	rating: 2,
};

export const RatingWith3Stars = Template.bind({});
RatingWith3Stars.args = {
	rating: 3,
};

export const RatingWith4Stars = Template.bind({});
RatingWith4Stars.args = {
	rating: 4,
};

export const RatingWith5Stars = Template.bind({});
RatingWith5Stars.args = {
	rating: 5,
};
