export type UserRole = "student" | "teacher" | "admin";

export default interface IUser {
    _id?: string;
    name: string;
    email: string;
    passwordHash?: string;
    role: UserRole;
    enrolledCourses?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted: boolean;
}
