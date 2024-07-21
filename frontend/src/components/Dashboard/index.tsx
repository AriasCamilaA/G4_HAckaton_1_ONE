"use client";

import React, { useState, useEffect } from "react";
import { poppins, montserrat } from "../../app/fonts";
import { Card, CardHeader, CardBody, CardFooter, Link } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [sessionStatus, setSessionStatus] = useState("Validando sesión...");
  const router = useRouter();

  useEffect(() => {
    // Simula la verificación de la sesión
    const validateSession = async () => {
      try {
        // Simulación de un retraso en la validación de la sesión
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simula la validación exitosa de la sesión
        const isValid = true;

        if (isValid) {
          setSessionStatus("Sesión válida");
        } else {
          setSessionStatus("Sesión inválida");
          router.push('/login');

        }
      } catch (error) {
        setSessionStatus("Sesión inválida");
        router.push('/login');
      }
    };

    validateSession();
  }, []);

  return (
    <div>
      <div className="lg:mx-auto mt-[10px] px-14 lg:max-w-[56.25rem] xl:max-w-[80%] 2xl:max-w-[79.25rem]">
        <div className="grid gap-6">
          {/* Primera fila con una tarjeta */}
          <div className="col-span-1">
            <Card className="max-w-[550px] mb-3">
              <CardHeader className="justify-between">
                <div className="flex gap-5 m-3">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className={`${poppins.className} text-xl tracking-tight text-default-600`}>Welcome back,</h4>
                    <p className="text-small text-default-400">Colocar nombre de usuario</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="w-auto mt-0 pb-4 px-3 pt-0 text-small text-default-400 mb-3 mx-3">
                <p>Your AI key management dashboard is ready to use. Manage your keys, categorize them, and view activity logs.</p>
              </CardBody>
            </Card>
          </div>

          {/* Segunda fila con dos tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card className="max-w-[550px] mb-3">
              <CardHeader className="pb-0 justify-between">
                <div className="flex gap-5 m-3">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h5 className={`${poppins.className} text-lg text-text tracking-tight text-default-400`}>Key Management</h5>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="w-auto mt-0 pb-0 px-3 pt-0 text-small text-default-400 mb-3 mx-3">
                <p>View, create, and manage your AI keys. Easily track usage and set permissions.</p>
              </CardBody>
              <CardFooter className="gap-3 pb-4 px-3 mb-3 mx-3 mt-0">
                <button className="px-8 py-3 transition duration-200 ease-in-out rounded-lg hover:scale-110 bg-text">
                  <Link href="/managekeys" className={`${poppins.className} text-white`}>Manage Keys</Link>
                </button>
              </CardFooter>
            </Card>

            <Card className="max-w-[550px] mb-3">
              <CardHeader className="pb-0 justify-between">
                <div className="flex gap-5 m-3">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h5 className={`${poppins.className} text-lg text-text tracking-tight text-default-400`}>Key Categorization</h5>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="w-auto mt-0 pb-0 px-3 pt-0 text-small text-default-400 mb-3 mx-3">
                <p>Organize your AI keys into categories for better management and visibility.</p>
              </CardBody>
              <CardFooter className="gap-3 pb-4 px-3 mb-3 mx-3 mt-0">
                <button className="px-8 py-3 transition duration-200 ease-in-out rounded-lg hover:scale-110 bg-text">
                  <Link href="/categorize" className={`${poppins.className} text-white`}>Categorize Keys</Link>
                </button>
              </CardFooter>
            </Card>
          </div>

          {/* Tercera fila con una tarjeta */}
          <div className="col-span-1">
            <Card className="max-w-[550px] mb-3">
              <CardHeader className="pb-0 justify-between">
                <div className="flex gap-5 m-3">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h5 className={`${poppins.className} text-lg text-text tracking-tight text-default-400`}>Logs</h5>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="w-auto mt-0 pb-0 px-3 pt-0 text-small text-default-400 mb-3 mx-3">
                <p>View detailed activity logs for your AI keys, including usage, modifications, and more.</p>
              </CardBody>
              <CardFooter className="gap-3 pb-4 px-3 mb-3 mx-3 mt-0">
                <button className="px-8 py-3 transition duration-200 ease-in-out rounded-lg hover:scale-110 bg-text">
                  <Link href="/logs" className={`${poppins.className} text-white`}>View Logs</Link>
                </button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}