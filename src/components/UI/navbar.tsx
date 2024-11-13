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
      <NavbarContent className="basis-1/5 flex-grow sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex flex-col md:flex-row lg:flex-row justify-start items-center gap-1" href="/">
            <Logo height={56} width={56} />
            <p className="font-bold text-inherit text-3xl md:text-base lg:text-base">
              <span className="text-[#1BEEA2]">Taste</span> Tribe
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:flex lg:flex gap-4 justify-start md:ml-14 lg:ml-2">
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

      <NavbarContent className="w-32 flex-shrink-0" justify="end">
        <NavbarDropdown />
      </NavbarContent>
    </NextUINavbar>
  );
};
