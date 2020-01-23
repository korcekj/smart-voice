import styled from 'styled-components';

import { CustomButtonContainer } from '../custom-button/custom-buttom.styles';

export const SignUpContainer = styled.div`
  width: 46%;
  display: flex;
  flex-direction: column;
  margin-left: 4%;

  @media screen and (max-width: 1000px) {
    & ${CustomButtonContainer} {
      width: 100%;
    }
  }
`;
