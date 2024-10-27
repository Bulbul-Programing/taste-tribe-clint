"use client"
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import React from "react";

const NavbarDropdown = () => {
  const router = useRouter()

  const handleLogout = () => {

  }
  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar isBordered color="success" className="cursor-pointer" src='https://i.pravatar.cc/150?u=a04258114e29026302d' />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigation("/profile")}>
          Profile
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/settings")}>
          Settings
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/create-post")}>
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
  );
};

export default NavbarDropdown;
