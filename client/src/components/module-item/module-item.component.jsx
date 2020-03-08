import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { moduleActionTypes } from '../../redux/module/module.types';

import { selectError } from '../../redux/module/module.selectors';

import { getModuleStatus } from '../../esp8266/esp8266.utils';
import {
  removeModuleStart,
  clearError
} from '../../redux/module/module.actions';
import { setMessage } from '../../redux/flash-message/flash-message.actions';

import {
  ModuleItemContainer,
  ModuleIcon,
  DeleteIcon,
  ItemTitle,
  ItemSubtitle,
  ModuleStatus
} from './module-item.styles';

const ModuleItem = ({
  mac,
  ip,
  removeModule,
  setMessage,
  clearError,
  error,
  match
}) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const asyncFun = async () => {
      try {
        await getModuleStatus(ip);
        if (isMounted) setStatus(true);
      } catch (error) {
        if (isMounted) setStatus(false);
      }
    };

    asyncFun();

    if (error.type === moduleActionTypes.REMOVE_MODULE_FAILURE) {
      setMessage({
        message: 'Zariadenie sa nepodarilo vymazať',
        type: 'error'
      });
      clearError();
    }

    return () => {
      isMounted = false;
    };
  }, [ip, error, setMessage, clearError]);

  const onRemoveModule = e => {
    e.preventDefault();
    removeModule(mac);
  };

  return (
    <ModuleItemContainer to={`${match.path}/module/${mac}`}>
      <ModuleIcon />
      <ItemTitle>{mac}</ItemTitle>
      <ItemSubtitle>{ip}</ItemSubtitle>
      <ModuleStatus status={status} />
      <DeleteIcon onClick={onRemoveModule} />
    </ModuleItemContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectError
});

const mapDispatchToProps = dispatch => ({
  removeModule: mac => dispatch(removeModuleStart(mac)),
  clearError: () => dispatch(clearError()),
  setMessage: data => dispatch(setMessage(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(withRouter(ModuleItem)));
