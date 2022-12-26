import Layout from 'components/ui/Layout';
import RegisterForm from 'components/user/RegisterForm/RegisterForm';
import { FC } from 'react';

const Register: FC = () => {
  return (
    <Layout>
      <RegisterForm />
    </Layout>
  );
};

export default Register;
