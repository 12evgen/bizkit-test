import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory as createHistory} from 'history';
import {AppContext, stores} from './store';
import AppRoot from './decorators';
import * as serviceWorker from './serviceWorker';

const history = createHistory();

ReactDOM.render(
  <AppContext.Provider value={stores}>
    <AppRoot history={history} />
  </AppContext.Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
