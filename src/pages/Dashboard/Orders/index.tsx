import DashboardLayout from 'components/ui/DashboardLayout';
import { FC } from 'react';
import Button from 'react-bootstrap/Button';

const DashboardOrders: FC = () => {
  return (
    <DashboardLayout>
      <h1 className="mb-4">Orders</h1>
      <Button className="btn-dark">Export</Button>
    </DashboardLayout>
  );
};

export default DashboardOrders;
