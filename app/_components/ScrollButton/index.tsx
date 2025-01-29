// ScrollButton.tsx - Client Component
"use client";

import { Button } from "../../_components";

interface ScrollButtonProps {
  className?: string;
}

export const ScrollButton = ({ className }: ScrollButtonProps): JSX.Element => {
  const handleScroll = (): void => {
    document
      .getElementById("food-calculator")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Button
      variant="accent"
      elevation={2}
      size="large"
      onClick={handleScroll}
      className={className}
      icon={{ source: "lucide", name: "arrowRight" }}
    >
      Calcula la cantidad
    </Button>
  );
};
