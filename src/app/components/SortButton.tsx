import { MouseEventHandler } from "react";
import { SortKeys, SortOrder } from "../types/Types";

export function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`${sortKey === columnKey && sortOrder === "desc"
        ? "sort-button sort-reverse"
        : "sort-button"
        }`}
    >
      Sort by {`${columnKey}`}
    </button>
  );
}