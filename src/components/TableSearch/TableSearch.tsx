import React, { memo } from "react";
import cn from "classnames";

import { ITableSearchProps } from "./TableSearch.types";
import { TableSearchCell } from "components/TableSearchCell";
import { fieldsNames } from "helpers/functions";

import styles from "./TableSearch.module.scss";

const TableSearch: React.FunctionComponent<ITableSearchProps> = memo(
  ({ model }) => (
    <>
      <li
        className={cn(
          styles["head-cell"],
          styles["head-cell-favorite"],
        )}
      />
      {fieldsNames.map((item) => (
        <TableSearchCell
          key={item.name}
          nameSort={item.name}
          model={model}
        />
      ))}
    </>
  ),
);

export { TableSearch };
