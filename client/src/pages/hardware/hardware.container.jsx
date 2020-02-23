import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  selectHardware,
  selectAreModulesFetched,
  selectIsFetching
} from '../../redux/module/module.selectors';
import {
  removeHardwareStart,
  updateHardwareStart
} from '../../redux/module/module.actions';

import withSpinner from '../../components/with-spinner/with-spinner.component';
import HardwarePage from './hardware.component';

const mapDispatchToProps = dispatch => ({
  removeHardware: (id, type, moduleId) =>
    dispatch(removeHardwareStart(id, type, moduleId)),
  updateHardware: (id, hardware, type, moduleId) =>
    dispatch(updateHardwareStart(id, hardware, type, moduleId))
});

const mapStateToProps = (state, { match: { params } }) => ({
  hardware: selectHardware(
    params.moduleId,
    params.hardwareType,
    params.hardwareId
  )(state),
  isLoading: !selectAreModulesFetched(state),
  isFetching: selectIsFetching(state)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSpinner
)(HardwarePage);
