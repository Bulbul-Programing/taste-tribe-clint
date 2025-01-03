"use client"
import DrawerProfile from '@/src/components/AdminDashboard/DrawerProfile/DrawerProfile';
import { dashboardNavItem } from '@/src/utils/adminDashboradRoute';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { IoMenu } from 'react-icons/io5';

const AdminDashBoardLayout = ({ children }: { children: ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const currentPage = usePathname();

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
        setIsExpanded(true);
    };

    const handleOutsideClick = () => {
        if (isDrawerOpen) {
            setIsDrawerOpen(false);
        }
    };

    return (
        <div className="flex max-w-7xl mx-auto">
            <div>
                <button
                    className=" block md:block lg:hidden"
                    onClick={() => handleDrawerToggle()}
                >
                    <div className="flex mx-1 rounded-lg p-5 shadow-xl justify-between">
                        <IoMenu className="text-2xl text-black " />
                    </div>
                </button>

                {isDrawerOpen && (
                    <button
                        className=" inset-0 bg-black opacity-10 z-20"
                        onClick={() => handleOutsideClick()}
                    />
                )}

                <div
                    className={` h-screen lg:block bg-[#f1f2f7] text-black transition-all duration-300 ease-in-out transform ${isExpanded ? "w-48 block" : "w-16 hidden"
                        } ${isDrawerOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                        } z-30`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <DrawerProfile isExpanded={isExpanded} />
                    <div className=" space-y-2 transition-all duration-300 ease-in-out">
                        {dashboardNavItem.map((item, index) => (
                            <Link
                                key={index}
                                className={`flex gap-x-2  ${isExpanded ? "justify-start" : "justify-center"
                                    } items-center ${currentPage === item.path ? isExpanded && "bg-[#1BEEA2] rounded-lg" : ""} hover:bg-[#1BEEA2] p-2 m-2 hover:rounded-md`}
                                href={item.path}
                            >
                                <div
                                    className={`text-lg md:text-2xl lg:text-xl ${currentPage === item.path ? !isExpanded && "bg-[#1BEEA2] p-2 m-0 rounded-full" : ""}`}
                                >
                                    {item.icon}
                                </div>
                                <p
                                    className={` ${isExpanded ? "text-base" : "text-[0px] mt-0"} transition-all duration-200 ease-in-out`}
                                >
                                    {item.element}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full lg:ml-5 max-w-7xl mx-auto">{children}</div>
        </div>
    );
};

export default AdminDashBoardLayout;