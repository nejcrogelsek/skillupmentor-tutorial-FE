import { UserAccess } from 'hooks/react-hook-form/useCreateUpdateUser';

export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  access: UserAccess;
  avatar?: string;
};
