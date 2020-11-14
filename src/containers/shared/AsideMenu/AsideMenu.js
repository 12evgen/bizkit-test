import React from 'react';
import PropTypes from 'prop-types';
import {Link, NavLink} from 'react-router-dom';
import {observer} from 'mobx-react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {AppContext} from '../../../store';
import './AsideMenu.scss'

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  logo: {
    width: '100%',
    padding: '10px 20px',
  },
}));

const AsideMenu = observer(props => {
  const {window} = props;
  const {userStore, mobileMenuStore} = React.useContext(AppContext);
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    mobileMenuStore.triggerMobileMenu();
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Link to="/companies/list">
          <img className={classes.logo} src={require('../../../assets/images/logo.png')} alt="logo" />
        </Link>
      </div>
      <List>
        <NavLink className="account-nav__item" to={'/companies/list'}>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText>Клиенты</ListItemText>
          </ListItem>
        </NavLink>
        <ListItem button onClick={() => userStore.logout()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary='Выход' />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileMenuStore.isOpenMobileMenu}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
});

AsideMenu.propTypes = {
  window: PropTypes.func,
};

export default AsideMenu;
