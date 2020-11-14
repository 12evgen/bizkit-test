import React from 'react';
import {observer} from 'mobx-react';
import {injectIntl} from 'react-intl';
import {toast} from 'react-toastify';
import MaterialTable from 'material-table';
import {AppContext} from '../../../store';

const CompanyBankDetailsTable = observer(() => {
  const {companiesStore} = React.useContext(AppContext);
  const {bankList, companyDetails} = companiesStore;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true)
    companiesStore.bankDetailListForCompany(companyDetails.id).then(() => setLoading(false));
  }, [companiesStore, companyDetails.id]);

  const columns = [
    {title: 'Банк', field: 'bank'},
    {title: 'БИК', field: 'bank_id_code'},
    {title: 'Номер счета', field: 'account_number'},
    {title: 'Валюта', field: 'currency'},
  ];

  return (
    <MaterialTable
      title="Банковские реквизиты компании"
      localization={{body: {editRow: {deleteText: 'Вы точно хотите удалить компанию?'}}}}
      columns={columns}
      data={bankList || []}
      isLoading={loading}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              companiesStore
                .addBankDetail(companyDetails.id, newData)
                .then(() => {
                  toast.success('Банковские данные добавленны!');
                })
                .catch(error => {
                  toast.error('Ошибка.');
                });
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              companiesStore
                .updateBankDetail(companyDetails.id, newData)
                .then(() => {
                  toast.success('Банковские данные обновленны!');
                })
                .catch(error => {
                  toast.error('Ошибка.');
                });
              resolve();
            }, 1000);
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              companiesStore
                .deleteBankDetail(companyDetails.id, oldData)
                .then(() => {
                  toast.success('Банковские данные удаленны!');
                })
                .catch(error => {
                  toast.error('Ошибка.');
                });
              resolve();
            }, 1000);
          }),
      }}
    />
  );
});

export default injectIntl(CompanyBankDetailsTable);
