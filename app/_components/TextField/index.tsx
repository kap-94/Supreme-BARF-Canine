"use client";
import React, { FC, InputHTMLAttributes, useState } from "react";
import { useField } from "formik";
import classNames from "classnames/bind";
import { raleway } from "@/app/_fonts";
import Icon, { IconName } from "@/app/_components/CustomIcon";
import styles from "./TextField.module.scss";

const cx = classNames.bind(styles);

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string | JSX.Element;
  name: string;
  icon?: IconName;
  variant?: "primary" | "secondary";
  placeholder?: string;
  labelClassName?: string; // Nueva prop para className del label
  inputClassName?: string; // Nueva prop para className del input
  errorClassName?: string; // Nueva prop para className del error
}

export const TextField: FC<TextFieldProps> = ({
  label,
  name,
  icon,
  type = "text",
  variant = "primary",
  placeholder,
  labelClassName, // Recibe la nueva prop
  inputClassName, // Recibe la nueva prop
  errorClassName, // Recibe la nueva prop
  ...props
}) => {
  const [field, meta] = useField(name);
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const containerClasses = cx("form-control", `form-control--${variant}`, {
    "form-control--error": meta.touched && meta.error,
    "form-control--not-empty": field.value,
    "form-control--focused": focused,
    "form-control--with-icon": icon,
  });

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const eyeIconClickHandler =
    type === "password" ? togglePasswordVisibility : undefined;
  const iconName =
    type === "password" ? (passwordVisible ? "eye" : "eyeOff") : icon;

  return (
    <div className={containerClasses}>
      <div className={cx("form-control__input-container")}>
        <label
          className={cx(
            "form-control__label",
            raleway.className,
            labelClassName,
            {
              "form-control__label--focused":
                variant === "secondary" && (focused || field.value),
            }
          )}
          htmlFor={name}
        >
          {label}
        </label>

        <input
          className={cx(
            "form-control__input",
            raleway.className,
            inputClassName
          )} // Aplica className personalizado al input
          {...field}
          {...props}
          placeholder={variant === "primary" ? placeholder : ""}
          required={false}
          type={type === "password" && passwordVisible ? "text" : type}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {icon && (
          <div
            className={cx("form-control__icon")}
            onClick={eyeIconClickHandler}
            style={{ cursor: type === "password" ? "pointer" : "auto" }}
          >
            <Icon
              color={meta.touched && meta.error ? "error" : undefined}
              icon={iconName as IconName}
            />
          </div>
        )}
      </div>

      {meta.touched && meta.error && (
        <div
          className={cx(
            "form-control__error",
            raleway.className,
            errorClassName
          )}
        >
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default TextField;
