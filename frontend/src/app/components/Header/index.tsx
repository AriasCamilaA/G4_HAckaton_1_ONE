import { poppins } from "../../fonts";
import { montserrat } from "../../fonts";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header
      className="lg:mx-auto lg:max-w-[56.25rem] 2xl:max-w-[79.25rem] px-5 mt-[120px] xl:max-w-[71.5rem]"
      id="home"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-6 lg:w-1/2">
          <div className="flex flex-col gap-4">
            <h1
              className={`${poppins.className} font-bold text-3xl text-center xl:text-5xl lg:text-left`}
            >
              Efficient and Secure AI Key Management
            </h1>
            <p
              className={`${montserrat.className} text-text text-sm text-center xl:text-base lg:text-left`}
            >
              Streamline your AI key management process with our platform.
              Experience enhanced security and ease of use.
            </p>
          </div>

          <div className="flex gap-[16px] items-center justify-center lg:justify-start">
            <button className="w-full py-3 transition duration-200 ease-in-out rounded-lg bg-text hover:scale-110 md:w-[211px]">
              <Link
                href="/login"
                className={`${montserrat.className} text-white font-medium`}
              >
                Get Started
              </Link>
            </button>

            <button className="w-full py-3 transition duration-200 ease-in-out border rounded-lg hover:scale-110 bg-background-color border-text md:w-[211px]">
              <Link
                href="#"
                className={`${montserrat.className} text-text font-medium`}
              >
                Learn More
              </Link>
            </button>
          </div>
        </div>

        <div>
          <Image
            src="/heroimage2.png"
            alt="Header image"
            width={600}
            height={400}
            className="w-full"
          />
        </div>
      </div>
    </header>
  );
}
