import type { User } from '@/types/user';

// Edit and delete always act on a user, create never does.
export type ModalState =
  | { mode: 'create' }
  | { mode: 'edit'; user: User }
  | { mode: 'delete'; user: User };
