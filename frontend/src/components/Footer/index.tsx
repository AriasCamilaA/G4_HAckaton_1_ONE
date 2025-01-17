"use client";

import { poppins, montserrat } from "../../app/fonts";
import Link from "next/link";
import Image from 'next/image'; 

export default function Footer() {
  return (
    <footer className="mx-auto px-5 pt-[130px] lg:pt-[250px] lg:max-w-[56.25rem] xl:max-w-[95%] 2xl:max-w-[95.25rem] pb-[60px]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 lg:mb-[70px]">
        <Link className="flex items-center gap-[10px] mb-10 lg:mb-0" href="/">
          <Image
            className="w-8"
            src="/logo.svg"
            alt="logo"
            width={32} 
            height={32} 
          />
          <span
            className={`${poppins.className} font-medium text-sm md:text-base`}
          >
            KeyCzar
          </span>
        </Link>

        <ul className="gap-3 space-y-5 lg:flex lg:space-x-4 lg:space-y-0">
          {["Home", "About Us", "Contact Us", "FAQs", "Support"].map(
            (item, index) => (
              <li key={index}>
                <Link href={`/${item.toLowerCase().replace(/ /g, "")}`}>
                  <span
                    className={`${poppins.className} font-medium lg:text-black lg:hover:text-primary`}
                  >
                    {item}
                  </span>
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-3 mt-8 lg:mt-0">
          <a href="">
            <Image
              className="w-5"
              src="/facebook.svg"
              alt="Facebook"
              width={20} 
              height={20} 
            />
          </a>
          <a href="">
            <Image
              className="w-5"
              src="/instagram.svg"
              alt="Instagram"
              width={20} 
              height={20}
            />
          </a>
          <a href="">
            <Image
              className="w-5"
              src="/twitter.svg"
              alt="Twitter"
              width={20}
              height={20}
            />
          </a>
          <a href="">
            <Image
              className="w-5"
              src="/linkedin.svg"
              alt="LinkedIn"
              width={20}
              height={20}
            />
          </a>
          <a href="">
            <Image
              className="w-5"
              src="/youtube.svg"
              alt="Youtube"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>

      <div className="w-full bg-text h-[1px] mb-[30px]"></div>

      <div className="flex flex-col-reverse gap-6 lg:items-center lg:justify-center lg:flex-row">
        <p className={`${montserrat.className}`}>
          © 2024 Hacketon Alura Latam G4™ All Rights Reserved.
        </p>
        <div className="flex flex-col gap-6 lg:items-center lg:justify-center lg:flex-row">
          <Link className={`${montserrat.className} underline`} href="/#">
            Privacy Policy
          </Link>
          <Link className={`${montserrat.className} underline`} href="/#">
            Terms of Service
          </Link>
          <Link className={`${montserrat.className} underline`} href="/#">
            Cookies Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
