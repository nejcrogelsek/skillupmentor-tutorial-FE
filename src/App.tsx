import { FC } from 'react';
import Routes from 'routes/Routes';
import { usePageIdentification } from 'utils/usePageIdentification';

const App: FC = () => {
  usePageIdentification();
  return <Routes />;
};

export default App;
