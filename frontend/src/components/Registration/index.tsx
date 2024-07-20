"use client";

import React, { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { poppins } from "../../app/fonts";
import { useRouter } from 'next/navigation';
import { Alert } from "../../utilities";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
};

enum RegistrationState {
  REGISTERING = "REGISTERING",
  REGISTERED = "REGISTERED",
  REGISTRATION_ERROR = "REGISTRATION_ERROR",
}

export default function RegistrationForm() {
  const [registrationState, setRegistrationState] = useState<RegistrationState | null>(null);
  const form = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
    },
  });

  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const router = useRouter();

  const handleSignInClick = () => {
    router.push('/login');
  };

  const onSubmit = async (data: FormValues) => {
    setRegistrationState(RegistrationState.REGISTERING);

    // Aquí simula la lógica de autenticación (la llamada a la BD)
    try {
      // Simulación de registro exitoso después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRegistrationState(RegistrationState.REGISTERED);

      console.log("Login successful with:", data.firstName, data.lastName, data.email, data.confirmEmail);

      router.push('/password');
      
    } catch (error) {
      // Simulación de error de registro después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRegistrationState(RegistrationState.REGISTRATION_ERROR);
      console.error("Registration error:", error);
      Alert.fire({
        title: "Create account",
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
          <h1 className={`${poppins.className} text-3xl font-bold text-center mb-3`}>Create account</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="w-full mb-4">
              <Input
                isRequired
                type="text"
                label="First Name"
                placeholder="Enter your first name"
                className={`${poppins.className} w-full`}
                {...register("firstName", {
                  required: "First name is required",
                })}
                disabled={registrationState === RegistrationState.REGISTERING}
              />
              {errors.firstName && (
                <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="w-full mb-4">
              <Input
                isRequired
                type="text"
                label="Last Name"
                placeholder="Enter your last name"
                className={`${poppins.className} w-full`}
                {...register("lastName", {
                  required: "Last name is required",
                })}
                disabled={registrationState === RegistrationState.REGISTERING}
              />
              {errors.lastName && (
                <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="w-full mb-4">
              <Input
                isRequired
                type="email"
                label="E-mail"
                placeholder="Enter your e-mail"
                className={`${poppins.className} w-full`}
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
                disabled={registrationState === RegistrationState.REGISTERING}
              />
              {errors.email && (
                <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full mb-9">
              <Input
                isRequired
                type="email"
                label="Confirm e-mail"
                placeholder="Enter your confirm e-mail"
                className={`${poppins.className} w-full`}
                autoComplete="email"
                {...register("confirmEmail", {
                  required: "Please confirm your email",
                  validate: value =>
                    value === watch('email') || "Emails do not match",
                })}
                disabled={registrationState === RegistrationState.REGISTERING}
              />
              {errors.confirmEmail && (
                <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              <Button
                type="submit"
                color="primary"
                className={`${poppins.className} w-1/2 mb-4 text-white bg-black py-3 transition duration-200 ease-in-out rounded-lg bg-text hover:scale-110 `}
                disabled={registrationState === RegistrationState.REGISTERING}
              >
                {registrationState === RegistrationState.REGISTERING ? "Registering..." : "Sign Up"}
              </Button>
              <Button
                type="reset"
                color="primary"
                className={`${poppins.className} w-1/2 text-text  mb-4 py-3 transition duration-200 ease-in-out border rounded-lg hover:scale-110 bg-background-color border-text`}
                disabled={registrationState === RegistrationState.REGISTERING}
                onClick={handleSignInClick}
              >
                Sign in
              </Button>
            </div>
  
            {registrationState === RegistrationState.REGISTRATION_ERROR && (
              <p className="text-red-500 text-xs mt-1 text-left">Error registering user. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}