import DashboardLayout from 'components/ui/DashboardLayout';
import CreateUserForm from 'components/user/CreateUserForm/CreateUserForm';
import { FC } from 'react';

const DashboardUsersAdd: FC = () => {
  return (
    <DashboardLayout>
      <h1 className="mb-4 text-center">Create new user</h1>
      <CreateUserForm />
    </DashboardLayout>
  );
};

export default DashboardUsersAdd;
