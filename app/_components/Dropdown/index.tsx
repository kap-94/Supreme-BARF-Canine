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
  label?: string;
  id?: string;
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
  label,
  id,
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

  // Ordenar las opciones numéricamente sin mutar el array original
  const sortedOptions = [...options].sort((a, b) => {
    const valueA = parseInt(a.value, 10);
    const valueB = parseInt(b.value, 10);
    return valueA - valueB;
  });

  const renderedOptions = sortedOptions.map((option, i) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={i}
        className={cx("dropdown__item")}
        onClick={() => onSelectedChange && onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className={cx("dropdownWrapper")}>
      {label && (
        <label htmlFor={id} className={cx("dropdown__label")}>
          {label}
        </label>
      )}
      <div className={cx("field")}>
        <div className={cx("dropdownContainer")}>
          <div
            onClick={() => setOpen(!open)}
            className={cx("dropdown", `dropdown__${variant}`, className, {
              dropdown__active: open,
            })}
            style={inlineStyles}
            id={id}
            aria-haspopup="listbox"
            aria-expanded={open}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setOpen(!open);
              }
            }}
          >
            <div className={cx("dropdown__text")}>
              <div className={cx("dropdown__selected")}>
                <Typography
                  variant="p2"
                  className={cx("dropdown__selected-text")}
                >
                  {selected.label}
                </Typography>
              </div>
              <Icon
                icon="dropDown"
                color={variant === "transparent" ? "white" : "primary"}
                width={12}
                height={12}
              />
            </div>
            {open && (
              <div
                className={cx("dropdown__menu", {
                  dropdown__menuActive: open,
                })}
                role="listbox"
              >
                {renderedOptions}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
