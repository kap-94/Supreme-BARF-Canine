import classNames from "classnames/bind";
import { ArrowRight, CheckIcon, ShoppingBag } from "lucide-react";
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
  const calculateMonthlyBags = () => {
    const gramsPerBag = 1250;
    const monthlyGrams = dogInfo.foodAmount * 30;
    const bagsNeeded = monthlyGrams / gramsPerBag;
    return bagsNeeded.toFixed(1);
  };

  const getActivityMessage = () => {
    return values.pregnancyStatus === "No aplica"
      ? `y con un nivel de actividad ${dogInfo.activityText}`
      : `con un nivel de actividad ${dogInfo.activityText} y estado de ${dogInfo.pregnancyText}`;
  };

  const getProductUrl = () => {
    const baseUrl =
      "https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-todas-las-razas";
    const monthlyBags = calculateMonthlyBags();
    return `${baseUrl}?quantity=${monthlyBags}`;
  };

  return (
    <div className={cx("results")}>
      <FormHeader icon={<CheckIcon size={24} />} title="Resultado del Plan" />

      <div className={cx("results__content")}>
        <div className={cx("results__message")}>
          <Typography variant="p3" color="primary" fontWeight={600}>
            Para un perro de {dogInfo.dogAgeText}, que pesa {dogInfo.weightText}
            , {dogInfo.sterilizedText}, {getActivityMessage()}, la cantidad
            recomendada de alimento es:
          </Typography>

          <strong className={cx("results__amount")}>
            {dogInfo.foodAmount} gramos al día
          </strong>

          <div className={cx("results__cta")}>
            <div className={cx("results__bags")}>
              <ShoppingBag
                size={18}
                strokeWidth={2}
                className={cx("results__bags-icon")}
              />
              <Typography variant="p3" color="primary">
                {calculateMonthlyBags()} bolsas al mes
              </Typography>
            </div>

            <a
              href={getProductUrl()}
              className={cx("results__buy-link")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowRight
                size={16}
                strokeWidth={2}
                width={20}
                className={cx("results__buy-link-icon")}
              />
              Comprar ahora
            </a>
          </div>
        </div>

        <div className={cx("results__tips")}>
          <Typography
            variant="h5"
            fontWeight={800}
            className={cx("results__tips-title")}
          >
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
