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
}

const Step: React.FC<StepProps> = ({ number, label, isActive, isCurrent }) => {
  return (
    <div
      className={cx("stepper__step", {
        "stepper__step--active": isActive,
        "stepper__step--current": isCurrent,
      })}
    >
      <span className={cx("stepper__step-number")}>
        {isActive && !isCurrent ? <Check size={18} /> : number}
      </span>
      <Typography variant="p2" className={cx("stepper__step-label")}>
        {label}
      </Typography>
    </div>
  );
};

export const FormStepper: React.FC<StepperProps> = ({
  activeStep,
  steps = DEFAULT_STEPS,
}) => {
  return (
    <div className={cx("stepper")}>
      <div className={cx("stepper__steps")}>
        {steps.map((step) => (
          <Step
            key={step.step}
            number={step.step}
            label={step.label}
            isActive={activeStep >= step.step}
            isCurrent={activeStep === step.step}
          />
        ))}
      </div>
    </div>
  );
};
