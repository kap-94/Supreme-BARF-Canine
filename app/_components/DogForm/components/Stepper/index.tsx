import classNames from "classnames/bind";
import { Typography } from "@/app/_components";
import styles from "./FormStepper.module.scss";
import { Check } from "lucide-react";

const cx = classNames.bind(styles);

interface StepItem {
  step: number;
  label: string;
}

interface StepperProps {
  activeStep: number;
  steps?: StepItem[];
  variant?: "default" | "compact" | "minimal";
}

const DEFAULT_STEPS: StepItem[] = [
  { step: 1, label: "Información Básica" },
  { step: 2, label: "Estado Físico" },
  { step: 3, label: "Resultados" },
];

interface StepProps {
  number: number;
  label: string;
  isActive: boolean;
  isCurrent: boolean;
  variant: "default" | "compact" | "minimal";
}

const Step: React.FC<StepProps> = ({
  number,
  label,
  isActive,
  isCurrent,
  variant,
}) => {
  if (variant === "minimal") {
    return (
      <div
        className={cx("stepper__minimal-step", {
          "stepper__minimal-step--active": isActive,
          "stepper__minimal-step--current": isCurrent,
        })}
      />
    );
  }

  return (
    <div
      className={cx("stepper__step", {
        "stepper__step--active": isActive,
        "stepper__step--current": isCurrent,
        "stepper__step--compact": variant === "compact",
      })}
    >
      <span className={cx("stepper__step-number")}>
        {isActive && !isCurrent ? (
          <Check size={variant === "compact" ? 14 : 18} />
        ) : (
          number
        )}
      </span>
      {variant === "default" && (
        <Typography variant="p2" className={cx("stepper__step-label")}>
          {label}
        </Typography>
      )}
    </div>
  );
};

export const FormStepper: React.FC<StepperProps> = ({
  activeStep,
  steps = DEFAULT_STEPS,
  variant = "default",
}) => {
  if (variant === "minimal") {
    return (
      <div className={cx("stepper", "stepper--minimal")}>
        <div className={cx("stepper__minimal-steps")}>
          {steps.map((step) => (
            <Step
              key={step.step}
              number={step.step}
              label={step.label}
              isActive={activeStep >= step.step}
              isCurrent={activeStep === step.step}
              variant={variant}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cx("stepper", { "stepper--compact": variant === "compact" })}
    >
      <div className={cx("stepper__steps")}>
        {steps.map((step) => (
          <Step
            key={step.step}
            number={step.step}
            label={step.label}
            isActive={activeStep >= step.step}
            isCurrent={activeStep === step.step}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
};
