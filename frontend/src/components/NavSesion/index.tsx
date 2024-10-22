"use client";

import { useState } from "react";
import { poppins } from "../../app/fonts";
import { Link } from "@nextui-org/react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Alert } from "../../utilities";
import Image from 'next/image';

export default function NavSesion() {
  const { logout } = useAuth();
  const [sessionState, setSessionState] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    console.log(
      "Cerrando sesión: El usuario ha solicitado cerrar su sesión actual."
    );
    try {
      logout(); // Llama al método de logout desde el contexto
      Alert.fire({
        title: "Logout successful",
        text: "You have been logged out successfully.",
        icon: "success",
      });
      router.push("/"); // Redirige al usuario a la página
      console.log("Sesión cerrada: La sesión se ha cerrado correctamente.");
    } catch (error) {
      console.log(
        "Error al cerrar sesión: Hubo un problema al intentar cerrar la sesión."
      );
      setSessionState("Error al cerrar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className=" mx-auto p-5 lg:max-w-[56.25rem] xl:max-w-[95%] 2xl:w-[95.25rem]">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/Dashboard">
            <div className="flex items-center gap-[10px] transition duration-200 ease-in-out hover:scale-110">
            <Image
              className="w-8"
              src="/logo.svg"
              alt="logo"
              width={32} 
              height={32}
            />
              <span
                className={`${poppins.className} text-text font-medium text-sm md:text-base`}
              >
                KeyCzar
              </span>
            </div>
          </Link>
        </div>

        <div>
          <div
            className="flex items-center gap-[10px] transition duration-200 ease-in-out hover:scale-110 cursor-pointer"
            onClick={handleLogout}
          >
            <span className="mr-2 text-sm font-medium text-text md:text-base">
              Log out
            </span>
          </div>
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
