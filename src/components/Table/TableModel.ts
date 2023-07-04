import {
  TableActionTypes,
  TableState,
  TableStateActions,
  TableData,
  TableMainDataKey,
  SearchData,
  FilterData,
} from "./Table.types";
import { getString, getFieldsName } from "helpers/functions";

export class TableModel {
  constructor(
    state: TableState,
    dispatch: React.Dispatch<TableStateActions>,
  ) {
    this.dispatch = dispatch;
    this.state = state;
  }

  state: TableState;
  dispatch: React.Dispatch<TableStateActions>;

  setState(state: TableState) {
    this.state = state;
  }

  setTableData(data: TableData[]) {
    this.dispatch({
      type: TableActionTypes.SET_TABLE_DATA,
      payload: data,
    });
  }

  setSortField(data: TableMainDataKey) {
    this.dispatch({
      type: TableActionTypes.SET_SORT_FIELD,
      payload: data,
    });
  }

  setIsSortDirectionUp(data: boolean) {
    this.dispatch({
      type: TableActionTypes.SET_SORT_DIRECTION,
      payload: data,
    });
  }

  setSearchFields(data: SearchData) {
    this.dispatch({
      type: TableActionTypes.SET_SEARCH_FIELDS,
      payload: data,
    });
  }

  setFilterData(data: FilterData) {
    this.dispatch({
      type: TableActionTypes.SET_FILTER_DATA,
      payload: data,
    });
  }

  getSortData = () => {
    const tableData = this.state.tableData;
    const sortField = this.state.sortField;
    const isSortDirectionUp = this.state.isSortDirectionUp;
    const searchFields = this.state.searchFields;

    let changedTable = tableData;
    changedTable = tableData.sort((firstItem, secondItem) =>
      (firstItem[sortField] ?? "") > (secondItem[sortField] ?? "")
        ? isSortDirectionUp
          ? 1
          : -1
        : isSortDirectionUp
        ? -1
        : 1,
    );

    Object.entries(searchFields).forEach((search) => {
      if (search[0] === "focusField" || !search[1]) {
        return;
      }
      changedTable = changedTable.filter((item) =>
        getString(item[search[0] as TableMainDataKey])
          .toLowerCase()
          .includes(search[1].toLowerCase()),
      );
    });

    changedTable = this.applyFilter(changedTable);

    return changedTable;
  };

  applyFilter(table: TableData[]) {
    let tableData = table;
    const filterData = this.state.filterData;
    Object.entries(filterData).forEach((filter) => {
      if (!filter[1] || filter[1].length === 0) {
        return;
      }
      const field = filter[0] as TableMainDataKey;
      tableData = tableData.filter((item) =>
        filter[1].includes(item[field]),
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
    getFieldsName().forEach((name) => {
      filterData = {
        ...filterData,
        [name]: this.getUniqueStringValues(
          name,
          false,
          tableData ?? undefined,
        ).map((item) => item[name]),
      };
    });
    this.setFilterData(filterData);
  }
}
