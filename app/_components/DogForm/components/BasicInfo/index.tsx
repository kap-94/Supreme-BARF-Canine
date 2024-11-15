import classNames from "classnames/bind";
import { PawPrint } from "lucide-react";
import { dogFormOptions } from "@/app/_lib/data";
import { Button, Dropdown, TextField } from "@/app/_components";
import { FormHeader } from "../FormHeader";
import { DogFormValues } from "../..";
import styles from "./BasicInfo.module.scss";

const cx = classNames.bind(styles);

interface BasicInfoProps {
  values: DogFormValues;
  setFieldValue: (field: string, value: any) => void;
  onNext: () => void;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({
  values,
  setFieldValue,
  onNext,
}) => {
  return (
    <div className={cx("basic-info")}>
      <FormHeader icon={<PawPrint size={24} />} title="Perfil de tu Perro" />

      <div className={cx("basic-info__fields")}>
        <div className={cx("basic-info__field-group")}>
          <Dropdown
            label="Años"
            id="dogYears"
            options={dogFormOptions.yearsOptions}
            selected={
              dogFormOptions.yearsOptions.find(
                (option) => option.value === values.dogYears
              )!
            }
            onSelectedChange={(option) =>
              setFieldValue("dogYears", option.value)
            }
          />
          <Dropdown
            label="Meses"
            id="dogMonths"
            options={dogFormOptions.monthsOptions}
            selected={
              dogFormOptions.monthsOptions.find(
                (option) => option.value === values.dogMonths
              )!
            }
            onSelectedChange={(option) =>
              setFieldValue("dogMonths", option.value)
            }
          />
        </div>

        <TextField
          label="Peso (kg)"
          name="dogWeight"
          type="number"
          inputClassName={cx("basic-info__text-field")}
          placeholder="Ej. 10.5"
          value={values.dogWeight}
          onChange={(e) => setFieldValue("dogWeight", e.target.value)}
        />
      </div>

      <Button type="button" fullWidth onClick={onNext}>
        Siguiente
      </Button>
    </div>
  );
};
