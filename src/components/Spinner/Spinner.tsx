import React from "react";
import cn from "classnames";

import { SpinnerProps } from "./Spinner.types";

import styles from "./Spinner.module.scss";

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  ...props
}) => (
  <div className={cn(styles["loading-spinner-container"], className)}>
    <span className={cn(styles["loader"], className)} {...props} />
  </div>
);
