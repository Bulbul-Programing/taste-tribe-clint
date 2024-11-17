import { useAllRecipesQuery } from "@/src/redux/Recipes/recipeManagementApi";
import { TRecipe } from "@/src/types/recipe";
import { FiEdit, FiTrash, FiEye, FiEyeOff } from "react-icons/fi";
import TableSkeleton from "./TableSkeleton";
import { useState } from "react";
import UpdateRecipe from "./UpdateRecipe";

export const tempData = {
    "_id": "",
    "userId": "",
    "title": "",
    "description": "",
    "ingredients": [],
    "instructions": [],
    "cookingTime": 0,
    "category": "",
    "image": "",
    "createdAt": "",
    "updatedAt": "",
    "__v": 0
  }
  
const AllRecipes = () => {
    const { data, isLoading } = useAllRecipesQuery(undefined)
    const [updateProduct, setUpdateProduct] = useState<TRecipe>(tempData)
    const [isModalOpen, setIsModalOpen] = useState(false)
  
    const getUpdateRecipeData = (id: string) => {
        setIsModalOpen(true)
        const updateItem = data.data.filter((item: TRecipe) => item._id === id)
        setUpdateProduct(updateItem[0]);
    };

    const handleDelete = (id: string) => {

    };

    const toggleVisibility = (id: string) => {
        alert(`Toggle visibility for ID: ${id}`);
    };

    

    
    if (isLoading) {
        return <TableSkeleton />
    }

    return (
        <div className="overflow-x-auto my-5 md:my-7 lg:my-10 border-2 rounded-xl">
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-[#1BEEA2] to-[#17b47a] text-black">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium">Image</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Cooking Time</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                        <th className="px-6 py-3 text-center text-sm font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((recipe: TRecipe) => (
                        <tr
                            key={recipe._id}
                            className="border-b last:border-none hover:bg-gray-50 transition"
                        >
                            <td className="px-2 py-4">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-14 h-14 object-cover rounded-lg shadow-md"
                                />
                            </td>
                            <td className="min-w-44 py-4 font-semibold">{recipe.title}</td>
                            <td className="min-w-32 px-2 py-4">{recipe.cookingTime} mins</td>
                            <td className="px-2 min-w-32 py-4 capitalize text-gray-700">
                                {recipe.category.replace("_", " ")}
                            </td>
                            <td className="px-6 py-8 flex items-center justify-center space-x-4">
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => getUpdateRecipeData(recipe._id)}
                                >
                                    <FiEdit size={20} />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => handleDelete(recipe._id)}
                                >
                                    <FiTrash size={20} />
                                </button>
                                {/* <button
                                    className={`${recipe.isVisible ? "text-green-600 hover:text-green-800" : "text-gray-500 hover:text-gray-700"
                                        }`}
                                    onClick={() => toggleVisibility(recipe._id)}
                                >
                                    {recipe.isVisible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <UpdateRecipe modalState = {isModalOpen} updateProductInfo={updateProduct}/>
            </div>
        </div>
    );
};

export default AllRecipes;