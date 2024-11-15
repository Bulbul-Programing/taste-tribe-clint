import { z } from "zod";

const createRecipeSchema = z.object({
  title: z.string().min(1, "Title is required"), // Recipe title, non-empty string
  description: z.string().min(1, "Description is required"), // Recipe description, non-empty string
  // ingredients: z.array(z.string().min(1, "Ingredient cannot be empty")), // Array of ingredients, each string non-empty
  // instruction: z.string().min(1, "Instructions are required"), // Instructions, non-empty string
  cookingTime: z.string().min(1, "Cooking time must be a positive integer"), // Cooking time, positive integer
});

export default createRecipeSchema;
