"use client";

import { useState } from "react";
import { poppins, montserrat } from "../../app/fonts";
import { Card, Link } from "@nextui-org/react";

const modelsData = [
  { href: "#", title: "LLM Models (Large Language Models)", keys: 20 },
  { href: "#", title: "Image Generation Models", keys: 1 },
  { href: "#", title: "Image Processing Models", keys: 11 },
  { href: "#", title: "Audio and Voice Analysis Models", keys: 15 },
  { href: "#", title: "Video Processing Models", keys: 30 },
  { href: "#", title: "Text Analysis Models", keys: 25 },
  { href: "#", title: "Facial Analysis and Recognition Models", keys: 10 },
  { href: "#", title: "Image Classification Models", keys: 8 },
  { href: "#", title: "Sentiment Analysis Models", keys: 12 },
  { href: "#", title: "Natural Language Processing (NLP) Models", keys: 7 },
  { href: "#", title: "Document Analysis Models", keys: 5 },
  { href: "#", title: "Image Classification Models", keys: 14 },
  { href: "#", title: "Document Analysis Models", keys: 13 },
  { href: "#", title: "Natural Language Processing (NLP) Models", keys: 11 },
];

const ModelCard = ({ href, title, keys }) => (
  <Link className="w-full" href={href}>
    <Card className="flex flex-row items-center justify-between w-full p-5">
      <div>
        <h5 className={`${poppins.className} text-text tracking-tight`}>
          {title}
        </h5>
        <span
          className={`${montserrat.className} text-sm font-medium lg:text-base tracking-tight text-gray-500`}
        >
          {keys} AI keys
        </span>
      </div>
      <img className="w-6" src="ArrowRight.svg" alt="Arrow Icon" />
    </Card>
  </Link>
);

export default function models() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");

  const filteredmodels = modelsData
    .filter((model) =>
      model.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "name") {
        return a.title.localeCompare(b.title);
      } else if (sortCriteria === "keys") {
        return b.keys - a.keys;
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
            <option value="keys">number of keys</option>
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredmodels.map((model, index) => (
          <ModelCard
            key={index}
            href={model.href}
            title={model.title}
            keys={model.keys}
          />
        ))}
      </div>
    </section>
  );
}
