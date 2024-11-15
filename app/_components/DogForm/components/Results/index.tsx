import classNames from "classnames/bind";
import { ClipboardCheck } from "lucide-react";
import { DogFormValues } from "../..";
import { FormHeader } from "../FormHeader";
import { Button, Typography } from "@/app/_components";
import styles from "./Results.module.scss";

const cx = classNames.bind(styles);

interface ResultsProps {
  values: DogFormValues;
  foodAmount: string;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  values,
  foodAmount,
  onReset,
}) => {
  return (
    <div className={cx("results")}>
      <FormHeader
        icon={<ClipboardCheck size={24} />}
        title="Resultado del Plan"
      />

      <div className={cx("results__content")}>
        <div
          className={cx("results__message")}
          dangerouslySetInnerHTML={{ __html: foodAmount }}
        />

        <div className={cx("results__tips")}>
          <Typography variant="h5" className={cx("results__tips-title")}>
            Recomendaciones
          </Typography>
          <ul className={cx("results__tips-list")}>
            <li>
              <Typography variant="p2" fontWeight={500}>
                Divide la ración en 2-3 comidas diarias
              </Typography>
            </li>
            <li>
              <Typography variant="p2" fontWeight={500}>
                Mantén agua fresca siempre disponible
              </Typography>
            </li>
            <li>
              <Typography variant="p2" fontWeight={500}>
                Ajusta la cantidad según la actividad
              </Typography>
            </li>
          </ul>
        </div>
      </div>

      <Button type="button" fullWidth onClick={onReset}>
        Calcular de nuevo
      </Button>
    </div>
  );
};
