"use client";
import React, { FC, TextareaHTMLAttributes, useState } from "react";
import { useField } from "formik";
import { raleway } from "@/app/_fonts";
import classNames from "classnames/bind";
import styles from "./TextArea.module.scss";

const cx = classNames.bind(styles);

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string | JSX.Element;
  name: string;
  variant?: "primary" | "secondary";
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export const TextArea: FC<TextAreaProps> = ({
  label,
  name,
  variant = "primary",
  placeholder,
  labelClassName,
  inputClassName,
  errorClassName,
  ...props
}) => {
  const [field, meta] = useField(name);
  const [focused, setFocused] = useState(false);

  const containerClasses = cx("form-control", `form-control--${variant}`, {
    "form-control--error": meta.touched && meta.error,
    "form-control--not-empty": field.value,
    "form-control--focused": focused,
  });

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div className={containerClasses}>
      <div className={cx("form-control__input-container")}>
        <label
          className={cx(
            "form-control__label",
            raleway.className,
            labelClassName,
            {
              "form-control__label--focused": focused || field.value,
            }
          )}
          htmlFor={name}
        >
          {label}
        </label>

        <textarea
          className={cx(
            "form-control__input",
            raleway.className,
            inputClassName
          )}
          {...field}
          {...props}
          placeholder={variant === "primary" ? placeholder : ""}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={8}
        />

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
    </div>
  );
};

export default TextArea;
