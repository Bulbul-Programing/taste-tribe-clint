"use client"

import { GetUserInfo } from "@/src/utils/getUserInfo";

const GreetingMassage = () => {
    const userInfo = GetUserInfo()

    return (
        <div className="py-5 pr-5">
            <div className="flex justify-between items-center shadow-xl p-5 rounded-lg">
                <h1 className="text-2xl font-bold ">Welcome back {userInfo?.data?.name}</h1>
            </div>
        </div>
    );
};

export default GreetingMassage;