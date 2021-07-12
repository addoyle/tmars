// import { API } from '../../util/api';

import { makeAutoObservable } from 'mobx';

class User {
  constructor() {
    makeAutoObservable(this);
  }

  name = '';
}

export default User;
