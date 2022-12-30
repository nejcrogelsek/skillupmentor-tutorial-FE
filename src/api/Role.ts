import { apiRoutes } from 'constants/apiConstants';
import { CreateUpdateRoleFields } from 'hooks/react-hook-form/useCreateUpdateRole';
import { RoleType } from 'models/Role';

import { apiRequest } from './Api';

export const fetchRoles = async () =>
  apiRequest<undefined, RoleType[]>('get', apiRoutes.ROLES_PREFIX);

export const fetchPaginatedRoles = async (pageNumber: number) =>
  apiRequest<undefined, RoleType[]>(
    'get',
    `${apiRoutes.ROLES_PREFIX}/paginated?page=${pageNumber}`,
  );

export const createRole = async (data: CreateUpdateRoleFields) =>
  apiRequest<CreateUpdateRoleFields, RoleType>(
    'post',
    apiRoutes.PRODUCTS_PREFIX,
    data,
  );

export const updateRole = async (data: CreateUpdateRoleFields, id: string) =>
  apiRequest<CreateUpdateRoleFields, RoleType>(
    'patch',
    `${apiRoutes.PRODUCTS_PREFIX}/${id}`,
    data,
  );

export const deleteRole = async (id: string) =>
  apiRequest<string, RoleType>('delete', `${apiRoutes.ROLES_PREFIX}/${id}`);
