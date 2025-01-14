import { TUser } from "./decodedUser";

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
  premiumStatus: boolean;
  createdAt: string;
  updatedAt: string;
  blockStatus: boolean;
};
export type TAdminRecipe = {
  _id: string;
  userId: TUser;
  title: string;
  description: string;
  ingredients: string[];
  instructions: TInstruction[];
  cookingTime: number;
  category: string;
  image: string;
  premiumStatus: boolean;
  createdAt: string;
  updatedAt: string;
  blockStatus: boolean;
};
