"use client";

import React, { useState, useEffect, cloneElement } from "react";
import classNames from "classnames/bind";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { IconButton } from "@/app/_components";
import styles from "./Snackbar.module.scss";

const cx = classNames.bind(styles);

interface SnackbarProps {
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  children: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  autoHideDuration = 6000,
  onClose,
  children,
  className,
  style,
}) => {
  const close = () => {
    onClose();
    setIsVisible(false);
  };
  const [isVisible, setIsVisible] = useState(open);
  const ref = useOutsideClick(close);

  useEffect(() => {
    setIsVisible(open);
    if (open) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, autoHideDuration);
      return () => clearTimeout(timeout);
    }
  }, [open, autoHideDuration, onClose]);

  const snackbarClass = cx("snackbar", className, {
    "snackbar--visible": isVisible,
    "snackbar--hidden": !isVisible,
  });

  return (
    <div
      ref={ref}
      className={snackbarClass}
      style={style}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {children}

      <IconButton
        icon="close"
        onClick={close}
        variant="secondary"
        color="gray"
        size="medium"
        className={cx("snackbar__icon-button")}
      />
    </div>
  );
};

export default Snackbar;
