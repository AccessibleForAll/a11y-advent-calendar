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

type DayBaseInput = {
  date: string;
  heading: string;
  text: string;
};

type DayLinkInput =
  | {
      link?: never;
      linkText?: never;
    }
  | {
      link: string;
      linkText: string;
    };

export type CreateDayInput = DayBaseInput & DayLinkInput;

export type UpdateDayInput = Partial<DayBaseInput> &
  (
    | {
        link?: never;
        linkText?: never;
      }
    | {
        link: string;
        linkText: string;
      }
  );
