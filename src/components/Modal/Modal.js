import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {withStyles} from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
  root: {
    margin: 0,
    padding: 0,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const Modal = props => {
  const {open, onClose, children} = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose} />
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  children: '',
};

export default injectIntl(Modal);
