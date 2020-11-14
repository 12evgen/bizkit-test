import React from 'react';
import {observer} from 'mobx-react';
import {injectIntl} from 'react-intl';
import {Controller} from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
// import validationMessages from '../../../translations/validationErrors.messages';

const CompanyMainDetailsForm = observer(props => {
  const {company, error} = props;
  const {name, shortname, workscope, region, city, email, phone, description} = company;

  return !_.isEmpty(company) ? (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Основная информация
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="name"
            as={
              <TextField
                id="name"
                label="Наименование компании"
                variant="outlined"
                fullWidth
                error={!!error.name}
                helperText={!!error.name ? error.name.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="shortname"
            as={
              <TextField
                variant="outlined"
                id="shortname"
                label="Короткое название"
                fullWidth
                error={!!error.shortname}
                helperText={!!error.shortname ? error.shortname.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={shortname}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="workscope"
            as={
              <TextField
                variant="outlined"
                id="workscope"
                label="Сфера деятельности"
                fullWidth
                error={!!error.bin_iin}
                helperText={!!error.bin_iin ? error.bin_iin.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={workscope}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="region"
            as={
              <TextField
                variant="outlined"
                id="region"
                label="Регион"
                fullWidth
                error={!!error.region}
                helperText={!!error.region ? error.region.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={region}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="city"
            as={
              <TextField
                variant="outlined"
                id="city"
                label="Город"
                fullWidth
                error={!!error.city}
                helperText={!!error.city ? error.city.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={city}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="email"
            as={
              <TextField
                variant="outlined"
                id="email"
                label="E-mail"
                fullWidth
                error={!!error.email}
                helperText={!!error.email ? error.email.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="phone"
            as={
              <TextField
                variant="outlined"
                id="phone"
                label="Телефон"
                fullWidth
                error={!!error.phone}
                helperText={!!error.phone ? error.phone.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={phone}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            as={
              <TextField
                variant="outlined"
                id="description"
                label="Дополнительно (описание)"
                fullWidth
                multiline
                rows={4}
              />
            }
            rules={{required: true}}
            defaultValue={description}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  ) : null;
});

export default injectIntl(CompanyMainDetailsForm);
