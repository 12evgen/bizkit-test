import {observable, action} from 'mobx';

class MobileMenuStore {
  @observable isOpenMobileMenu = false;

  @action
  triggerMobileMenu() {
    this.isOpenMobileMenu = !this.isOpenMobileMenu;
  }

  @action
  closeMobileMenu() {
    this.isOpenMobileMenu = false;
  }
}

export default new MobileMenuStore();
