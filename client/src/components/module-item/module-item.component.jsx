import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  ModuleItemContainer,
  ModuleIcon,
  ItemTitle,
  ItemSubtitle,
  ModuleStatus
} from './module-item.styles';

const ModuleItem = ({ mac, ip }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios({
      url: '/api/module',
      method: 'post',
      data: {
        ip
      }
    })
      .then(res => {
        setStatus(true);
      })
      .catch(error => {
        setStatus(false);
      });
  }, [ip]);

  return (
    <ModuleItemContainer to={`/module/${mac}`}>
      <ModuleIcon />
      <ItemTitle>{mac}</ItemTitle>
      <ItemSubtitle>{ip}</ItemSubtitle>
      <ModuleStatus status={status} />
    </ModuleItemContainer>
  );
};

export default ModuleItem;
