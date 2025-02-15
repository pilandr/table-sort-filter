import { createAsyncThunk } from "@reduxjs/toolkit";
import { RequestData } from "components/Table/Table.types";
import { AppSettings } from "helpers/settings";

export const fetchTableData = createAsyncThunk<RequestData[], void>(
  "table/fetchTableData",
  async (_, thunkAPI) => {
    try {
      const url = AppSettings.getInstance().getApiUrl();
      const response = await fetch(url);
      if (!response.ok) {
        return thunkAPI.rejectWithValue("Failed to fetch data");
      }
      const data: RequestData[] = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  },
);
