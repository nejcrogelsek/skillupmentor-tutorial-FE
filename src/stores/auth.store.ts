import { makeAutoObservable } from 'mobx';
import { UserType } from 'models/Auth';

export interface AuthContextType {
  isAuthenticated: boolean;
  user?: UserType | null;
  error?: string | { [key: string]: string };
  reloadAuthentication: () => void;
  login: () => void;
  signout: () => void;
}

class AuthStore {
  isAuthenticated = false;
  user?: UserType | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  login(user: UserType) {
    this.user = user;
    this.isAuthenticated = true;
  }

  signout() {
    this.user = undefined;
    this.isAuthenticated = false;
  }

  reloadAuthentication() {
    if (this.user) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }
}

const authStore = new AuthStore();
export default authStore;
