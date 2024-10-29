"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

import TTInput from "@/src/components/Form/TTInput";
import TTForm from "@/src/components/Form/TTForm";

const page = () => {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex bg-slate-100 justify-center items-center h-screen">
      <div className="w-4/12 bg-white px-4 py-6 rounded-lg">
        <h1 className="text-center text-lg font-semibold">Login</h1>
        <div>
          <TTForm onSubmit={handleSubmit}>
            <TTInput label="email" name="email" type="email" />
            <TTInput label="Password" name="password" type="password" />
            <Button
              className="w-full bg-[#17D893] font-bold text flex-1"
              type="submit"
            >
              Login
            </Button>
          </TTForm>
        </div>
        <div className="flex items-center mt-4">
          <div className="border-b border-gray-400 w-full" />
          <p className="px-2 text-sm font-medium">OR</p>
          <div className="border-b border-gray-400 w-full" />
        </div>
        <p className="text-slate-600 mt-3">
          Don&apos;t have an account ?{" "}
          <Link className="text-blue-500 underline " href="/register">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
