import { Types } from 'mongoose';

export interface DayDocument {
  _id: Types.ObjectId;
  date: Date;
  heading: string;
  text: string;
  linkText?: string;
  link?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Day = Omit<
  DayDocument,
  '_id' | 'date' | 'createdAt' | 'updatedAt'
> & {
  id: string;
  date: string;
};

export interface CreateDayInput {
  date: string;
  heading: string;
  text: string;
  linkText?: string;
  link?: string;
}

export type UpdateDayInput = CreateDayInput;
