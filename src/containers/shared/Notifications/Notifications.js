import React from 'react';
import {observer} from 'mobx-react';
import {injectIntl} from 'react-intl';
import {Slide, ToastContainer, toast} from 'react-toastify';
import {AppContext} from '../../../store';
import 'react-toastify/dist/ReactToastify.min.css';
import './Notifications.scss';

const Notifications = observer(props => {
  const {errorStore} = React.useContext(AppContext);
  const {errors} = errorStore;

  if (errors.length > 0)  {
    toast.error(errorStore.errors.join(` \n`), {
      onClose: () => errorStore.clear(),
    });
  }

  return (
    <ToastContainer
      position="top-right"
      transition={Slide}
      autoClose={4000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
  );
});

export default injectIntl(Notifications);
