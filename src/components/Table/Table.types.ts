export interface RequestData {
  age?: number | null;
  email?: string | null;
  first_name?: string | null;
  userId?: number | null;
  job_title?: string | null;
  last_name?: string | null;
  ssn?: string | null;
  work_start?: string | null;
}

interface TableMainData {
  age?: number | null;
  email?: string | null;
  first_name?: string | null;
  userId?: number | null;
  job_title?: string | null;
  last_name?: string | null;
  ssn?: string | null;
  work_start?: Date | null;
  id?: number | null;
}

export interface TableData extends TableMainData {
  isFiltered: boolean;
}

export interface SearchData extends TableMainData {
  focusField?: TableMainDataKey | null;
}

export interface FilterData {
  age?: string[];
  email?: string[];
  first_name?: string[];
  userId?: string[];
  job_title?: string[];
  last_name?: string[];
  ssn?: string[];
  work_start?: string[];
  id?: string[];
}

export type TableMainDataKey = keyof TableMainData;

export type TableState = {
  tableData: TableData[];
  sortField: TableMainDataKey;
  isSortDirectionUp: boolean;
  searchFields: SearchData;
  filterData: FilterData;
};

export type TableStateActions =
  | SetTableDataActions
  | SetSortFieldActions
  | SetSortDirectionAction
  | SetSearchFieldsAction
  | SetFilterDatasAction;

export enum TableActionTypes {
  SET_TABLE_DATA = "setTableData",
  SET_SORT_FIELD = "setSortField",
  SET_SORT_DIRECTION = "setSortDirection",
  SET_SEARCH_FIELDS = "setSearchFields",
  SET_FILTER_DATA = "setFilterData",
}

export type SetTableDataActions = {
  type: TableActionTypes.SET_TABLE_DATA;
  payload: TableData[];
};

export type SetSortFieldActions = {
  type: TableActionTypes.SET_SORT_DIRECTION;
  payload: boolean;
};

export type SetSortDirectionAction = {
  type: TableActionTypes.SET_SORT_FIELD;
  payload: TableMainDataKey;
};

export type SetSearchFieldsAction = {
  type: TableActionTypes.SET_SEARCH_FIELDS;
  payload: SearchData;
};

export type SetFilterDatasAction = {
  type: TableActionTypes.SET_FILTER_DATA;
  payload: FilterData;
};
