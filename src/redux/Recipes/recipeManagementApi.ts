import { baseApi } from "../api/baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipes: builder.query({
      query: (args) => {
        const param = new URLSearchParams();

        if (args) {
          const key = Object.keys(args);
          const value = Object.values(args);

          for (let index = 0; index < key.length; index++) {
            param.append(key[index], value[index] as string);
          }
        }

        return {
          url: "/recipe",
          method: "GET",
          params: param,
        };
      },
      providesTags: ["recipe"],
    }),
    getRecipeDetails: builder.query({
      query: (recipeId) => {
        return {
          url: `/recipe/details/${recipeId}`,
          method: "GET",
        };
      },
      providesTags: ["recipeDetails"],
    }),
    userAllRecipes: builder.query({
      query: () => ({
        url: "/recipe/user",
        method: "GET",
      }),
      providesTags: ["recipe"],
    }),
    countUserAllRecipes: builder.query({
      query: () => ({
        url: "/recipe/user/count",
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
    addComment: builder.mutation({
      query: (data) => {
        return {
          url: `/comment/create`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["comment"],
    }),
    deleteComment: builder.mutation({
      query: (recipeId) => {
        return {
          url: `/comment/${recipeId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comment"],
    }),

    getRecipeComments: builder.query({
      query: (recipeId) => ({
        url: `/comment/${recipeId}`,
        method: "GET",
      }),
      providesTags: ["comment"],
    }),
    addVoteInRecipe: builder.mutation({
      query: (data) => {
        return {
          url: `/recipe/voting/${data.recipeId}`,
          method: "PUT",
          body: { voteType: data.voteType },
        };
      },
      invalidatesTags: ["recipeDetails", 'recipe'],
    }),
  }),
});

export const {
  useGetAllRecipesQuery,
  useGetRecipeDetailsQuery,
  useCreateRecipeMutation,
  useUserAllRecipesQuery,
  useCountUserAllRecipesQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useAddCommentMutation,
  useGetRecipeCommentsQuery,
  useAddVoteInRecipeMutation,
  useDeleteCommentMutation,
} = recipeApi;
