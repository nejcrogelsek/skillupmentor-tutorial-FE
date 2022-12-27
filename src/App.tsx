import { FC } from 'react';
import Routes from 'routes/Routes';
import { usePageIdentification } from 'hooks/usePageIdentification';
import useAuth from 'hooks/useAuth';

const App: FC = () => {
  useAuth();
  usePageIdentification();

  return <Routes />;
};

export default App;
