export type TRecipeComment = {
  _id: string;
  userId: UserId;
  recipeId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface UserId {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  followers: string[];
  following: string[];
  profilePicture: string;
  premiumStatus: boolean;
  __v: number;
  transitionId: string;
}
