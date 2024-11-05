"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import NavbarDropdown from "./NavbarDropdown";
import NavbarDropdownMobile from "./NavbarDropdownMobile";

import { siteConfig } from "@/src/config/site";
import { Logo } from "@/src/components/UI/icons";

export const Navbar = () => {
  const currentPage = usePathname();

  return (
    <NextUINavbar
      className="bg-black py-2 text-white"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo height={60} width={60} />
            <p className="font-bold text-inherit">
              <span className="text-[#1BEEA2]">Taste</span> Tribe
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:flex lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={`${currentPage === item.href && "bg-[#1BEEA2] text-black px-2 py-1 rounded-md"} font-semibold`}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <ThemeSwitch /> */}
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <NavbarDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <NavbarDropdownMobile />
      </NavbarMenu>
    </NextUINavbar>
  );
};
