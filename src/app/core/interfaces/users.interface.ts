export interface IUser {
    username: string,
    email: string,
    password: string,
    phone: string;
}

export interface UserVerification {
    otp: string
}

export interface UserResetPassword {
    email: string;
    newPassword: string;
}

export type IUserCredentials = Omit<IUser, "email">
export type UserEmail = Omit<IUser, "username" | "password" | "phone">
export type UserWithoutUsername = Omit<IUser, "username">