"use client";

import { NavbarMenuItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Divider } from "@nextui-org/divider";

import { siteConfig } from "../../config/site";

import NavbarDropdown from "./NavbarDropdown";

const NavbarDropdownMobile = () => {
  const router = useRouter();
  const handleLogout = () => {
    console.log("Log out");
  };

  return (
    <div className="mx-4 mt-2 flex flex-col gap-2">
      <NavbarDropdown />
      <Divider />
      <div>
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarMenuItem>
        ))}
      </div>
    </div>
  );
};

export default NavbarDropdownMobile;
