"use client";

import AdminAllUser from "@/src/components/AdminDashboard/AllUser/AdminAllUser";

// import { IoEyeOffOutline } from "react-icons/io5";

const AdminDashboardUser = () => {
  return (
    <div>
      <h1 className="text-xl md:text-3xl lg:text-3xl mb-5 font-bold text-center py-4 bg-slate-100 rounded-md">
        Welcome to All Users Page.
      </h1>
      <div>
        <AdminAllUser />
      </div>
    </div>
  );
};

export default AdminDashboardUser;
