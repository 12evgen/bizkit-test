import {action, extendObservable} from 'mobx';

class ModalStore {
  constructor() {
    extendObservable(this, {
      modals: {
        companyCreate: {
          open: false,
        },
      },
    });
  }

  @action.bound
  close(type) {
    this.modals[type].open = false;
    return this.modals[type].open;
  }

  @action.bound
  open(type, args) {
    console.log('type', type)
    const modal = this.modals[type];
    modal.open = true;

    if (args) {
      // eslint-disable-next-line guard-for-in
      for (const key in args) {
        modal[key] = args[key];
      }
    }
    return modal.open;
  }
}

export default new ModalStore();
