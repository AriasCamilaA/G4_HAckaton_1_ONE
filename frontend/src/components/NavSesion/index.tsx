"use client";

import { useState } from "react";
import { poppins } from "../../app/fonts";
import { Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NavSesion() {
  const [sessionState, setSessionState] = useState("");

  const router = useRouter();

  const handleLogout = async () => {
    console.log(
      "Cerrando sesión: El usuario ha solicitado cerrar su sesión actual."
    );
    try {
      // Simula el proceso de cierre de sesión (puedes reemplazar esto con una llamada real a una API)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Sesión cerrada: La sesión se ha cerrado correctamente.");
      router.push("/login");
    } catch (error) {
      console.log(
        "Error al cerrar sesión: Hubo un problema al intentar cerrar la sesión."
      );
    }
  };

  return (
    <div>
      <div className="flex justify-start p-4 absolute-position">
        <Link href="/dashboard">
          <div className="flex items-center gap-[10px] transition duration-200 ease-in-out hover:scale-110">
            <img className="w-8" src="/logo.svg" alt="logo" />
            <span
              className={`${poppins.className} text-text font-medium text-sm md:text-base`}
            >
              KeyCzar
            </span>
          </div>
        </Link>
      </div>
      <div className="absolute top-0 right-0 flex justify-end p-4">
        <div
          className="flex items-center gap-[10px] transition duration-200 ease-in-out hover:scale-110 cursor-pointer"
          onClick={handleLogout}
        >
          <span className="mr-2 text-sm font-medium text-text md:text-base">
            Log out
          </span>
        </div>
      </div>
      {sessionState && (
        <div className="flex justify-center p-4 mt-4">
          <span className="text-red-500">{sessionState}</span>
        </div>
      )}
    </div>
  );
}
