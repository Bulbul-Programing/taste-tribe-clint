"use client"
import AllRecipes from '@/src/components/DRecipe/AllRecipes';
import { useAdminBlockRecipeMutation, useDeleteRecipeMutation, useGetAllRecipesQuery } from '@/src/redux/Recipes/recipeManagementApi';
import { TAdminRecipe } from '@/src/types/recipe';
import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiTrash } from 'react-icons/fi';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import Recipe from '../../user/recipe/page';

const AdminRecipePage = () => {
    return (
        <div>
            <Recipe />
        </div>
    );
};

export default AdminRecipePage;