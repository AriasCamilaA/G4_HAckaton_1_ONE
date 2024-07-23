"use client";

import React, { useState, useEffect } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { poppins } from "../../app/fonts";
import { Alert } from "../../utilities";
import { useAuth } from "../../contexts/AuthContext";
import useUpdateKey from "../../logic/hooks/keys/useUpdateKey";
import useModels from "../../logic/hooks/modelos/useModels";
import useServices from "../../logic/hooks/servicios/useServices";

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

export default function EditKey({ keyId, initialData, onSuccess }) {
  const [keyState, setKeyState] = useState<KeyState>(KeyState.NOT_LOADED);
  const { user } = useAuth();
  const { updateKey, loading, error } = useUpdateKey();
  const { models, loading: modelsLoading, error: modelsError } = useModels(user?.token);
  const { services, loading: servicesLoading, error: servicesError } = useServices(user?.token);

  const form = useForm<FormValues>({
    defaultValues: {
      keyName: initialData.keyName || "",
      keyValue: initialData.keyValue || "",
      expirationDate: initialData.expirationDate || "",
      serviceCategory: initialData.serviceCategory || "",
      keyModel: initialData.keyModel || "",
    },
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  useEffect(() => {
    if (initialData) {
      setValue("keyName", initialData.keyName || "");
      setValue("keyValue", initialData.keyValue || "");
      setValue("expirationDate", initialData.expirationDate || "");
      setValue("serviceCategory", initialData.serviceCategory || "");
      setValue("keyModel", initialData.keyModel || "");
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: FormValues) => {
    setKeyState(KeyState.LOADING);

    const selectedService = services.find(s => s.id === parseInt(data.serviceCategory || ""));
    const selectedModel = models.find(m => m.id === parseInt(data.keyModel || ""));

    const payload = {
      name: data.keyName,
      key: data.keyValue,
      expiresAt: new Date(data.expirationDate).toISOString(),
      service: selectedService ? { id: selectedService.id } : null,
      model: selectedModel ? { id: selectedModel.id } : null,
      createdAt: initialData.createdAt,
      user: initialData.user,
    };

    try {
      await updateKey(keyId, payload, user?.token);
      setKeyState(KeyState.LOADED);
      Alert.fire({
        title: "Edit key",
        text: "Successful update",
        icon: "success",
      });
      onSuccess();
    } catch (err) {
      setKeyState(KeyState.ERROR);
      Alert.fire({
        title: "Edit key",
        text: "Something has gone wrong.",
        icon: "error",
      });
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="mt-4 mb-4">
      <h1 className={`${poppins.className} text-3xl font-bold text-center mb-3`}>
        Edit key
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
                futureDate: (value) =>
                  new Date(value) >= new Date(currentDate) ||
                  "Expiration date must be today or later",
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
          <Select
            label="Service Category"
            placeholder={initialData.nameService}
            className={`${poppins.className} w-full`}
            {...register("serviceCategory")}
            isLoading={servicesLoading}
            isDisabled={servicesLoading || servicesError}
            value={initialData.serviceCategory}
          >
            {services.map((service) => (
              <SelectItem key={service.id} value={service.id.toString()}>
                {service.name}
              </SelectItem>
            ))}
          </Select>
          {errors.serviceCategory && (
            <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
              {errors.serviceCategory.message}
            </p>
          )}
        </div>
        <div className="w-full mb-4">
          <Select
            label="Key Model"
            placeholder={initialData.nameModel}
            className={`${poppins.className} w-full`}
            {...register("keyModel")}
            isLoading={modelsLoading}
            isDisabled={modelsLoading || modelsError}
            value={initialData.keyModel || ""}
          >
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id.toString()}>
                {model.name}
              </SelectItem>
            ))}
          </Select>
          {errors.keyModel && (
            <p className={`${poppins.className} ml-3 text-red-500 text-xs mt-1 text-left`}>
              {errors.keyModel.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          color="primary"
          className={`${poppins.className} w-full text-white py-3 transition duration-200 ease-in-out rounded-lg bg-text hover:scale-110 `}
          disabled={keyState === KeyState.LOADING}
        >
          {keyState === KeyState.LOADING ? "Loading..." : "Save key"}
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
