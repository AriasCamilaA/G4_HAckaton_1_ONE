"use client";

import { montserrat } from "../../app/fonts";
import Image from "next/image";

export default function Testimonials() {
  const stars = Array(5).fill("/star.svg");

  return (
    <section className="mx-auto px-5 lg:max-w-[56.25rem] xl:max-w-[95%] 2xl:w-[95.25rem]">
      <div className="flex flex-col items-center gap-16 md:flex-row">
        <div className="w-full md:w-1/2">
          <Image
            src="/profile2.jpg"
            alt="Profile"
            width={600}
            height={400}
            className="w-full h-[509px] lg:w-[511px] xl:h-[700px] xl:w-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center gap-8 lg:gap-16 md:items-start md:w-1/2">
          <div className="flex items-center">
            {stars.map((star, index) => (
              <Image
                key={index}
                src={star}
                alt="stars"
                width={24}
                height={24}
              />
            ))}
          </div>
          <p
            className={`${montserrat.className} text-center font-medium text-sm lg:text-base md:text-left`}
          >
            Using this AI Key Management platform has revolutionized our
            security protocols. The interface is user-friendly, and the
            multifactor authentication ensures our data stays protected. Highly
            recommended!
          </p>

          <div className="flex flex-col items-center md:items-start">
            <span
              className={`${montserrat.className} text-center font-bold text-sm lg:text-base`}
            >
              John Doe
            </span>
            <span
              className={`${montserrat.className} text-center text-sm lg:text-base`}
            >
              CEO, Tech Company
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
