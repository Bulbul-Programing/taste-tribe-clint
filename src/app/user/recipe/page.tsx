"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

import createRecipeSchema from "@/src/schemas/createRecipeSchema";
import Modal from "@/src/components/modal";
import TTSelect from "@/src/components/Form/TTSelect";
import TTTextArea from "@/src/components/Form/TTTextArea";
import TTInput from "@/src/components/Form/TTInput";
import TTForm from "@/src/components/Form/TTForm";
import { hostImages } from "@/src/utils/ImageUpload";
import { toast } from "sonner";
import { useAppSelector } from "@/src/redux/hooks";
import { useCurrentToken } from "@/src/redux/features/Auth/authSlice";
import { verifyToken } from "@/src/utils/veryfyToken";
import { TDecodedUser } from "@/src/types/decodedUser";
import { useCreateRecipeMutation } from "@/src/redux/Recipes/recipeManagementApi";
import AllRecipes from "@/src/components/DRecipe/AllRecipes";

const Recipe = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [instruction, setInstruction] = useState<string>("");
    const [instructionTime, setInstructionTime] = useState("");
    const [instructions, setInstructions] = useState<{ title: string, time: string }[] | []>([]);
    const [ingredient, setIngredient] = useState<string>("");
    const [ingredients, setIngredients] = useState<string[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    const [category, setCategory] = useState('')
    const [recipePhoto, setRecipePhoto] = useState<File[] | []>([]);
    const userToken = useAppSelector(useCurrentToken);
    const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});
    const [createRecipe] = useCreateRecipeMutation()

    useEffect(() => {
        if (userToken) {
            const decodedToken = verifyToken(userToken);
            setUserInfo(decodedToken)
        }
    }, [userToken]);

    const handleModalClose = () => {
        setIsModalOpen(false),
            setIngredients([]);
        setImagePreview([]);
        setRecipePhoto([]);
        setIngredient('')
        setCategory('')
        setInstruction('')
        setInstructionTime('')
        setInstructions([])
        setLoading(false)
    };

    const handleRecipe: SubmitHandler<FieldValues> = async (data) => {
        if (instructions.length < 1) {
            return toast.error('Instructions are not available. Please fill the instructions')
        }
        if (ingredients.length < 1) {
            return toast.error('Ingredients are not available. Please fill the ingredients')
        }
        if (recipePhoto.length < 1) {
            return toast.error('Recipe Photo is not available. Please upload a photo')
        }
        setLoading(true);
        data.ingredients = ingredients;
        data.cookingTime = Number(data.cookingTime)
        data.instructions = instructions;
        data.userId = userInfo.id || '';
        data.category = category
        try {
            let recipePhotoLink;

            if (recipePhoto) {
                const uploadPhoto = await hostImages(recipePhoto);
                recipePhotoLink = uploadPhoto[0];
            }
            data.image = recipePhotoLink
            const res = await createRecipe(data) as any
            console.log(res);
            if (res?.data?.success) {
                setLoading(false);
                handleModalClose()
                return toast.success(res.data.massage)
            }

            if (res?.error) {
                setLoading(false);
                return toast.error(res.error.message.message)
            }
        }
        catch (err) {
            console.error(err);
            toast.error('something went wrong')
            setLoading(false);
        }


    };

    const handleAddIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIngredient(e.target.value);
    };
    const handleAddInstructionTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInstruction(e.target.value);
    };

    const handleInstruction = () => {
        if (instruction && instructionTime) {
            const instructionData = {
                title: instruction,
                time: instructionTime,
            }
            setInstructions((prev) => [...prev, instructionData]);
            setInstruction("");
            setInstructionTime("");
        }
    }

    const handleAddInstructionTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInstructionTime(e.target.value);
    }

    const removeInstruction = (instruction: string) => {
        const removeInstruction = instructions.filter((ing) => ing.title !== instruction);

        setInstructions(removeInstruction);
    };
    const removeIngredient = (ingredient: string) => {
        const removeIngredient = ingredients.filter((ing) => ing !== ingredient);

        setIngredients(removeIngredient);
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

    const categories = [
        { key: "appetizers", label: "Appetizers" },
        { key: "breakfast", label: "Breakfast" },
        { key: "desserts", label: "Desserts" },
        { key: "beverages", label: "Beverages" },
        { key: "main_courses", label: "Main Courses" },
        { key: "side_dishes", label: "Side Dishes" },
        { key: "snacks", label: "Snacks" },
        { key: "soups", label: "Soups" },
        { key: "salads", label: "Salads" },
        { key: "vegetarian", label: "Vegetarian" },
        { key: "vegan", label: "Vegan" },
        { key: "gluten_free", label: "Gluten-Free" },
        { key: "seafood", label: "Seafood" },
        { key: "meat", label: "Meat" },
        { key: "poultry", label: "Poultry" },
        { key: "pasta", label: "Pasta" },
        { key: "rice_and_grains", label: "Rice and Grains" },
        { key: "baking", label: "Baking" },
        { key: "holiday", label: "Holiday" },
        { key: "international", label: "International" }
    ];

    return (
        <div className="my-4">
            <div className="bg-cover rounded-md bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/depy0i4bl/image/upload/v1731513169/brooke-lark-of0pMsWApZE-unsplash_kxhhnb.jpg')]">
                <h1 className="bg-black/50 py-20 rounded-md text-3xl font-bold text-center text-white">
                    My Recipe
                </h1>
            </div>
            <div className="my-3 flex justify-between">
                <h1 className="text-lg font-bold bg-[#1BEEA2] py-1 px-2 rounded-md">
                    Total Recipe : <span className="text-2xl">15</span>
                </h1>
                <Button
                    className="bg-[#1BEEA2] font-semibold text-lg"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Recipe
                </Button>
            </div>
            <div>
                {isModalOpen && (
                    <Modal width={400} onClose={() => handleModalClose()}>
                        <h1 className="text-lg font-medium text-center">Create Recipe.</h1>
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
                        <TTForm
                            resolver={zodResolver(createRecipeSchema)}
                            onSubmit={handleRecipe}
                        >
                            <TTInput label="Recipe Title" name="title" type="string" />
                            <div
                                className={`${instructions.length > 0 && "flex flex-wrap gap-x-2 border-2 px-2 mb-3 rounded-md"} `}
                            >
                                {instructions.length > 0 &&
                                    instructions.map((instruction, index) => (
                                        <div
                                            key={index}
                                            className="my-2 flex justify-between items-center gap-x-3 bg-slate-100 px-2 py-1 rounded-sm"
                                        >
                                            <h1 className="text-sm font-medium">{instruction.title} {' '} {instruction.time} minute</h1>
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
                                    isDisabled={instruction.length > 0 && instructionTime.length > 0 ? false : true}
                                    size="lg"
                                    type="button"
                                    onClick={() => (
                                        handleInstruction()
                                    )}
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
                            <select required className="w-full border-2 rounded-md text-slate-500 px-2 py-4 mt-3 " onChange={handleSelect}>
                                <option className="border" value="">Select Category</option>
                                {categories.map((category) => (
                                    <option className="text-gray-900 bg-gray-100 py-2 px-4" key={category.key} value={category.key}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                            <TTInput
                                label="Cooking Time (minute)"
                                name="cookingTime"
                                type="number"
                            />
                            <TTTextArea label="Description" name="description" />
                            <Button
                                className="w-full bg-[#17D893] font-bold text flex-1"
                                isLoading={loading}
                                type="submit"
                            >
                                Create Recipe
                            </Button>
                        </TTForm>
                    </Modal>
                )}
            </div>
            <div>
                <AllRecipes />
            </div>
        </div>
    );
};

export default Recipe;
