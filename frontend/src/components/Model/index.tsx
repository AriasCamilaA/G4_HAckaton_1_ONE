"use client";

import { useState, useEffect } from "react";
import { poppins, montserrat } from "../../app/fonts";
import { Card, Link } from "@nextui-org/react";
import Image from 'next/image'; // Importar el componente Image
import useModels from "../../logic/hooks/modelos/useModels"; // Importar el hook useModels
import { useAuth } from "../../contexts/AuthContext"; // Importar el contexto AuthContext

const ModelCard = ({ href, name }) => (
  <Link className="w-full" href={href}>
    <Card className="flex flex-row items-center justify-between w-full p-5">
      <div>
        <h5 className={`${poppins.className} text-text tracking-tight`}>
          {name}
        </h5>
      </div>
    </Card>
  </Link>
);

export default function Models() {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const { models, loading, error } = useModels(user?.token); // Utilizar el hook useModels
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");

  const filteredModels = models
    .filter((model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <section className="lg:mx-auto my-20 px-5 lg:max-w-[56.25rem] xl:max-w-[95%] 2xl:w-[95.25rem]">
      <div className="flex flex-col items-center justify-between gap-5 mb-5 md:flex-row md:gap-0">
        <h2 className={`${poppins.className} font-bold text-2xl xl:text-4xl`}>
          AI Key models
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
          </select>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search models..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-2 mb-5 border border-gray-300 px-7 rounded-2xl"
      />

      {loading && <p>Loading models...</p>}
      {/* {error && <p>Error loading models: {error.message}</p>} */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredModels.map((model, index) => (
          <ModelCard
            key={index}
            href="#"
            name={model.name} // Cambiado a model.name
          />
        ))}
      </div>
    </section>
  );
}
