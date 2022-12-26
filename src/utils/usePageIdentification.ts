import { useEffect } from 'react';

import { useRouter } from 'hooks/useRouter';

const onDefault = () => {
  document.title = 'Tutorial';
  document.body.id = '';
};
const onHome = () => {
  document.title = 'Tutorial';
  document.body.id = 'home-page';
};
const onDashboard = () => {
  document.title = 'Tutorial - Dashboard';
  document.body.id = 'dashboard-page';
};
const onLogin = () => {
  document.title = 'Tutorial - Login';
  document.body.id = 'login-page';
};
const onSignup = () => {
  document.title = 'Tutorial - Signup';
  document.body.id = 'signup-page';
};

const callbacks: any = {
  '/': [onHome],
  '/dashboard': [onDashboard],
  '/login': [onLogin],
  '/signup': [onSignup],
  '*': [onDefault],
};

export const addPageIdentification = (_case: string, fn: () => void) => {
  callbacks[_case] = callbacks[_case] || [];
  callbacks[_case].push(fn);
};

export const usePageIdentification = () => {
  const { location } = useRouter();

  const customSwitch = (value: string) => {
    if (callbacks[value]) {
      callbacks[value].forEach((fn: () => void) => {
        fn();
      });
    } else {
      onDefault();
    }
  };

  useEffect(() => {
    if (location.pathname) customSwitch(location.pathname);
  }, [location.pathname]);
};
