import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { moduleActionTypes } from '../../redux/module/module.types';
import { selectError, selectModule } from '../../redux/module/module.selectors';
import { addModuleStart, clearError } from '../../redux/module/module.actions';
import { setMessage } from '../../redux/flash-message/flash-message.actions';

import {
  DeviceItemContainer,
  ItemTitle,
  ItemSubtitleContainer,
  ItemSubtitle,
  DeviceIcon,
  SpinnerIcon
} from './device-item.styles';

const DeviceItem = ({
  mac,
  ip,
  error,
  moduleExists,
  addModuleStart,
  removeDevice,
  setMessage,
  clearError
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (moduleExists) {
      setIsLoading(false);
      removeDevice(mac);
    }

    if (error.type === moduleActionTypes.ADD_MODULE_FAILURE) {
      setIsLoading(false);
      setMessage({
        message: 'Zariadenie sa nepodarilo pridať',
        type: 'error'
      });
      clearError();
    }
  }, [mac, error, moduleExists, removeDevice, setMessage, clearError]);

  const onAddDevice = () => {
    setIsLoading(true);
    addModuleStart(mac);
  };

  return (
    <DeviceItemContainer onClick={onAddDevice}>
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
  addModuleStart: mac => dispatch(addModuleStart(mac)),
  clearError: () => dispatch(clearError()),
  setMessage: data => dispatch(setMessage(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(DeviceItem));
