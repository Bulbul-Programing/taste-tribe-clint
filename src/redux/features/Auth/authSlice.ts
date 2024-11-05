import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";

type TAuthState = {
  accessToken: null | string;
  refreshToken: null | string;
};

const initialState: TAuthState = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const token = action.payload;

      state.accessToken = token.accessToken;
      state.refreshToken = token.refreshToken;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.accessToken;
