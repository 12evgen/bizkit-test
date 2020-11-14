import {autorun, action, extendObservable, runInAction} from 'mobx';
import _ from 'lodash';
import Api from '../services/axios';
import {LocalStore} from '../utils/storage';
import ErrorStore from './ErrorStore';

class UserStore {
  constructor() {
    extendObservable(this, {
      user: {},
      isProfileLoading: true,
      isLoading: false,
      isUserLogged: false,
      error: '',
      authToken: '',
    });

    autorun(() => {
      if (!_.isEmpty(LocalStore.getObject('bizkit_data'))) {
        this.verifyUser()
          .then(() => {
            this.getDetails();
          })
          .catch(error => {
            runInAction(() => {
              this.error = error.message;
            });
          });
      } else {
        this.isUserLogged = false;
        this.isProfileLoading = false;
      }
    });
  }

  @action
  verifyUser() {
    return Api.post('token/verify/', {token: LocalStore.getObject('bizkit_data').auth_token})
      .then(resp => {
        const {data} = resp;
        return data;
      })
      .catch(error => {
        runInAction(() => {
          this.error = error.message;
        });
      });
  }

  @action
  getDetails() {
    this.isLoading = true;
    return Api.get('users/me/')
      .then(resp => {
        const {data} = resp;

        runInAction(() => {
          this.user = data;
          this.isLoading = false;
          this.isUserLogged = true;
          this.isProfileLoading = false;
          this.user.loaded = true;
        });
        return data;
      })
      .catch(error => {
        runInAction(() => {
          this.isLoading = false;
          this.isUserLogged = false;
          this.isProfileLoading = false;
          this.error = error.message;
        });
      });
  }

  @action.bound
  login(params) {
    // eslint-disable-next-line prefer-const
    let {email, password} = params;
    this.isLoading = true;

    const authenticationData = {
      email: email,
      password: password,
    };

    Api.post('token/', authenticationData)
      .then(resp => {
        //this.error = '';
        console.log('resp', resp);
        this.storeTokens(resp.data).then(fb => {
          this.getDetails();
          return resp;
        });
      })
      .catch(error => {
        runInAction(() => {
          this.isLoading = false;
          this.error = error;
          ErrorStore.addError('Ошибка авторизации');
        });
      });
  }

  @action
  storeTokens(data) {
    this.authToken = data.access;

    LocalStore.setObject('bizkit_data', {
      auth_token: data.access,
    });

    return Promise.resolve();
  }

  @action
  logout() {
    this.isUserLogged = false;
    return LocalStore.remove('bizkit_data');
  }

  @action
  cleanError() {
    this.error = '';
  }
}

export default new UserStore();
