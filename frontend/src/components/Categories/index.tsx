"use client";

import { useState } from "react";
import { poppins, montserrat } from "../../app/fonts";
import { Card, Link } from "@nextui-org/react";

const categoriesData = [
  { href: "#", title: "Cohere", keys: 20 },
  { href: "#", title: "Ngrok", keys: 1 },
  { href: "#", title: "OpenAI", keys: 11 },
  { href: "#", title: "IBM Watson", keys: 15 },
  { href: "#", title: "Google Cloud AI", keys: 30 },
  { href: "#", title: "Microsoft Azure Cognitive Services", keys: 25 },
  { href: "#", title: "Hugging Face", keys: 10 },
  { href: "#", title: "DeepAI", keys: 8 },
  { href: "#", title: "Clarifai", keys: 12 },
  { href: "#", title: "Algolia", keys: 7 },
  { href: "#", title: "Twilio", keys: 5 },
  { href: "#", title: "Amazon Rekognition", keys: 22 },
  { href: "#", title: "Speechmatics", keys: 9 },
  { href: "#", title: "OpenCV AI Kit (OAK)", keys: 14 },
  { href: "#", title: "Vize.ai", keys: 6 },
  { href: "#", title: "TextRazor", keys: 4 },
  { href: "#", title: "MonkeyLearn", keys: 13 },
  { href: "#", title: "AssemblyAI", keys: 11 },
];

const CategoryCard = ({ href, title, keys }) => (
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

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");

  const filteredCategories = categoriesData
    .filter((category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
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

      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-2 mb-5 border border-gray-300 px-7 rounded-2xl"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCategories.map((category, index) => (
          <CategoryCard
            key={index}
            href={category.href}
            title={category.title}
            keys={category.keys}
          />
        ))}
      </div>
    </section>
  );
}
