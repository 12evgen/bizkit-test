import React from 'react';
import {observer} from 'mobx-react';
import {injectIntl} from 'react-intl';
import {useForm, Controller} from 'react-hook-form';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';
import {AppContext} from '../../../store';

const allOptions = [];

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    padding: '15px',
  },
  reset: {
    width: '6%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter: {
    width: '95%',
    margin: '0',
  },
  formControl: {
    minWidth: 120,
    width: '100%',
  },
}));

const CompaniesFilter = observer(() => {
  const {companiesStore} = React.useContext(AppContext);
  const {companyList, companyListByFilter, enableFilterCompanies} = companiesStore;
  const classes = useStyles();
  const {reset, control} = useForm();
  const list = enableFilterCompanies ? companyListByFilter : companyList;

  const resetFilter = event => {
    reset();
    companiesStore.resetFilter();
  };

  if (allOptions.length === 0) {
    list.filter(item => !!item.region).map(row => allOptions.push(row.region));
  }

  const uniqOptions = Array.from(new Set(allOptions));

  return (
    <form className={classes.form} noValidate>
      <Grid className={classes.filter} container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Controller
            name="filter-name"
            render={({value, onChange}) => (
              <TextField
                value={value}
                id="filter-name"
                label="Наименование компании"
                variant="outlined"
                fullWidth
                onChange={e => {
                  onChange(e.target.value);
                  companiesStore.setFilter(e.target.value, 'name');
                }}
              />
            )}
            onChange={data => data}
            control={control}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="filter-region-label">Тип юр. лица</InputLabel>
            <Controller
              name="filter-type"
              render={({value, onChange}) => (
                <Select
                  labelId="filter-region-label"
                  id="filter-type"
                  value={value}
                  onChange={e => {
                    onChange(e.target.value);
                    companiesStore.setFilter(e.target.value, 'region');
                  }}
                  label="Тип юр. лица"
                  autoWidth
                >
                  {uniqOptions.map((row, i) => {
                    return (
                      <MenuItem key={i} value={row}>
                        {row}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
              onChange={data => data}
              control={control}
              defaultValue=""
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="filter-region-label">Регион</InputLabel>
            <Controller
              name="filter-region"
              render={({value, onChange}) => (
                <Select
                  labelId="filter-region-label"
                  id="filter-region"
                  value={value}
                  onChange={e => {
                    onChange(e.target.value);
                    companiesStore.setFilter(e.target.value, 'region');
                  }}
                  label="Регион"
                  autoWidth
                >
                  {uniqOptions.map((row, i) => {
                    return (
                      <MenuItem key={i} value={row}>
                        {row}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
              onChange={data => data}
              control={control}
              defaultValue=""
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Controller
            name="filter-city"
            render={({value, onChange}) => (
              <TextField
                value={value}
                id="filter-city"
                label="Город"
                variant="outlined"
                fullWidth
                onChange={e => {
                  onChange(e.target.value);
                  companiesStore.setFilter(e.target.value, 'city');
                }}
              />
            )}
            onChange={data => data}
            control={control}
            defaultValue=""
          />
        </Grid>
      </Grid>
      <Grid className={classes.reset}>
        <IconButton color="primary" component="span" onClick={resetFilter}>
          <Refresh />
        </IconButton>
      </Grid>
    </form>
  );
});

export default injectIntl(CompaniesFilter);
