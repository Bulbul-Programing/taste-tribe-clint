import { FaRegUser } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineDashboard, MdOutlineWorkspacePremium } from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
import { SlUserFollowing } from "react-icons/sl";

export const dashboardNavItem = [
  {
    path: "/admin/dashboard",
    element: "Dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    path: "/admin/profile",
    element: "Profile",
    icon: <FaRegUser />,
  },
  {
    path: "/admin/recipe",
    element: "My Recipe",
    icon: <PiBowlFood />,
  },
  {
    path: "/admin/followers",
    element: "Followers",
    icon: <SlUserFollowing />,
  },
  {
    path: "/admin/following",
    element: "Following",
    icon: <HiOutlineUsers />,
  },
  {
    path: "/admin/memberships",
    element: "Memberships",
    icon: <MdOutlineWorkspacePremium />,
  },
  {
    path: "/",
    element: "Home",
    icon: <IoHomeOutline />,
  },
];