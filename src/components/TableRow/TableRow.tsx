import React, { memo } from "react";

import { CheckBoxButton } from "components/CheckBoxButton";
import { ITableRowProps } from "./TableRow.types";
import { TableCellFactory } from "../../models/tableCellFactory";

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
        <li key={`row_userId`}>
          {TableCellFactory.createCell({
            type: "number",
            data: rowData.userId,
          }).show()}
        </li>
        <li key={`row_first_name`}>
          {TableCellFactory.createCell({
            type: "text",
            data: rowData.first_name,
          }).show()}
        </li>
        <li key={`row_last_name`}>
          {TableCellFactory.createCell({
            type: "text",
            data: rowData.last_name,
          }).show()}
        </li>
        <li key={`row_age`}>
          {TableCellFactory.createCell({
            type: "number",
            data: rowData.age,
          }).show()}
        </li>
        <li key={`row_job_title`}>
          {TableCellFactory.createCell({
            type: "text",
            data: rowData.job_title,
          }).show()}
        </li>
        <li key={`row_email_title`}>
          {TableCellFactory.createCell({
            type: "text",
            data: rowData.email,
          }).show()}
        </li>
        <li key={`row_ssn_title`}>
          {TableCellFactory.createCell({
            type: "text",
            data: rowData.ssn,
          }).show()}
        </li>
        <li key={`row_work_start_title`}>
          {rowData.work_start?.toISOString().split("T")[0]}
        </li>
      </>
    );
  },
);

export { TableRow };
