import React from "react";
import cn from "classnames";

import { ICheckBoxButtonProps } from "./CheckBoxButton.types";

import styles from "./CheckBoxButton.module.scss";

const CheckBoxButton: React.FunctionComponent<
  ICheckBoxButtonProps
> = ({ content, className, checked, onChange }) => (
  <div
    className={cn(styles["check-group"], className)}
    onClick={() => onChange(content.value)}
  >
    <span
      className={cn(styles["checkmark"], {
        [styles["checked"]]: checked,
      })}
    />
    {content.label && (
      <div className={styles["label"]}>
        <span>{content.label}</span>
      </div>
    )}
  </div>
);

export { CheckBoxButton };
