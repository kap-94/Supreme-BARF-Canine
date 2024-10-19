import { useEffect, useState } from "react";

interface DogFormValues {
  dogYears: string;
  dogMonths: string;
  dogWeight: number | string;
  sterilized: string;
  activityLevel: string;
  pregnancyStatus: string;
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
      const {
        dogYears,
        dogMonths,
        dogWeight,
        sterilized,
        activityLevel,
        pregnancyStatus,
      } = values;

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

      // Fórmulas específicas basadas en los datos proporcionados
      // Nivel de actividad
      let activityLevelMultiplier =
        activityLevel === "Sedentario"
          ? 95
          : activityLevel === "Moderado"
          ? 130
          : activityLevel === "Activo"
          ? 160
          : 0;

      // Edad
      let ageMultiplier =
        dogAge < 1 ? 1.5 : dogAge < 7 ? 1 : dogAge > 7 ? 0.8 : 0;

      // Esterilización
      let sterilizedMultiplier = sterilized === "Esterilizado" ? 0.85 : 1;

      // Gestación o lactancia
      let pregnancyMultiplier =
        pregnancyStatus === "Gestación"
          ? 1.25
          : pregnancyStatus === "Lactancia"
          ? 1.5
          : pregnancyStatus === "No aplica"
          ? 1
          : 0;

      // Cálculo final
      let totalFoodAmount =
        (Math.pow(weight, 0.75) *
          activityLevelMultiplier *
          ageMultiplier *
          sterilizedMultiplier *
          pregnancyMultiplier) /
        (1850 / 1000);

      const foodAmountMessage = `Para un perro de <strong>${dogYears} años</strong> y <strong>${dogMonths} meses</strong>, que pesa <strong>${weight} kg</strong>, <strong>${
        sterilized === "Esterilizado" ? "esterilizado" : "no esterilizado"
      }</strong>, con un <strong>nivel de actividad ${activityLevel.toLowerCase()}</strong> y estado de <strong>${pregnancyStatus.toLowerCase()}</strong>, la cantidad recomendada de alimento es <strong>${Math.round(
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
