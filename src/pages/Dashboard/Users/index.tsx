import DashboardLayout from 'components/ui/DashboardLayout';
import { routes } from 'constants/routesConstants';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as API from 'api/Api';
import { UserType } from 'models/Auth';
import { Button, Table } from 'react-bootstrap';
import useMediaQuery from 'hooks/useMediaQuery';

const DashboardUsers: FC = () => {
  const { isMobile } = useMediaQuery(768);
  const { data, isLoading, isError, error } = useQuery(['fetchUsers'], API.fetchUsers);

  console.log(data?.data);

  return (
    <DashboardLayout>
      <div className='mb-4'>
        <h1 className="mb-4">Users</h1>
        <Link
          to={`${routes.DASHBOARD_PREFIX}/users/add`}
          className="btn btn-dark"
        >
          Add
        </Link>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data.data.length === 0 && <p>No users found.</p>}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Email</th>
                <th>Full name</th>
                <th>Access</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item: UserType, index: number) => (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>
                    {(item.first_name || item.last_name)
                      ? `${item.first_name} ${item.last_name}`
                      : '/'
                    }
                  </td>
                  <td>{item.access}</td>
                  <td>
                    <Button className={isMobile ? 'btn-warning me-2 mb-2' : 'btn-warning me-2'} size='sm' >Edit</Button>
                    <Button className={isMobile ? 'btn-danger mb-2' : 'btn-danger'} size='sm' >Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )
      }
    </DashboardLayout >
  );
};

export default DashboardUsers;
