import styled from 'styled-components';

import { CustomButtonContainer } from '../custom-button/custom-buttom.styles';

export const HardwareFormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 1em;

  @media screen and (max-width: 800px) {
    ${CustomButtonContainer} {
      width: 100%;
    }
  }
`;
