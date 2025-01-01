"use client";
import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { useUpdateUserStatusMutation } from "@/src/redux/Users/userManagementApi";

const Membership = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [checkout] = useUpdateUserStatusMutation();
  const router = useRouter();
  const handleCheckout = async (payableAmount: number) => {
    try {
      const checkoutParams = {
        payableAmount,
        redirectUrl: redirect,
      };
      const res = await checkout(checkoutParams);

      if (res?.data?.url) {
        router.push(res.data.url);
      }
      if (res.data.userStatus === false) {
        toast.success("You are the Basic member.");
        router.push("/user/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while checking out");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-10">
        Upgrade your plan
      </h1>
      <div className="flex justify-center gap-x-7">
        <div className="border border-gray-300 rounded-lg shadow-lg w-[300px] p-6 bg-white hover:shadow-2xl transition duration-300">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Basic
          </h1>
          <p className="text-center bg-blue-500 w-1/3 mx-auto text-white text-3xl font-bold py-2 rounded-md">
            $ 0
          </p>
          <ul className="text-center mt-6 space-y-2 text-lg text-gray-700">
            <li className="flex items-center justify-center gap-2">
              <span>✔️</span> Access to Free Recipes
            </li>
            <li className="flex items-center justify-center gap-2">
              <span>✔️</span> Ingredient Checklist
            </li>
            <li className="flex items-center justify-center gap-2">
              <span>✔️</span> Create Recipe
            </li>
            <li className="flex items-center justify-center gap-2">
              <span>✔️</span> Comment on Recipes
            </li>
            <li className="flex items-center justify-center gap-2">
              <span>✔️</span> Basic User Profile
            </li>
          </ul>
          <Button
            className="mt-6 bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300 mx-auto block"
            onClick={() => handleCheckout(0)}
          >
            Get Started
          </Button>
        </div>
        <div className="border border-[#1beea2] rounded-lg shadow-lg w-[300px] p-6 bg-white hover:shadow-2xl transition duration-300">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Premium
          </h1>
          <p className="text-center bg-[#1beea2] w-2/3 px-3 mx-auto  text-3xl font-bold py-2 rounded-md">
            $ 19.99
          </p>
          <ul className="text-center mt-6 space-y-2 text-lg text-gray-700">
            <li className="flex items-center justify-center gap-2">
              <span>✔️</span> Exclusive Recipes
            </li>
            <li className="flex items-center justify-center gap-2">
              <span>✔️</span> Recipe Organization
            </li>
            <li className="flex items-center justify-center gap-2">
              <span>✔️</span> All of Basic user
            </li>
            <li className="flex items-center justify-center gap-2">
              <span>✔️</span> Cooking Timers
            </li>
            <li className="flex items-center justify-center gap-2">
              <span>✔️</span> Live Cooking Sessions
            </li>
          </ul>
          <Button
            className="mt-6 bg-[#1beea2]  font-semibold py-2 px-6 rounded-md hover:bg-[#3ad29a] transition duration-300 mx-auto block"
            onClick={() => handleCheckout(19.99)}
          >
            Go Premium
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Membership;
