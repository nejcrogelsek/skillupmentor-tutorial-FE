import { CreateUserFields } from 'hooks/react-hook-form/useCreateUser';
import { UserType } from 'models/Auth';

import { apiRequest } from './Api';

export const fetchUser = async (token: string) =>
  apiRequest<string, UserType>('post', 'auth/social-login', token);

export const login = async (data: { email: string; password: string }) =>
  apiRequest<{ email: string; password: string }, UserType>(
    'post',
    'auth/login',
    data,
  );

export const register = async (data: CreateUserFields) =>
  apiRequest<CreateUserFields, void>('post', 'auth/register', data);

export const resendEmailVerification = async (data: {
  token?: string;
  email?: string;
}) =>
  apiRequest<{ token?: string; email?: string }, void>(
    'post',
    'auth/resend-email-verification',
    data,
  );

export const signout = async () =>
  apiRequest<undefined, void>('post', 'auth/signout');

export const fetchUsers = async () =>
  apiRequest<null, UserType[]>('get', 'users');
