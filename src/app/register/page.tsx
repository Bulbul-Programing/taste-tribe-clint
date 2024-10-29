"use client";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import TTInput from "@/src/components/Form/TTInput";

const Register = () => {
  const [profilePreview, setProfilePreview] = useState<string[] | []>([]);

  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      setProfilePreview([]);
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfilePreview((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex bg-slate-100 justify-center items-center h-screen">
      <div className="w-4/12 bg-white px-4 py-6 rounded-lg">
        <h1 className="text-center text-lg font-semibold">Register</h1>
        <div>
          {profilePreview.length > 0 && (
            <div>
              {profilePreview.map((profile) => (
                <Image
                  key={profile}
                  alt="profileImage"
                  className="border rounded-full block mt-2 mx-auto"
                  height={80}
                  src={profile}
                  width={80}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TTInput label="Name" name="name" type="text" />
              <TTInput label="Email" name="email" type="email" />
              <TTInput label="Password" name="password" type="password" />
              <TTInput label="Phone Number" name="phone" type="number" />
              <div className="my-4">
                <label
                  className="py-3 text-sm px-2 border bg-slate-200 rounded-md hover:cursor-pointer hover:bg-slate-300 ease-out font-medium text-center block w-full"
                  htmlFor="profilePhoto"
                >
                  Chose Profile image
                </label>
                <input
                  className="hidden"
                  id="profilePhoto"
                  name="profileImage"
                  type="file"
                  onChange={handlePhoto}
                />
              </div>
              <Button
                className="w-full bg-[#17D893] font-bold text flex-1"
                type="submit"
              >
                register
              </Button>
            </form>
          </FormProvider>
        </div>
        <div className="flex items-center mt-4">
          <div className="border-b border-gray-400 w-full" />
          <p className="px-2 text-sm font-medium">OR</p>
          <div className="border-b border-gray-400 w-full" />
        </div>
        <p className="text-slate-600 mt-3">
          Have an account ?{" "}
          <Link className="text-blue-500 underline " href="/login">
            login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
