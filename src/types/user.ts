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
export type User = Omit<UserDocument, '_id' | 'createdAt' | 'updatedAt'> & {
  id: string;
};

// create user DTO
export type CreateUserInput = Pick<
  UserDocument,
  'firstName' | 'lastName' | 'email'
>;

// change password
export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}
