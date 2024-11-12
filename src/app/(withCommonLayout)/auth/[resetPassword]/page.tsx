"use client";
import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useResetPasswordMutation } from "@/src/redux/Users/userManagementApi";
import Modal from "@/src/components/modal";
import TTInput from "@/src/components/Form/TTInput";
import TTForm from "@/src/components/Form/TTForm";
const ResetPassword = () => {
  const [submitResetCode, setSubmitResetCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({});
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();

  const searchParams = useSearchParams();
  const searchToken = searchParams.get("token");

  useEffect(() => {
    if (!searchToken) {
      return router.push("/");
    }
  }, [searchToken]);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const firstPasswords = data.password;
    const secondPasswords = data.retypePassword;

    if (firstPasswords !== secondPasswords) {
      return toast.error("Passwords do not match.");
    }
    const payloadData = {
      password: data.password,
      token: searchToken,
    };

    try {
      setLoading(true);
      const res = await resetPassword(payloadData);

      if (res?.data?.success) {
        setLoading(false);
        toast.success("Password has been reset successfully.");
        setSubmitResetCode(false);
        router.push("/login");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Error resetting password. Please try again.");
    }
  };

  return (
    <div>
      <Modal width={400} onClose={() => setSubmitResetCode(false)}>
        <h1 className="text-lg font-medium text-center mb-3">
          Reset Your password!
        </h1>
        <TTForm onSubmit={handleSubmit}>
          <TTInput label="New password" name="password" type="password" />
          <TTInput
            label="Retype Password"
            name="retypePassword"
            type="password"
          />
          <Button
            className="w-full bg-[#17D893] font-bold text flex-1"
            isLoading={loading}
            type="submit"
          >
            Reset password
          </Button>
        </TTForm>
      </Modal>
    </div>
  );
};

export default ResetPassword;
