import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { moduleActionTypes } from '../../redux/module/module.types';

import { selectError } from '../../redux/module/module.selectors';

import { getModuleStatus } from '../../esp8266/esp8266.utils';
import { removeModuleStart } from '../../redux/module/module.actions';

import {
  ModuleItemContainer,
  ModuleIcon,
  DeleteIcon,
  ItemTitle,
  ItemSubtitle,
  ModuleStatus,
  ErrorMessage
} from './module-item.styles';

const ModuleItem = ({ mac, ip, removeModule, error, match }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [triggered, setTriggered] = useState(false);
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

    if (error.type === moduleActionTypes.REMOVE_MODULE_FAILURE && triggered) {
      setTriggered(false);
      setErrorMessage('Zariadenie sa nepodarilo vymazať');
    }

    return () => {
      isMounted = false;
    };
  }, [ip, error, triggered]);

  const onRemoveModule = e => {
    e.preventDefault();
    setTriggered(true);
    setErrorMessage(null);
    removeModule(mac);
  };

  return (
    <ModuleItemContainer to={`${match.path}/module/${mac}`}>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
  removeModule: mac => dispatch(removeModuleStart(mac))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(withRouter(ModuleItem)));
