import { yupResolver } from '@hookform/resolvers/yup';
import { UserType } from 'models/Auth';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export enum UserAccess {
  USER = 'user',
  ADMIN = 'admin',
}

export interface CreateUserFields {
  email: string;
  password: string;
  confirm_password: string;
  access: UserAccess;
}

interface Props {
  defaultValues?: UserType;
}

export const useCreateUserForm = ({ defaultValues }: Props) => {
  const CreateUserSchema = Yup.object().shape({
    email: Yup.string().email().required('Please enter a valid email'),
    password: Yup.string()
      .matches(
        /^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/,
        'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters.',
      )
      .required(),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords do not match')
      .required('Passwords do not match'),
    access: Yup.string()
      .oneOf([UserAccess.USER, UserAccess.ADMIN], 'Invalid value')
      .required('Access field is required'),
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      access: UserAccess.USER,
      ...defaultValues,
    },
    mode: 'onSubmit',
    resolver: yupResolver(CreateUserSchema),
  });

  return {
    handleSubmit,
    errors,
    reset,
    control,
  };
};

export type CreateUserForm = ReturnType<typeof useCreateUserForm>;
