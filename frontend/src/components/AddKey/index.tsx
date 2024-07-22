'use client';

import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { poppins } from "../../app/fonts";
import { Alert } from "../../utilities";
import useCreateKey from '../../logic/hooks/keys/useCreateKey';
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";


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
  const { createKey, loading, error } = useCreateKey();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  
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
    try {
      await createKey({
        name: data.keyName,
        key: data.keyValue,
        expiresAt: new Date(data.expirationDate).toISOString(),
        createdAt: new Date().toISOString(),
        user: {
          id: 1
        },
        service: {
          id: 1
        }
        // descripcion: data.description,
      }, user?.token).then((res) => {
        console.log(res);
        setKeyState(KeyState.LOADED);
        Alert.fire({
          title: "Add key",
          text: "Successdssasdsful registration",
          icon: "success"
        });
        setKeyState(KeyState.LOADED);
        console.log("Key loaded successfully:", data.keyName, data.keyValue, data.expirationDate, data.description);
      }).catch((err) => {
        console.log(err);
        setKeyState(KeyState.ERROR);
        Alert.fire({
          title: "Add key",
          text: "Something has gone wrong.",
          icon: "error"
        });
      });
    } catch (error) {
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
      <h1 className={`${poppins.className} text-3xl font-bold text-center mb-3`}>Register key</h1>
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
          disabled={loading}
        >
          {loading ? "Loading..." : "Load key"}
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
