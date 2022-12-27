import { routes } from 'constants/routesConstants';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authStore from 'stores/auth.store';
import Button from 'react-bootstrap/Button';
import * as API from 'api/Api';
import { StatusCode } from 'constants/errorConstants';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { observer } from 'mobx-react';

const Topbar: FC = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [showError, setShowError] = useState(false);

  const signout = async () => {
    const response = await API.signout();
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message);
      setShowError(true);
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message);
      setShowError(true);
    } else {
      authStore.signout();
      navigate('/');
    }
  };
  return (
    <>
      <div className="d-flex flex-grow-1 justify-content-end align-items-center bg-dark px-4 py-2">
        <div>
          <Link
            className="btn btn-dark text-decoration-none text-light me-4"
            to={`${routes.DASHBOARD_PREFIX}/users/edit`}
            state={{ ...authStore.user }}
          >
            {(authStore.user?.first_name || authStore.user?.last_name)
              ? `${authStore.user?.first_name} ${authStore.user?.last_name}`
              : authStore.user?.email
            }
          </Link>
          <Button className="btn-dark me-4" onClick={signout}>
            Sign out
          </Button>
          <Link to={routes.HOME} className="btn btn-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-house-door-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
            </svg>
          </Link>
        </div>
      </div>
      {showError && (
        <ToastContainer className="p-3" position='top-end'>
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-auto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className='text-danger'>{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};

export default observer(Topbar);
