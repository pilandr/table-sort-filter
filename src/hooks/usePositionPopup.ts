import React, { useState } from "react";

export const usePositionPopup = (
  widthPopup: number,
  parendDataAttr: string,
  setOpenPopup: (value: boolean) => void,
  isOpenPopup: boolean,
) => {
  const [popupPosition, setPopupPosition] = useState<{
    top: string;
    left?: string;
    right?: string;
  }>({
    top: "100%",
  });

  const onClickOpenPopup = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    const target = e.target as Element;
    const table = target.closest(parendDataAttr);

    if (!table) {
      return;
    }

    const planRect = table.getBoundingClientRect();
    const x = e.clientX - planRect.left;

    if (widthPopup < x) {
      setPopupPosition({ top: "100%", right: "0%" });
    } else {
      setPopupPosition({ top: "100%", left: "0%" });
    }

    setOpenPopup(!isOpenPopup);
  };

  return { popupPosition, onClickOpenPopup };
};
