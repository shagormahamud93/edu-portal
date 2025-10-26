"use client";
import { useGetAllCourseQuery } from "@/src/redux/features/course/courseApi";
import CommonHeader from "@/src/layouts/CommonHeader";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const StudentCourseList = () => {
    const { data, isLoading, isError } = useGetAllCourseQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const Router = useRouter();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500 text-lg font-semibold">
                    Failed to load courses
                </p>
            </div>
        );
    }

    const courses = data?.data || [];
    console.log("course list :", courses);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
            {/* ===== Header Section ===== */}
            <CommonHeader />
            <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                🎓 Student Course List
            </h1>

            {courses.length === 0 ? (
                <p className="text-center text-gray-500">No courses available yet.</p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {courses.map((course: any) => (
                        <div
                            key={course._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
                        >
                            {/* Image Section */}
                            <div className="relative w-full h-48">
                                <img
                                    src={`http://localhost:5000${course.image}`}
                                    alt={course.title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                                        {course.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                                        {course.shortDescription}
                                    </p>

                                    <div className="flex items-center justify-between text-sm mb-3">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">
                                            {course.category}
                                        </span>
                                        <span className="text-gray-500">
                                            ⏱ {course.duration}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm text-gray-600">
                                            👨‍🏫 {course.teacher?.name || "Unknown"}
                                        </p>
                                        <p className="text-lg font-semibold text-blue-600">
                                            ${course.price}
                                        </p>
                                    </div>
                                </div>

                                {/* Button */}
                                <button
                                    onClick={() => Router.push(`/course/${course._id}`)}
                                    className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentCourseList;
