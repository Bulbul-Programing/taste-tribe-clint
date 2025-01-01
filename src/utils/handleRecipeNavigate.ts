import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { TDecodedUser } from "@/src/types/decodedUser";
import { TRecipe } from "@/src/types/recipe";

export const handleNavigate = (
  data: TRecipe,
  userInfo: TDecodedUser | null,
  router: AppRouterInstance,
) => {
  if (data.premiumStatus === false) {
    return router.push(`/recipeDetails/${data._id}`);
  }

  if (data.premiumStatus) {
    if (!userInfo?.email) {
      return router.push(`/login?redirect=recipes`);
    }

    if (userInfo?.premiumStatus === false) {
      return router.push(
        `/user/memberships?redirect=recipeDetails/${data._id}`,
      );
    }

    if (userInfo?.premiumStatus) {
      return router.push(`/recipeDetails/${data._id}`);
    }
  }
};
