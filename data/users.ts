export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const users: User[] = [
  {
    id: '1',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@user.com',
  },
  {
    id: '2',
    firstName: 'Test',
    lastName: 'User1',
    email: 'test@user1.com',
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Lindström',
    email: 'davidl@gmail.com',
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Lindström',
    email: 'davidl@gmail.com',
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Lindström',
    email: 'davidl@gmail.com',
  },
];
