"use client";
import React, { useState } from "react";
import { FiEye, FiEyeOff, FiTrash } from "react-icons/fi";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { TAdminRecipe } from "@/src/types/recipe";
import {
  useAdminBlockRecipeMutation,
  useDeleteRecipeMutation,
  useGetAllRecipesQuery,
} from "@/src/redux/Recipes/recipeManagementApi";

const AdminRecipePage = () => {
  const { data } = useGetAllRecipesQuery(undefined);
  const [blockRecipe] = useAdminBlockRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleateLoading, setDeleteLoading] = useState(false);

  const updateRecipe = async (id: string, blockStatus: boolean) => {
    const payload = {
      recipeId: id,
      blockStatus,
    };

    setUpdateLoading(true);
    try {
      const res = (await blockRecipe(payload)) as any;

      if (res?.data?.success) {
        toast.success(res.data.massage);
      }
      if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message || "An error occurred");
      }
      setUpdateLoading(false);
    } catch (err: any) {
      setUpdateLoading(false);
      toast.error("An error occurred while updating user data.");
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = (await deleteRecipe(id)) as any;

          if (res?.data?.success) {
            return Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }

          if (res?.error) {
            return toast.error(res?.error?.data?.message);
          }
        } catch (err: any) {
          console.error(err);
          toast.error(err?.data?.message || "something went wrong");
        }
      }
    });
  };

  return (
    <div>
      <div>
        <h1 className="text-xl md:text-3xl lg:text-3xl mb-5 font-bold text-center py-4 bg-slate-100 rounded-md">
          Welcome to All Recipes Page.
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto mb-5 md:mb-7 lg:mb-5 border-2 rounded-xl">
          <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-[#1BEEA2] to-[#17b47a] text-black">
              <tr>
                <th className="px-2 py-3 text-left text-sm font-medium">
                  Image
                </th>
                <th className="px-2 py-3 text-left text-sm font-medium">
                  Title
                </th>
                <th className="px-2 py-3 text-left text-sm font-medium">
                  User Email
                </th>
                <th className="px-2 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-2 py-3 text-center text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((recipe: TAdminRecipe) => (
                <tr
                  key={recipe._id}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="px-2 py-4">
                    <img
                      alt={recipe.title}
                      className="w-14 h-14 object-cover rounded-lg shadow-md"
                      src={recipe.image}
                    />
                  </td>
                  <td className="min-w-44 py-4 font-semibold">
                    {recipe.title}
                  </td>
                  <td className="px-2 min-w-32 text-sm py-4 text-gray-700">
                    {recipe.userId.email}
                  </td>
                  <td
                    className={` ${recipe.blockStatus ? "text-orange-500 font-bold" : "text-blue-500 font-bold"} px-2 min-w-32 py-4 capitalize `}
                  >
                    {recipe.blockStatus ? "Blocked" : "Unblocked"}
                  </td>
                  <td className="px-6 py-8 flex items-center justify-center space-x-4">
                    {recipe.blockStatus ? (
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() =>
                          updateRecipe(recipe._id, !recipe.blockStatus)
                        }
                      >
                        <FiEyeOff size={20} />
                      </button>
                    ) : (
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() =>
                          updateRecipe(recipe._id, !recipe.blockStatus)
                        }
                      >
                        <FiEye size={20} />
                      </button>
                    )}
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(recipe._id)}
                    >
                      <FiTrash size={20} />
                    </button>
                    {/* <button
                                    className={`${recipe.isVisible ? "text-green-600 hover:text-green-800" : "text-gray-500 hover:text-gray-700"
                                        }`}
                                    onClick={() => toggleVisibility(recipe._id)}
                                >
                                    {recipe.isVisible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                                </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRecipePage;
