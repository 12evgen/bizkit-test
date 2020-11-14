import React from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import {observer} from 'mobx-react';
import { makeStyles} from '@material-ui/core/styles';
import Topbar from '../../containers/shared/Topbar';
import AsideMenu from '../../containers/shared/AsideMenu';
import CompaniesList from '../../pages/CompaniesList';
import CompanyContent from '../../pages/CompanyContent';
import NotFound from '../../pages/NotFound';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: '50px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
    backgroundColor: '#f0f0f0',
  },
}));

const MainDecorator = observer(() => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Topbar/>
      <AsideMenu />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Redirect exact from="/" to="/companies/list" />
          <Route path="/companies/list" component={CompaniesList} exact />
          <Route path="/company/:companyId" component={CompanyContent} exact />
          <Route component={NotFound} />
        </Switch>
      </main>
    </main>
  );
});

export default MainDecorator;
