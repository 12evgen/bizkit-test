import React from 'react';
import {observer} from 'mobx-react';
import LoginForm from '../../containers/shared/LoginForm';

const Login = observer(() => (
  <div className="login">
    <LoginForm />
  </div>
));

export default Login;
