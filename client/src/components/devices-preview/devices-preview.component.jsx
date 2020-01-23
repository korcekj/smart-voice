import React, { useState } from 'react';

import { getLocalDevices } from '../../esp8266/esp8266.utils';

import Spinner from '../spinner/spinner.component';
import CustomButtom from '../custom-button/custom-button.component';
import DeviceItem from '../device-item/device-item.component';

import {
  DevicesPreviewOverlay,
  DevicesButtonContainer,
  LocalDevicesOverlay,
  LocalDevicesContainer,
  NoDeviceContainer,
  NoDeviceTitle
} from './devices-preview.styles';

const DevicesPreview = () => {
  const [localDevices, setLocalDevices] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const onGetLocalDevices = async () => {
    try {
      setIsFetching(true);
      const { data } = await getLocalDevices();
      setLocalDevices(data);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
    }
  };

  const onRemoveDevice = mac => {
    const newDevices = localDevices.filter(device => device.mac !== mac);
    setLocalDevices(newDevices);
  };

  return (
    <DevicesPreviewOverlay>
      <DevicesButtonContainer>
        <CustomButtom onClick={onGetLocalDevices}>
          Hľadať zariadenia
        </CustomButtom>
      </DevicesButtonContainer>
      <LocalDevicesOverlay>
        <LocalDevicesContainer>
          {isFetching ? (
            <Spinner />
          ) : localDevices.length ? (
            localDevices.map(device => (
              <DeviceItem
                key={device.mac}
                {...device}
                removeDevice={onRemoveDevice}
              />
            ))
          ) : (
            <NoDeviceContainer>
              <NoDeviceTitle>
                Pre pridanie modulu klikni na tlačidlo{' '}
                <span>"Hľadať zariadenia"</span>
              </NoDeviceTitle>
            </NoDeviceContainer>
          )}
        </LocalDevicesContainer>
      </LocalDevicesOverlay>
    </DevicesPreviewOverlay>
  );
};

export default DevicesPreview;
