import { FC } from 'react';
import Routes from 'routes/Routes';
import { usePageIdentification } from 'hooks/usePageIdentification';
import useAuth from 'hooks/useAuth';

const App: FC = () => {
  usePageIdentification();
  useAuth();

  return <Routes />;
};

export default App;
