import { LucideIcon } from "lucide-react";

export interface BenefitProps {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface MediaItemProps {
  alt: string;
  src: string;
}

export interface AnimationElements {
  number: Element | null;
  icon: Element | null;
  title: Element | null;
  description: Element | null;
}
