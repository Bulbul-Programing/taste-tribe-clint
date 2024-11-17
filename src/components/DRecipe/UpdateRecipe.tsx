"use client"
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { tempData } from "./AllRecipes";
import Modal from "../modal";
import TTForm from "../Form/TTForm";
import TTInput from "../Form/TTInput";
import { TRecipe } from "@/src/types/recipe";

type Props = {
    modalState: boolean;
    updateProductInfo: TRecipe;
};

const UpdateRecipe = ({ modalState, updateProductInfo }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(modalState)
    const [updateProduct, setUpdateProduct] = useState(tempData)
    
    console.log(updateProductInfo, isModalOpen);
    const handleModalClose = () => {
        setIsModalOpen(false)
        setUpdateProduct(tempData)
    }

    const handleUpdate: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    }
    return (
        <div>
            {
                isModalOpen && (
                    <Modal
                        onClose={() => handleModalClose()}
                    >
                        <TTForm onSubmit={handleUpdate}>
                            <TTInput label="Title" name="title" defaultValue={updateProduct.title} />
                        </TTForm>
                    </Modal>
                )
            }
        </div>
    );
};

export default UpdateRecipe;