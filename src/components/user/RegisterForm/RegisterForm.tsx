import {
  RegisterUserFields,
  useRegisterForm,
} from 'hooks/react-hook-form/useRegister';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';

const RegisterForm: FC = () => {
  const { handleSubmit, errors, control } = useRegisterForm();

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    console.log(data);
    alert('register');
  });

  return (
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
              placeholder="example@gmail.com"
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
              placeholder="example@gmail.com"
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

      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="mb-0">Already have an account?</p>
        <Link className="text-decoration-none text-end" to="/login">
          Login
        </Link>
      </div>
      <Button className="w-100" type="submit">
        Create an account
      </Button>
    </Form>
  );
};

export default RegisterForm;
