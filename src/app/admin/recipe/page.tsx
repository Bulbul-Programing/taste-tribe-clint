"use client"
import { useGetAllRecipesQuery } from '@/src/redux/Recipes/recipeManagementApi';
import React from 'react';

const AdminRecipePage = () => {
    const { data } = useGetAllRecipesQuery(undefined)
    console.log(data);
    return (
        <div>
            <h1 className="text-xl md:text-3xl lg:text-3xl mb-5 font-bold text-center py-4 bg-slate-100 rounded-md">Welcome to All Recipes Page.</h1>
        </div>
    );
};

export default AdminRecipePage;