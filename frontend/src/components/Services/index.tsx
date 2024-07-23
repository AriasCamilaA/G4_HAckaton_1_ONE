"use client";

import { poppins, montserrat } from "../../app/fonts";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    imgSrc: "/service1.png",
    alt: "Categorization of keys",
    title: "Categorization of keys",
    description:
      "Easily categorize and organize your AI keys for efficient management",
    link: "#",
  },
  {
    imgSrc: "/service2.png",
    alt: "Search and Filtering",
    title: "Search and Filtering",
    description:
      "Quickly find and filter your AI keys based on specific criteria.",
    link: "#",
  },
  {
    imgSrc: "/service3.png",
    alt: "Expiration Notifications",
    title: "Expiration Notifications",
    description:
      "Receive timely notifications when your AI keys are about to expire.",
    link: "#",
  },
];

const ServiceCard = ({ imgSrc, alt, title, description, link }) => (
  <div>
    <Image
      src={imgSrc}
      alt={alt}
      width={600}
      height={400}
      className="w-full h-[200px] lg:h-[188px] xl:h-[300px] object-cover"
    />
    <div className="flex flex-col items-center justify-center mt-[35px]">
      <h3
        className={`${montserrat.className} font-bold text-lg text-center xl:text-2xl`}
      >
        {title}
      </h3>
      <p
        className={`${montserrat.className} text-sm lg:text-base text-center mt-5`}
      >
        {description}
      </p>
      <div className="flex items-center mt-[30px]">
        <Link href={link} className={`${montserrat.className} font-medium`}>
          Learn More
        </Link>
        <Image className="w-6" src="/ArrowRight.svg" alt="Arrow Right" width={24} height={24} />
      </div>
    </div>
  </div>
);

export default function Services() {
  return (
    <section className="lg:mx-auto px-5 lg:max-w-[56.25rem] xl:max-w-[95%] 2xl:w-[95.25rem]">
      <h2
        className={`${poppins.className} font-bold text-2xl text-center xl:text-4xl mb-[67px]`}
      >
        Optimized and Safe AI Key Management Solutions
      </h2>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
}
