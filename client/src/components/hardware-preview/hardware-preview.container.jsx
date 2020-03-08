import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectError } from '../../redux/module/module.selectors';
import {
  addHardwareStart,
  removeHardwareStart,
  clearError
} from '../../redux/module/module.actions';
import { setMessage } from '../../redux/flash-message/flash-message.actions';

import HardwarePreview from './hardware-preview.component';

const mapStateToProps = createStructuredSelector({
  error: selectError
});

const mapDispatchToProps = dispatch => ({
  addHardware: (hardware, type, moduleId) =>
    dispatch(addHardwareStart(hardware, type, moduleId)),
  removeHardware: (id, type, moduleId) =>
    dispatch(removeHardwareStart(id, type, moduleId)),
  clearError: () => dispatch(clearError()),
  setMessage: data => dispatch(setMessage(data))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(HardwarePreview);
