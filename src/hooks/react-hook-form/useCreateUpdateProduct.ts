import { yupResolver } from '@hookform/resolvers/yup';
import { ProductType } from 'models/Product';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export interface CreateUpdateProductFields {
  name: string;
  price: number;
  image_path: string;
}

interface Props {
  defaultValues?: ProductType;
}

export const useCreateUpdateProductForm = ({ defaultValues }: Props) => {
  const CreateProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required'),
    image_path: Yup.mixed()
      .test('required', 'You need to provide a file', (file) => {
        // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
        if (file) return true;
        return false;
      })
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: '',
      price: 0,
      image_path: '',
      ...defaultValues,
    },
    mode: 'onSubmit',
    resolver: yupResolver(CreateProductSchema),
  });

  return {
    handleSubmit,
    errors,
    reset,
    control,
  };
};

export type CreateUpdateProductForm = ReturnType<
  typeof useCreateUpdateProductForm
>;
