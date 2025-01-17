"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { poppins } from "../../app/fonts";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldCollapseNavbar = scrollPosition > 0;

      requestAnimationFrame(() => {
        setScrolled(shouldCollapseNavbar);
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full p-5 lg:shadow-md lg:left-1/2 lg:w-[56.25rem] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:transition-all lg:duration-300 ${
        isScrolled
          ? "w-full rounded-none bg-white lg:top-[40px] lg:w-screen shadow-md"
          : "w-full bg-white lg:top-[80px] lg:rounded-xl lg:bg-gray-200 lg:bg-opacity-10 lg:px-4 xl:w-[95%] 2xl:w-[95.25rem]"
      }`}
    >
      <nav className="flex items-center justify-between lg:mx-auto 2xl:max-w-[92.25rem]">
        <Link href="/">
          <div className="flex items-center gap-[10px] transition duration-200 ease-in-out hover:scale-110">
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
          </div>
        </Link>

        <button
          className={`z-50 lg:hidden ${isMenuOpen ? "hidden" : ""}`}
          onClick={toggleMenu}
          aria-label="Open menu"
        >
          <Image
            className="md:w-7"
            src="/hamburger.svg"
            alt="Hamburger icon"
            width={28}
            height={28}
          />
        </button>

        <button
          className={`z-50 lg:hidden ${isMenuOpen ? "" : "hidden"}`}
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <Image
            src="/closeHamburguer.svg"
            alt="Close menu icon"
            width={28}
            height={28}
          />
        </button>

        <div
          className={`${
            isMenuOpen
              ? "translate-x-0 transition-transform lg:transition-none"
              : "translate-x-full transition-transform md:transition-none lg:translate-x-0"
          } absolute right-0 top-0 h-screen w-2/3 bg-white px-10 py-[80px] lg:relative lg:h-auto lg:w-auto lg:gap-4 lg:bg-transparent lg:px-0 lg:py-0`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <ul className="gap-3 space-y-10 lg:flex lg:space-x-4 lg:space-y-0">
              {["Home", "About Us", "Contact Us", "FAQs", "Support"].map(
                (item, index) => (
                  <li key={index}>
                    <Link href={`/${item.toLowerCase().replace(/ /g, "")}`}>
                      <span
                        onClick={closeMenu}
                        className={`${poppins.className} font-medium text-text lg:hover:text-primary`}
                      >
                        {item}
                      </span>
                    </Link>
                  </li>
                )
              )}
            </ul>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <button className="px-8 py-3 transition duration-200 ease-in-out rounded-lg hover:scale-110 bg-text">
                <Link
                  href="/login"
                  className={`${poppins.className} text-white`}
                >
                  Log In
                </Link>
              </button>

              <button className="px-8 py-3 transition duration-200 ease-in-out border rounded-lg hover:scale-110 border-text">
                <Link
                  href="/registration"
                  className={`${poppins.className} text-text font-medium`}
                >
                  Sign Up
                </Link>
              </button>
            </div>
          </div>

          <div className="mt-[224px] lg:hidden">
            <span className={`${poppins.className} text-text`}>Follow Us</span>
            <div className="flex gap-3 mt-4">
              <a className="flex items-center justify-center w-8 h-8" href="#">
                <Image
                  src="/facebook.svg"
                  alt="facebook social"
                  width={24}
                  height={24}
                />
              </a>
              <a className="flex items-center justify-center w-8 h-8" href="#">
                <Image
                  src="/instagram.svg"
                  alt="instagram social"
                  width={24}
                  height={24}
                />
              </a>
              <a className="flex items-center justify-center w-8 h-8" href="#">
                <Image
                  src="/twitter.svg"
                  alt="twitter social"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
