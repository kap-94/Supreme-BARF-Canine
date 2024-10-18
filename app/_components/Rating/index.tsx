import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Rating.module.scss";

import FilledStarIcon from "./assets/filled-star.svg";
import EmptyStarIcon from "./assets/empty-star.svg";

const cx = classNames.bind(styles);

export interface RatingProps {
	rating: 0 | 1 | 2 | 3 | 4 | 5;
	className?: string;
}

export const Rating: React.FC<RatingProps> = ({ rating, className }) => {
	const validRating = Math.min(Math.max(rating, 0), 5);
	const filledStars = Math.floor(validRating);
	const emptyStars = 5 - filledStars;

	return (
		<div className={`${cx("rating")} ${className}`}>
			{[...Array(filledStars)].map((_, index) => (
				<Image
					key={index}
					src={FilledStarIcon}
					alt="Filled Star"
					width={20}
					height={20}
				/>
			))}
			{[...Array(emptyStars)].map((_, index) => (
				<Image
					key={index}
					src={EmptyStarIcon}
					alt="Empty Star"
					width={20}
					height={20}
				/>
			))}
			<span className={cx("rating__number")}>{validRating}</span>
		</div>
	);
};
