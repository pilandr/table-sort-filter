import React, { useEffect, useState, memo } from "react";

import { TableRow } from "components/TableRow";
import { TableHead } from "components/TableHead";
import { TableSearch } from "components/TableSearch";
import { TableModel } from "./TableModel";
import { Spinner } from "components/Spinner";
import { useTableData, useTableActions } from "hooks/tableStateHooks";
import { BuilderTable } from "models/tableBuilder";
import { SortIndicator } from "components/SortIndicator/SortIndicator";

import styles from "./Table.module.scss";

export const Table = memo(() => {
  const actions = useTableActions();
  const state = useTableData();
  const [model] = useState(() => new TableModel(state, actions));
  model.setState(state);

  const tableBuilder = new BuilderTable(state);
  tableBuilder.buildSortAndFilters();

  useEffect(() => {
    model.getTableData();
  }, []);

  if (state.isLoading) {
    return <Spinner />;
  }

  if (state.noDataMessage) {
    return <div>{state.noDataMessage}</div>;
  }

  return (
    <div className={styles["container"]}>
      <SortIndicator />
      <div className={styles["table-container"]}>
        <div className={styles["table"]}>
          <ul className={styles["table-list"]} data-name="table-list">
            <TableHead
              setSortDirection={() =>
                model.setIsSortDirectionUp(!state.isSortDirectionUp)
              }
              sortDirection={state.isSortDirectionUp}
              setSortField={model.handleSortField}
              sortField={state.sortField}
            />
            <TableSearch model={model} />
            {tableBuilder.getTable().map((dataRow, index) => (
              <TableRow
                rowData={dataRow}
                key={dataRow.id}
                setFavoriteValue={() =>
                  model.setFavoriteValue(dataRow.id)
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});
