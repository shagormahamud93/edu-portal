"use client";

import { useCreateCourseMutation } from "@/src/redux/features/course/courseApi";
import { useAppSelector } from "@/src/redux/hooks";
import { currentUserInfo } from "@/src/redux/slices/userInfoSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const TeacherMain = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [createCourse, { isLoading }] = useCreateCourseMutation();
    const teacher = useAppSelector(currentUserInfo);
    const teacherId = teacher?._id;
    const teacherName = teacher?.name;
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();



    const onSubmit = async (data: any) => {
        if (!imageFile) {
            toast.error("Please select an image");
            return;
        }

        const formData = new FormData();
        const course = {
            title: data.title,
            shortDescription: data.shortDescription,
            fullDescription: data.fullDescription,
            price: Number(data.price),
            category: data.category,
            duration: data.duration,
            teacherId,
            teacherName,
            isPublished: true,
        };
        formData.append("course", JSON.stringify(course)); // <-- backend er schema er jonno
        formData.append("image", imageFile);

        try {
            const res = await createCourse(formData).unwrap();

            if (res.success) {
                toast.success(res.message || "Course created successfully!");
                reset();
                setPreview(null);
                setImageFile(null);
            } else {
                toast.error(res.message || "Something went wrong!");
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to create course");
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
            <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl mx-auto border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    🧑‍🏫 Create New Course
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Course Title
                        </label>
                        <input
                            type="text"
                            {...register("title", { required: "Title is required" })}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter course title"
                        />
                        {errors.title?.message && typeof errors.title.message === "string" && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Short Description
                        </label>
                        <input
                            type="text"
                            {...register("shortDescription", {
                                required: "Short description is required",
                            })}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter short description"
                        />

                        {errors.shortDescription?.message && typeof errors.shortDescription.message === "string" && (
                            <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>
                        )}


                    </div>

                    {/* Full Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Full Description
                        </label>
                        <textarea
                            {...register("fullDescription", {
                                required: "Full description is required",
                            })}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                            placeholder="Write full description"
                        ></textarea>

                        {errors.fullDescription?.message && typeof errors.fullDescription.message === "string" && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullDescription.message}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            {...register("price", { required: "Price is required" })}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter price"
                        />
                        {errors.price?.message && typeof errors.price.message === "string" && (
                            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                        )}

                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            {...register("category", { required: "Category is required" })}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter category (e.g., Frontend, Backend)"
                        />
                        {errors.category?.message && typeof errors.category.message === "string" && (
                            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Duration
                        </label>
                        <input
                            type="text"
                            {...register("duration", { required: "Duration is required" })}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="e.g., 20 hours"
                        />
                        {errors.duration?.message && typeof errors.duration.message === "string" && (
                            <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                        />
                        {preview && (
                            <div className="mt-3">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg shadow-sm border"
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Creating..." : "Create Course"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeacherMain;
