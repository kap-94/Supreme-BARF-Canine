"use client";
import React, {
  FC,
  Dispatch,
  useState,
  useRef,
  useEffect,
  CSSProperties,
} from "react";
import classnames from "classnames/bind";
import { Icon, Typography } from "@/app/_components";
import styles from "./Dropdown.module.scss";

export interface Option {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: Option[];
  selected: Option;
  onSelectedChange?: Dispatch<Option>;
  variant?: "transparent" | "primary";
  className?: string;
  styles?: CSSProperties;
  closeOnScroll?: boolean;
}

const cx = classnames.bind(styles);

const Dropdown: FC<DropdownProps> = ({
  options,
  selected,
  onSelectedChange,
  variant = "primary",
  className,
  styles: inlineStyles,
  closeOnScroll = false,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onBodyClick = (event: MouseEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }
      setOpen(false);
    };

    const onScroll = () => {
      if (closeOnScroll) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", onBodyClick, { capture: true });
    if (closeOnScroll) {
      window.addEventListener("scroll", onScroll);
    }

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
      if (closeOnScroll) {
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, [closeOnScroll]);

  const sortedOptions = options.sort((a, b) => {
    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;
    return 0;
  });

  const renderedOptions = sortedOptions.map((option, i) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={i}
        className={cx("dropdown__item")}
        onClick={() => onSelectedChange && onSelectedChange(option)} // Verifica si `onSelectedChange` está definido
      >
        {option.value}
      </div>
    );
  });

  return (
    <div ref={ref} className={cx("dropdownWrapper")}>
      <div className={cx("field")}>
        <label className={cx("label")}>
          <div
            onClick={() => setOpen(!open)}
            className={cx("dropdown", `dropdown__${variant}`, className, {
              dropdown__active: open,
            })}
            style={inlineStyles}
          >
            <div className={cx("dropdown__text")}>
              <div className={cx("dropdown__selected")}>
                {/* <h6>{selected.label}:</h6> */}
                <Typography
                  variant="p2"
                  className={cx("dropdown__selected-text")}
                >
                  {selected.value}
                </Typography>
              </div>
              <Icon
                icon="dropDown"
                color={variant === "transparent" ? "white" : "black"}
                width={12}
                height={12}
              />
            </div>
            <div
              className={cx("dropdown__menu", { dropdown__menuActive: open })}
            >
              {renderedOptions}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Dropdown;
