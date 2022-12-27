import {
  CreateUserFields,
  UpdateUserFields,
  useCreateUpdateUserForm,
  UserAccess,
} from 'hooks/react-hook-form/useCreateUpdateUser';
import { FC, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import * as API from 'api/Api';
import { StatusCode } from 'constants/errorConstants';
import { observer } from 'mobx-react';
import { routes } from 'constants/routesConstants';
import { UserType } from 'models/Auth';
import authStore from 'stores/auth.store';

interface Props {
  defaultValues?: UserType & { isActiveUser?: boolean };
}

const CreateUpdateUserForm: FC<Props> = ({ defaultValues }) => {
  const { handleSubmit, errors, control } = useCreateUpdateUserForm({
    defaultValues,
  });
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [showError, setShowError] = useState(false);

  const onSubmit = handleSubmit(
    async (data: CreateUserFields | UpdateUserFields) => {
      if (!defaultValues) await handleAdd(data as CreateUserFields);
      else await handleUpdate(data as UpdateUserFields);
    },
  );

  const handleAdd = async (data: CreateUserFields) => {
    const response = await API.createUser(data);
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message);
      setShowError(true);
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message);
      setShowError(true);
    } else {
      navigate(`${routes.DASHBOARD_PREFIX}/users`);
    }
  };

  const handleUpdate = async (data: UpdateUserFields) => {
    const response = await API.updateUser(data, defaultValues?.id as string);
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message);
      setShowError(true);
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message);
      setShowError(true);
    } else {
      if (defaultValues?.isActiveUser) {
        authStore.login(response.data);
      }
      navigate(`${routes.DASHBOARD_PREFIX}/users`);
    }
  };

  return (
    <>
      <Form className="register-form" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="first_name"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="first_name">First name</FormLabel>
              <input
                {...field}
                type="first_name"
                aria-label="First name"
                aria-describedby="first_name"
                className={
                  errors.first_name ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.first_name && (
                <div className="invalid-feedback text-danger">
                  {errors.first_name.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="last_name"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="last_name">Last name</FormLabel>
              <input
                {...field}
                type="last_name"
                aria-label="Last name"
                aria-describedby="last_name"
                className={
                  errors.last_name ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.last_name && (
                <div className="invalid-feedback text-danger">
                  {errors.last_name.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="email">Email</FormLabel>
              <input
                {...field}
                type="email"
                placeholder="example@gmail.com"
                aria-label="Email"
                aria-describedby="email"
                className={
                  errors.email ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.email && (
                <div className="invalid-feedback text-danger">
                  {errors.email.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="access"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="access">Access</FormLabel>
              <Form.Select
                {...field}
                aria-label="Access"
                aria-describedby="access"
                className={
                  errors.access ? 'form-control is-invalid' : 'form-control'
                }
              >
                <option value={UserAccess.USER}>User</option>
                <option value={UserAccess.ADMIN}>Admin</option>
              </Form.Select>
              {errors.access && (
                <div className="invalid-feedback text-danger">
                  {errors.access.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="password">Password</FormLabel>
              <input
                {...field}
                type="password"
                placeholder="******"
                aria-label="Password"
                aria-describedby="password"
                className={
                  errors.password ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.password && (
                <div className="invalid-feedback text-danger">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="confirm_password"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="confirm_password">Confirm password</FormLabel>
              <input
                {...field}
                type="password"
                aria-label="Confirm password"
                aria-describedby="confirm_password"
                className={
                  errors.confirm_password
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
              />
              {errors.confirm_password && (
                <div className="invalid-feedback text-danger">
                  {errors.confirm_password.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Button className="w-100" type="submit">
          {defaultValues ? 'Update user' : 'Create new user'}
        </Button>
      </Form>
      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-auto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};

export default observer(CreateUpdateUserForm);