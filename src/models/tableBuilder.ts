import {
  TableData,
  TableMainDataKey,
} from "components/Table/Table.types";
import { TableState } from "store/tableDataSlice";
import { getString } from "helpers/functions";

export class BuilderTable {
  constructor(state: TableState) {
    this.table = [...state.tableData];
    this.state = state;
  }

  table: TableData[];
  state: TableState;

  sortTable() {
    const sortField = this.state.sortField;
    const isSortDirectionUp = this.state.isSortDirectionUp;

    this.table = this.table.sort((firstItem, secondItem) =>
      (firstItem[sortField] ?? "") > (secondItem[sortField] ?? "")
        ? isSortDirectionUp
          ? 1
          : -1
        : isSortDirectionUp
        ? -1
        : 1,
    );
  }

  filterBySearchFields() {
    const searchFields = this.state.searchFields;
    Object.entries(searchFields).forEach((search) => {
      if (search[0] === "focusField" || !search[1]) {
        return;
      }
      this.table = this.table.filter((item) =>
        getString(item[search[0] as TableMainDataKey])
          .toLowerCase()
          .includes(search[1].toLowerCase()),
      );
    });
  }

  filterByValues() {
    const filterData = this.state.filterData;
    Object.entries(filterData).forEach((filter) => {
      if (!filter[1] || filter[1].length === 0) {
        return;
      }
      const field = filter[0] as TableMainDataKey;
      this.table = this.table.filter((item) =>
        filter[1].includes(item[field] as string),
      );
    });
  }

  sortByFavorite() {
    this.table.sort((a, b) =>
      a.isFiltered <= b.isFiltered ? 1 : -1,
    );
  }

  buildSortAndFilters() {
    this.sortTable();
    this.filterBySearchFields();
    this.filterByValues();
    this.sortByFavorite();
  }

  getTable() {
    return this.table;
  }
}
