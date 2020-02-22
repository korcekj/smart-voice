import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

import {
  ColorButtonContainer,
  ColorContainer,
  PopOverContainer,
  CoverContainer
} from './color-button.styles';

const ColorButton = ({ color, onChange }) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleColorChange = ({ rgb }) => {
    onChange(rgb);
  };

  return (
    <div>
      <ColorButtonContainer onClick={() => setIsHidden(!isHidden)}>
        <ColorContainer color={color} />
      </ColorButtonContainer>
      {!isHidden && (
        <PopOverContainer>
          <CoverContainer onClick={() => setIsHidden(true)} />
          <ChromePicker color={color} onChange={handleColorChange} />
        </PopOverContainer>
      )}
    </div>
  );
};

export default ColorButton;
