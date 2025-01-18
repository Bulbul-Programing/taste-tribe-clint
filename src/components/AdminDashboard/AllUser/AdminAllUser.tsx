"use client";
import { useState } from "react";
import { FiEye, FiEyeOff, FiTrash } from "react-icons/fi";
import { toast } from "sonner";
import Swal from "sweetalert2";

import UsersPageSkeleton from "../../Skelton/AdminAllUserSkeleton";

import { GetUserInfo } from "@/src/utils/getUserInfo";
import { TUser } from "@/src/types/decodedUser";
import {
  useBlockedUserMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "@/src/redux/Users/userManagementApi";

const AdminAllUser = () => {
  const { data, isLoading } = useGetAllUserQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();
  const [blockedUser] = useBlockedUserMutation();
  const [loading, setLoading] = useState(false);
  const userData = GetUserInfo();

  const handleUserDelete = (id: string) => {
    setLoading(true);
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
          const res = (await deleteUser(id)) as any;

          if (res?.data?.success) {
            setLoading(false);

            return Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }

          if (res?.error) {
            setLoading(false);

            return toast.error(res?.error?.data?.message);
          }
        } catch (err: any) {
          toast.error(err?.data?.message || "something went wrong");
          setLoading(false);
        }
      }
    });
  };

  const updateUserStatus = async (id: string, blockStatus: boolean) => {
    const updateData = {
      userId: id,
      blockStatus,
    };

    try {
      const res = (await blockedUser(updateData)) as any;

      if (res?.data?.success) {
        toast.success(res.data.massage);
      }
      if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message || "An error occurred");
      }
    } catch (err: any) {
      toast.error("An error occurred while updating user data.");
      setLoading(false);
    }
  };

  if (isLoading) {
    return <UsersPageSkeleton />;
  }
  if (loading) {
  }

  return (
    <div>
      <div className="overflow-x-auto mb-5 md:mb-7 lg:mb-5 border-2 rounded-xl">
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-[#1BEEA2] to-[#17b47a] text-black">
            <tr>
              <th className="px-2 py-3 text-left text-sm font-medium">Image</th>
              <th className="px-2 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-2 py-3 text-left text-sm font-medium">
                User role
              </th>
              <th className="px-2 py-3 text-left text-sm font-medium">
                User Status
              </th>
              <th className="px-2 py-3 text-left text-sm font-medium" />
              <th className="px-2 py-3 text-center text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user: TUser) => (
              <tr
                key={user._id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="p-2">
                  <img
                    alt={user.name}
                    className="w-10 h-10 object-cover rounded-full shadow-md"
                    src={user.profilePicture}
                  />
                </td>
                <td className="min-w-44 py-2 font-semibold">{user.name}</td>
                <td className="min-w-32 px-2 ">{user.role}</td>
                <td
                  className={`${user.blockedUser ? "text-red-500" : "text-blue-500"} px-2 min-w-32 capitalize`}
                >
                  {user.blockedUser ? "Blocked" : "Unblocked"}
                </td>
                <td
                  className={` ${user.premiumStatus ? "text-blue-500 font-bold" : "text-orange-500 font-bold"} px-2 min-w-32 capitalize `}
                />
                {userData?.data?.email === user.email ? (
                  <td className="px-6 py-2 flex items-center justify-center space-x-4">
                    {user.blockedUser ? (
                      <button
                        disabled
                        className=" disabled:text-blue-300 hover:cursor-not-allowed"
                      >
                        <FiEye size={20} />
                      </button>
                    ) : (
                      <button
                        disabled
                        className=" disabled:text-blue-300 hover:cursor-not-allowed"
                      >
                        <FiEyeOff size={20} />
                      </button>
                    )}
                    <button
                      disabled
                      className="disabled:text-red-300 hover:cursor-not-allowed"
                    >
                      <FiTrash size={20} />
                    </button>
                  </td>
                ) : (
                  <td className="px-6 py-2 flex items-center justify-center space-x-4">
                    {user.blockedUser ? (
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() =>
                          updateUserStatus(user._id, !user.blockedUser)
                        }
                      >
                        <FiEyeOff size={20} />
                      </button>
                    ) : (
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() =>
                          updateUserStatus(user._id, !user.blockedUser)
                        }
                      >
                        <FiEye size={20} />
                      </button>
                    )}

                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleUserDelete(user._id)}
                    >
                      <FiTrash size={20} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllUser;
