import { apiRoutes } from 'constants/apiConstants';
import { CreateUpdateProductFields } from 'hooks/react-hook-form/useCreateUpdateProduct';

import { apiRequest } from './Api';

export const createProduct = async (data: CreateUpdateProductFields) =>
  apiRequest<CreateUpdateProductFields, void>(
    'post',
    apiRoutes.PRODUCT_PREFIX,
    data,
  );

export const updateProduct = async (
  data: CreateUpdateProductFields,
  id: string,
) =>
  apiRequest<CreateUpdateProductFields, void>(
    'patch',
    `${apiRoutes.PRODUCT_PREFIX}/${id}`,
    data,
  );
