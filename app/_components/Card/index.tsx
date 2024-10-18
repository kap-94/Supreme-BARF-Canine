"use client";
import { CardHOCProps } from "./interfaces";

import { Button, Rating, Tags } from "@/app/_components";

import {
  Card as CardHOC,
  CardDescription,
  CardImage,
  CardTitle,
  CardFooter,
  CardHeader,
  CardBody,
} from "./components";

export {
  CardDescription,
  CardBody,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "./components";

export const Card: CardHOCProps = Object.assign(CardHOC, {
  Description: CardDescription,
  Body: CardBody,
  Button: Button,
  Footer: CardFooter,
  Header: CardHeader,
  Image: CardImage,
  Rating: Rating,
  Tags: Tags,
  Title: CardTitle,
});

export default Card;
