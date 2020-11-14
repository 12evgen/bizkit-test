import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {Route, Redirect} from 'react-router-dom';
import {AppContext} from '../../store';

const PublicRoute = observer(({component: Component, ...rest}) => {
  const {userStore} = React.useContext(AppContext);
  const {isUserLogged, isProfileLoading} = userStore;

  const preloader = <div className="site-preloader" />;

  return (
    <Route
      {...rest}
      render={props =>
        // eslint-disable-next-line no-nested-ternary
        isUserLogged ? (
          <Redirect
            to={{
              pathname: '/companies/list',
            }}
          />
        ) : isProfileLoading ? (
          preloader
        ) : (
          <Component {...props} />
        )
      }
    />
  );
});

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PublicRoute;
