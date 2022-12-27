import DashboardLayout from 'components/ui/DashboardLayout';
import { routes } from 'constants/routesConstants';
import { FC, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as API from 'api/Api';
import { UserType } from 'models/Auth';
import { Button, Table, Toast, ToastContainer } from 'react-bootstrap';
import useMediaQuery from 'hooks/useMediaQuery';
import { StatusCode } from 'constants/errorConstants';

const DashboardUsers: FC = () => {
  const [apiError, setApiError] = useState('');
  const [showError, setShowError] = useState(false);
  const { isMobile } = useMediaQuery(768);
  const { data, isLoading, refetch } = useQuery(['fetchUsers'], API.fetchUsers);
  const { mutate } = useMutation((id: string) => API.deleteUser(id), {
    onSuccess: (response) => {
      if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(response.data.message);
        setShowError(true);
      } else if (
        response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(response.data.message);
        setShowError(true);
      } else {
        refetch();
      }
    },
    onError: () => {
      setApiError('Something went wrong while deleting a user.');
      setShowError(true);
    },
  });

  const handleDelete = async (id: string) => {
    mutate(id);
  };

  return (
    <DashboardLayout>
      <div className="mb-4">
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
                    {item.first_name || item.last_name
                      ? `${item.first_name} ${item.last_name}`
                      : '/'}
                  </td>
                  <td>{item.access}</td>
                  <td>
                    <Link
                      className={
                        isMobile
                          ? 'btn btn-warning btn-sm me-2 mb-2'
                          : 'btn btn-warning btn-sm me-2'
                      }
                      to={`${routes.DASHBOARD_PREFIX}/users/edit`}
                      state={{
                        id: item.id,
                        first_name: item.first_name,
                        last_name: item.last_name,
                        email: item.email,
                        access: item.access,
                      }}
                    >
                      Edit
                    </Link>
                    <Button
                      className={isMobile ? 'btn-danger mb-2' : 'btn-danger'}
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
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
    </DashboardLayout>
  );
};

export default DashboardUsers;
