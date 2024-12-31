"use client"
import { useGetAllFollowersQuery } from "@/src/redux/Users/userManagementApi";
import { TUser } from "@/src/types/decodedUser";
import { FiEdit, FiTrash } from "react-icons/fi";
import FollowerSkeleton from "../Skelton/FollowerSkeleton";

const DFollowers = () => {
    const { data, isLoading } = useGetAllFollowersQuery(undefined)
    if (isLoading) {
        return <FollowerSkeleton />
    }
    return (
        <div className="flex gap-x-3 flex-wrap">
            {
                data?.data?.length > 0 ? data?.data?.map((user: TUser) => (
                    <div key={user._id} className="flex flex-wrap border p-2 gap-x-3 items-center rounded transition-all hover:bg-slate-100">
                        <img
                            alt={user.name}
                            className="w-14 h-14 object-cover rounded-full border shadow-md"
                            src={user.profilePicture}
                        />
                        <div>
                            <p>Name: <span className="text-lg font-semibold">{user.name}</span></p>
                            <p>Phone: <span className="text-lg font-semibold">{user.phoneNumber.slice(0, 8)}***</span></p>
                        </div>
                    </div>
                )) :
                    <div className="mx-auto">
                        <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-6 rounded-lg shadow-md">
                            <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full mb-4">
                                {/* Icon: User silhouette with a circle */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-16 h-16 text-gray-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                You have no followers yet!
                            </h2>
                            <p className="text-sm text-gray-600 mt-2 text-center">
                                Start sharing your content or connecting with others to gain followers.
                            </p>
                        </div>
                    </div>
            }
        </div>
    );
};

export default DFollowers;