"use client";

import React, { useEffect, useState } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { poppins } from "../../app/fonts";
import { Alert } from "../../utilities";
import useCreateKey from "../../logic/hooks/keys/useCreateKey";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

type FormValues = {
  keyName: string;
  keyValue: string;
  expirationDate: string;
  serviceCategory: string;
  keyModel: string;
};

enum KeyState {
  NOT_LOADED = "NOT_LOADED",
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR",
}

const serviceCategories = [
  "Cohere",
  "Ngrok",
  "OpenAI",
  "IBM Watson",
  "Google Cloud AI",
  "Microsoft Azure Cognitive Services",
  "Hugging Face",
  "DeepAI",
  "Clarifai",
  "Algolia",
  "Twilio",
  "Amazon Rekognition",
  "Speechmatics",
  "OpenCV AI Kit (OAK)",
  "Vize.ai",
  "TextRazor",
  "MonkeyLearn",
  "AssemblyAI",
];

const keyModels = [
  "LLM Models",
  "Image Generation Models",
  "Image Processing Models",
  "Audio and Voice Analysis Models",
  "Video Processing Models",
  "Text Analysis Models",
  "Facial Analysis and Recognition Models",
  "Image Classification Models",
  "Sentiment Analysis Models",
  "Natural Language Processing (NLP) Models",
  "Document Analysis Models",
  "Image Classification Models",
  "Document Analysis Models",
  "Natural Language Processing (NLP) Models",
];

export default function App() {
  const [keyState, setKeyState] = useState<KeyState>(KeyState.NOT_LOADED);
  const { createKey, loading, error } = useCreateKey();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const form = useForm<FormValues>({
    defaultValues: {
      keyName: "",
      keyValue: "",
      expirationDate: "",
      serviceCategory: "",
      keyModel: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    setKeyState(KeyState.LOADING);
    createKey(
      {
        name: data.keyName,
        key: data.keyValue,
        expiresAt: new Date(data.expirationDate).toISOString(),
        createdAt: new Date().toISOString(),
        user: { id: 1 },
        service: { id: serviceCategories.indexOf(data.serviceCategory) + 1 },
        model: data.keyModel,
      },
      user?.token
    )
      .then((res) => {
        console.log(res);
        setKeyState(KeyState.LOADED);
        Alert.fire({
          title: "Add key",
          text: "Successful registration",
          icon: "success",
        });
        console.log("Key loaded successfully:", data);
      })
      .catch((err) => {
        console.log(err);
        setKeyState(KeyState.ERROR);
        Alert.fire({
          title: "Add key",
          text: "Something has gone wrong.",
          icon: "error",
        });
      });
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="mt-4 mb-4">
      <h1
        className={`${poppins.className} text-3xl font-bold text-center mb-3`}
      >
        Register key
      </h1>
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
            <p
              className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}
            >
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
            <p
              className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}
            >
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
                futureDate: (value) =>
                  new Date(value) >= new Date(currentDate) ||
                  "Expiration date must be today or later",
              },
            })}
          />
          {errors.expirationDate && (
            <p
              className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}
            >
              {errors.expirationDate.message}
            </p>
          )}
        </div>
        <div className="w-full mb-4">
          <Select
            isRequired
            label="Service Category"
            placeholder="Select service category"
            className={`${poppins.className} w-full`}
            {...register("serviceCategory", {
              required: "Service category is required",
            })}
          >
            {serviceCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
          {errors.serviceCategory && (
            <p
              className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}
            >
              {errors.serviceCategory.message}
            </p>
          )}
        </div>
        <div className="w-full mb-4">
          <Select
            isRequired
            label="Key Model"
            placeholder="Select key model"
            className={`${poppins.className} w-full`}
            {...register("keyModel", {
              required: "Key model is required",
            })}
          >
            {keyModels.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </Select>
          {errors.keyModel && (
            <p
              className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}
            >
              {errors.keyModel.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          color="primary"
          className={`${poppins.className} w-full text-white py-3 transition duration-200 ease-in-out rounded-lg bg-text hover:scale-110 `}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load key"}
        </Button>

        {keyState === KeyState.LOADED && (
          <p className="mt-1 text-xs text-left text-green-500">
            Key loaded successfully!
          </p>
        )}

        {keyState === KeyState.ERROR && (
          <p className="mt-1 text-xs text-left text-red-500">
            Error loading key. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
