import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { moduleActionTypes } from '../../redux/module/module.types';
import { selectError, selectModule } from '../../redux/module/module.selectors';
import { addModuleStart } from '../../redux/module/module.actions';

import {
  DeviceItemContainer,
  ItemTitle,
  ItemSubtitleContainer,
  ItemSubtitle,
  DeviceIcon,
  SpinnerIcon,
  ErrorMessage
} from './device-item.styles';

const DeviceItem = ({
  mac,
  ip,
  error,
  moduleExists,
  addModuleStart,
  removeDevice
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (moduleExists) {
      setIsLoading(false);
      removeDevice(mac);
    }

    if (error.type === moduleActionTypes.ADD_MODULE_FAILURE && triggered) {
      setTriggered(false);
      setIsLoading(false);
      setErrorMessage('Zariadenie sa nepodarilo pridať');
    }
  }, [mac, error, triggered, moduleExists, removeDevice]);

  const onAddDevice = () => {
    setTriggered(true);
    setIsLoading(true);
    setErrorMessage(null);
    addModuleStart(mac);
  };

  return (
    <DeviceItemContainer onClick={onAddDevice}>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ItemTitle>{mac}</ItemTitle>
      <ItemSubtitleContainer>
        <DeviceIcon />
        <ItemSubtitle>{ip}</ItemSubtitle>
      </ItemSubtitleContainer>
      <SpinnerIcon isLoading={isLoading} />
    </DeviceItemContainer>
  );
};

const mapStateToProps = (state, props) => ({
  moduleExists: !!selectModule(props.mac)(state),
  error: selectError(state)
});

const mapDispatchToProps = dispatch => ({
  addModuleStart: mac => dispatch(addModuleStart(mac))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(DeviceItem));
