import { apiRoutes } from 'constants/apiConstants';
import { LoginUserFields } from 'hooks/react-hook-form/useLogin';
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister';
import { UserType } from 'models/Auth';

import { apiRequest } from './Api';

export const fetchUser = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.FETCH_USER);

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data);

export const register = async (data: RegisterUserFields) =>
  apiRequest<RegisterUserFields, void>('post', apiRoutes.SIGNUP, data);

export const signout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.SIGNOUT);

export const fetchUsers = async () =>
  apiRequest<null, UserType[]>('get', apiRoutes.FETCH_USERS);
