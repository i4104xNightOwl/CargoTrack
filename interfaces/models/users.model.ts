export enum UserStatus {
    ACTIVE = 1,
    INACTIVE = 0,
    BANNED = 2
}

export interface IUsers {
    id: number;
    username: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}