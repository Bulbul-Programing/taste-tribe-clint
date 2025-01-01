import { useCountUserAllRecipesQuery } from "@/src/redux/Recipes/recipeManagementApi";

const UserTotalRecipe = () => {
  const { data, isLoading } = useCountUserAllRecipesQuery(undefined);

  if (isLoading) {
    return 0;
  }

  return <span className="text-2xl">{data?.data ? data?.data : 0}</span>;
};

export default UserTotalRecipe;
