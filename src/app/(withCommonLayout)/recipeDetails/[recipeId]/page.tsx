"use client"

import { useGetRecipeDetailsQuery } from "@/src/redux/Recipes/recipeManagementApi";
import { TRecipe } from "@/src/types/recipe";
import Image from "next/image";
import React from "react";
import { IoTimerOutline } from "react-icons/io5";
import { ImSpoonKnife } from "react-icons/im";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";

interface RecipePageProps {
    params: Promise<{ recipeId: string }>;
}
const RecipeDetails: React.FC<RecipePageProps> = ({ params }) => {
    const recipeId = React.use(params).recipeId;
    console.log(recipeId);
    const { data, isLoading } = useGetRecipeDetailsQuery(recipeId, { skip: !recipeId })
    console.log(data);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="mx-5 md:mx-5 lg:mx-20 my-5 md:my-8 lg:my-10">
            <div className="flex flex-col md:flex-row lg:flex-row gap-y-3 gap-x-3 lg:gap-0 justify-center items-center">
                <div className="mx-5 md:mx-0 lg:mx-0 w-full md:w-1/2 lg:w-1/2">
                    <Image className=" w-full md:w-full lg:w-[90%] mx-auto object-cover h-[250px] rounded-lg border" src={data.data.image ? data.data.image : 'https://res.cloudinary.com/depy0i4bl/image/upload/v1732984572/84883_u7q4hk.jpg'} height={300} width={300} alt="" />
                </div>
                <div className=" mx-5 md:mx-0 lg:mx-0 w-full md:w-1/2 lg:w-1/2 rounded-lg py-5 text-center shadow-lg hover:shadow-xl transition-all">
                    <h1 className="text-3xl font-bold">{data.data.title}</h1>
                    <div className="flex justify-center items-center my-2 gap-x-3">
                        <div className="flex gap-x-1">
                            <IoTimerOutline className="text-2xl text-[#1BEEA2]" />
                            <span> {data.data.cookingTime} minutes</span>
                        </div>
                        <div className="flex gap-x-1">
                            <ImSpoonKnife className="text-xl text-[#1BEEA2]" />
                            <span> {data.data.ingredients.length} ingredients</span>
                        </div>
                    </div>
                    <p className="text-slate-600 px-5 text-sm lg:text-base">{data.data.description.slice(0, 180)} ...</p>
                    <div className="flex my-3 justify-center items-center gap-x-3">
                        <h1 className="bg-[#1BEEA2]/50 px-3 py-1 rounded-md font-medium flex items-center gap-x-2"><BiCategoryAlt className="text-xl" /> {data.data.category.charAt(0).toUpperCase()}{data.data.category.slice(1)}</h1>
                        <h1 className="bg-[#1BEEA2]/50 px-3 py-1 rounded-md font-medium flex items-center gap-x-2"><FaRegCalendarAlt className="text-xl" /> {new Date(data.data.createdAt).getDate()} / {new Date(data.data.createdAt).getMonth()} / {new Date(data.data.createdAt).getFullYear()}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;