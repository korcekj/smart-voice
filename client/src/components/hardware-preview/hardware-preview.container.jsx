import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import {
  selectError,
  selectIsFetching
} from '../../redux/module/module.selectors';
import {
  addHardwareStart,
  removeHardwareStart
} from '../../redux/module/module.actions';

import HardwarePreview from './hardware-preview.component';

const mapStateToProps = createStructuredSelector({
  error: selectError,
  isFetching: selectIsFetching
});

const mapDispatchToProps = dispatch => ({
  addHardware: (hardware, type, moduleId) =>
    dispatch(addHardwareStart(hardware, type, moduleId)),
  removeHardware: (id, type, moduleId) =>
    dispatch(removeHardwareStart(id, type, moduleId))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(HardwarePreview);
