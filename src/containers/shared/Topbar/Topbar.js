import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import _ from 'lodash';
import {AppContext} from '../../../store';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#fff',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    color: '#000'
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  title: {
    color: '#000',
  },
}));

const Topbar = observer(props => {
  const classes = useStyles();
  const {mobileMenuStore, companiesStore, modalStore} = React.useContext(AppContext);
  const {companyDetails} = companiesStore;

  const handleDrawerToggle = () => {
    mobileMenuStore.triggerMobileMenu();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {!_.isEmpty(companyDetails) ? `Клиент - ${companyDetails.name}`  : 'Клиенты'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => modalStore.open('companyCreate')}
          >
            Добавить
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
});

Topbar.propTypes = {
  window: PropTypes.func,
};

export default Topbar;
