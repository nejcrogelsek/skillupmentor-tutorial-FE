import {
  CreateUpdateProductFields,
  useCreateUpdateProductForm
} from 'hooks/react-hook-form/useCreateUpdateProduct';
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
import authStore from 'stores/auth.store';
import { ProductType } from 'models/Product';

interface Props {
  defaultValues?: ProductType & { isActiveUser?: boolean };
}

const CreateUpdateUserForm: FC<Props> = ({ defaultValues }) => {
  const { handleSubmit, errors, control } = useCreateUpdateProductForm({
    defaultValues,
  });
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [showError, setShowError] = useState(false);

  const onSubmit = handleSubmit(
    async (data: CreateUpdateProductFields) => {
      if (!defaultValues) await handleAdd(data);
      else await handleUpdate(data);
    },
  );

  const handleAdd = async (data: CreateUpdateProductFields) => {
    const response = await API.createProduct(data);
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message);
      setShowError(true);
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message);
      setShowError(true);
    } else {
      navigate(`${routes.DASHBOARD_PREFIX}/products`);
    }
  };

  const handleUpdate = async (data: CreateUpdateProductFields) => {
    const response = await API.updateProduct(data, defaultValues?.id as string);
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
      navigate(`${routes.DASHBOARD_PREFIX}/products`);
    }
  };

  return (
    <>
      <Form className="register-form" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="name">Name</FormLabel>
              <input
                {...field}
                type="text"
                aria-label="Name"
                aria-describedby="name"
                className={
                  errors.name ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.name && (
                <div className="invalid-feedback text-danger">
                  {errors.name.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="price">Price</FormLabel>
              <input
                {...field}
                type="number"
                aria-label="Price"
                aria-describedby="price"
                className={
                  errors.price ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.price && (
                <div className="invalid-feedback text-danger">
                  {errors.price.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="image_path"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="image_path">Product image</FormLabel>
              <input
                {...field}
                type="file"
                aria-label="Product image"
                aria-describedby="image_path"
                className={
                  errors.image_path ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.image_path && (
                <div className="invalid-feedback text-danger">
                  {errors.image_path.message}
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
