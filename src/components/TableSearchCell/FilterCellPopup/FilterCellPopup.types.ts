import { TableMainDataKey } from "components/Table/Table.types";
import { TableModel } from "components/Table/TableModel";

export interface IFilterCellPopupProps {
  nameSort: TableMainDataKey;
  model: TableModel;
  setIsOpenPopup: (value: boolean) => void;
  isOpenPopup: boolean;
}
