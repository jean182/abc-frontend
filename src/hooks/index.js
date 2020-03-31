import React from "react";

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useControlled({ controlled, default: defaultProp }) {
  const { current: isControlled } = React.useRef(controlled !== undefined);
  const [valueState, setValue] = React.useState(defaultProp);
  const value = isControlled ? controlled : valueState;

  const setValueIfUncontrolled = React.useCallback(
    (newValue) => {
      if (!isControlled) {
        setValue(newValue);
      }
    },
    [isControlled]
  );

  return [value, setValueIfUncontrolled];
}

export function usePagination(props = {}) {
  const {
    boundaryCount: boundaryCountProp = 1,
    componentName = "usePagination",
    count = 1,
    defaultPage = 1,
    disabled = false,
    hideNextButton = false,
    hidePrevButton = false,
    onChange: handleChange,
    page: pageProp,
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
    reset = false,
    ...other
  } = props;

  const boundaryCount = boundaryCountProp - 1;

  const [page, setPageState] = useControlled({
    controlled: pageProp,
    default: defaultPage,
    name: componentName,
  });

  React.useEffect(() => {
    if (reset === true && page !== 1) setPageState(defaultPage);
  }, [reset, page, defaultPage, setPageState]);

  const handleClick = (event, value) => {
    if (!pageProp) {
      setPageState(value);
    }
    if (handleChange) {
      handleChange(event, value);
    }
  };

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount + 1, count));
  const endPages = range(
    Math.max(count - boundaryCount, boundaryCount + 2),
    count
  );

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 2),
    boundaryCount + 3
  );

  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 3),
    endPages[0] - 2
  );

  const itemList = [
    ...(showFirstButton ? ["first"] : []),
    ...(hidePrevButton ? [] : ["previous"]),
    ...startPages,

    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 3
      ? ["start-ellipsis"]
      : 2 + boundaryCount < count - boundaryCount - 1
      ? [2 + boundaryCount]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryCount - 2
      ? ["end-ellipsis"]
      : count - boundaryCount - 1 > boundaryCount + 1
      ? [count - boundaryCount - 1]
      : []),

    ...endPages,
    ...(hideNextButton ? [] : ["next"]),
    ...(showLastButton ? ["last"] : []),
  ];

  // Map the button type to its page number
  const buttonPage = (type) => {
    switch (type) {
      case "first":
        return 1;
      case "previous":
        return page - 1;
      case "next":
        return page + 1;
      case "last":
        return count;
      default:
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map((item) => {
    return typeof item === "number"
      ? {
          onClick: (event) => {
            handleClick(event, item);
          },
          type: "page",
          page: item,
          selected: item === page,
          disabled,
          "aria-current": item === page ? "true" : undefined,
        }
      : {
          onClick: (event) => {
            handleClick(event, buttonPage(item));
          },
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            disabled ||
            (item.indexOf("ellipsis") === -1 &&
              (item === "next" || item === "last" ? page >= count : page <= 1)),
        };
  });

  return {
    items,
    ...other,
  };
}
