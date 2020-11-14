import {observable, action} from 'mobx';

class ErrorStore {
  @observable errors = observable.array();

  @action addError(error) {
    this.errors.push(error);
  }

  @action clear() {
    this.errors.clear();
  }
}

export default new ErrorStore();
