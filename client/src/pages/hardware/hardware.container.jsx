import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  selectHardware,
  selectAreModulesFetched
} from '../../redux/module/module.selectors';
import { removeHardwareStart } from '../../redux/module/module.actions';

import withSpinner from '../../components/with-spinner/with-spinner.component';
import HardwarePage from './hardware.component';

const mapDispatchToProps = dispatch => ({
  removeHardware: (id, type, moduleId) =>
    dispatch(removeHardwareStart(id, type, moduleId))
});

const mapStateToProps = (state, { match: { params } }) => ({
  hardware: selectHardware(
    params.moduleId,
    params.hardwareType,
    params.hardwareId
  )(state),
  isLoading: !selectAreModulesFetched(state)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSpinner
)(HardwarePage);
