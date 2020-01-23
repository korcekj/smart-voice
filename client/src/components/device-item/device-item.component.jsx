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
  moduleIsAdded,
  addModuleStart,
  removeDevice
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (moduleIsAdded) {
      setIsLoading(true);
      removeDevice(mac);
    }

    if (error.type === moduleActionTypes.ADD_MODULE_FAILURE) {
      setIsLoading(true);
      setErrorMessage('Zariadenie sa nepodarilo pridať');
    }
  }, [mac, error, moduleIsAdded, removeDevice]);

  const onAddDevice = () => {
    setIsLoading(true);
    addModuleStart({ mac, ip });
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
  moduleIsAdded: !!selectModule(props.mac)(state),
  error: selectError(state)
});

const mapDispatchToProps = dispatch => ({
  addModuleStart: device => dispatch(addModuleStart(device))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(DeviceItem));
