"use client";

import { poppins, montserrat } from "../../app/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Feature() {
  return (
    <section className="mx-auto px-5 lg:max-w-[56.25rem] xl:max-w-[95%] 2xl:w-[95.25rem]">
      <div className="flex flex-col items-center gap-16 md:flex-row">
        <div className="flex flex-col items-center md:items-start md:w-1/2">
          <span
            className={`${montserrat.className} text-center font-medium text-sm lg:text-base md:text-left mb-[26px]`}
          >
            Efficiency
          </span>
          <h2
            className={`${poppins.className} font-bold text-2xl xl:text-4xl text-center md:text-left mb-9`}
          >
            Streamline Your Key Management Process with Ease
          </h2>
          <p
            className={`${montserrat.className} text-center font-medium text-sm lg:text-base md:text-left mb-[30px]`}
          >
            Our platform offers enhanced security, efficient management, and
            user-friendly experience for your AI key management needs.
          </p>

          <div className="flex gap-3 lg:items-center">
            <button className="px-8 py-3 transition duration-200 ease-in-out border rounded-lg hover:scale-110 border-text">
              <Link
                href="#"
                className={`${poppins.className} text-text font-medium`}
              >
                Learn More
              </Link>
            </button>
            <button className="px-8 py-3 transition duration-200 ease-in-out rounded-lg hover:scale-110 bg-text">
              <Link href="/login" className={`${poppins.className} text-white`}>
                Sign Up
              </Link>
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <Image
            src="/feature3.png"
            alt="feature"
            width={600}
            height={400}
            className="w-full md:h-[509px] lg:w-[511px] xl:w-full "
          />
        </div>
      </div>
    </section>
  );
}
