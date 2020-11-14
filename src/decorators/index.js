import * as React from 'react';
import {observer} from 'mobx-react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {ThemeProvider} from '@material-ui/core/styles';
import addMainClasses from '../utils/addMainClasses';
import {AppContext} from '../store';
import Notifications from '../containers/shared/Notifications';
import Modals from '../containers/modals';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import MainDecorator from './MainDecorator';
import Login from '../pages/Login';
import Localizer from '../Localizer';
import theme from '../theme';

const AppRoot = observer(() => {
  const {languageStore, userStore} = React.useContext(AppContext);
  // const preloader = document.querySelector('.site-preloader');

  // preloader
  /*
  if (!userStore.isLoading && preloader) {
    preloader.addEventListener('transitionend', event => {
      if (event.propertyName === 'opacity' && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    });
    preloader.classList.add('site-preloader__fade');
  }
  */

  return (
    <Localizer locale={languageStore.language}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <div className="main">
              {addMainClasses(userStore)}
              <Notifications />
              <Modals />
              <Switch>
                <PublicRoute path="/login" component={Login} exact />
                <PrivateRoute component={MainDecorator} exact />
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </Localizer>
  );
});

export default AppRoot;
