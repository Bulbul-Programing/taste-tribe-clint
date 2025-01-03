"use client"
import { useGetAllUserCountQuery } from "@/src/redux/Users/userManagementApi";
import { GetUserInfo } from "@/src/utils/getUserInfo";
import { SlUserFollowing } from "react-icons/sl";
import { FaUsers } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";

const GreetingMassage = () => {
    const userInfo = GetUserInfo()
    const { data, isLoading } = useGetAllUserCountQuery(undefined)
    console.log(userInfo, data);

    const handleRoute = (path: string) => {
        console.log(path);
    }

    return (
        <div className="py-5 pr-5">
            <div className="flex justify-between items-center shadow-xl p-5 rounded-lg">
                <h1 className="text-2xl font-bold ">Welcome back {userInfo?.data?.name}</h1>
            </div>
            <div className="grid gap-x-3 grid-cols-4 my-5">
                <button
                    className="bg-slate-100 cursor-pointer flex gap-x-6  items-center justify-between p-3 rounded-md"
                    onClick={() => handleRoute(`/${userInfo.data.role}/followers`)}
                >
                    <div>
                        <p className="text-slate-600 text-left text-lg font-medium">Total </p>
                        <p className="text-sm">
                            <span className="text-xl font-semibold">
                                {data?.data ? data?.data : 0}
                            </span>{ "  Users "}
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-[#1BEEA2] to-[#1cb47c] p-3 rounded-xl">
                        <FaUsers className="text-3xl" />
                    </div>
                </button>
                <button
                    className="bg-slate-100 cursor-pointer flex gap-x-6  items-center justify-between p-3 rounded-md"
                    onClick={() => handleRoute(`/${userInfo.data.role}/recipe`)}
                >
                    <div>
                        <p className="text-slate-600 text-left text-lg font-medium">Total </p>
                        <p className="text-sm">
                            <span className="text-xl font-semibold">
                                {data?.data ? data?.data : 0}
                            </span>{ "  Recipes "}
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-[#1BEEA2] to-[#1cb47c] p-3 rounded-xl">
                        <MdRestaurant className="text-3xl" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default GreetingMassage;