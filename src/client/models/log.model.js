import { observable, action } from 'mobx';
import { API } from '../util/api';

export default class Log {
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