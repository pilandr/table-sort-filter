import React, { memo } from "react";
import cn from "classnames";

import { ITableHeadProps } from "./TableHead.types";
import { TableMainDataKey } from "components/Table/Table.types";
import { fieldsNames } from "helpers/functions";

import styles from "./TableHead.module.scss";

const TableHead: React.FunctionComponent<ITableHeadProps> = memo(
  ({ setSortDirection, sortDirection, setSortField, sortField }) => {
    const handleClick = (nameField: TableMainDataKey) => {
      setSortDirection();
      setSortField(nameField);
    };

    const Cell = ({
      nameColumn,
      nameSort,
    }: {
      nameColumn: string;
      nameSort: TableMainDataKey;
    }) => (
      <li
        className={styles["head-cell"]}
        onClick={() => handleClick(nameSort)}
      >
        {nameColumn}
        <img
          src="./triangle-down.svg"
          alt="triangle"
          className={cn(styles["icon-triangle"], {
            [styles["icon-triangle-up"]]: sortDirection,
            [styles["icon-triangle-visible"]]: sortField === nameSort,
          })}
        />
      </li>
    );

    return (
      <>
        <li
          className={cn(
            styles["head-cell"],
            styles["head-cell-favorite"],
          )}
        >
          &#9733;
        </li>
        {fieldsNames.map((field) => (
          <Cell
            nameColumn={field.nameColumn}
            nameSort={field.name}
            key={field.name}
          />
        ))}
      </>
    );
  },
);

export { TableHead };
