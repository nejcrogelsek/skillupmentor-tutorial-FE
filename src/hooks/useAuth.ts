import * as API from 'api/Api';
import { StatusCode } from 'constants/errorConstants';
import authStore from 'stores/auth.store';
import { useEffect, useRef } from 'react';
import { userStorage } from 'utils/localStorage';

const useAuth = () => {
  const user = authStore.user;
  const timerRef = useRef<any>(null);

  const refreshTokens = async () => {
    const response = await API.refreshTokens();
    if (response.data.statusCode === StatusCode.UNAUTHORIZED) {
      await API.signout();
      userStorage.clearUser();
      authStore.signout();
    } else {
      authStore.login(response);
    }
  };

  useEffect(() => {
    if(userStorage.getUser()){
      (async () => {
        const response = await API.fetchUser();
        if (response.data.statusCode === StatusCode.OK) {
          clearInterval(timerRef.current);
          timerRef.current = setInterval(refreshTokens, 60000);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (user) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(refreshTokens, 60000);
    }
  }, [user]);
};

export default useAuth;
