"use client"

import { useGetRecipeDetailsQuery } from "@/src/redux/Recipes/recipeManagementApi";

interface IProps {
    params: {
        recipeId: string;
    };
}
const RecipeDetails = ({ params: { recipeId } }: IProps) => {
    console.log(recipeId);
    console.log('bulbul');
    // const { data } = useGetRecipeDetailsQuery(recipeId, { skip: !recipeId })
    // console.log(data);
    return (
        <div>
            <h1>Recipe details coming.</h1>
        </div>
    );
};

export default RecipeDetails;