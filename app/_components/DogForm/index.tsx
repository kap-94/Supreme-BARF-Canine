"use client";

import classNames from "classnames/bind";
import { DogFormSchema } from "@/app/_lib/validationSchemas";
import { Formik, Form } from "formik";
import { useState } from "react";
import { FormStepper } from "./components/Stepper";
import { BasicInfo } from "./components/BasicInfo";
import { Results } from "./components/Results";
import { PhysicalState } from "./components/PshysicalState";
import useCalculateFoodAmount from "@/app/_hooks/useCalculateFoodAmount";
import styles from "./DogForm.module.scss";

const cx = classNames.bind(styles);

export interface DogFormValues {
  dogYears: string;
  dogMonths: string;
  dogWeight: string;
  sterilized: string;
  activityLevel: string;
  pregnancyStatus: string;
}

const INITIAL_VALUES: DogFormValues = {
  dogYears: "1",
  dogMonths: "0",
  dogWeight: "1",
  sterilized: "Esterilizado",
  activityLevel: "Moderado",
  pregnancyStatus: "No aplica",
};

interface DogFormProps {
  stepperVariant?: "default" | "compact" | "minimal";
}

const DogForm: React.FC<DogFormProps> = ({ stepperVariant = "minimal" }) => {
  const [activeStep, setActiveStep] = useState(1);

  const handleSubmit = async (values: DogFormValues) => {
    try {
      console.log("Form submitted:", values);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={cx("dog-form")}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={DogFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => {
          const dogInfo = useCalculateFoodAmount(values);

          return (
            <Form className={cx("dog-form__container")}>
              <div
                className={cx("dog-form__stepper-container", {
                  "dog-form__stepper-container--compact":
                    stepperVariant === "compact",
                  "dog-form__stepper-container--default":
                    stepperVariant === "default",
                  "dog-form__stepper-container--minimal":
                    stepperVariant === "minimal",
                })}
              >
                <FormStepper activeStep={activeStep} variant={stepperVariant} />
              </div>

              <div className={cx("dog-form__form-container")}>
                {activeStep === 1 && (
                  <BasicInfo
                    values={values}
                    setFieldValue={setFieldValue}
                    onNext={() => setActiveStep(2)}
                  />
                )}

                {activeStep === 2 && (
                  <PhysicalState
                    values={values}
                    setFieldValue={setFieldValue}
                    onNext={() => setActiveStep(3)}
                    onPrev={() => setActiveStep(1)}
                  />
                )}

                {activeStep === 3 && (
                  <Results
                    values={values}
                    dogInfo={dogInfo}
                    onReset={() => {
                      setActiveStep(1);
                      Object.keys(INITIAL_VALUES).forEach((key) => {
                        setFieldValue(
                          key,
                          INITIAL_VALUES[key as keyof DogFormValues]
                        );
                      });
                    }}
                  />
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DogForm;
