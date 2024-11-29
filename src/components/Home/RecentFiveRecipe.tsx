import { useGetAllRecipesQuery } from "@/src/redux/Recipes/recipeManagementApi";
import { TRecipe } from "@/src/types/recipe";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";

const RecentFiveRecipe = () => {
    const { data, isLoading } = useGetAllRecipesQuery({ limit: 5, sort: '-createdAt' })
    console.log(data);
    return (
        <div className=" mx-3 md:mx-8 lg:mx-20 my-10">
            <div className="flex justify-center">
                <h1 className=" text-4xl bg-black rounded-lg px-4 py-2 text-white font-bold">Recent Recipe</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center gap-4 px-4">
                {
                    data?.data?.slice(0, 2).map((recipe: TRecipe) => (
                        <motion.div
                            key={recipe._id}
                            className="card"
                            initial={{
                                opacity: 0,
                                y: 100,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.7,
                                },
                            }}
                            viewport={{ once: false }}
                        >
                            <Link href={`/recipe/details/${recipe._id}`} >
                                <div className="bg-white relative p-3 shadow-xl rounded-lg">
                                    <Image src={recipe.image} className="w-full object-cover h-[300px] rounded-md pb-10" width={300} height={300} alt={`${recipe.title} recipe image.`} />
                                    <div className="absolute inset-0 flex items-center justify-center top-52">
                                        <div>
                                            <div className="flex justify-center">
                                                <h1 className="bg-[#1BEEA2] inline-block px-1 text-xs ">{recipe.category.toUpperCase()}</h1>
                                            </div>
                                            <div className=" text-center shadow-md hover:shadow-xl transition-all bg-white rounded-lg mt-1 py-2 px-20">
                                                <h1>{recipe.title.length > 30 ? `${recipe.title.slice(0, 30)} ....` : recipe.title}</h1>
                                                <div className="flex justify-center items-center my-1 gap-x-1">
                                                    <FaRegClock className="bg-[#1BEEA2] rounded-full" />
                                                    <p className="ml-2">{recipe.createdAt.slice(0, 10)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5  justify-center gap-4 px-4">
                {
                    data?.data?.slice(2, 5).map((recipe: TRecipe) => (
                        <motion.div
                            key={recipe._id}
                            className="card"
                            initial={{
                                opacity: 0,
                                y: 100,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.7,
                                },
                            }}
                            viewport={{ once: false }}
                        >
                            <Link href={`/recipe/details/${recipe._id}`} >
                                <div className="bg-white relative p-3 shadow-xl rounded-lg">
                                    <Image src={recipe.image} className="w-full object-cover  rounded-md pb-10" width={400} height={300} alt={`${recipe.title} recipe image.`} />
                                    <div className="absolute inset-0 flex items-center justify-center top-28">
                                        <div>
                                            <div className="flex justify-center">
                                                <h1 className="bg-[#1BEEA2] inline-block px-1 text-xs ">{recipe.category.toUpperCase()}</h1>
                                            </div>
                                            <div className=" text-center shadow-md hover:shadow-xl transition-all bg-white rounded-lg mt-1 py-2 px-5">
                                                <h1>{recipe.title.length > 30 ? `${recipe.title.slice(0, 30)} ....` : recipe.title}</h1>
                                                <div className="flex justify-center items-center my-1 gap-x-1">
                                                    <FaRegClock className="bg-[#1BEEA2] rounded-full" />
                                                    <p className="ml-2">{recipe.createdAt.slice(0, 10)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    );
};

export default RecentFiveRecipe;