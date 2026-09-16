import { Types } from 'mongoose';
// database model
export interface UserDocument {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  mustChangePassword: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// frontend model
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mustChangePassword: boolean;
}

// create user DTO
export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
}

// change password
export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}
