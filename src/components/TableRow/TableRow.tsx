import React, { memo } from "react";

import { CheckBoxButton } from "components/CheckBoxButton";
import { ITableRowProps } from "./TableRow.types";

import styles from "./TableRow.module.scss";

const TableRow: React.FunctionComponent<ITableRowProps> = memo(
  ({ rowData, setFavoriteValue }) => {
    const id = rowData.id as number;
    return (
      <>
        <li
          key={`row_isFiltered`}
          className={styles["field-favorite"]}
        >
          <CheckBoxButton
            content={{ label: "", value: id }}
            checked={rowData.isFiltered}
            onChange={() => setFavoriteValue()}
          />
        </li>
        <li key={`row_userId`}>{rowData.userId}</li>
        <li key={`row_first_name`}>{rowData.first_name}</li>
        <li key={`row_last_name`}>{rowData.last_name}</li>
        <li key={`row_age`}>{rowData.age}</li>
        <li key={`row_job_title`}>{rowData.job_title}</li>
        <li key={`row_email_title`}>{rowData.email}</li>
        <li key={`row_ssn_title`}>{rowData.ssn}</li>
        <li key={`row_work_start_title`}>
          {rowData.work_start?.toISOString().split("T")[0]}
        </li>
      </>
    );
  },
);

export { TableRow };
