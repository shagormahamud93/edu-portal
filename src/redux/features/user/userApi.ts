import { baseApi } from "../../../../src/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users",
        method: "POST",
        body: userInfo
      }),
      invalidatesTags: ["User"], // mutation er sathe
    }),
    // for admin route
    getAllUser: builder.query({
      query: ({ role }) => ({
        url: `/users?role=${role}`,
        method: "GET",
      }),
      providesTags: ["User"], // query er sathe
    }),
  })
})

export const { useCreateUserMutation, useGetAllUserQuery } = userApi;
