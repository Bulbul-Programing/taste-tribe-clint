import { baseApi } from "../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
      invalidatesTags: ["comment", "recipe", "recipeDetails"],
    }),
    getAllUser: builder.query({
      query: () => {
        return {
          url: `/user/allUsers`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getAllUserCount: builder.query({
      query: () => {
        return {
          url: `/user/allUsers/count`,
          method: "GET",
        };
      },
      providesTags: ["user"],
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
    getAllFollowers: builder.query({
      query: () => {
        return {
          url: "/user/followers",
          method: "GET",
        };
      },
    }),
    getAllFollowing: builder.query({
      query: () => {
        return {
          url: "/user/following",
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getTopFiveFollower: builder.query({
      query: () => {
        return {
          url: "/user/topFiveFollowers",
          method: "GET",
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (id: string) => {
        return {
          url: `/user/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['user']
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetAllUserCountQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUserInfoQuery,
  useResetPasswordMailSendMutation,
  useResetPasswordMutation,
  useUpdateUserDataMutation,
  useUpdateUserStatusMutation,
  useAddFollowerMutation,
  useRemoveFollowerMutation,
  useGetAllFollowersQuery,
  useGetAllFollowingQuery,
  useGetTopFiveFollowerQuery,
  useDeleteUserMutation
} = userManagementApi;
