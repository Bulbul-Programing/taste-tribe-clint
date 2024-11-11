import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { TDecodedUser } from "@/src/types/decodedUser";
import { verifyToken } from "@/src/utils/veryfyToken";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";

const NavbarDropdown = () => {
  const router = useRouter();
  const userToken = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close dropdown if the clicked element is outside of dropdownRef
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Bind the event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {userInfo && userInfo?.email ? (
        <div ref={dropdownRef} className="relative inline-block text-left">
          <button className="cursor-pointer" onClick={toggleDropdown}>
            <Image
              alt=""
              className="w-12 h-12 rounded-full border-2 p-[1px] border-white"
              height={80}
              src={
                userInfo.profilePicture ||
                "https://i.pravatar.cc/150?u=a04258114e29026302d"
              }
              width={80}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  <Link href={`${userInfo?.role}/profile`}>Profile</Link>
                </button>
                <button
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleLogout()}
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          className="px-4 py-2 rounded-md bg-[#1BEEA2] text-black font-medium"
          href="/login"
        >
          Log In
        </Link>
      )}
    </div>
  );
};

export default NavbarDropdown;
