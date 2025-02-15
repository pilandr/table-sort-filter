import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actions } from "store/tableDataSlice";
import type { RootState, AppDispatch } from "../store/store";
import * as tableAsyncActions from "../store/thunks";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type TableActionsType = ReturnType<typeof useTableActions>;

export const useTableActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () =>
      bindActionCreators(
        { ...actions, ...tableAsyncActions },
        dispatch,
      ),
    [dispatch],
  );
};

export const useTableData = () => {
  const data = useAppSelector((store) => store.tableState);

  return { ...data };
};
