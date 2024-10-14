"use client"

import { useQuery } from "react-query";
import { Cards } from "./components/Cards";
import { ChangeEvent, useEffect, useState } from "react";
import { FilterObject, User } from "./interfaces/Interfaces";

export default function Home() {
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [filters, setFilters] = useState<FilterObject>({
    searchQuery: ''
  })

  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  const {
    data: users,
    isError,
    isLoading,
  } = useQuery({
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/users`);
      return (await response.json() as User[])
    },
  });

  if (isError) {
    return <div>Something went wrong. Please try again a bit ater.</div>
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters({
      ...filters,
      searchQuery: e.target.value
    })
  }

  const keys = [
    "name",
    "email",
    "phone",
    "website",
    //"address"
  ];

  const search = (filterObj: FilterObject, data: User[] | undefined) => {
    return data?.filter(item => {
      return (
        keys.some((key) => item[key].toLowerCase().includes(filterObj.searchQuery.toLowerCase()))
      )
    })
  }

  useEffect(() => {
    const data = search(filters, users);
    setFilteredData(data!);
  }, [filters, users])

  return (
    <div className="main">
      <input
        type="text"
        placeholder="Search..."
        className="search"
        onChange={handleInput}
      />
      <Cards {... { filteredData, isLoading }} />
    </div>
  );
}