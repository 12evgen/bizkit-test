import {observable, action} from 'mobx';

class LanguageStore {
  @observable language = localStorage.getItem('language') || 'en';

  @action
  changeLanguage(value) {
    this.language = value;
    localStorage.setItem('language', value);
  }
}

export default new LanguageStore();
