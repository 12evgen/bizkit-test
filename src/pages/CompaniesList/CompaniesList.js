import React from 'react';
import {observer} from 'mobx-react';
import {injectIntl} from 'react-intl';
import Title from '../../components/Title';
import CompaniesTable from '../../containers/company/CompaniesTable';

const CompaniesList = observer(() => {
  return (
    <React.Fragment>
      <Title id="company-list" />
      <div className="companies-page">
        <div className="wrapper">
          <CompaniesTable />
        </div>
      </div>
    </React.Fragment>
  );
});

export default injectIntl(CompaniesList);
