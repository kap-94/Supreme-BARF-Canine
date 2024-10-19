import React from "react";
import classNames from "classnames/bind";
import styles from "./Spinner.module.scss";

const cx = classNames.bind(styles);

export const Spinner: React.FC = () => {
  return <div className={cx("spinner")}></div>;
};

export default Spinner;
