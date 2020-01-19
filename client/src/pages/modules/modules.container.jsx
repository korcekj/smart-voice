import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectAreModulesFetched } from '../../redux/module/module.selectors';

import withSpinner from '../../components/with-spinner/with-spinner.component';
import ModulesPage from './modules.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectAreModulesFetched(state)
});

export default compose(connect(mapStateToProps), withSpinner)(ModulesPage);
