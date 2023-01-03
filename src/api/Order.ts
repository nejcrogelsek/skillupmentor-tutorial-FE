import { apiRoutes } from 'constants/apiConstants';
import { RoleType } from 'models/Role';

import { apiRequest } from './Api';

export const fetchChart = async () =>
  apiRequest<undefined, { date: string; sum: string }[]>(
    'get',
    `${apiRoutes.ORDERS_PREFIX}/chart`,
  );

export const fetchOrders = async (pageNumber: number) =>
  apiRequest<undefined, RoleType[]>(
    'get',
    `${apiRoutes.ORDERS_PREFIX}?page=${pageNumber}`,
  );

export const exportCSV = async () =>
  apiRequest<unknown, undefined>(
    'post',
    `${apiRoutes.ORDERS_PREFIX}/export`,
    {},
    {
      responseType: 'blob',
    },
  );
