import { baseApi } from "../../../../src/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users",
        method: "POST",
        body: userInfo
      }),
    }),
    //for admin route
    getAllUser: builder.query({
      query: ({users}) => ({
        url: `/users?role=${users}`,
        method: "GET",
      }),
    }),
  })
})

export const { useCreateUserMutation, useGetAllUserQuery } = userApi;