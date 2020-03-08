import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  selectModule,
  selectAreModulesFetched,
  selectIsFetching
} from '../../redux/module/module.selectors';

import withSpinner from '../../components/with-spinner/with-spinner.component';
import ModulePage from './module.component';

const mapStateToProps = (state, props) => ({
  module: selectModule(props.match.params.moduleId)(state),
  isLoading: !selectAreModulesFetched(state),
  isFetching: selectIsFetching(state)
});

export default compose(connect(mapStateToProps), withSpinner)(ModulePage);
