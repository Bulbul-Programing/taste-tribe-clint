import { baseApi } from "../api/baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allRecipes: builder.query({
      query: () => ({
        url: "/recipe",
        method: "GET",
      }),
      providesTags: ["recipe"],
    }),
    createRecipe: builder.mutation({
      query: (recipeInfo) => {
        return {
          url: "/recipe/create",
          method: "POST",
          body: recipeInfo,
        };
      },
      invalidatesTags: ["recipe"],
    }),
    updateRecipe: builder.mutation({
      query: (recipeInfo) => {
        return {
          url: `/recipe/${recipeInfo.id}`,
          method: "PUT",
          body: recipeInfo.updateData,
        };
      },
      invalidatesTags: ["recipe"],
    }),
    deleteRecipe: builder.mutation({
      query: (id) => {
        return {
          url: `/recipe/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["recipe"],
    }),
  }),
});

export const {
  useCreateRecipeMutation,
  useAllRecipesQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApi;
