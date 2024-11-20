import classNames from "classnames/bind";
import { ClipboardCheck } from "lucide-react";
import { DogFormValues } from "../..";
import { FormHeader } from "../FormHeader";
import { Button, Typography } from "@/app/_components";
import styles from "./Results.module.scss";

const cx = classNames.bind(styles);

interface ResultsProps {
  values: DogFormValues;
  dogInfo: {
    dogAgeText: string;
    weightText: string;
    sterilizedText: string;
    activityText: string;
    pregnancyText: string;
    foodAmount: number;
  };
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  values,
  dogInfo,
  onReset,
}) => {
  const renderMessage = () => {
    const baseMessage = `Para un perro de ${dogInfo.dogAgeText}, que pesa ${dogInfo.weightText}, ${dogInfo.sterilizedText}, `;

    const activityMessage =
      values.pregnancyStatus === "No aplica"
        ? `y con un nivel de actividad ${dogInfo.activityText}`
        : `con un nivel de actividad ${dogInfo.activityText} y estado de ${dogInfo.pregnancyText}`;

    return `${baseMessage}${activityMessage}, la cantidad recomendada de alimento es: </br>
      <strong>${dogInfo.foodAmount} gramos al día</strong>
      <a href="https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-todas-las-razas" 
         class="${cx("results__buy-link")}" 
         target="_blank" 
         rel="noopener noreferrer">
        Comprar ahora
      </a>`;
  };

  return (
    <div className={cx("results")}>
      <FormHeader
        icon={<ClipboardCheck size={24} />}
        title="Resultado del Plan"
      />

      <div className={cx("results__content")}>
        <div
          className={cx("results__message")}
          dangerouslySetInnerHTML={{ __html: renderMessage() }}
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
