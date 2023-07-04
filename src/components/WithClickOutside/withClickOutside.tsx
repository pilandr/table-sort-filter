import React, { useRef, useEffect, FunctionComponent } from "react";

interface WithClickOutsideProps {
  setIsOpenPopup: (value: boolean) => void;
}

const withClickOutside = <P extends object>(
  WrappedComponent: FunctionComponent<P>,
) => {
  const WithClickOutside: FunctionComponent<
    P & WithClickOutsideProps
  > = (props) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          props.setIsOpenPopup(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div ref={wrapperRef}>
        <WrappedComponent {...props} />
      </div>
    );
  };

  return WithClickOutside;
};

export default withClickOutside;
