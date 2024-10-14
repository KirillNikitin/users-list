import { useCallback, useState } from "react";
import { User } from "../interfaces/Interfaces"
import { SortKeys, SortOrder } from "../types/Types";
import "../styles/style.scss";
import { SortButton } from "./SortButton";

function sortData({
  cardsData,
  sortKey,
  reverse,
}: {
  cardsData: User[];
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return cardsData;

  const sortedData = cardsData?.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

export const Cards = ({ ...props }: { filteredData: User[], isLoading: boolean }) => {
  const [sortKey, setSortKey] = useState<SortKeys>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const sortedData = useCallback(
    () => sortData({ cardsData: props.filteredData, sortKey, reverse: sortOrder === "desc" }),
    [props.filteredData, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }

  return (
    <>
      {props.isLoading && <div>Loading...</div>}
      <SortButton
        columnKey={'name'}
        onClick={() => changeSort('name')}
        {...{
          sortOrder,
          sortKey,
        }}
      />
      <div className="container">
        {!props.isLoading && sortedData()?.map((user: User) => {
          return <section key={user.id} className="user">
            <h2 className="user-name">{user.name}</h2>
            <div className="user-email">E-mail: {user.email}</div>
            <div className="user-phone">Phone: {user.phone}</div>
            <div className="user-website">Web page: {user.website}</div>
            <div className="user-address">Address: {user.address.street}, {user.address.suite}, {user.address.zipcode}, {user.address.city}</div>
          </section >
        })}
      </div>
    </>
  )
}