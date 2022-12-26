import { LoginUserFields, useLoginForm } from 'hooks/react-hook-form/useLogin';
import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import FormLabel from 'react-bootstrap/FormLabel';
import Form from 'react-bootstrap/Form';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginForm: FC = () => {
  const { handleSubmit, errors, control } = useLoginForm();

  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    console.log(data);
    alert('login');
  });

  return (
    <Form className="login-form" onSubmit={onSubmit}>
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
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="mb-0">Don{'\''}t have an account yet?</p>
        <Link className="text-decoration-none text-end" to="/signup">
          Create account
        </Link>
      </div>
      <Button className="w-100" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
