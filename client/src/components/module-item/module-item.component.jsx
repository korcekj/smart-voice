import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { getModuleStatus } from '../../esp8266/esp8266.utils';

import {
  ModuleItemContainer,
  ModuleIcon,
  ItemTitle,
  ItemSubtitle,
  ModuleStatus
} from './module-item.styles';

const ModuleItem = ({ mac, ip, match }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const asyncFun = async () => {
      try {
        await getModuleStatus(ip);
        setStatus(true);
      } catch (error) {
        setStatus(false);
      }
    };

    asyncFun();
  }, [ip]);

  return (
    <ModuleItemContainer to={`${match.path}/module/${mac}`}>
      <ModuleIcon />
      <ItemTitle>{mac}</ItemTitle>
      <ItemSubtitle>{ip}</ItemSubtitle>
      <ModuleStatus status={status} />
    </ModuleItemContainer>
  );
};

export default React.memo(withRouter(ModuleItem));
