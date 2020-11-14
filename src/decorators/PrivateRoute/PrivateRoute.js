import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {Route, Redirect} from 'react-router-dom';
import {AppContext} from '../../store';

const PrivateRoute = observer(({component: Component, ...rest}) => {
  const {userStore} = React.useContext(AppContext);
  const {isUserLogged, isProfileLoading} = userStore;

  return (
    <Route
      {...rest}
      render={props =>
        // eslint-disable-next-line no-nested-ternary
        isUserLogged ? (
          <Component {...props} />
        ) : isProfileLoading ? null : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
});

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
