import DashboardLayout from 'components/ui/DashboardLayout';
import CreateUserForm from 'components/user/CreateUserForm/CreateUserForm';
import { observer } from 'mobx-react';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

const DashboardUsersEdit: FC = () => {
  const location = useLocation();
  return (
    <DashboardLayout>
      <h1 className="mb-4 text-center">Edit user</h1>
      <CreateUserForm defaultValues={location.state} />
    </DashboardLayout>
  );
};

export default observer(DashboardUsersEdit);
