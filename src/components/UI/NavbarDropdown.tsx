"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { TDecodedUser } from "@/src/types/decodedUser";
import { verifyToken } from "@/src/utils/veryfyToken";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";

const NavbarDropdown = () => {
  const router = useRouter();
  const userToken = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});

  useEffect(() => {
    if (userToken) {
      const decodedToken = verifyToken(userToken);

      if (decodedToken) {
        setUserInfo(decodedToken);
      }
    } else {
      setUserInfo({});
    }
  }, [userToken]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
  };
  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div>
      {userInfo && userInfo?.email ? (
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              isBordered
              className="cursor-pointer"
              color="success"
              src={
                userInfo.profilePicture ||
                "https://i.pravatar.cc/150?u=a04258114e29026302d"
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              onClick={() => handleNavigation(`${userInfo.role}/profile`)}
            >
              Profile
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                handleNavigation(`${userInfo.role}/profile/settings`)
              }
            >
              Settings
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                handleNavigation(`${userInfo.role}/profile/create-post`)
              }
            >
              Create Post
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onClick={() => handleLogout()}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button>
          {" "}
          <Link href="/login">Log In</Link>
        </Button>
      )}
    </div>
  );
};

export default NavbarDropdown;
