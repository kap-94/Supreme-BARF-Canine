import classNames from "classnames/bind";
import { CheckIcon, ShoppingBag } from "lucide-react";
import { DogFormValues } from "../..";
import { FormHeader } from "../FormHeader";
import { Button, Typography } from "@/app/_components";
import styles from "./Results.module.scss";
import { useCart } from "@/app/_context/CartContext";
import { useEffect, useState } from "react";
import { getProductVariantByHandle } from "@/app/_actions/shopify-actions";

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
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Cargar el ID de la variante del producto cuando el componente se monta
  useEffect(() => {
    const loadVariantId = async () => {
      try {
        const productHandle = "formula-de-pollo-perro-adulto-todas-las-razas";
        const id = await getProductVariantByHandle(productHandle);
        setVariantId(id);
      } catch (error) {
        console.error("Error loading product variant:", error);
      }
    };

    loadVariantId();
  }, []);

  const calculateMonthlyBags = () => {
    const gramsPerBag = 1250;
    const monthlyGrams = dogInfo.foodAmount * 30;
    const bagsNeeded = monthlyGrams / gramsPerBag;
    return bagsNeeded;
  };

  // Calcular bolsas redondeadas hacia arriba
  const getRecommendedBags = () => {
    const monthlyBags = calculateMonthlyBags();
    return Math.ceil(monthlyBags);
  };

  const handleAddToCart = async () => {
    if (!variantId) return;

    setIsLoading(true);
    try {
      const quantity = getRecommendedBags();
      await addItem(variantId, quantity);
      setIsAdded(true);

      // Resetear el estado después de 3 segundos
      setTimeout(() => {
        setIsAdded(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityMessage = () => {
    return values.pregnancyStatus === "No aplica"
      ? `y con un nivel de actividad ${dogInfo.activityText}`
      : `con un nivel de actividad ${dogInfo.activityText} y estado de ${dogInfo.pregnancyText}`;
  };

  return (
    <div className={cx("results")}>
      <FormHeader icon={<CheckIcon size={24} />} title="Resultado del Plan" />

      <div className={cx("results__content")}>
        <div className={cx("results__message")}>
          <div className={cx("results__summary")}>
            <Typography
              variant="p2"
              color="primary"
              fontWeight={500}
              className={cx("results__summary-text")}
            >
              Para un perro de {dogInfo.dogAgeText}, que pesa{" "}
              {dogInfo.weightText}, {dogInfo.sterilizedText},{" "}
              {getActivityMessage()}
            </Typography>
          </div>

          <div className={cx("results__data")}>
            <div className={cx("results__quantity")}>
              <Typography
                variant="p2"
                color="primary"
                fontWeight={500}
                className={cx("results__label")}
              >
                Ración diaria:
              </Typography>
              <Typography
                variant="p2"
                className={cx("results__amount")}
                color="primary"
                fontWeight={600}
              >
                {dogInfo.foodAmount} gramos
              </Typography>
            </div>

            <div className={cx("results__monthly")}>
              <Typography
                variant="p2"
                color="primary"
                fontWeight={500}
                className={cx("results__label")}
              >
                Consumo mensual:
              </Typography>
              <div className={cx("results__bags")}>
                <Typography variant="p2" color="primary" fontWeight={600}>
                  {calculateMonthlyBags().toFixed(1)} bolsa
                  {calculateMonthlyBags() > 1 ? "s" : ""}
                </Typography>
              </div>
            </div>
          </div>

          <Typography
            variant="p3"
            color="primary"
            className={cx("results__recommendations")}
          >
            Divide la ración en 2-3 comidas diarias, mantén agua fresca siempre
            disponible y ajusta la cantidad según la actividad de tu mascota.
          </Typography>
        </div>
      </div>

      <div className={cx("results__footer")}>
        <div className={cx("results__buttons")}>
          <Button type="button" variant="secondary" fullWidth onClick={onReset}>
            Calcular de nuevo
          </Button>
          <Button
            type="button"
            variant="primary"
            fullWidth
            onClick={handleAddToCart}
            disabled={isLoading || !variantId || isAdded}
            icon={{
              source: "lucide",
              name: isAdded ? "check" : "shoppingCart",
            }}
          >
            {isAdded
              ? "¡Añadido!"
              : isLoading
              ? "Añadiendo..."
              : `Añadir bolsas al carrito`}
          </Button>
        </div>
      </div>
    </div>
  );
};
