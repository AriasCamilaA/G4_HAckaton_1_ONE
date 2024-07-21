"use client";

import React, { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { poppins } from "../../app/fonts";
import { useRouter } from 'next/navigation';
import { Alert } from "../../utilities";

type FormValues = {
  newPassword: string;
  confirmNewPassword: string;
};

enum PasswordState {
  NOT_REGISTERED = "NOT_REGISTERED",
  REGISTERING = "REGISTERING",
  REGISTERED = "REGISTERED",
  REGISTRATION_ERROR = "REGISTRATION_ERROR",
}

export default function Password() {
  const [passwordState, setPasswordState] = useState<PasswordState>(PasswordState.NOT_REGISTERED);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const form = useForm<FormValues>({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setPasswordState(PasswordState.REGISTERING);

    // Aqui simula el registro de contraseña (la llamada a la BD)
    try {
      // Simulación de registro exitoso después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordState(PasswordState.REGISTERED);
      console.log("Password registered successfully with:", data.newPassword, data.confirmNewPassword);

      router.push('/password');

      Alert.fire({
        title: "Create account",
        text: "Successful registration",
        icon: "success"
      });

    } catch (error: unknown) {
      // Simulación de error de registro después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordState(PasswordState.REGISTRATION_ERROR);
      if (error instanceof Error) {
        console.error("Registration failed:", error.message);
        Alert.fire({
          title: "Create account",
          text: "Something has gone wrong.",
          icon: "error"
        });
      } else {
        console.error("Registration failed:", error);
        Alert.fire({
          title: "Create account",
          text: "Something has gone wrong.",
          icon: "error"
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <h1 className={`${poppins.className} text-3xl font-bold text-center mb-3`}>Password</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="w-full mb-4">
              <Input
                isRequired
                type={showPassword ? "text" : "password"}
                label="New password"
                placeholder="Enter your password"
                className={`${poppins.className} w-full`}
                autoComplete="new-password"
                disabled={passwordState === PasswordState.REGISTERING}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/,
                    message: "Password must include at least one uppercase letter, one number, and one special character (!@#$%^&*)",
                  },
                })}
              />
              {errors.newPassword && (
                <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="w-full mb-3">
              <Input
                isRequired
                type={showPassword ? "text" : "password"}
                label="Confirm new password"
                placeholder="Enter your confirm password"
                className={`${poppins.className} w-full`}
                autoComplete="new-password"
                disabled={passwordState === PasswordState.REGISTERING}
                {...register("confirmNewPassword", {
                  required: "Please confirm your password",
                  validate: value =>
                    value === watch('newPassword') || "Passwords do not match",
                })}
              />
              {errors.confirmNewPassword && (
                <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>
            <div className="flex items-center pl-3  mb-6 pr-4">
              <input
                type="checkbox"
                id="showPassword"
                className="mr-2"
                onChange={togglePasswordVisibility}
              />
              <label className="text-xs" htmlFor="showPassword">Show passwords</label>
            </div>
            <Button
              type="submit"
              color="primary"
              className={`${poppins.className} w-full text-white bg-black py-3 transition duration-200 ease-in-out rounded-lg bg-text hover:scale-110 `}
              disabled={passwordState === PasswordState.REGISTERING}
            >
              {passwordState === PasswordState.REGISTERING ? "Registering..." : "Submit"}
            </Button>

            {passwordState === PasswordState.REGISTRATION_ERROR && (
              <p className="text-red-500 text-xs mt-1 text-left">Error registering password. Please try again.</p>
            )}

            {passwordState === PasswordState.REGISTERED && (
              <p className="text-green-500 text-xs mt-1 text-left">Password registered successfully!</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}