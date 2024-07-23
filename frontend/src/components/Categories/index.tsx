"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { useAuth } from "../../contexts/AuthContext";
import useServicesWithKeys from "../../logic/hooks/servicios/useServicesWithKeys";
import CategoryCard from "./CategoryCard";
import { poppins } from "../../app/fonts";

export default function Categories() {
  const { user } = useAuth();
  const { servicesWithKeys, loading, error } = useServicesWithKeys(user?.token);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");

  const filteredCategories = servicesWithKeys
    .filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortCriteria === "keys") {
        return b.keys.length - a.keys.length;
      }
      return 0;
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="lg:mx-auto my-20 px-5 lg:max-w-[56.25rem] xl:max-w-[95%] 2xl:w-[95.25rem]">
      <div className="flex flex-col items-center justify-between gap-5 mb-5 md:flex-row md:gap-0">
        <h2 className={`${poppins.className} font-bold text-2xl xl:text-4xl`}>
          AI Key Categories
        </h2>
        <div>
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className="p-1 border border-gray-300 rounded"
          >
            <option value="name">name</option>
            <option value="keys">number of keys</option>
          </select>
        </div>
      </div>

      <Input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-2 mb-5 border border-gray-300 px-7 rounded-2xl"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            keys={category.keys}
          />
        ))}
      </div>
    </section>
  );
}
