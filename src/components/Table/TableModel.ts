import {
  TableData,
  TableMainDataKey,
  SearchData,
  FilterData,
} from "./Table.types";
import { TableState } from "store/tableDataSlice";
import { fieldsNames } from "helpers/functions";
import { TableActionsType } from "hooks/tableStateHooks";

export class TableModel {
  constructor(state: TableState, actions: TableActionsType) {
    this.actions = actions;
    this.state = state;
  }

  state: TableState;
  actions: TableActionsType;

  async getTableData() {
    this.actions.fetchTableData();
  }

  setState(state: TableState) {
    this.state = state;
  }

  setTableData(data: TableData[]) {
    this.actions.setTableData(data);
  }

  setSortField(data: TableMainDataKey) {
    this.actions.setSortField(data);
  }

  setIsSortDirectionUp(data: boolean) {
    this.actions.setSortDirection(data);
  }

  setSearchFields(data: SearchData) {
    this.actions.setSearchFields(data);
  }

  setFilterData(data: FilterData) {
    this.actions.setFilterData(data);
  }

  applyFilter(table: TableData[]) {
    let tableData = table;
    const filterData = this.state.filterData;
    Object.entries(filterData).forEach((filter) => {
      if (!filter[1] || filter[1].length === 0) {
        return;
      }
      const field = filter[0] as TableMainDataKey;
      tableData = tableData.filter((item) =>
        filter[1].includes(item[field] as string),
      );
    });
    return tableData;
  }

  setFavoriteValue = (id: number | null | undefined) => {
    this.setTableData(
      this.state.tableData.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            isFiltered: !data.isFiltered,
          };
        }
        return data;
      }),
    );
    this.setSearchFields({
      ...this.state.searchFields,
      focusField: null,
    });
  };

  handleSortField = (name: TableMainDataKey) => {
    this.setSortField(name);
  };

  getUniqueStringValues(
    nameField: TableMainDataKey,
    isFiltered = true,
    table?: TableData[],
  ) {
    let tableData = isFiltered
      ? this.applyFilter(this.state.tableData)
      : this.state.tableData;

    if (table) {
      tableData = table;
    }
    return tableData
      .filter(
        (value, index, array) =>
          array.findIndex(
            (value1) => value1[nameField] === value[nameField],
          ) === index,
      )

      .sort((firstItem, secondItem) =>
        (firstItem[nameField] ?? "") > (secondItem[nameField] ?? "")
          ? 1
          : -1,
      );
  }

  setStartFilterValues(nameField: TableMainDataKey) {
    this.setFilterData({
      ...this.state.filterData,
      [nameField]: this.getUniqueStringValues(nameField, false).map(
        (item) => item[nameField],
      ),
    });
  }

  setStartAllFilterValues(tableData?: TableData[]) {
    let filterData: FilterData = {};
    fieldsNames.forEach((field) => {
      filterData = {
        ...filterData,
        [field.name]: this.getUniqueStringValues(
          field.name,
          false,
          tableData ?? undefined,
        ).map((item) => item[field.name]),
      };
    });
    this.setFilterData(filterData);
  }
}
