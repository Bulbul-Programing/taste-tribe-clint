import React from "react";

import RecipeDetailsComponent from "@/src/components/RecipeDetails/RecipeDetailsComponent";

interface RecipePageProps {
  params: Promise<{ recipeId: string }>;
}
const RecipeDetails: React.FC<RecipePageProps> = ({ params }) => {
  const recipeId = React.use(params).recipeId;

  return (
    <div>
      <RecipeDetailsComponent recipeId={`${recipeId}`} />
    </div>
  );
};

export default RecipeDetails;
