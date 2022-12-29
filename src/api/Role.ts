import { apiRoutes } from 'constants/apiConstants';
import { Role } from 'models/Role';

import { apiRequest } from './Api';

export const fetchRoles = async () =>
  apiRequest<undefined, Role[]>('get', apiRoutes.ROLES_PREFIX);
