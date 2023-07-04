import React, { useEffect, useState, memo, useReducer } from "react";

import { request } from "helpers/request";
import { RequestData } from "./Table.types";
import { TableRow } from "components/TableRow";
import { TableHead } from "components/TableHead";
import { TableSearch } from "components/TableSearch";
import { tableReducer, tableInitialState } from "./Table.reducer";
import { TableModel } from "./TableModel";
import { Spinner } from "components/Spinner";

import styles from "./Table.module.scss";

export const Table = memo(() => {
  const [state, dispatch] = useReducer(
    tableReducer,
    tableInitialState,
  );
  const [model] = useState(() => new TableModel(state, dispatch));
  model.setState(state);

  useEffect(() => {
    request<RequestData[]>(
      "https://my.api.mockaroo.com/users.json?key=d363c370",
    ).then((data) => {
      const table = data.map((item, index) => {
        const timestamp = Date.parse(item.work_start ?? "");
        const dateObject = timestamp ? new Date(timestamp) : null;
        return {
          ...item,
          work_start: dateObject,
          isFiltered: false,
          id: index,
        };
      });
      model.setTableData(table);
      model.setStartAllFilterValues(table);
    });
  }, []);

  if (state.tableData.length === 0) {
    return <Spinner />;
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["table-container"]}>
        <div className={styles["table"]}>
          <ul className={styles["table-list"]} data-name="table-list">
            <TableHead
              key={`Header_${Math.random()}`}
              setSortDirection={() =>
                model.setIsSortDirectionUp(!state.isSortDirectionUp)
              }
              sortDirection={state.isSortDirectionUp}
              setSortField={model.handleSortField}
              sortField={state.sortField}
            />
            <TableSearch
              key={`Search_${Math.random()}`}
              model={model}
            />
            {model
              .getSortData()
              .sort((a, b) => (a.isFiltered <= b.isFiltered ? 1 : -1))
              .map((dataRow, index) => (
                <TableRow
                  rowData={dataRow}
                  key={`row_${index}`}
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
