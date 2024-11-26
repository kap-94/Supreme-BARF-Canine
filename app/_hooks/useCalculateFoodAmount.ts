import { useEffect, useState } from "react";
import { DogFormValues } from "../_components/DogForm";

interface DogInfo {
  dogAgeText: string;
  weightText: string;
  sterilizedText: string;
  activityText: string;
  pregnancyText: string;
  foodAmount: number;
}

const useCalculateFoodAmount = (values: DogFormValues) => {
  const [result, setResult] = useState<DogInfo>({
    dogAgeText: "",
    weightText: "",
    sterilizedText: "",
    activityText: "",
    pregnancyText: "",
    foodAmount: 0,
  });

  useEffect(() => {
    const calculate = () => {
      const {
        dogYears,
        dogMonths,
        dogWeight,
        sterilized,
        activityLevel,
        pregnancyStatus,
      } = values;
      const dogAge = parseInt(dogYears, 10) + parseInt(dogMonths, 10) / 12;
      const weight = parseFloat(dogWeight as string);

      const activityMultiplier =
        {
          Sedentario: 95,
          Moderado: 130,
          Activo: 160,
        }[activityLevel] || 0;

      const ageMultiplier = dogAge < 1 ? 1.5 : dogAge < 7 ? 1 : 0.8;
      const sterilizedMultiplier = sterilized === "Esterilizado" ? 0.85 : 1;
      const pregnancyMultiplier =
        {
          Gestación: 1.25,
          Lactancia: 1.5,
          "No aplica": 1,
        }[pregnancyStatus] || 0;

      const totalFood = Math.round(
        (Math.pow(weight, 0.75) *
          activityMultiplier *
          ageMultiplier *
          sterilizedMultiplier *
          pregnancyMultiplier) /
          (1850 / 1000)
      );

      return {
        dogAgeText: `${dogYears} años y ${dogMonths} meses`,
        weightText: `${weight} kg`,
        sterilizedText:
          sterilized === "Esterilizado" ? "esterilizado" : "no esterilizado",
        activityText: activityLevel.toLowerCase(),
        pregnancyText: pregnancyStatus.toLowerCase(),
        foodAmount: totalFood,
      };
    };

    setResult(calculate());
  }, [values]);

  return result;
};

export default useCalculateFoodAmount;
