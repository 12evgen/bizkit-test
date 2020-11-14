import React from 'react';
import {observer} from 'mobx-react';
import {toast} from 'react-toastify';
import {injectIntl, useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {AppContext} from '../../../store';
import validationMessages from '../../../translations/validationErrors.messages';


const useStyles = makeStyles(theme => ({
  root: {
    margin: '10px',
  },
  title: {
    marginBottom: '20px',
  },
  action: {
    textAlign: 'right'
  },
}));

const CompanyCreateForm = observer(() => {
  const {companiesStore, modalStore} = React.useContext(AppContext);
  const {handleSubmit, register, errors} = useForm();
  const intl = useIntl();
  const classes = useStyles();

  const onSubmit = value => {
    companiesStore
      .createCompany(value)
      .then(() => {
        modalStore.close('companyCreate');
        toast.success('Компания успешна создана');
      })
      .catch(error => {
        const errors = Object.keys(error).map(err => {
          return error[err][0];
        });
        toast.error(errors.join(` \n`));
      });
  };

  return (
    <form className={classes.root} noValidate onSubmit={handleSubmit(onSubmit)}>
      <Typography className={classes.title} variant="h6" gutterBottom>
        Добавить клиента
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            id="name"
            name="name"
            label="Наименование компании"
            fullWidth
            inputRef={register({
              required: intl.formatMessage(validationMessages.validationErrorRequired, {name: 'Name'}),
            })}
            error={!!errors.name}
            helperText={!!errors.name ? errors.name.message : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            id="shortname"
            name="shortname"
            label="Короткое название"
            fullWidth
            inputRef={register({
              required: intl.formatMessage(validationMessages.validationErrorRequired, {name: 'Shortname'}),
            })}
            error={!!errors.shortname}
            helperText={!!errors.shortname ? errors.shortname.message : null}
          />
        </Grid>
        {/*
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            id="type"
            name="type"
            label="Тип юр. лица"
            fullWidth
            inputRef={register({
              required: intl.formatMessage(validationMessages.validationErrorRequired, {name: 'Type'}),
            })}
            error={!!errors.type}
            helperText={!!errors.type ? errors.type.message : null}
          />
        </Grid>
        */}
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            id="bin_iin"
            name="bin_iin"
            label="Сфера деятельности"
            fullWidth
            inputRef={register({
              required: intl.formatMessage(validationMessages.validationErrorRequired, {name: 'Type'}),
            })}
            error={!!errors.bin_iin}
            helperText={!!errors.bin_iin ? errors.bin_iin.message : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            id="region"
            name="region"
            label="Регион"
            fullWidth
            inputRef={register({
              required: intl.formatMessage(validationMessages.validationErrorRequired, {name: 'Region'}),
            })}
            error={!!errors.region}
            helperText={!!errors.region ? errors.region.message : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            id="city"
            name="city"
            label="Город"
            fullWidth
            inputRef={register({
              required: intl.formatMessage(validationMessages.validationErrorRequired, {name: 'City'}),
            })}
            error={!!errors.city}
            helperText={!!errors.city ? errors.city.message : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            id="email"
            name="email"
            label="E-mail"
            fullWidth
            inputRef={register({
              required: intl.formatMessage(validationMessages.validationErrorRequired, {name: 'Email'}),
            })}
            error={!!errors.email}
            helperText={!!errors.email ? errors.email.message : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            id="phone"
            name="phone"
            label="Телефон"
            fullWidth
            inputRef={register({
              required: intl.formatMessage(validationMessages.validationErrorRequired, {name: 'Phone'}),
            })}
            error={!!errors.phone}
            helperText={!!errors.phone ? errors.phone.message : null}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            variant="outlined"
            id="description"
            name="description"
            label="Дополнительно (описание)"
            fullWidth
            multiline
            rows={4}
            inputRef={register()}
          />
        </Grid>
        <Grid item xs={12} className={classes.action}>
          <Button type="submit" variant="contained" color="primary">
            Добавить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
});

export default injectIntl(CompanyCreateForm);
