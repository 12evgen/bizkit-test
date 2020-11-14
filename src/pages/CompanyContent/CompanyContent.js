import React from 'react';
import {observer} from 'mobx-react';
import {useParams} from 'react-router-dom';
import {injectIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {AppContext} from '../../store';
import Title from '../../components/Title';
import TabPanel from '../../components/TabPanel'
import CompanyInfo from '../../containers/company/CompanyInfo';
import CompanyBankDetailsTable from '../../containers/company/CompanyBankDetailsTable';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CompanyContent = observer(() => {
  const {companiesStore} = React.useContext(AppContext);
  const {companyId} = useParams();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    companiesStore.getCompanyDetails(companyId);

    return () => {
      companiesStore.reset();
    };
  }, [companiesStore, companyId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Title id="company-details" />
      <div className="company-page">
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs value={value} onChange={handleChange}   indicatorColor="primary"
                  textColor="primary">
              <Tab label="Информация" {...a11yProps(0)} />
              <Tab label="Банковские реквизиты" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <CompanyInfo />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CompanyBankDetailsTable />
          </TabPanel>
        </div>
      </div>
    </React.Fragment>
  );
});

export default injectIntl(CompanyContent);
