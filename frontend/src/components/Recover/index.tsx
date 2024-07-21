"use client";

import React, { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { poppins } from "../../app/fonts";
import { useRouter } from 'next/navigation';
import { Alert } from "../../utilities";

type FormValues = {
  email: string;
};

enum RecoveryState {
  INITIATING = "INITIATING",
  IN_PROGRESS = "IN_PROGRESS",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export default function Recover() {
  const [recoveryState, setRecoveryState] = useState<RecoveryState | null>(null);
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setRecoveryState(RecoveryState.INITIATING);

    // Aquí simula la lógica para enviar el correo de recuperación a la BD
    try {
      // Simulación de registro exitoso después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRecoveryState(RecoveryState.SUCCESS);
      console.log("Recovery email sent successfully to:", data.email);

      Alert.fire({
        title: "Reset Password",
        text: "A restoration email has been sent.",
        icon: "success"
      });

      
      router.push('/login');

    } catch (error) {
      // Simulación de error de registro después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRecoveryState(RecoveryState.ERROR);
      console.error("Error sending recovery email:", error);

      Alert.fire({
        title: "Reset Password",
        text: "Something has gone wrong.",
        icon: "error"
      });
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 left-0 p-4 z-10">
        <Link href="/">
          <div className="flex items-center gap-[10px] transition duration-200 ease-in-out hover:scale-110">
            <img className="w-8" src="/logo.svg" alt="logo" />
            <span className={`${poppins.className} text-text font-medium text-sm md:text-base`}>
              KeyCzar
            </span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <h1 className={`${poppins.className} text-3xl font-bold text-center mb-3`}>Reset Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="w-full mb-6">
            <Input
              isRequired
              type="email"
              label="E-mail"
              placeholder="Enter your e-mail"
              className={`${poppins.className} w-full`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="w-full mb-3">
            <Button
              type="submit"
              color="primary"
              className={`${poppins.className} w-full text-white bg-black py-3 transition duration-200 ease-in-out rounded-lg bg-text hover:scale-110 `}
              disabled={recoveryState === RecoveryState.INITIATING}
            >
              {recoveryState === RecoveryState.INITIATING ? "Initiating..." : "Recover"}
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <label className="text-xs" htmlFor="showPassword">Do you remember the password</label>
            <Link className="ml-1 text-blue-500 text-xs" href="/login">
              Log in
            </Link>
          </div>
          {recoveryState === RecoveryState.SUCCESS && (
            <p className="text-green-500 text-xs mt-1 text-left">Recovery email sent successfully!</p>
          )}

          {recoveryState === RecoveryState.ERROR && (
            <p className="text-red-500 text-xs mt-1 text-left">Error sending recovery email. Please try again.</p>
          )}
        </form>
        </div>
      </div>
    </div>
  );
};