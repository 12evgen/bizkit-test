import React from 'react';
import {observer} from 'mobx-react';
import {injectIntl} from 'react-intl';
import {Controller} from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import _ from 'lodash';
// import validationMessages from '../../../translations/validationErrors.messages';

const CompanyLegalDetailsForm = observer(props => {
  const {company, error} = props;
  const {
    registered_name,
    registered_type,
    bin_iin,
    leader,
    leader_position,
    registered_address,
    address,
    tax_payer,
  } = company;

  return !_.isEmpty(company) ? (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Реквизиты компании
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="registered_name"
            as={
              <TextField
                variant="outlined"
                id="registered_name"
                label="Наименование юр.лица"
                fullWidth
                error={!!error.registered_name}
                helperText={!!error.registered_name ? error.registered_name.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={registered_name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="registered_type"
            as={
              <TextField
                variant="outlined"
                id="registered_type"
                label="Тип юр. лица"
                fullWidth
                error={!!error.registered_type}
                helperText={!!error.registered_type ? error.registered_type.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={registered_type}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="bin_iin"
            as={
              <TextField
                variant="outlined"
                id="bin_iin"
                label="БИН/ИИН"
                fullWidth
                error={!!error.bin_iin}
                helperText={!!error.bin_iin ? error.bin_iin.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={bin_iin}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="leader"
            as={
              <TextField
                variant="outlined"
                id="leader"
                label="Руководитель"
                fullWidth
                error={!!error.leader}
                helperText={!!error.leader ? error.leader.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={leader}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="leader_position"
            as={
              <TextField
                variant="outlined"
                id="leader_position"
                label="Должность руководителя"
                fullWidth
                error={!!error.leader_position}
                helperText={!!error.leader_position ? error.leader_position.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={leader_position}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="registered_address"
            as={
              <TextField
                variant="outlined"
                id="registered_address"
                label="Юридический адресс"
                fullWidth
                error={!!error.registered_address}
                helperText={!!error.registered_address ? error.registered_address.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={registered_address}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="address"
            as={
              <TextField
                variant="outlined"
                id="address"
                label="Фактический адресс"
                fullWidth
                error={!!error.address}
                helperText={!!error.address ? error.address.message : null}
              />
            }
            rules={{required: true}}
            defaultValue={address}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="tax_payer"
            render={props => (
              <FormControlLabel
                control={<Switch onChange={e => props.onChange(e.target.checked)} checked={props.value} />}
                label="Плательщик НДС (да/нет)"
              />
            )}
            defaultValue={tax_payer}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  ) : null;
});

export default injectIntl(CompanyLegalDetailsForm);
