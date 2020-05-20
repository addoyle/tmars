import { observable, action } from 'mobx';
import { API, gameId } from '../../util/api';

class Log {
  @observable log = [];

  @action
  fetchLogs() {
    API(`log/${gameId()}`).then(res => {
      this.log = res;
    });
  }

  @action
  postLog(log) {
    API(`log/${gameId()}`, 'POST', log).then(() => {});
  }
}

export default Log;
