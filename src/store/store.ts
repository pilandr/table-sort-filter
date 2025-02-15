import { configureStore } from "@reduxjs/toolkit";
import { reducer as tableReducer } from "./tableDataSlice";

export const store = configureStore({
  reducer: {
    tableState: tableReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
