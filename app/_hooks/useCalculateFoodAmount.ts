// useCalculateFoodAmount.ts
import { useEffect, useState } from "react";

interface DogFormValues {
  dogYears: string;
  dogMonths: string;
  dogWeight: number | string;
  sterilized: string;
  activityLevel: string;
}

interface CalculationResult {
  foodAmount: string;
  additionalMessage: string;
}

const useCalculateFoodAmount = (values: DogFormValues): CalculationResult => {
  const [result, setResult] = useState<CalculationResult>({
    foodAmount: "",
    additionalMessage: "",
  });

  useEffect(() => {
    const calculateFoodAmount = () => {
      const { dogYears, dogMonths, dogWeight, sterilized, activityLevel } =
        values;

      const dogAgeYears = parseInt(dogYears, 10);
      const dogAgeMonths = parseInt(dogMonths, 10);
      const dogAge = dogAgeYears + dogAgeMonths / 12;
      const weight = parseFloat(dogWeight as string);

      // Validar si no se ha ingresado una edad válida
      if (dogAgeYears === 0 && dogAgeMonths === 0) {
        return {
          foodAmount: "Por favor, introduzca una edad válida para su perro.",
          additionalMessage: "",
        };
      }

      // Validar si no se ha ingresado un peso válido o si está vacío
      if (!dogWeight || weight <= 0) {
        return {
          foodAmount: "Por favor, introduzca un peso válido para su perro.",
          additionalMessage: "",
        };
      }

      let baseAmount = 100; // gramos base para perros de tamaño medio
      let weightMultiplier = weight / 10;
      let ageAdjustment = dogAge <= 2 ? 1.2 : dogAge > 7 ? 0.8 : 1;

      // Ajuste por esterilización
      let sterilizedAdjustment = sterilized === "yes" ? 0.85 : 1;

      // Mapeo de niveles de actividad a español
      const activityLevelMap: { [key: string]: string } = {
        high: "alto",
        medium: "medio",
        low: "bajo",
      };

      // Obtener el nivel de actividad en español, por defecto "medio" si no se encuentra
      const activityLevelDisplay = activityLevelMap[activityLevel] || "medio";

      // Ajuste por nivel de actividad
      let activityMultiplier =
        activityLevel === "high" ? 1.5 : activityLevel === "medium" ? 1 : 0.8;

      // Cálculo final
      let totalFoodAmount =
        baseAmount *
        weightMultiplier *
        ageAdjustment *
        sterilizedAdjustment *
        activityMultiplier;

      const foodAmountMessage = `Para un perro de <strong>${dogYears} años</strong> y <strong>${dogMonths} meses</strong>, que pesa <strong>${weight} kg</strong>, <strong>${
        sterilized === "yes" ? "esterilizado" : "no esterilizado"
      }</strong>, con un <strong>nivel de actividad ${activityLevelDisplay}</strong>, la cantidad recomendada de alimento es <strong>${Math.round(
        totalFoodAmount
      )} gramos al día.</strong>`;

      const additionalMessage = `Recuerda que dividir la ración diaria en dos o tres comidas puede mejorar la digestión de tu perro. Además, siempre proporciona agua fresca para mantener su hidratación.`;

      return {
        foodAmount: foodAmountMessage,
        additionalMessage,
      };
    };

    setResult(calculateFoodAmount());
  }, [values]);

  return result;
};

export default useCalculateFoodAmount;
