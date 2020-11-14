import * as React from 'react';
import {observer} from 'mobx-react';
import CompanyCreateModal from './CompanyCreateModal';

const Modals = observer(() => (
  <React.Fragment>
    <CompanyCreateModal />
  </React.Fragment>
));

export default Modals;
