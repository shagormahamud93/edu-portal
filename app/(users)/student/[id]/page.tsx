"use client";
import {
  useSingleCourseQuery,
  useAddRatingMutation,
  useEnrollCourseMutation,
} from "@/src/redux/features/course/courseApi";
import { Loader2, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { currentUserInfo } from "@/src/redux/slices/userInfoSlice";
import { useAppSelector } from "@/src/redux/hooks";
import CommonHeader from "@/src/layouts/CommonHeader";

const CourseDetails = () => {
  const { id } = useParams();
  const user = useAppSelector(currentUserInfo);
  const { data, isLoading, isError, refetch } = useSingleCourseQuery({ id });
  const [addRating, { isLoading: submitting }] = useAddRatingMutation();
  const [enrollCourse, { isLoading: enrolling }] = useEnrollCourseMutation();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const studentId = user?._id;

  // =============== Loading & Error ===============
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
          Failed to load course details
        </p>
      </div>
    );
  }

  const course = data?.data;

  // =============== Handle Enroll ===============
  const handleEnroll = async () => {
    if (!studentId) {
      toast.error("Please log in to enroll in a course.");
      return;
    }

    try {
      await enrollCourse({ courseId: id, studentId }).unwrap();
      toast.success("Successfully enrolled in this course! 🎉");
      refetch();
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.message || "Failed to enroll. You may already be enrolled."
      );
    }
  };

  // =============== Handle Review Submit ===============
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      toast.error("Please provide a rating and a comment.");
      return;
    }

    try {
      await addRating({ courseId: id, studentId, rating, comment }).unwrap();
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      refetch();
    } catch (error) {
      toast.error("Failed to submit review.");
    }
  };

  // =============== Render ===============
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 lg:px-20">
      <CommonHeader />
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-80">
          <img
            src={`http://localhost:5000${course.image}`}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {course.title}
          </h1>
          <p className="text-gray-600 mb-4">{course.category}</p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {course.fullDescription}
          </p>

          {/* Instructor & Price */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-lg font-medium text-gray-700">
              👨‍🏫 Instructor: {course.teacher?.name || "Unknown"}
            </p>
            <p className="text-lg font-semibold text-blue-600">
              💰 ${course.price}
            </p>
          </div>

          {/* ===== Enroll Button ===== */}
          <div className="mb-8">
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow transition disabled:opacity-70"
            >
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </button>
          </div>

          {/* Rating Display */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-5 h-5 ${
                  index < course.avgRating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill={index < course.avgRating ? "currentColor" : "none"}
              />
            ))}
            <span className="ml-2 text-gray-700">
              {course.avgRating?.toFixed(1) || 0} / 5
            </span>
          </div>

          {/* ===== Reviews ===== */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              💬 Student Reviews
            </h2>

            {course.reviews && course.reviews.length > 0 ? (
              <div className="space-y-4">
                {course.reviews.map((review: any, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-100 rounded-lg p-4 bg-gray-50"
                  >
                    <p className="text-gray-800 font-medium mb-1">
                      {review.studentName}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {review.comment}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill={
                            i < review.rating ? "currentColor" : "none"
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>

          {/* ===== Review Form ===== */}
          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              ✍️ Write a Review
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating */}
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <Star
                      key={index}
                      className={`w-7 h-7 cursor-pointer transition ${
                        starValue <= (hover || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill={
                        starValue <= (hover || rating)
                          ? "currentColor"
                          : "none"
                      }
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(starValue)}
                    />
                  );
                })}
              </div>

              {/* Comment */}
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
