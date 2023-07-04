import { TableMainDataKey } from "components/Table/Table.types";

export interface ITableHeadProps {
  setSortDirection: () => void;
  sortDirection: boolean;
  setSortField: (name: TableMainDataKey) => void;
  sortField: TableMainDataKey;
}
