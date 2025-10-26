"use client";
import { useState } from "react";
import { useGetAllUserQuery } from "@/src/redux/features/user/userApi";
import { useGetAllCourseQuery } from "@/src/redux/features/course/courseApi";
import { Loader2 } from "lucide-react";

const AdminMain = () => {
  const [role, setRole] = useState("student");
  const { data, isLoading, isError } = useGetAllUserQuery({ role: role });
  const { data: courseData, isLoading: courseLoading } =
    useGetAllCourseQuery(undefined);

  const users = data?.data || [];
  const courses = courseData?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      {/* ===== Header Section ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          👨‍💼 Admin Dashboard
        </h2>

        {/* Role Filter */}
        <div className="flex items-center gap-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 shadow-sm"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <button
            onClick={() => setRole(role)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition duration-200"
          >
            Search
          </button>
        </div>
      </div>

      {/* ===== 2-Column Layout ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ==== USER TABLE ==== */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 p-4 bg-blue-50 border-b border-gray-200">
            👥 All {role.charAt(0).toUpperCase() + role.slice(1)}s
          </h3>

          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin text-blue-600 w-6 h-6" />
              <p className="text-gray-500 ml-2">Loading users...</p>
            </div>
          ) : isError ? (
            <p className="text-center text-red-500 py-6">
              Failed to load users
            </p>
          ) : users.length > 0 ? (
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">#</th>
                  <th className="px-6 py-3 text-left font-semibold">Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Email</th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Enrolled Courses
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Course Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any, index: number) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-blue-50/40 transition"
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3 font-medium text-gray-800">
                      {user.name}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{user.email}</td>
                    <td className="px-6 py-3">
                      {user.enrolledCourses?.length > 0 ? (
                        <span className="text-green-600 font-medium">
                          {user.enrolledCourses.length} course(s)
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">No courses</span>
                      )}
                    </td>

                    <td className="px-6 py-3">
                      {user.enrolledCourses?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {user.enrolledCourses.map((course: any, idx: number) => (
                            <span
                              key={course._id ?? idx}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                            >
                              {course?.category || "N/A"}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">No categories</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 py-6">
              No {role}s found.
            </p>
          )}
        </div>

        {/* ==== COURSE REVIEWS ==== */}
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">
            📘 Course Reviews
          </h3>

          {courseLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin text-blue-600 w-6 h-6" />
              <p className="text-gray-500 ml-2">Loading courses...</p>
            </div>
          ) : courses.length > 0 ? (
            <div className="space-y-5">
              {courses.map((course: any) => (
                <div
                  key={course._id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition bg-gray-50"
                >
                  {/* Title */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">
                      {course.title}
                    </h4>
                    <span className="text-sm text-gray-500">
                      ⏱ {course.duration}
                    </span>
                  </div>

                  {/* Teacher */}
                  <p className="text-sm text-gray-600 mt-1">
                    Instructor:{" "}
                    <span className="font-medium text-gray-800">
                      {course.teacher?.name || "N/A"}
                    </span>
                  </p>

                  {/* Reviews */}
                  {course.ratings && course.ratings.length > 0 ? (
                    <div className="mt-3 border-t pt-3 space-y-3">
                      {course.ratings.map((r: any, i: number) => (
                        <div
                          key={i}
                          className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm"
                        >
                          <p className="text-gray-700 text-sm italic">
                            “{r.comment}”
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm text-yellow-600 font-medium">
                              ⭐ {r.rating}/5
                            </span>
                            <span className="text-xs text-gray-400">
                              {r.studentId}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic mt-2 text-sm">
                      No reviews yet
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-6">
              No courses found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMain;

