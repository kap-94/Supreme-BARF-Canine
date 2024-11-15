import classNames from "classnames/bind";
import { ActivitySquare } from "lucide-react";
import { dogFormOptions } from "@/app/_lib/data";
import { Button, Dropdown } from "@/app/_components";
import { FormHeader } from "../FormHeader";
import { DogFormValues } from "../..";
import styles from "./PhysicalState.module.scss";

const cx = classNames.bind(styles);

interface PhysicalStateProps {
  values: DogFormValues;
  setFieldValue: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhysicalState: React.FC<PhysicalStateProps> = ({
  values,
  setFieldValue,
  onNext,
  onPrev,
}) => {
  return (
    <div className={cx("physical-state")}>
      <FormHeader icon={<ActivitySquare size={24} />} title="Estado Físico" />

      <div className={cx("physical-state__fields")}>
        <Dropdown
          label="Nivel de actividad"
          id="activityLevel"
          options={dogFormOptions.activityLevelOptions}
          selected={
            dogFormOptions.activityLevelOptions.find(
              (option) => option.value === values.activityLevel
            )!
          }
          onSelectedChange={(option) =>
            setFieldValue("activityLevel", option.value)
          }
        />

        <Dropdown
          label="¿Está esterilizado?"
          id="sterilized"
          options={dogFormOptions.sterilizedOptions}
          selected={
            dogFormOptions.sterilizedOptions.find(
              (option) => option.value === values.sterilized
            )!
          }
          onSelectedChange={(option) =>
            setFieldValue("sterilized", option.value)
          }
        />

        <Dropdown
          label="Estado especial"
          id="pregnancyStatus"
          options={dogFormOptions.pregnancyStatusOptions}
          selected={
            dogFormOptions.pregnancyStatusOptions.find(
              (option) => option.value === values.pregnancyStatus
            )!
          }
          onSelectedChange={(option) =>
            setFieldValue("pregnancyStatus", option.value)
          }
        />
      </div>

      <div className={cx("physical-state__buttons")}>
        <Button type="button" fullWidth variant="secondary" onClick={onPrev}>
          Anterior
        </Button>
        <Button type="button" fullWidth variant="primary" onClick={onNext}>
          Calcular
        </Button>
      </div>
    </div>
  );
};
