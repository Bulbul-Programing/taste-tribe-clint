"use client";
import Image from "next/image";
import { IoTimerOutline } from "react-icons/io5";
import { ImSpoonKnife } from "react-icons/im";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { Divider } from "@nextui-org/divider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetAllRecipesQuery, useGetRecipeDetailsQuery } from "@/src/redux/Recipes/recipeManagementApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";
import { TDecodedUser } from "@/src/types/decodedUser";
import { verifyToken } from "@/src/utils/veryfyToken";
import {
    useAddFollowerMutation,
    useRemoveFollowerMutation,
} from "@/src/redux/Users/userManagementApi";
import Link from "next/link";
import { TRecipe } from "@/src/types/recipe";
import { BiUpArrow } from "react-icons/bi";
import { BiDownArrow } from "react-icons/bi";


const RecipeDetailsComponent = ({ recipeId }: { recipeId: string }) => {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const { data, isLoading } = useGetRecipeDetailsQuery(recipeId, { skip: !recipeId });
    const { data: category } = useGetAllRecipesQuery({ category: `${data?.data?.category}` }, { skip: !data?.data?.category });
    const [timers, setTimers] = useState<{ [key: string]: number }>({});
    const [intervals, setIntervals] = useState<{ [key: string]: NodeJS.Timeout }>(
        {},
    );
    const dispatch = useAppDispatch();
    const userToken = useAppSelector(useCurrentToken);
    const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});
    const router = useRouter();
    const [addFollower] = useAddFollowerMutation();
    const [removeFollower] = useRemoveFollowerMutation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userToken) {
            const decodedToken = verifyToken(userToken);

            if (decodedToken) {
                setUserInfo(decodedToken);
            }
        }
    }, [userToken]);

    const toggleIngredient = (ingredient: string) => {
        setSelectedIngredients((prev) =>
            prev.includes(ingredient)
                ? prev.filter((item) => item !== ingredient)
                : [...prev, ingredient],
        );
    };

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const startTimer = (id: string, time: number) => {
        // Prevent starting an already running timer
        if (intervals[id]) return;

        const initialTime = timers[id] !== undefined ? timers[id] : time * 60; // Start from current time or initial time

        setTimers((prev) => ({ ...prev, [id]: initialTime }));

        const interval = setInterval(() => {
            setTimers((prev) => {
                if (prev[id] > 0) {
                    return { ...prev, [id]: prev[id] - 1 };
                } else {
                    clearInterval(interval);
                    const { [id]: _, ...remainingIntervals } = intervals;

                    setIntervals(remainingIntervals);
                    toast.success("Times out, Please check your cooking pot!", {
                        duration: 50000,
                    });

                    return prev;
                }
            });
        }, 1000);

        setIntervals((prev) => ({ ...prev, [id]: interval }));
    };
    const pauseTimer = (id: string) => {
        if (intervals[id]) {
            clearInterval(intervals[id]);
            const { [id]: _, ...remainingIntervals } = intervals;

            setIntervals(remainingIntervals);
        }
    };

    const handleFollow = async () => {

        if (!userInfo.email) {
            dispatch(logout());
            return router.push("/login");
        }
        const followerData = {
            userId: userInfo.id,
            followerId: data.data.userId._id,
        };

        try {
            setLoading(true);
            const res = (await addFollower(followerData)) as any;

            if (res?.data?.data?.modifiedCount > 0) {
                setLoading(false);
                toast.success("User Followed successfully.");
            } else if (res?.error?.data?.message) {
                toast.error(res?.error?.data?.message || "An error occurred");
                setLoading(false);
            }
        } catch (error: any) {
            console.log(error);
            toast.error("An error occurred while updating user data.");
            setLoading(false);
        }
    };

    const handleUnFollow = async () => {
        if (!userInfo) {
            dispatch(logout());
            return router.push("/login");
        }
        const followerData = {
            userId: userInfo.id,
            followerId: data.data.userId._id,
        };

        try {
            setLoading(true);
            const res = (await removeFollower(followerData)) as any;

            if (res?.data?.data?.modifiedCount > 0) {
                setLoading(false);
                toast.success(res.data.massage || "User UnFollowed successfully.");
            } else if (res?.error?.data?.message) {
                toast.error(res?.error?.data?.message || "An error occurred");
                setLoading(false);
            }
        } catch (error: any) {
            console.log(error);
            toast.error("An error occurred while updating user data.");
            setLoading(false);
        }
    };

    const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mx-5 md:mx-5 lg:mx-20 my-5 md:my-8 lg:my-10">
            <div className="flex flex-col md:flex-row lg:flex-row gap-y-3 gap-x-3 lg:space-x-7 lg:gap-0 justify-center items-center">
                <div className="mx-5 md:mx-0 lg:mx-0 w-full md:w-1/2 lg:w-5/12">
                    <Image
                        alt=""
                        className=" w-full mx-auto object-cover h-[250px] rounded-lg border"
                        height={300}
                        src={
                            data.data.image
                                ? data.data.image
                                : "https://res.cloudinary.com/depy0i4bl/image/upload/v1732984572/84883_u7q4hk.jpg"
                        }
                        width={300}
                    />
                </div>
                <div className=" mx-5 md:mx-0 lg:mx-0 w-full md:w-1/2 lg:w-7/12 rounded-lg py-5 text-center shadow-lg hover:shadow-xl transition-all">
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
                    <p className="text-slate-600 px-5 text-sm lg:text-base">
                        {data.data.description.slice(0, 180)} ...
                    </p>
                    <div className="flex my-3 justify-center items-center gap-x-3">
                        <h1 className="bg-[#1BEEA2]/50 px-3 py-1 rounded-md font-medium flex items-center gap-x-2">
                            <BiCategoryAlt className="text-xl" />{" "}
                            {data.data.category.charAt(0).toUpperCase()}
                            {data.data.category.slice(1)}
                        </h1>
                        <h1 className="bg-[#1BEEA2]/50 px-3 py-1 rounded-md font-medium flex items-center gap-x-2">
                            <FaRegCalendarAlt className="text-xl" />{" "}
                            {new Date(data.data.createdAt).getDate()} /{" "}
                            {new Date(data.data.createdAt).getMonth()} /{" "}
                            {new Date(data.data.createdAt).getFullYear()}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="my-10 flex flex-col md:flex-col lg:flex-row gap-x-4 shadow-xl border p-3 rounded-lg">
                <div className=" w-full md:w-full lg:w-2/3 border-r pr-2">
                    <div className="flex justify-between mb-2 items-center">
                        <div className="flex items-center gap-x-4">
                            <Image
                                alt=""
                                className="w-14 h-14 border object-cover rounded-full"
                                height={80}
                                src={data.data.userId.profilePicture}
                                width={80}
                            />
                            <div>
                                <h1 className="text-xl font-medium">{data.data.userId.name}</h1>
                                <p className="text-slate-600 text-sm flex gap-x-2 items-center">
                                    <FaRegCalendarAlt className="" />{" "}
                                    {new Date(data.data.createdAt).getDate()} /{" "}
                                    {new Date(data.data.createdAt).getMonth()} /{" "}
                                    {new Date(data.data.createdAt).getFullYear()}
                                </p>
                            </div>
                        </div>
                        {data.data.userId.followers.includes(userInfo.id) ? (
                            <Button
                                className="bg-[#1BEEA2]"
                                isLoading={loading}
                                onClick={() => handleUnFollow()}
                            >
                                Unfollow
                            </Button>
                        ) : (
                            <Button
                                className="bg-[#1BEEA2]"
                                isLoading={loading}
                                onClick={() => handleFollow()}
                            >
                                Follow
                            </Button>
                        )}
                    </div>
                    <Divider />
                    <h1 className="my-4 text-slate-600">
                        <span className="text-lg font-bold text-black">
                            Recipe description :
                        </span>{" "}
                        {data.data.description}
                    </h1>
                    <div>
                        <h1 className="my-4 text-xl font-medium text-black">
                            Ingredients:
                        </h1>
                        <div>
                            <div className="flex flex-wrap gap-2">
                                {data.data.ingredients.map(
                                    (ingredient: string, index: number) => (
                                        <button
                                            key={index}
                                            className={`flex items-center gap-2 p-2 border rounded-lg text-sm cursor-pointer ${selectedIngredients.includes(ingredient)
                                                ? "bg-green-100 text-green-800 border-green-300"
                                                : "bg-white text-gray-600 border-gray-300"
                                                }`}
                                            onClick={() => toggleIngredient(ingredient)}
                                        >
                                            <ImSpoonKnife className="text-xl text-[#1BEEA2]" />
                                            {ingredient}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                        <div>
                            <h1 className="my-4 text-xl font-medium text-black">
                                Instructions:
                            </h1>
                            <div className="my-4">
                                {data.data.instructions.map(
                                    (
                                        instruction: { _id: string; title: string; time: number },
                                        index: number,
                                    ) => (
                                        <div
                                            key={instruction._id}
                                            className="py-2 bg-[#1BEEA2]/20 my-2 px-2 rounded-lg"
                                        >
                                            <div className="flex items-center gap-x-3 justify-between">
                                                <div className="flex items-center gap-x-3">
                                                    <h1 className=" text-base md:text-3xl lg:text-3xl font-bold border-2 border-black rounded-full text-center w-7 md:w-10 lg:w-10 h-7 md:h-10 lg:h-10">
                                                        {index + 1}
                                                    </h1>
                                                    <div>
                                                        <h1 className="font-medium text-black">
                                                            {instruction.title}
                                                        </h1>
                                                        <p className="text-slate-600 text-sm">
                                                            <span className="text-base font-semibold text-black">
                                                                {instruction.time}
                                                            </span>{" "}
                                                            Minute
                                                        </p>
                                                        <span className="text-base block md:hidden lg:hidden text-black font-normal md:font-semibold lg:font-semibold">
                                                            Remaining:{" "}
                                                            {formatTime(
                                                                timers[instruction._id] ?? instruction.time * 60,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col md:flex-row lg:flex-row items-center gap-x-2">
                                                    <span className="text-base hidden md:block lg:block text-black font-semibold">
                                                        Remaining:{" "}
                                                        {formatTime(
                                                            timers[instruction._id] ?? instruction.time * 60,
                                                        )}
                                                    </span>
                                                    <button
                                                        className="bg-[#1BEEA2] px-3 py-1 rounded text-white"
                                                        onClick={() =>
                                                            timers[instruction._id] !== undefined &&
                                                                intervals[instruction._id]
                                                                ? pauseTimer(instruction._id)
                                                                : startTimer(instruction._id, instruction.time)
                                                        }
                                                    >
                                                        {timers[instruction._id] !== undefined &&
                                                            intervals[instruction._id]
                                                            ? "Pause"
                                                            : "Start Timer"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className="flex gap-x-4 mt-3">
                        <div className="flex gap-x-2">
                            <BiUpArrow className="text-[50px] rounded-lg hover:text-black text-black/70 bg-[#1beea129] hover:bg-[#1BEEA2] px-2 py-1 transition-all" />
                            <BiDownArrow className="text-[50px] rounded-lg hover:text-black text-black/70 bg-red-100 hover:bg-red-400 px-2 py-1 transition-all" />
                        </div>
                        <div className="">
                            <form onSubmit={handleComment}>
                                <input type="text" className=" px-2 py-3 border-2 rounded-md focus:outline-[#1BEEA2] " placeholder="type your comment" />
                                <Button type="submit" size="lg" className="bg-[#1BEEA2] ml-3 font-medium">Submit</Button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-full lg:w-1/3">
                    <h1 className="text-xl font-bold text-center my-4">Related Same category</h1>
                    <div>
                        {category?.data?.map((recipe: TRecipe) => (
                            recipe._id !== data.data._id && (
                                <Link
                                    key={recipe._id}
                                    className="flex mb-2 justify-start lg:justify-between items-center gap-x-2 border p-1 rounded-lg"
                                    href={`/recipeDetails/${recipe._id}`}
                                >
                                    <Image
                                        alt=""
                                        className="w-36 h-24 object-cover rounded-lg"
                                        height={100}
                                        src={recipe.image}
                                        width={100}
                                    />
                                    <div>
                                        <p className="text-lg font-medium">
                                            {recipe.title.slice(0, 18)} ...
                                        </p>
                                        <p className="text-base hidden md:block lg:hidden text-slate-500 text-sm mb-[2px]">
                                            {recipe.description.slice(0, 150)} ....
                                        </p>
                                        <p className="text-base block md:hidden lg:block text-slate-500 text-sm mb-[2px]">
                                            {recipe.description.slice(0, 50)} ....
                                        </p>
                                        <div className="flex justify-center items-center gap-x-1  bg-[#1beea190] w-[115px] rounded-md py-1 px-2 text-center">
                                            <IoTimerOutline className="text-base font-bold" />
                                            <p className="text-xs"> {recipe.cookingTime} Minute</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsComponent;
