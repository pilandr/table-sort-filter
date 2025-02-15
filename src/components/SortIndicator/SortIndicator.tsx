import { memo, useEffect, useState } from "react";
import { sortObserver } from "models/subscriber";
import { TableMainDataKey } from "components/Table/Table.types";
import { fieldsNames } from "helpers/functions";

import styles from "./SortIndicator.module.scss";

export const SortIndicator: React.FunctionComponent = memo(() => {
  const [fieldName, setFieldName] =
    useState<TableMainDataKey>("userId");

  useEffect(() => {
    const observer = {
      update: (value: TableMainDataKey) => {
        setFieldName(value);
      },
    };

    sortObserver.subscribe(observer);
    return () => sortObserver.unsubscribe(observer);
  }, []);

  const text = fieldsNames.find(
    (field) => field.name === fieldName,
  )?.nameColumn;

  if (!fieldName && !!text) {
    return null;
  }

  return <p className={styles["text"]}>Sort by {text}</p>;
});
