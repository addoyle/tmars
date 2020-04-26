import { observable, action } from 'mobx';
import { API } from '../../util/api';

class Log {
  @observable log = [];

  @action
  fetchLogs() {
    API('log').then(res => {
      this.log = res;
    });
  }

  @action
  postLog(log) {
    API('log', 'POST', log).then(() => {});
  }
}

export default Log;
