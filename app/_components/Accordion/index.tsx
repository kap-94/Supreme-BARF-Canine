"use client";
import React, { FC, useState } from "react";
import classNames from "classnames/bind";
import Collapsible from "react-collapsible";
import { Typography } from "@/app/_components";
import { Plus } from "lucide-react";
import styles from "./Accordion.module.scss";

const cx = classNames.bind(styles);

interface Question {
  title: string;
  content: string;
}

interface Props {
  title?: string;
  questions: Question[];
  custom_anchor_id?: string;
  singleOpen?: boolean;
}

const Accordion: FC<Props> = ({
  questions,
  title,
  custom_anchor_id,
  singleOpen = false,
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleTriggerClick = (index: number) => {
    setOpenIndexes((prevOpenIndexes) => {
      if (singleOpen) {
        return prevOpenIndexes.includes(index) ? [] : [index];
      } else {
        return prevOpenIndexes.includes(index)
          ? prevOpenIndexes.filter((i) => i !== index)
          : [...prevOpenIndexes, index];
      }
    });
  };

  return (
    <div className={cx("accordion")} id={custom_anchor_id}>
      {title && (
        <Typography variant="h4" className={cx("accordion__title")}>
          {title}
        </Typography>
      )}
      {questions.length > 0 && (
        <div className={cx("accordion__content")}>
          {questions.map(({ title, content }, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div key={index} className={cx("accordion__item")}>
                <div
                  onClick={() => handleTriggerClick(index)}
                  className={cx("accordion__trigger", {
                    "accordion__trigger--opened": isOpen,
                  })}
                  role="button"
                  aria-expanded={isOpen}
                  aria-controls={`accordion-content-${index}`}
                  id={`accordion-trigger-${index}`}
                >
                  <Typography variant="h4">{title}</Typography>
                  <Plus className={cx("accordion__icon")} size={24} />
                </div>
                <Collapsible
                  open={isOpen}
                  transitionTime={200}
                  easing="ease"
                  trigger=""
                  triggerDisabled={true}
                  contentInnerClassName={cx("accordion__answer")}
                  id={`accordion-content-${index}`}
                  aria-labelledby={`accordion-trigger-${index}`}
                >
                  <Typography variant="p1">{content}</Typography>
                </Collapsible>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Accordion;
