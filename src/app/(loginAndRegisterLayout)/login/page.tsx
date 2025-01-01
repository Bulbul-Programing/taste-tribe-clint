"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import TTInput from "@/src/components/Form/TTInput";
import TTForm from "@/src/components/Form/TTForm";
import { useAppDispatch } from "@/src/redux/hooks";
import {
  useLoginUserMutation,
  useResetPasswordMailSendMutation,
} from "@/src/redux/Users/userManagementApi";
import { setUser } from "@/src/redux/features/Auth/authSlice";
import Modal from "@/src/components/modal";

const Login = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect")
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetPasswordSendMial] = useResetPasswordMailSendMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const res = (await loginUser(data)) as any;

      if (res.data && res.data.success) {
        toast.success("Logged in successfully");
        setLoading(false);
        const token = {
          accessToken: res?.data?.accessToken,
          refreshToken: res?.data?.refreshToken,
        };

        dispatch(setUser(token));
        router.push("/");
      }
      if (res.error) {
        toast.error(res.error.data.message);
        setLoading(false);
      }
    } catch (err: any) {
      console.error("error", err);
      toast.error(err?.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleResetPassword: SubmitHandler<FieldValues> = async (data) => {
    setModalLoading(true);
    try {
      const res = await resetPasswordSendMial(data.email);

      if (res?.data?.success) {
        setModalLoading(false);
        router.push("/");
        toast.success("Reset Password has been sent to your email");
        setIsModalOpen(false);
      }
    } catch (err: any) {
      console.error("error", err);
      setModalLoading(false);
      setIsModalOpen(false);
      toast.error(err?.message || "An error occurred");
    }
  };

  return (
    <div className="relative">
      <div className="flex bg-slate-100 justify-center items-center h-screen">
        <div className="w-10/12  md:w-6/12 lg:w-4/12 bg-white px-4 py-6 rounded-lg">
          <h1 className="text-center text-lg font-semibold">Login</h1>
          <div>
            <TTForm onSubmit={handleSubmit}>
              <TTInput label="email" name="email" type="email" />
              <TTInput label="Password" name="password" type="password" />
              <Button
                className="w-full bg-[#17D893] font-bold text flex-1"
                isLoading={loading}
                type="submit"
              >
                Login
              </Button>
            </TTForm>
          </div>
          <div>
            <p className="text-sm text-gray-600 mt-4">
              Forgot your password?{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => setIsModalOpen(true)}
              >
                Reset Password
              </button>
            </p>
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
      <div>
        {isModalOpen && (
          <Modal width={400} onClose={() => setIsModalOpen(false)}>
            <h1 className="text-lg font-medium">
              Enter your email for reset password
            </h1>
            <TTForm onSubmit={handleResetPassword}>
              <TTInput label="email" name="email" type="email" />
              <Button
                className="w-full bg-[#17D893] font-bold text flex-1"
                isLoading={modalLoading}
                type="submit"
              >
                Reset Password
              </Button>
            </TTForm>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Login;
