import DashboardLayout from 'components/ui/DashboardLayout';
import { routes } from 'constants/routesConstants';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const DashboardProducts: FC = () => {
  return (
    <DashboardLayout>
      <h1 className="mb-4">Products</h1>
      <Link
        to={`${routes.DASHBAORD_PREFIX}/products/add`}
        className="btn btn-dark"
      >
        Add
      </Link>
    </DashboardLayout>
  );
};

export default DashboardProducts;
