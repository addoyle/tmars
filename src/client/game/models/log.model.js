import { makeAutoObservable } from 'mobx';
import { API, gameId } from '../../util/api';

class Log {
  log = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchLogs() {
    API(`log/${gameId()}`).then(res => {
      this.log = res;
    });
  }

  postLog(log) {
    API(`log/${gameId()}`, 'POST', log).then(() => {});
  }

  update(log) {
    this.log = this.log.concat(log);
  }
}

export default Log;
