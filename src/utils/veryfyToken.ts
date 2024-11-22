import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  const decoded = jwtDecode(token) as any;

  const nowTime = Date.now() / 1000;

  if (decoded?.exp < nowTime) {
    return undefined;
  }

  return decoded;
};
