import { makeAutoObservable } from 'mobx';

export interface GlobalState {
  globalLoading: boolean;
}

class GlobalStore {
  globalLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setGlobalLoading(value: boolean) {
    this.globalLoading = value;
  }
}

const globalStore = new GlobalStore();
export default globalStore;
