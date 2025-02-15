import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchTableData } from "./thunks";

import {
  TableData,
  TableMainDataKey,
  SearchData,
  FilterData,
  RequestData,
} from "components/Table/Table.types";

export type TableState = {
  tableData: TableData[];
  sortField: TableMainDataKey;
  isSortDirectionUp: boolean;
  searchFields: SearchData;
  filterData: FilterData;
  noDataMessage: string;
  isLoading: boolean;
};

export const tableInitialState: TableState = {
  tableData: [],
  sortField: "userId",
  isSortDirectionUp: true,
  searchFields: {},
  filterData: {},
  noDataMessage: "",
  isLoading: true,
};

export const tableSlice = createSlice({
  name: "table",
  initialState: tableInitialState,
  reducers: {
    setTableData: (state, action: PayloadAction<TableData[]>) => {
      state.tableData = action.payload;
    },
    setSortField: (
      state,
      action: PayloadAction<TableMainDataKey>,
    ) => {
      state.sortField = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<boolean>) => {
      state.isSortDirectionUp = action.payload;
    },
    setSearchFields: (state, action: PayloadAction<SearchData>) => {
      state.searchFields = action.payload;
    },
    setFilterData: (state, action: PayloadAction<FilterData>) => {
      state.filterData = action.payload;
    },
    setNoDataMessage: (state, action: PayloadAction<string>) => {
      state.noDataMessage = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.isLoading = true;
        state.noDataMessage = "";
      })
      .addCase(
        fetchTableData.fulfilled,
        (state, action: PayloadAction<RequestData[]>) => {
          state.tableData = action.payload.map((item, index) => {
            const timestamp = Date.parse(item.work_start ?? "");
            const dateObject = timestamp ? new Date(timestamp) : null;
            return {
              ...item,
              work_start: dateObject,
              isFiltered: false,
              id: index,
            };
          });
          state.isLoading = false;
        },
      )
      .addCase(fetchTableData.rejected, (state, action) => {
        state.isLoading = false;
        state.noDataMessage =
          typeof action.payload === "string" && !!action.payload
            ? action.payload
            : "Something went wrong";
      });
  },
});

export const { actions, reducer } = tableSlice;
