"use client";

import { poppins, montserrat } from "../../app/fonts";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Link } from "@nextui-org/react";


export default function Tracing() {

  return (
    <div>
      <div className="flex justify-start p-4 absolute-position">
        <Link href="/dashboard">
          <div className="flex items-center gap-[10px] transition duration-200 ease-in-out hover:scale-110">
            <img className="w-8" src="/logo.svg" alt="logo" />
            <span className={`${poppins.className} text-text font-medium text-sm md:text-base`}>
              KeyCzar
            </span>
          </div>
        </Link>
      </div>
      <div className="flex justify-end p-4 absolute top-0 right-0">
        <Link href="/logout">
          <div className="flex items-center gap-[10px] transition duration-200 ease-in-out hover:scale-110 cursor-pointer">
            <span className="text-text font-medium text-sm md:text-base">log out</span>
          </div>
        </Link>
      </div>
      <div className="lg:mx-auto lg:max-w-[56.25rem] 2xl:max-w-[79.25rem] p-5 mx-[120px] my-[90px] xl:max-w-[71.5rem]">
        <h1 className={`${poppins.className} text-3xl font-bold text-center mb-6`}>Key Management</h1>
        <div className="flex flex-col gap-3">

        </div>
      </div>
    </div>
  );







}