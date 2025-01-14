export type TDecodedUser = {
  email: string;
  role: string;
  profilePicture: string;
  iat: number;
  exp: number;
  premiumStatus: boolean;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  followers: string[];
  following: any[];
  profilePicture: string;
  premiumStatus: boolean;
  blockedUser: boolean;
};
