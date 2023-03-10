import { apiRoutes } from 'constants/apiConstants'
import {
  CreateUserFields,
  UpdateUserFields,
} from 'hooks/react-hook-form/useCreateUpdateUser'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'
import { UserType } from 'models/Auth'

import { apiRequest } from './Api'

export const fetchUser = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.FETCH_USER)

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data)

export const deleteUser = async (id: string) =>
  apiRequest<string, UserType>('delete', `${apiRoutes.USERS_PREFIX}/${id}`)

export const register = async (data: RegisterUserFields) =>
  apiRequest<RegisterUserFields, void>('post', apiRoutes.SIGNUP, data)

export const createUser = async (data: CreateUserFields) =>
  apiRequest<CreateUserFields, void>('post', apiRoutes.USERS_PREFIX, data)

export const uploadAvatar = async (formData: FormData, id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${id}`,
    formData,
  )

export const getAvatar = async () =>
  apiRequest<undefined, void>('get', apiRoutes.GET_AVATAR_IMAGE)

export const updateUser = async (data: UpdateUserFields, id: string) =>
  apiRequest<UpdateUserFields, void>(
    'patch',
    `${apiRoutes.USERS_PREFIX}/${id}`,
    data,
  )

export const signout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)

export const fetchUsers = async (pageNumber: number) =>
  apiRequest<null, UserType[]>(
    'get',
    `${apiRoutes.FETCH_USERS}?page=${pageNumber}`,
  )

export const refreshTokens = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.REFRESH_TOKENS)
