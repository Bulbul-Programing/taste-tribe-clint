import { FiEdit, FiTrash } from "react-icons/fi";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import Modal from "../modal";
import TTInput from "../Form/TTInput";
import TTForm from "../Form/TTForm";

import TableSkeleton from "./TableSkeleton";

import { TRecipe } from "@/src/types/recipe";
import {
  useAllRecipesQuery,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
} from "@/src/redux/Recipes/recipeManagementApi";
import { categories } from "@/src/app/user/recipe/page";
import { hostImages } from "@/src/utils/ImageUpload";
import { verifyToken } from "@/src/utils/veryfyToken";
import { TDecodedUser } from "@/src/types/decodedUser";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";

export const tempData = {
  _id: "",
  userId: "",
  title: "",
  description: "",
  ingredients: [],
  instructions: [],
  cookingTime: 0,
  category: "",
  image: "",
  createdAt: "",
  updatedAt: "",
  __v: 0,
};

const AllRecipes = () => {
  const { data, isLoading } = useAllRecipesQuery(undefined);
  const [updateProduct, setUpdateProduct] = useState<TRecipe>(tempData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [instruction, setInstruction] = useState<string>("");
  const [instructionTime, setInstructionTime] = useState("");
  const [instructions, setInstructions] = useState<
    { title: string; time: string }[] | []
  >([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [recipePhoto, setRecipePhoto] = useState<File[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const userToken = useAppSelector(useCurrentToken);
  const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});
  const [updateRecipe] = useUpdateRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();

  useEffect(() => {
    if (userToken) {
      const decodedToken = verifyToken(userToken) as TDecodedUser;

      if (decodedToken) {
        setUserInfo(decodedToken);
      } else {
        dispatch(logout());
        router.push("/login");
      }
    } else {
      setUserInfo({});
      router.push("/login");
    }
  }, [userToken]);

  const handleModalClose = () => {
    setIsModalOpen(false), setIngredients([]);
    setImagePreview([]);
    setRecipePhoto([]);
    setIngredient("");
    setCategory("");
    setInstruction("");
    setInstructionTime("");
    setInstructions([]);
    setLoading(false);
    setUpdateProduct(tempData);
  };

  const getUpdateRecipeData = (id: string) => {
    const updateItem = data.data.filter((item: TRecipe) => item._id === id);

    setUpdateProduct(updateItem[0]);
    setIngredients(updateItem[0].ingredients);
    setInstructions(updateItem[0].instructions);
    setImagePreview([updateItem[0].image]);
    setCategory(updateItem[0].category);
    setDescription(updateItem[0].description);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = (await deleteRecipe(id)) as any;

          if (res?.data?.success) {
            setLoading(false);
            handleModalClose();

            return Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }

          if (res?.error) {
            setLoading(false);

            return toast.error(res?.error?.data?.message);
          }
        } catch (err: any) {
          console.error(err);
          toast.error(err?.data?.message || "something went wrong");
          setLoading(false);
        }
      }
    });
  };

  const handleAddIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value);
  };

  const handleAddInstructionTitle = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInstruction(e.target.value);
  };

  const handleInstruction = () => {
    if (instruction && instructionTime) {
      const instructionData = {
        title: instruction,
        time: instructionTime,
      };

      setInstructions((prev) => [...prev, instructionData]);
      setInstruction("");
      setInstructionTime("");
    }
  };

  const handleAddInstructionTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstructionTime(e.target.value);
  };

  const removeInstruction = (instruction: string) => {
    const removeInstruction = instructions.filter(
      (ing) => ing.title !== instruction,
    );

    setInstructions(removeInstruction);
  };
  const removeIngredient = (ingredient: string) => {
    const removeIngredient = ingredients.filter((ing) => ing !== ingredient);

    setIngredients(removeIngredient);
  };

  const handleUpdate: SubmitHandler<FieldValues> = async (data) => {
    if (instructions.length < 1) {
      return toast.error(
        "Instructions are not available. Please fill the instructions",
      );
    }
    if (ingredients.length < 1) {
      return toast.error(
        "Ingredients are not available. Please fill the ingredients",
      );
    }
    if (description.length < 1) {
      return toast.error("Description is require. Please fill the description");
    }

    setLoading(true);
    data.ingredients = ingredients;
    data.cookingTime = Number(data.cookingTime);
    data.instructions = instructions;
    data.userId = userInfo.id || "";
    data.category = category;
    data.description = description;
    if (recipePhoto.length > 0) {
      const uploadPhoto = await hostImages(recipePhoto);

      data.image = uploadPhoto[0];
    } else {
      data.image = updateProduct.image;
    }
    const updateData = {
      id: updateProduct._id,
      updateData: data,
    };

    try {
      const res = (await updateRecipe(updateData)) as any;

      if (res?.data?.success) {
        setLoading(false);
        handleModalClose();

        return toast.success(res.data.massage);
      }

      if (res?.error) {
        setLoading(false);

        return toast.error(res?.error?.data?.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "something went wrong");
      setLoading(false);
    }
  };

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setRecipePhoto([file]);
    if (file) {
      setImagePreview([]);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="overflow-x-auto my-5 md:my-7 lg:my-10 border-2 rounded-xl">
      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-[#1BEEA2] to-[#17b47a] text-black">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Image</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium">
              Cooking Time
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium">
              Category
            </th>
            <th className="px-6 py-3 text-center text-sm font-medium">
              Actions
            </th>
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
                  alt={recipe.title}
                  className="w-14 h-14 object-cover rounded-lg shadow-md"
                  src={recipe.image}
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
        {isModalOpen && (
          <Modal onClose={() => handleModalClose()}>
            <h1 className="text-lg font-medium text-center">
              Update Your Recipe
            </h1>
            {imagePreview.length > 0 && (
              <div className="flex justify-center">
                <Image
                  alt=""
                  className="rounded-lg mt-2"
                  height={200}
                  src={imagePreview[0]}
                  width={200}
                />
              </div>
            )}
            <TTForm onSubmit={handleUpdate}>
              <TTInput
                defaultValue={updateProduct.title}
                label="Title"
                name="title"
              />
              <div
                className={`${instructions.length > 0 && "flex flex-wrap gap-x-2 border-2 px-2 mb-3 rounded-md"} `}
              >
                {instructions.length > 0 &&
                  instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className="my-2 flex justify-between items-center gap-x-3 bg-slate-100 px-2 py-1 rounded-sm"
                    >
                      <h1 className="text-sm font-medium">
                        {instruction.title} {instruction.time} minute
                      </h1>
                      <RxCross2
                        onClick={() => removeInstruction(instruction.title)}
                      />
                    </div>
                  ))}
              </div>
              <div className="flex gap-x-2 mb-3 items-center">
                <Input
                  label="Instruction"
                  name="instruction"
                  size="sm"
                  type="text"
                  value={instruction}
                  variant="bordered"
                  onChange={handleAddInstructionTitle}
                />
                <Input
                  label="Time"
                  name="timer"
                  size="sm"
                  type="number"
                  value={instructionTime}
                  variant="bordered"
                  onChange={handleAddInstructionTime}
                />
                <Button
                  className={`ml-2 bg-[#17D893] font-semibold`}
                  isDisabled={
                    instruction.length > 0 && instructionTime.length > 0
                      ? false
                      : true
                  }
                  size="lg"
                  type="button"
                  onClick={() => handleInstruction()}
                >
                  Add
                </Button>
              </div>
              <div
                className={`${ingredients.length > 0 && "flex flex-wrap gap-x-2 border-2 px-2 mb-3 rounded-md"} `}
              >
                {ingredients.length > 0 &&
                  ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="my-2 flex justify-between items-center gap-x-3 bg-slate-100 px-2 py-1 rounded-sm"
                    >
                      <h1 className="text-sm font-medium">{ingredient}</h1>
                      <RxCross2 onClick={() => removeIngredient(ingredient)} />
                    </div>
                  ))}
              </div>
              <div className="flex items-center">
                <Input
                  label="Add Ingredient"
                  name="ingredient"
                  size="sm"
                  type="text"
                  value={ingredient}
                  variant="bordered"
                  onChange={handleAddIngredient}
                />
                <Button
                  className={`ml-2 bg-[#17D893] font-semibold`}
                  isDisabled={ingredient.length < 1 ? true : false}
                  size="lg"
                  type="button"
                  onClick={() => (
                    setIngredients([...ingredients, ingredient]),
                    setIngredient("")
                  )}
                >
                  Add
                </Button>
              </div>
              <div>
                <label
                  className="py-3 mt-3 text-sm px-2 border bg-slate-200 rounded-md hover:cursor-pointer hover:bg-slate-300 ease-out font-medium text-center block w-full"
                  htmlFor="image"
                >
                  Upload Photo
                </label>
                <Input
                  accept="image/png, image/jpeg"
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={handlePhoto}
                />
              </div>
              <select
                required
                className="w-full border-2 rounded-md text-slate-500 px-2 py-4 mt-3 "
                defaultValue={category}
                onChange={handleSelect}
              >
                <option className="border" value="">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option
                    key={category.key}
                    className="text-gray-900 bg-gray-100 py-2 px-4"
                    value={category.key}
                  >
                    {category.label}
                  </option>
                ))}
              </select>
              <TTInput
                defaultValue={updateProduct.cookingTime.toString()}
                label="Cooking Time (minute)"
                name="cookingTime"
                type="number"
              />
              <textarea
                className="w-full border-2 p-2 rounded-lg mb-2"
                defaultValue={description}
                rows={2}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                className="w-full bg-[#17D893] font-bold text flex-1"
                isLoading={loading}
                type="submit"
              >
                Update Recipe
              </Button>
            </TTForm>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
