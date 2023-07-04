import React, { useState, useTransition, memo } from "react";

import { ITableSearchCellProps } from "./TableSearchCell.types";
import { TableMainDataKey } from "components/Table/Table.types";
import { getString, getInputSearchString } from "helpers/functions";
import { FilterCellPopup } from "./FilterCellPopup";
import { IFilterCellPopupProps } from "./FilterCellPopup/FilterCellPopup.types";
import withClickOutside from "components/WithClickOutside/withClickOutside";

import styles from "./TableSearchCell.module.scss";

const FilterCellPopupClickOutside =
  withClickOutside<IFilterCellPopupProps>(FilterCellPopup);

const TableSearchCell: React.FunctionComponent<ITableSearchCellProps> =
  memo(({ nameSort, model }) => {
    const searchFields = model.state.searchFields;

    const [value, setValue] = useState(searchFields);
    const [, startTransition] = useTransition();
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const onChangeSearchInput = (
      e: React.FormEvent<HTMLInputElement>,
      nameSort: TableMainDataKey,
    ) => {
      const value = getInputSearchString(
        e.currentTarget.value,
        nameSort,
      );
      if (value === searchFields[nameSort]) {
        return;
      }
      setValue({
        ...searchFields,
        [nameSort]: value,
      });
      startTransition(() => {
        model.setSearchFields({
          ...searchFields,
          focusField: nameSort,
          [nameSort]: value,
        });
      });
    };

    return (
      <li className={styles["head-cell"]}>
        <input
          type="text"
          className={styles["search-input"]}
          onChange={(e) => onChangeSearchInput(e, nameSort)}
          value={getString(value[nameSort])}
          autoFocus={nameSort === searchFields.focusField}
        />
        <div className={styles["filter-button"]}>
          <FilterCellPopupClickOutside
            model={model}
            nameSort={nameSort}
            setIsOpenPopup={setIsOpenFilter}
            isOpenPopup={isOpenFilter}
          />
        </div>
      </li>
    );
  });

export { TableSearchCell };
