import { routes } from 'constants/routesConstants';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import authStore from 'stores/auth.store';
import Button from 'react-bootstrap/Button';

const Topbar: FC = () => {
  const signout = () => {
    alert('signout');
  };
  return (
    <div className="d-flex flex-grow-1 justify-content-end align-items-center bg-dark px-4 py-2">
      <div>
        <Link
          className="btn btn-dark text-decoration-none text-light me-4"
          to={`${routes.DASHBAORD_PREFIX}/users/edit`}
          state={authStore.user}
        >
          {/* {authStore.user?.first_name} {authStore.user?.last_name} */}
          John Doe
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
  );
};

export default memo(Topbar);
