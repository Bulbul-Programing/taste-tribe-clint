import { FaRegUser } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
import { SlUserFollowing } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";

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
    path: "/admin/users",
    element: "Users",
    icon: <FiUsers />,
  },
  {
    path: "/admin/recipe",
    element: "Recipe",
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
    path: "/",
    element: "Home",
    icon: <IoHomeOutline />,
  },
];
