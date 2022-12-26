import globalStore from 'stores/global.store';
import { observer } from 'mobx-react';
import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { RingLoader } from 'react-spinners';
import useMountTransition from 'utils/useMountTransition';

interface LoadingProviderProps {
  transitionDuration?: number;
  loading?: boolean;
  children?: ReactNode;
}

const LoadingProvider: FC<LoadingProviderProps> = ({
  transitionDuration = 300,
  loading: forceLoading,
  children,
}) => {
  const loading = globalStore.globalLoading;

  const shouldRender = useMountTransition(
    forceLoading || loading,
    transitionDuration,
  );

  return (
    <>
      {children}
      {(shouldRender || loading) &&
        createPortal(
          <div className="backdrop">
            <RingLoader color="#ffffff" />
          </div>,
          document.body,
        )}
    </>
  );
};

export default observer(LoadingProvider);
