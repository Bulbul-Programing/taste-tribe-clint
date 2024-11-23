import { useUserAllRecipesQuery } from '@/src/redux/Recipes/recipeManagementApi';
import { Skeleton } from '@nextui-org/skeleton';

const UserTotalRecipe = () => {
    const { data, isLoading } = useUserAllRecipesQuery(undefined);
    if (isLoading) {
        return <Skeleton className='w-2 h-2'></Skeleton>
    }
    return (
        <span className="text-2xl">{data?.data ? data?.data?.length : 0}</span>
    );
};

export default UserTotalRecipe;