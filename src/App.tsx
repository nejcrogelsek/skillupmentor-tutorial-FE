import { FC } from 'react';
import Routes from 'routes/Routes';
import { usePageIdentification } from 'hooks/usePageIdentification';

const App: FC = () => {
  usePageIdentification();
  return <Routes />;
};

export default App;
