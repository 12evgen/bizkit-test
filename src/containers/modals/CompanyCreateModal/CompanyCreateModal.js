import React from 'react';
import {observer} from 'mobx-react';
import Modal from '../../../components/Modal';
import CompanyCreateForm from '../../company/CompanyCreateForm';
import {AppContext} from '../../../store';

const CompanyCreateModal = observer(() => {
  const {modalStore} = React.useContext(AppContext);
  const {open} = modalStore.modals.companyCreate;

  return (
    <Modal className='company-create' open={open} onClose={() => modalStore.close('companyCreate')}>
      <CompanyCreateForm />
    </Modal>
  );
});

export default CompanyCreateModal;
