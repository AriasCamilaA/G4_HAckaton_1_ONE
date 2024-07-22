'use client';

import React, { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { poppins } from "../../app/fonts";
import { useRouter } from "next/navigation";
import { Alert } from "../../utilities";
import useRegister from '../../logic/hooks/auth/useRegister';

type FormValues = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

enum RegistrationState {
  REGISTERING = "REGISTERING",
  REGISTERED = "REGISTERED",
  REGISTRATION_ERROR = "REGISTRATION_ERROR",
}

export default function Registration() {
  const { registerUser, loading, error } = useRegister();
  const [registrationState, setRegistrationState] = useState<RegistrationState | null>(null);
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: ""
    },
  });

  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/login");
  };

  const onSubmit = async (data: FormValues) => {
    setRegistrationState(RegistrationState.REGISTERING);

    try {
      const userData = {
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        roles: ["admin"]
      };

      await registerUser(userData).then(() => {
        console.log("User registered successfully");
        // setRegistrationState(RegistrationState.REGISTERED);
  
        Alert.fire({
          title: "Create account",
          text: "Registration successful",
          icon: "success"
        });
  
        router.push('/login');
      }).catch((error) => {
        console.error("Error registering user:", error);
        throw error;
      });
      
    } catch (error) {
      setRegistrationState(RegistrationState.REGISTRATION_ERROR);
      console.error("Registration error:", error);
      Alert.fire({
        title: "Create account",
        text: error.message || "Something has gone wrong.",
        icon: "error"
      });
    }
  };

  return (
    <div className="relative min-h-screen px-5 lg:px-0 mx-auto lg:w-[60rem]">
      <div className="absolute top-0 left-0 z-10 px-5 pt-4">
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col w-full max-w-md gap-4">
          <h1
            className={`${poppins.className} text-3xl font-bold text-center mb-3`}
          >
            Create account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="w-full mb-4">
              <Input
                isRequired
                type="text"
                label="Username"
                placeholder="Enter your username"
                className={`${poppins.className} w-full`}
                {...register("username", {
                  required: "Username is required",
                })}
                disabled={loading}
              />
              {errors.username && (
                <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                  {errors.username.message}
                </p>
              )}
            </div>
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
                disabled={loading}
              />
              {errors.firstName && (
                <p
                  className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}
                >
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
                disabled={loading}
              />
              {errors.lastName && (
                <p
                  className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}
                >
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
                disabled={loading}
              />
              {errors.email && (
                <p
                  className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}
                >
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full mb-4">
              <Input
                isRequired
                type="email"
                label="Confirm e-mail"
                placeholder="Enter your confirm e-mail"
                className={`${poppins.className} w-full`}
                autoComplete="email"
                {...register("confirmEmail", {
                  required: "Please confirm your email",
                  validate: (value) =>
                    value === watch("email") || "Emails do not match",
                })}
                disabled={loading}
              />
              {errors.confirmEmail && (
                <p
                  className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}
                >
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>
            <div className="w-full mb-4">
              <Input
                isRequired
                type="password"
                label="Password"
                placeholder="Enter your password"
                className={`${poppins.className} w-full`}
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                })}
                disabled={loading}
              />
              {errors.password && (
                <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="w-full mb-9">
              <Input
                isRequired
                type="password"
                label="Confirm Password"
                placeholder="Enter your confirm password"
                className={`${poppins.className} w-full`}
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value =>
                    value === watch('password') || "Passwords do not match",
                })}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              <Button
                type="submit"
                color="primary"
                className={`${poppins.className} w-1/2 mb-4 text-white bg-black py-3 transition duration-200 ease-in-out rounded-lg bg-text hover:scale-110 `}
                disabled={loading}
              >
                {loading ? "Registering..." : "Sign Up"}
              </Button>
              <Button
                type="reset"
                color="primary"
                className={`${poppins.className} w-1/2 text-text  mb-4 py-3 transition duration-200 ease-in-out border rounded-lg hover:scale-110 bg-background-color border-text`}
                disabled={loading}
                onClick={handleSignInClick}
              >
                Sign in
              </Button>
            </div>

            {registrationState === RegistrationState.REGISTRATION_ERROR && (
              <p className="mt-1 text-xs text-left text-red-500">
                Error registering user. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

