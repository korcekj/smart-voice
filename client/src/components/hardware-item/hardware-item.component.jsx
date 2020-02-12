import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  hardwareTypes,
  hardwareSlovakTypes
} from '../../hardware/hardware.types';

import {
  HardwareItemContainer,
  ItemTitle,
  ItemSubtitle,
  LedIcon,
  RemoteIcon,
  AddIcon,
  DeleteIcon
} from './hardware-item.styles';

const HardwareItem = ({
  id,
  name,
  type,
  addHardware,
  removeHardware,
  location,
  history
}) => {
  const link = id ? `${location.pathname}/${type}/${id}` : null;

  const onClickHandler = e => {
    if (link) history.push(link);
    else onAddHardware(e);
  };

  const onAddHardware = async e => {
    e.stopPropagation();
    addHardware(type);
  };

  const onRemoveHardware = e => {
    e.stopPropagation();
    removeHardware(id, type);
  };

  return (
    <HardwareItemContainer onClick={onClickHandler}>
      <ItemTitle>{name ? name : 'OVLÁDAJ'}</ItemTitle>
      <ItemSubtitle>{hardwareSlovakTypes[type].toUpperCase()}</ItemSubtitle>
      {type === hardwareTypes.led ? <LedIcon /> : <RemoteIcon />}
      {!id && <AddIcon onClick={onAddHardware} />}
      {id && <DeleteIcon onClick={onRemoveHardware} />}
    </HardwareItemContainer>
  );
};

export default withRouter(React.memo(HardwareItem));
