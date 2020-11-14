import * as React from 'react';
// import {configure} from 'mobx';
import UserStore from './UserStore';
import LanguageStore from './LanguageStore';
import MobileMenuStore from "./MobileMenuStore";
import CompaniesStore from "./CompaniesStore"
import ModalStore from './ModalStore';
import ErrorStore from './ErrorStore';

// configure({enforceActions: 'always'});

export function createStores() {
  return {
    userStore: UserStore,
    languageStore: LanguageStore,
    errorStore: ErrorStore,
    mobileMenuStore: MobileMenuStore,
    companiesStore: CompaniesStore,
    modalStore: ModalStore,
  };
}

const stores = createStores();

const AppContext = React.createContext(stores);

export {stores, AppContext};
