"use client"
import { useEffect, useState } from "react";
import { logout, useCurrentToken } from "../redux/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TDecodedUser, TUser } from "../types/decodedUser";
import { useRouter } from "next/navigation";
import { verifyToken } from "./veryfyToken";
import { useUserInfoQuery } from "../redux/Users/userManagementApi";

export const GetUserInfo = () => {
    const userToken = useAppSelector(useCurrentToken)
    const [decodedUserInfo, setDecodedUserInfo] = useState<TDecodedUser | any>({});
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data, isLoading } = useUserInfoQuery(decodedUserInfo?.email, { skip: !decodedUserInfo.email });
    useEffect(() => {
        if (userToken) {
            const decodedToken = verifyToken(userToken);

            if (decodedToken) {
                setDecodedUserInfo(decodedToken);
            } else {
                dispatch(logout());
                router.push("/login");
            }
        } else {
            dispatch(logout());
            router.push("/login");
        }
    }, [userToken]);
    return { data: data?.data as TUser, loading: isLoading }
}