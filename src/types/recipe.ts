type TInstruction = {
  title: string;
  time: string;
  _id: string;
};

export type TRecipe = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: TInstruction[];
  cookingTime: number;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};
