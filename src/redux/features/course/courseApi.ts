
import { baseApi } from "../../api/baseApi";

const courseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (formData: FormData) => ({
                url: "/courses",
                method: "POST",
                body: formData,
            }),
        }),
        getAllCourse: builder.query({
            query: () => ({
                url: "/courses",
                method: "GET",
            }),
        }),
        singleCourse: builder.query({
            query: ({ id }) => ({
                url: `/courses/${id}`,
                method: "GET",
            }),
        }),
        addRating: builder.mutation({
            query: ({ courseId, studentId, rating, comment }) => ({
                url: `/courses/${courseId}/rating`,
                method: "POST",
                body: { studentId, rating, comment },
            }),
        }),
        enrollCourse: builder.mutation({
            query: ({ courseId, studentId }) => ({
                url: `/courses/${courseId}/enroll`,
                method: "POST",
                body: { studentId },
            }),
        }),
    })
})

export const { useCreateCourseMutation, useGetAllCourseQuery, useSingleCourseQuery, useAddRatingMutation, useEnrollCourseMutation } = courseApi;