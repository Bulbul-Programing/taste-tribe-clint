import { baseApi } from "../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    isUserExist: builder.query({
      query: (args) => {
        return {
          url: `/auth/isExistUser/${args}`,
          method: "GET",
        };
      },
    }),
    userInfo: builder.query({
      query: (args) => {
        return {
          url: `/auth/userData/${args}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    registerUser: builder.mutation({
      query: (args) => {
        return {
          url: "/user/signup",
          method: "POST",
          body: args,
        };
      },
      invalidatesTags: ["user"],
    }),
    loginUser: builder.mutation({
      query: (args) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: args,
        };
      },
    }),
    getAllUser: builder.query({
      query: (query) => {
        const param = new URLSearchParams();

        if (query?.args) {
          const key = Object.keys(query?.args);
          const value = Object.values(query?.args);

          for (let index = 0; index < key.length; index++) {
            param.append(key[index], value[index] as string);
          }
        }

        return {
          url: `/auth/userRole/${query.role}`,
          method: "GET",
          params: param,
        };
      },
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/auth/deleteUser/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
    resetPasswordMailSend: builder.mutation({
      query: (email) => {
        return {
          url: `/resetPassword`,
          method: "POST",
          body: { email },
        };
      },
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation({
      query: (payload) => {
        return {
          url: `/resetPassword`,
          method: "PUT",
          body: payload,
        };
      },
    }),
    updateUserData: builder.mutation({
      query: (payload) => {
        return {
          url: "/user/update",
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["user"],
    }),
    addFollower: builder.mutation({
      query: (payload) => {
        return {
          url: "/user/addFollower",
          method: "post",
          body: payload,
        };
      },
      invalidatesTags: ["user", "recipeDetails"],
    }),
    removeFollower: builder.mutation({
      query: (payload) => {
        return {
          url: "/user/removeFollower",
          method: "post",
          body: payload,
        };
      },
      invalidatesTags: ["user", "recipeDetails"],
    }),
    updateUserStatus: builder.mutation({
      query: (payload) => {
        return {
          url: "/payment/checkout",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useIsUserExistQuery,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUserInfoQuery,
  useResetPasswordMailSendMutation,
  useResetPasswordMutation,
  useUpdateUserDataMutation,
  useUpdateUserStatusMutation,
  useAddFollowerMutation,
  useRemoveFollowerMutation,
} = userManagementApi;
