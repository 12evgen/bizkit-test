import React from 'react';
import {observer} from 'mobx-react';
import {toast} from 'react-toastify';
import {injectIntl} from 'react-intl';
import {useForm, FormProvider} from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import CompanyMainDetailsForm from '../CompanyMainDetailsForm';
import CompanyLegalDetailsForm from '../CompanyLegalDetailsForm';
import {AppContext} from '../../../store';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const useStyles = makeStyles(theme => ({
  preloader: {
    display: 'flex',
    justifyContent: 'center',
    margin: '50px',
  },
  action: {
    textAlign: 'right'
  }
}));

const CompanyInfo = observer(() => {
  const {companiesStore, modalStore} = React.useContext(AppContext);
  const {companyDetails} = companiesStore;
  const methods = useForm();
  const classes = useStyles();

  const onSubmit = value => {
    companiesStore
      .updateCompany(companyDetails.id, value)
      .then(() => {
        modalStore.close('companyCreate');
        toast.success('Компания успешна обновлнна');
      })
      .catch(error => {
        const errors = Object.keys(error).map(err => {
          return error[err][0];
        });
        toast.error(errors.join(` \n`));
      });
  };

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        {!_.isEmpty(companyDetails) ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <CompanyMainDetailsForm error={methods.errors} company={companyDetails} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CompanyLegalDetailsForm error={methods.errors} company={companyDetails} />
            </Grid>
            <Grid item xs={12} className={classes.action}>
              <Button type="submit" variant="contained" color="primary">
                Сохранить
              </Button>
            </Grid>
          </Grid>
        ) : (
          <div className={classes.preloader}>
            <CircularProgress />
          </div>
        )}
      </form>
    </FormProvider>
  );
});

export default injectIntl(CompanyInfo);
