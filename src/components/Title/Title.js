import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {Helmet} from 'react-helmet-async';
// import messages from './Title.messages';
import htmlClass from '../../utils/htmlClass';

const Title = props => {
  const {id} = props;

  React.useEffect(() => {
    addPageClassToBody(id);

    return () => {
      removePageClassFromBody();
    };
  });

  const addPageClassToBody = page => {
    removePageClassFromBody();
    htmlClass.add(document.body, `page--${page}`);
  };

  const removePageClassFromBody = () => {
    htmlClass.remove(document.body, /^page--/);
  };

  return (
    <Helmet>
      <title>{id}</title>
      <meta name="description" content={id} />
      <link rel="canonical" href="https://www.dealroomevents.com/" />
    </Helmet>
  );
};

Title.propTypes = {
  id: PropTypes.string.isRequired,
};

export default injectIntl(Title);
