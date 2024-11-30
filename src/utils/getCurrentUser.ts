"use client";
import { useCurrentToken } from "../redux/features/Auth/authSlice";
import { useAppSelector } from "../redux/hooks";

import { verifyToken } from "./veryfyToken";

export const GetCurrentUser = () => {
  const userToken = useAppSelector(useCurrentToken);

  if (userToken) {
    const decodedToken = verifyToken(userToken);

    return decodedToken;
  }
};
