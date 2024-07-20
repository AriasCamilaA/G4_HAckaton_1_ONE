"use client";

import React, { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { poppins } from "../../app/fonts";
import { useRouter } from 'next/navigation';
import { Alert } from "../../utilities";

type FormValues = {
  email: string;
  password: string;
};

enum AuthState {
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  AUTHENTICATED = "AUTHENTICATED",
  AUTHENTICATING = "AUTHENTICATING",
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
}

export default function LoginForm() {
  const [authState, setAuthState] = useState<AuthState>(AuthState.NOT_AUTHENTICATED);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setAuthState(AuthState.AUTHENTICATING);

    // Aquí simula la lógica de autenticación (la llamada a la BD)
    try {
      // Simulación de autenticación exitosa después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAuthState(AuthState.AUTHENTICATED);
      console.log("Login successful with:", data.email, data.password);

      router.push('/Dashboard');
      
    } catch (error: unknown) {
      // Simulación de error de autenticación después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAuthState(AuthState.AUTHENTICATION_ERROR);
      if (error instanceof Error) {
        console.error("Authentication failed:", error.message);
        Alert.fire({
          title: "Log in",
          text: "Incorrect username and/or password",
          icon: "error"
        });
      } else {
        console.error("Authentication failed:", error);
        Alert.fire({
          title: "Log in",
          text: "Incorrect username and/or password",
          icon: "error"
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-start p-4 absolute-position">
        <Link href="/">
          <div className="flex items-center gap-[10px] transition duration-200 ease-in-out hover:scale-110">
            <img className="w-8" src="/logo.svg" alt="logo" />
            <span className={`${poppins.className} text-text font-medium text-sm md:text-base`}>
              KeyCzar
            </span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col gap-4 w-full max-w-md">
          <h1 className={`${poppins.className} text-3xl font-bold text-center mb-3`}>Log in</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="w-full mb-4">
              <Input
                isRequired
                type="email"
                label="E-mail"
                placeholder="Enter your E-mail"
                className={`${poppins.className} w-full`}
                autoComplete="email"
                disabled={authState === AuthState.AUTHENTICATING}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Input
                isRequired
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                className={`${poppins.className} w-full`}
                autoComplete="new-password"
                disabled={authState === AuthState.AUTHENTICATING}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="w-full flex justify-between items-center mt-3 mb-6 pr-4">
              <div className="flex items-center pl-3">
                <input
                  type="checkbox"
                  id="showPassword"
                  className="mr-2"
                  onChange={togglePasswordVisibility}
                />
                <label className="text-xs" htmlFor="showPassword">Show password</label>
              </div>
              <Link className="text-black text-xs" href="/recover">
                Forgot password?
              </Link>
            </div>
            <div className="w-full flex justify-center mb-4">
              <Button
                type="submit"
                color="primary"
                className={`${poppins.className} w-full text-white bg-black py-3 transition duration-200 ease-in-out rounded-lg bg-text hover:scale-110 `}
                disabled={authState === AuthState.AUTHENTICATING}
              >
                {authState === AuthState.AUTHENTICATING ? "Signing in..." : "Sign in"}
              </Button>
            </div>
            
            <div className="flex justify-center items-center">
              <label className="text-xs" htmlFor="showPassword">No account?</label>
              <Link className="ml-1 text-blue-500 text-xs" href="/registration">
                Create one
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  


}