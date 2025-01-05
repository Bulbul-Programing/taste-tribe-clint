import AdminDashboardHomeCart from '@/src/components/AdminDashboard/DashboardHome/AdminDashboardHomeCart';
import GreetingMassage from '@/src/components/AdminDashboard/DashboardHome/GreetingMassage';
import React from 'react';

const page = () => {
    return (
        <div>
            <GreetingMassage />
            <AdminDashboardHomeCart />
        </div>
    );
};

export default page;