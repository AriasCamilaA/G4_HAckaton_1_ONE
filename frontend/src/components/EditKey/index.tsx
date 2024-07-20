"use client";

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { poppins } from "../../app/fonts";
import { Alert } from "../../utilities";

type FormValues = {
  keyName: string;
  keyValue: string;
  expirationDate: string;
  description: string;
};

enum KeyState {
  NOT_LOADED = "NOT_LOADED",
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR",
}

export default function App() {
  const [keyState, setKeyState] = useState<KeyState>(KeyState.NOT_LOADED);
  const form = useForm<FormValues>({
    defaultValues: {
      keyName: "",
      keyValue: "",
      expirationDate: "",
      description: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    setKeyState(KeyState.LOADING);

    // Aquí simula la lógica de autenticación (la llamada a la BD)
    try {
      // Simulación de carga de llave exitosa después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setKeyState(KeyState.LOADED);
      console.log("Key loaded successfully:", data.keyName, data.keyValue, data.expirationDate, data.description);

      Alert.fire({
        title: "Add key",
        text: "Successful registration",
        icon: "success"
      });

    } catch (error) {
      // Simulación de error al cargar la llave después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setKeyState(KeyState.ERROR);
      console.error("Error loading key:", error);

      Alert.fire({
        title: "Add key",
        text: "Something has gone wrong.",
        icon: "error"
      });
    }
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="mt-4 mb-4">
        <h1 className={`${poppins.className} text-3xl font-bold text-center mb-3`}>Edit key</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="w-full mb-4">
            <Input
              isRequired
              type="text"
              label="Key name"
              placeholder="Enter your key name"
              className={`${poppins.className} w-full`}
              {...register("keyName", {
                required: "Key name is required",
              })}
            />
            {errors.keyName && (
              <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                {errors.keyName.message}
              </p>
            )}
          </div>
          <div className="w-full mb-4">
            <Input
              isRequired
              type="text"
              label="Key value"
              placeholder="Enter your key value"
              className={`${poppins.className} w-full`}
              {...register("keyValue", {
                required: "Key value is required",
              })}
            />
            {errors.keyValue && (
              <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                {errors.keyValue.message}
              </p>
            )}
          </div>
          <div className="w-full mb-4">
            <Input
              isRequired
              type="date"
              label="Expiration date"
              placeholder="Enter your expiration date"
              className={`${poppins.className} w-full`}
              {...register("expirationDate", {
                required: "Expiration date is required",
                validate: {
                  futureDate: value => value >= currentDate || "Expiration date must be today or later",
                },
              })}
            />
            {errors.expirationDate && (
              <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                {errors.expirationDate.message}
              </p>
            )}
          </div>
          <div className="w-full mb-4">
            <Input
              isRequired
              type="text"
              label="Description"
              placeholder="Enter your description"
              className={`${poppins.className} w-full`}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
                {errors.description.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            color="primary"
            className={`${poppins.className} w-full text-white bg-black py-3 transition duration-200 ease-in-out rounded-lg bg-text hover:scale-110 `}
            disabled={keyState === KeyState.LOADING}
          >
            {keyState === KeyState.LOADING ? "Loading..." : "Save key"}
          </Button>

          {keyState === KeyState.LOADED && (
            <p className="text-green-500 text-xs mt-1 text-left">Key loaded successfully!</p>
          )}

          {keyState === KeyState.ERROR && (
            <p className="text-red-500 text-xs mt-1 text-left">Error loading key. Please try again.</p>
          )}
        </form>
      </div>
  );
};