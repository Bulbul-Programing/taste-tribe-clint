import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Link from "next/link";

import NavbarDropdown from "./NavbarDropdown";
import NavbarDropdownMobile from "./NavbarDropdownMobile";

import { siteConfig } from "@/src/config/site";
import { Logo } from "@/src/components/UI/icons";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo height={60} width={60} />
            <p className="font-bold text-inherit">
              <span className="text-[#19D794]">Taste</span> Tribe
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:flex lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
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
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link href="/login"> Login</Link>
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
