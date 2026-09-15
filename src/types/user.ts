import { Types } from 'mongoose';
// database model
export interface UserDocument {
  _id: Types.ObjectId;
  name: string;
  email: string;
  mustChangePassword: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// frontend model
export interface User {
  id: string;
  name: string;
  email: string;
  mustChangePassword: boolean;
}

// create user DTO
export interface CreateUserInput {
  name: string;
  email: string;
}

// change password
export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}
