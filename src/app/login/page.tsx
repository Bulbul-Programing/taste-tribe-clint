"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import TTInput from "@/src/components/Form/TTInput";
import TTForm from "@/src/components/Form/TTForm";
import { useAppDispatch } from "@/src/redux/hooks";
import { useLoginUserMutation } from "@/src/redux/Users/userManagementApi";
import { setUser } from "@/src/redux/features/Auth/authSlice";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loginUser] = useLoginUserMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = (await loginUser(data)) as any
      console.log(res);
      if (res.data && res.data.success) {
        toast.success("Logged in successfully")
        const token = {
          accessToken: res?.data?.accessToken,
          refreshToken: res?.data?.refreshToken
        }
        dispatch(setUser(token))
        router.push('/')
      }
      if(res.error) {
        toast.error(res.error.data.message)
      }
    }
    catch (err : any) {
      console.error('error', err)
      toast.error(err?.message || 'An error occurred')
    }
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

export default Login;
