import { Skeleton, Button, Divider } from '@nextui-org/react';
import { IoTimerOutline } from 'react-icons/io5';
import { ImSpoonKnife } from 'react-icons/im';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';

const RecipeDetailsSkeleton = () => {
    return (
        <div className="mx-5 md:mx-5 lg:mx-20 my-5 md:my-8 lg:my-10">
            <div className="flex flex-col md:flex-row lg:flex-row gap-y-3 gap-x-3 lg:space-x-7 lg:gap-0 justify-center items-center">
                <div className="mx-5 md:mx-0 lg:mx-0 w-full md:w-1/2 lg:w-5/12">
                    <Skeleton
                        className="w-full mx-auto object-cover h-[250px] rounded-lg border"
                    />
                </div>
                <div className="mx-5 md:mx-0 lg:mx-0 w-full md:w-1/2 lg:w-7/12 rounded-lg py-5 text-center shadow-lg hover:shadow-xl transition-all">
                    <Skeleton className="text-3xl font-bold mb-3" />
                    <div className="flex justify-center items-center my-2 gap-x-3">
                        <div className="flex gap-x-1">
                            <IoTimerOutline className="text-2xl text-[#1BEEA2]" />
                            <Skeleton className="text-sm" />
                        </div>
                        <div className="flex gap-x-1">
                            <ImSpoonKnife className="text-xl text-[#1BEEA2]" />
                            <Skeleton className="text-sm" />
                        </div>
                    </div>
                    <Skeleton className="text-slate-600 px-5 text-sm lg:text-base mb-4" />
                    <div className="flex my-3 justify-center items-center gap-x-3">
                        <h1 className="bg-[#1BEEA2]/50 px-3 py-1 rounded-md font-medium flex items-center gap-x-2">
                            <BiCategoryAlt className="text-xl" />
                            <Skeleton className="text-sm" />
                        </h1>
                        <h1 className="bg-[#1BEEA2]/50 px-3 py-1 rounded-md font-medium flex items-center gap-x-2">
                            <FaRegCalendarAlt className="text-xl" />
                            <Skeleton className="text-sm" />
                        </h1>
                    </div>
                </div>
            </div>

            <div className="my-10 flex flex-col md:flex-col lg:flex-row gap-x-4 shadow-xl border p-3 rounded-lg">
                <div className="w-full md:w-full lg:w-2/3 border-r pr-2">
                    <div className="flex justify-between mb-2 items-center">
                        <div className="flex items-center gap-x-4">
                            <Skeleton className="w-14 h-14 border object-cover rounded-full" />
                            <div>
                                <Skeleton className="text-xl font-medium mb-2" />
                                <Skeleton className="text-slate-600 text-sm" />
                            </div>
                        </div>
                        <Button isLoading>Follow</Button>
                    </div>
                    <Divider />
                    <h1 className="my-4 text-slate-600">
                        <span className="text-lg font-bold text-black">Recipe description:</span>
                        <Skeleton className="text-sm" />
                    </h1>

                    <div>
                        <h1 className="my-4 text-xl font-medium text-black">Ingredients:</h1>
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="flex items-center gap-2 p-2 border rounded-lg text-sm" />
                            <Skeleton className="flex items-center gap-2 p-2 border rounded-lg text-sm" />
                        </div>
                    </div>

                    <div>
                        <h1 className="my-4 text-xl font-medium text-black">Instructions:</h1>
                        <div>
                            <Skeleton className="mb-2" />
                            <Skeleton className="mb-2" />
                        </div>
                    </div>
                    <Divider />
                    <div className="flex flex-col-reverse md:flex-row lg:flex-row justify-center items-center flex-wrap gap-4 mt-3">
                        <div className="flex gap-x-2">
                            <div className="flex gap-x-2 items-center border px-2 py-3 rounded-md">
                                <Skeleton className="p-2 rounded-lg" />
                                <Skeleton className="text-lg font-medium" />
                            </div>
                            <div className="flex gap-x-2 items-center border px-2 py-3 rounded-md">
                                <Skeleton className="p-2 rounded-lg" />
                                <Skeleton className="text-lg font-medium" />
                            </div>
                        </div>

                        <div>
                            <Skeleton className="px-2 py-3 border-2 rounded-md" />
                            <Button isLoading className="bg-[#1BEEA2] h-12 ml-3 font-medium">
                                Submit
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h1 className="my-4 text-xl font-medium text-black">Comments:</h1>
                        <div className="my-5 max-h-[250px] border-2 p-3 rounded-lg overflow-y-scroll">
                            <div className="shadow-md p-2 rounded-lg mb-2">
                                <Skeleton className="w-12 h-12 border-2 rounded-full" />
                                <Skeleton className="font-semibold mb-2" />
                                <Skeleton className="text-slate-600 text-xs" />
                                <Skeleton className="text-slate-600 mt-2 ml-14" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-full lg:w-1/3">
                    <h1 className="text-xl font-bold text-center my-4">Related Same category</h1>
                    <div>
                        <div className="flex mb-2 justify-start lg:justify-between items-center gap-x-2 border p-1 rounded-lg">
                            <Skeleton className="w-36 h-24 object-cover rounded-lg" />
                            <div>
                                <Skeleton className="text-lg font-medium" />
                                <Skeleton className="text-base text-slate-500 text-sm mb-[2px]" />
                                <div className="flex justify-center items-center gap-x-1 bg-[#1beea190] w-[115px] rounded-md py-1 px-2 text-center">
                                    <IoTimerOutline className="text-base font-bold" />
                                    <Skeleton className="text-xs" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsSkeleton;
