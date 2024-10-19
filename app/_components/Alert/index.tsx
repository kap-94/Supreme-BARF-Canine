import React from "react";
import classNames from "classnames/bind";
import styles from "./Alert.module.scss";
import Image from "next/image";
import successIcon from "./assets/success-alert-icon.svg";
import warningIcon from "./assets/warning-alert-icon.svg";
import infoIcon from "./assets/information-alert-icon.svg";
import errorIcon from "./assets/error-alert-icon.svg";

const cx = classNames.bind(styles);

interface AlertProps {
  variant: "outlined" | "filled";
  severity: "success" | "warning" | "info" | "error";
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  variant,
  severity,
  showIcon = true,
  className,
  style,
  children,
}) => {
  const alertClass = cx(
    "alert",
    `alert--${variant}`,
    `alert--${severity}`,
    className
  );

  const iconMap = {
    success: successIcon,
    warning: warningIcon,
    info: infoIcon,
    error: errorIcon,
  };

  return (
    <div className={alertClass} style={style}>
      {showIcon && (
        <div className={styles.alert__icon}>
          {/* <Image
            src={iconMap[severity]}
            alt={`Icon for ${severity}`}
            width={40}
            height={40}
          /> */}
        </div>
      )}

      <div className={styles.alert__content}>{children}</div>
    </div>
  );
};

export default Alert;
