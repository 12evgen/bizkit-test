import React from 'react';
import {observer} from 'mobx-react';
import {injectIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import {toast} from 'react-toastify';
import {AppContext} from '../../../store';
import CompaniesFilter from '../CompaniesFilter';

const columns = [
  {id: 'name', label: 'Наименование компании'},
  {id: 'population', label: 'Тип юр.лица'},
  {id: 'region', label: 'Регион'},
  {id: 'city', label: 'Город'},
  {id: 'action', label: ''},
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  preloader: {
    display: 'flex',
    justifyContent: 'center',
    margin: '50px',
  },
  actions: {
    padding: '5px',
  },
}));

const CompaniesTable = observer(() => {
  const {companiesStore} = React.useContext(AppContext);
  const {companyList, companyListByFilter, enableFilterCompanies} = companiesStore;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [idRemove, setIdRemove] = React.useState(null);
  const list = enableFilterCompanies ? companyListByFilter : companyList;

  React.useEffect(() => {
    companiesStore.getCompanyList();
  }, [companiesStore]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = id => {
    setIdRemove(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    companiesStore
      .deleteCompany(idRemove)
      .then(() => {
        toast.success('Компания удаленна!');
      })
      .catch(error => {
        toast.error('Ошибка.');
      });
    setOpen(false);
  };

  const confirmModalDelete = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Вы точно уверенны что хотите удалить компанию?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Нет
        </Button>
        <Button onClick={handleOk} color="primary" autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );

  return companyList.length > 0 ? (
    <Paper className={classes.root}>
      <CompaniesFilter />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} style={{minWidth: column.minWidth}}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell className={classes.actions} align="right">
                    <Tooltip title="Редактировать">
                      <Link to={`/company/${row.id}`}>
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <IconButton onClick={() => handleClickOpen(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={companyList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {confirmModalDelete}
    </Paper>
  ) : (
    <div className={classes.preloader}>
      <CircularProgress />
    </div>
  );
});

export default injectIntl(CompaniesTable);
