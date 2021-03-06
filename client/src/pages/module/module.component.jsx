import React, { useEffect, useState } from 'react';

import { getModuleStatus } from '../../esp8266/esp8266.utils';

import HardwarePreview from '../../components/hardware-preview/hardware-preview.container';

import {
  ModuleOverlay,
  ModuleHeaderContainer,
  ModuleInfo,
  ModuleTitle,
  BackIcon,
  ModuleStatus,
  LoadingSpinner,
  ModuleUndefinedContainer,
  ModuleUndefinedText,
  ModuleUndefinedTextId
} from './module.styles';

const ModulePage = ({ module: item, history, isFetching, match }) => {
  const [status, setStatus] = useState(null);

  const { moduleId } = match.params;
  const { ip } = item ? item.data : '';

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

    return () => {
      isMounted = false;
    };
  }, [ip]);

  return (
    <ModuleOverlay>
      {item ? (
        <div>
          <ModuleHeaderContainer>
            <ModuleInfo>
              <BackIcon onClick={() => history.goBack()} />
              <ModuleTitle>{moduleId}</ModuleTitle>
              <ModuleStatus
                status={status}
                title={status === true ? 'Online' : 'Offline'}
              />
            </ModuleInfo>
            {isFetching && <LoadingSpinner />}
          </ModuleHeaderContainer>
          <HardwarePreview hardware={item.hardware} />
        </div>
      ) : (
        <ModuleUndefinedContainer>
          <ModuleUndefinedText>
            Modul <ModuleUndefinedTextId>{moduleId}</ModuleUndefinedTextId> sa
            nepodarilo nájsť
          </ModuleUndefinedText>
        </ModuleUndefinedContainer>
      )}
    </ModuleOverlay>
  );
};

export default ModulePage;
