"use client";

import React, { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { poppins } from "../../app/fonts";
import { useRouter } from "next/navigation";
import { Alert } from "../../utilities";
import useAuth from "../../logic/hooks/auth/useAuth";

type FormValues = {
  username: string;
  password: string;
};

enum AuthState {
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  AUTHENTICATED = "AUTHENTICATED",
  AUTHENTICATING = "AUTHENTICATING",
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
}

export default function Login() {
  const { login, loading, error } = useAuth();
  const [authState, setAuthState] = useState<AuthState>(
    AuthState.NOT_AUTHENTICATED
  );
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setAuthState(AuthState.AUTHENTICATING);

    try {
      await login(data.username, data.password)
        .then((res) => {
          setAuthState(AuthState.AUTHENTICATED);
          Alert.fire({
            title: "Log in",
            text: "Login successful",
            icon: "success",
          });
          router.push("/Dashboard");
        })
        .catch((err) => {
          console.log(err);
          setAuthState(AuthState.AUTHENTICATION_ERROR);
          Alert.fire({
            title: "Log in",
            text: "Incorrect username and/or password",
            icon: "error",
          });
        });
    } catch (err) {
      setAuthState(AuthState.AUTHENTICATION_ERROR);
      Alert.fire({
        title: "Log in",
        text: "Incorrect username and/or password",
        icon: "error",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen px-5 lg:px-0 mx-auto lg:w-[60rem]">
      <div className="flex justify-start pt-4 absolute-position">
        <Link href="/">
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
      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col w-full max-w-md gap-4">
          <h1
            className={`${poppins.className} text-3xl font-bold text-center mb-3`}
          >
            Log in
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="w-full mb-4">
              <Input
                isRequired
                type="text"
                label="Username"
                placeholder="Enter your Username"
                className={`${poppins.className} w-full`}
                autoComplete="username"
                disabled={loading}
                {...register("username", {
                  required: "username is required",
                  // pattern: {
                  //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  //   message: "Enter a valid username address",
                  // },
                })}
              />
              {errors.username && (
                <p
                  className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}
                >
                  {errors.username.message}
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
                disabled={loading}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p
                  className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}
                >
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between w-full pr-4 mt-3 mb-6">
              <div className="flex items-center pl-3">
                <input
                  type="checkbox"
                  id="showPassword"
                  className="mr-2"
                  onChange={togglePasswordVisibility}
                />
                <label className="text-xs" htmlFor="showPassword">
                  Show password
                </label>
              </div>
              <Link className="text-xs text-black" href="/recover">
                Forgot password?
              </Link>
            </div>
            <div className="flex justify-center w-full mb-4">
              <Button
                type="submit"
                color="primary"
                className={`${poppins.className} w-full text-white py-3 transition duration-200 ease-in-out rounded-lg bg-text hover:scale-110 `}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <label className="text-xs" htmlFor="showPassword">
                No account?
              </label>
              <Link className="ml-1 text-xs text-blue-500" href="/registration">
                Create one
              </Link>
            </div>
          </form>
          {error && (
            <p className="mt-1 text-xs text-left text-red-500">
              Error logging in. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
