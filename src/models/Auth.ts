import { UserAccess } from 'hooks/react-hook-form/useCreateUser';

export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  access: UserAccess;
};
