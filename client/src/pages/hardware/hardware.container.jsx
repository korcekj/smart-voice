import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  selectHardware,
  selectAreModulesFetched,
  selectIsFetching,
  selectError
} from '../../redux/module/module.selectors';
import {
  removeHardwareStart,
  updateHardwareStart,
  clearError
} from '../../redux/module/module.actions';
import { setMessage } from '../../redux/flash-message/flash-message.actions';

import withSpinner from '../../components/with-spinner/with-spinner.component';
import HardwarePage from './hardware.component';

const mapDispatchToProps = dispatch => ({
  removeHardware: (id, type, moduleId) =>
    dispatch(removeHardwareStart(id, type, moduleId)),
  updateHardware: (id, hardware, type, moduleId) =>
    dispatch(updateHardwareStart(id, hardware, type, moduleId)),
  clearError: () => dispatch(clearError()),
  setMessage: data => dispatch(setMessage(data))
});

const mapStateToProps = (state, { match: { params } }) => ({
  hardware: selectHardware(
    params.moduleId,
    params.hardwareType,
    params.hardwareId
  )(state),
  isLoading: !selectAreModulesFetched(state),
  isFetching: selectIsFetching(state),
  error: selectError(state)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSpinner
)(HardwarePage);
