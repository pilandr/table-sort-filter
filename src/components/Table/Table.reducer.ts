import {
  TableState,
  TableStateActions,
  TableActionTypes,
} from "./Table.types";

export const tableInitialState: TableState = {
  tableData: [],
  sortField: "userId",
  isSortDirectionUp: true,
  searchFields: {},
  filterData: {},
};

export const tableReducer = (
  state: TableState,
  action: TableStateActions,
): TableState => {
  switch (action.type) {
    case TableActionTypes.SET_TABLE_DATA: {
      return {
        ...state,
        tableData: action.payload,
      };
    }
    case TableActionTypes.SET_SORT_FIELD: {
      return {
        ...state,
        sortField: action.payload,
      };
    }
    case TableActionTypes.SET_SORT_DIRECTION: {
      return {
        ...state,
        isSortDirectionUp: action.payload,
      };
    }
    case TableActionTypes.SET_SEARCH_FIELDS: {
      return {
        ...state,
        searchFields: action.payload,
      };
    }
    case TableActionTypes.SET_FILTER_DATA: {
      return {
        ...state,
        filterData: action.payload,
      };
    }

    default: {
      return { ...state };
    }
  }
};
