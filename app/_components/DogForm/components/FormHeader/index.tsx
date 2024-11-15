import classNames from "classnames/bind";
import { Typography } from "@/app/_components";
import styles from "./FormHeader.module.scss";

const cx = classNames.bind(styles);

interface FormHeaderProps {
  icon: React.ReactNode;
  title: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ icon, title }) => (
  <div className={cx("form-header")}>
    <div className={cx("form-header__icon")}>{icon}</div>
    <Typography variant="h4" className={cx("form-header__title")}>
      {title}
    </Typography>
  </div>
);
