import { baseApi } from "../api/baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRecipe: builder.mutation({
      query: (recipeInfo) => ({
        url: "/recipe/create",
        method: "POST",
        body: recipeInfo,
      }),
    }),
  }),
});

export const { useCreateRecipeMutation } = recipeApi;
