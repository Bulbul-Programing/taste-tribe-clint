"use client";
import { Input } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

const TTInput = ({
  variant = "bordered",
  size = "sm",
  name,
  type,
  label,
  disabled = false,
  required = true,
  defaultValue
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      className="my-3"
      disabled={disabled}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      name={name}
      required={required}
      size={size}
      type={type}
      variant={variant}
      defaultValue={defaultValue}
    />
  );
};

export default TTInput;
