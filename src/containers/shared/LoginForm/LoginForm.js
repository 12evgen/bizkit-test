import React from 'react';
import {observer} from 'mobx-react';
import {useForm} from 'react-hook-form';
import {injectIntl} from 'react-intl';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {AppContext} from '../../../store';
import validationMessages from '../../../translations/validationErrors.messages';
//import messages from './LoginForm.messages';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    marginTop: '15px',
  },
  errors: {
    color: 'red',
  },
  action: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const LoginForm = observer(props => {
  const {intl} = props;
  const {userStore} = React.useContext(AppContext);
  const {isLoading} = userStore;
  const {handleSubmit, register, errors} = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const classes = useStyles();

  React.useEffect(
    () => () => {
      userStore.cleanError();
    },
    [userStore],
  );

  const onSubmit = value => {
    userStore.login(value);
  };

  const onTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormControl className={classes.margin} variant="outlined" fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                inputRef={register({
                  required: intl.formatMessage(validationMessages.validationErrorRequired, {name: 'E-mail'}),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: intl.formatMessage(validationMessages.validationErrorEmail),
                  },
                })}
                required
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
              />
              <FormHelperText id="component-error-text" className={classes.errors}>
                {!!errors.email ? errors.email.message : null}
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.margin} variant="outlined" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={onTogglePassword}
                      onMouseDown={onTogglePassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputRef={register({
                  required: intl.formatMessage(validationMessages.validationErrorRequired, {name: 'Password'}),
                  minLength: {
                    value: 8,
                    message: intl.formatMessage(validationMessages.validationErrorMinlength, {number: 8}),
                  },
                })}
                required
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
              />
              <FormHelperText id="component-error-text" className={classes.errors}>
                {!!errors.password ? errors.password.message : null}
              </FormHelperText>
            </FormControl>
            <div className={classes.action}>
              <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                {isLoading ? 'Загрузка' : 'Войти'}
              </Button>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
});

export default injectIntl(LoginForm);
