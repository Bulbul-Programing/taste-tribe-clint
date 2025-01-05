"use client"
import { useDeleteUserMutation, useGetAllUserQuery } from "@/src/redux/Users/userManagementApi";
import { TUser } from "@/src/types/decodedUser";
import { useState } from "react";
import { FiEdit, FiEye, FiEyeOff, FiTrash } from "react-icons/fi";
import { toast } from "sonner";
import Swal from "sweetalert2";
// import { IoEyeOffOutline } from "react-icons/io5";


const AdminDashboardUser = () => {
    const { data, isLoading } = useGetAllUserQuery(undefined)
    const [deleteUser] = useDeleteUserMutation()
    const [loading, setLoading] = useState(false)
    console.log(data);

    const handleUserDelete = (id: string) => {
        setLoading(true)
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
                    console.error(err);
                    toast.error(err?.data?.message || "something went wrong");
                    setLoading(false);
                }
            }
        });
    }

    const updateUserStatus = (id: string) => {
        console.log(id);
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

                            </th>
                            <th className="px-2 py-3 text-left text-sm font-medium">

                            </th>
                            <th className="px-2 py-3 text-left text-sm font-medium">

                            </th>
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
                                <td className="min-w-32 px-2 ">

                                </td>
                                <td className="px-2 min-w-32 capitalize text-gray-700">

                                </td>
                                <td
                                    className={` ${user.premiumStatus ? "text-blue-500 font-bold" : "text-orange-500 font-bold"} px-2 min-w-32 capitalize `}
                                >

                                </td>
                                <td className="px-6 py-2 flex items-center justify-center space-x-4">
                                    <button
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => updateUserStatus(user._id)}
                                    >
                                        <FiEye size={20} />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => handleUserDelete(user._id)}
                                    >
                                        <FiTrash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboardUser;