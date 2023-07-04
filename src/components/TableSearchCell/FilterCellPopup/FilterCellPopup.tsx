import React, { useState, memo } from "react";
import cn from "classnames";

import { IFilterCellPopupProps } from "./FilterCellPopup.types";
import {
  TableMainDataKey,
  TableData,
} from "components/Table/Table.types";
import { getString } from "helpers/functions";
import { ReactComponent as FilterIcon } from "./filter.svg";
import { CheckBoxButton } from "components/CheckBoxButton";
import { usePositionPopup } from "hooks/usePositionPopup";

import styles from "./FilterCellPopup.module.scss";

const FilterCellPopup: React.FunctionComponent<IFilterCellPopupProps> =
  memo(({ nameSort, model, setIsOpenPopup, isOpenPopup }) => {
    const [filterData, setFilterData] = useState(
      model.state.filterData,
    );
    const nameField = nameSort as TableMainDataKey;
    const dataForFilter = model.getUniqueStringValues(
      nameField,
      false,
    );
    const filterValues = filterData[nameField] ?? [];

    const { popupPosition, onClickOpenPopup } = usePositionPopup(
      400,
      "[data-name='table-list']",
      setIsOpenPopup,
      isOpenPopup,
    );

    const onChangeCheckBox = (
      value: TableData,
      isChecked: boolean,
    ) => {
      setFilterData({
        ...model.state.filterData,
        [nameField]: isChecked
          ? filterValues.filter(
              (filter) => filter !== value[nameField],
            )
          : [...filterValues, value[nameField]],
      });
    };

    const closeFilter = () => {
      setIsOpenPopup(false);
      setFilterData(model.state.filterData);
    };

    const isDisableSaveFilter = () => {
      let isDisable = true;
      dataForFilter.forEach((data) => {
        const isChecked = filterValues.some(
          (filter) => filter === data[nameField],
        );
        if (isChecked) {
          isDisable = false;
        }
      });

      return isDisable;
    };

    return (
      <div
        className={cn(styles["filter-icon"], {
          [styles["filter-icon-active"]]:
            model.state.filterData[nameField]?.length &&
            model.state.filterData[nameField]?.length !==
              dataForFilter.length,
        })}
        onClick={onClickOpenPopup}
      >
        <FilterIcon />
        <div
          className={cn(styles["filter-settings"], {
            [styles["filter-settings-is-open"]]: isOpenPopup,
          })}
          style={popupPosition}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className={styles["filter-list"]}>
            <button
              onClick={() =>
                setFilterData({ ...filterData, [nameField]: [] })
              }
              className={styles["button"]}
            >
              Uncheck all
            </button>
            {dataForFilter.map((value) => {
              const valueData = value[nameField];
              const isChecked = filterValues.some(
                (filter) => filter === valueData,
              );
              return (
                <CheckBoxButton
                  key={`check_${value.id}`}
                  content={{
                    label: getString(value[nameField]),
                    value: getString(value[nameField]),
                  }}
                  checked={isChecked}
                  onChange={() => onChangeCheckBox(value, isChecked)}
                />
              );
            })}
          </ul>
          <div className={styles["actions"]}>
            <button
              className={styles["button"]}
              onClick={() => closeFilter()}
            >
              Cancel
            </button>
            <button
              className={styles["button"]}
              onClick={() => {
                setIsOpenPopup(false);
                model.setStartFilterValues(nameField);
              }}
            >
              Reset
            </button>
            <button
              className={styles["button"]}
              onClick={() => {
                setIsOpenPopup(false);
                model.setFilterData({ ...filterData });
              }}
              disabled={isDisableSaveFilter()}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  });

export { FilterCellPopup };
