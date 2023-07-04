import React, { memo } from "react";
import cn from "classnames";

import { ITableSearchProps } from "./TableSearch.types";
import { TableSearchCell } from "components/TableSearchCell";
import { TableMainDataKey } from "components/Table/Table.types";

import styles from "./TableSearch.module.scss";

const TableSearch: React.FunctionComponent<ITableSearchProps> = memo(
  ({ model }) => {
    const searchFieldsName: TableMainDataKey[] = [
      "userId",
      "first_name",
      "last_name",
      "age",
      "job_title",
      "email",
      "ssn",
      "work_start",
    ];
    return (
      <>
        <li
          className={cn(
            styles["head-cell"],
            styles["head-cell-favorite"],
          )}
        >
          {/* <img
            src="./star.svg"
            alt="favorite icon"
            className={styles["icon"]}
          /> */}
        </li>
        {searchFieldsName.map((item) => (
          <TableSearchCell key={item} nameSort={item} model={model} />
        ))}
      </>
    );
  },
);

export { TableSearch };
