"use client";

import { poppins, montserrat } from "../../app/fonts";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="px-5 mx-auto lg:max-w-[56.25rem] xl:max-w-[95%] 2xl:max-w-[95.25rem]">
      <div className="flex flex-col justify-between xl:flex-row">
        <div className="flex flex-col items-center gap-5 xl:items-start">
          <h2
            className={`${poppins.className} font-bold text-2xl xl:text-4xl text-center md:text-left`}
          >
            Efficient and Secure Al Key Management
          </h2>

          <p
            className={`${montserrat.className} font-medium text-center text-sm lg:text-base md:text-left mb-[30px] xl:text-left xl:mb-0`}
          >
            Experience the benefits of our AI key management platform
          </p>
        </div>

        <div className="flex flex-col items-center w-full gap-3 xl:h-full xl:flex-row xl:w-auto">
          <button className="px-8 py-3 transition duration-200 ease-in-out rounded-lg hover:scale-110 bg-text md:w-1/2 xl:w-auto">
            <Link
              href="/login"
              className={`${poppins.className}  text-background-color`}
            >
              Get Started
            </Link>
          </button>
          <button className="px-8 py-3 transition duration-200 ease-in-out border rounded-lg hover:scale-110 border-text md:w-1/2 xl:w-auto">
            <Link
              href="#"
              className={`${poppins.className} text-text font-medium`}
            >
              Learn More
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
