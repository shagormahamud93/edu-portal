"use client";

import { useAppDispatch } from "../src/redux/hooks";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCreateUserMutation } from "@/src/redux/features/user/userApi";
import { getLoginUserInfo } from "@/src/redux/slices/userInfoSlice";

export default function Home() {
  const [addUser, { isLoading }] = useCreateUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const userData = {
        user: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        },
      };

      const res = await addUser(userData).unwrap();

      if (res?.success) {
        // Save to Redux
        dispatch(getLoginUserInfo(res.data));

        // Save to localStorage for persistence
        localStorage.setItem("userInfo", JSON.stringify(res.data));

        toast.success(res?.message || "User created successfully!");

          //  Role-based redirect
        const role = res?.data?.role;
        if (role === "student") {
          router.push("/course");
        } else if (role === "teacher") {
          router.push("/teacher");
        } else if (role === "admin") {
          router.push("/admin");
        } else {
          router.push("/"); 
        }

        reset();
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create user!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Create User Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{`${errors.name.message}`}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{`${errors.email.message}`}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{`${errors.password.message}`}</p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Role
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{`${errors.role.message}`}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-200 ${isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
