import type { User } from '@/types/user';
export const users: User[] = [
  {
    id: '1',
    firstName: 'Anna',
    lastName: 'Ek',
    email: 'anna.ek@example.com',
    mustChangePassword: false,
  },
  {
    id: '2',
    firstName: 'Morteza',
    lastName: 'Ahmadianmanzary',
    email: 'morteza.ahmadianmanzary@example.com',
    mustChangePassword: true,
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Lindström',
    email: 'david.lindstrom@example.com',
    mustChangePassword: false,
  },
];
