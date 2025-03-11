import classNames from "classnames/bind";
import { ArrowRight, CheckIcon, ShoppingBag, ShoppingCart } from "lucide-react";
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
              <Typography variant="p3" color="primary">
                {calculateMonthlyBags().toFixed(1)} bolsa
                {calculateMonthlyBags() > 1 ? "s" : ""} al mes
              </Typography>
              {/* <ShoppingBag
                size={16}
                strokeWidth={2}
                className={cx("results__bags-icon")}
              /> */}
            </div>

            <Button
              // variant="secondary"
              size="small"
              onClick={handleAddToCart}
              disabled={isLoading || !variantId || isAdded}
              className={cx("results__add-to-cart")}
              icon={{
                source: "lucide",
                name: isAdded ? "check" : "shoppingCart",
              }}
            >
              {isAdded
                ? "¡Añadido!"
                : isLoading
                ? "Añadiendo..."
                : `Añadir ${getRecommendedBags()} bolsas al carrito`}
            </Button>
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

      <Button type="button" variant="secondary" fullWidth onClick={onReset}>
        Calcular de nuevo
      </Button>
    </div>
  );
};
