import styled from 'styled-components';

import { CustomButtonContainer } from '../custom-button/custom-buttom.styles';

export const SignUpContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 2em;

  @media screen and (max-width: 1000px) {
    & ${CustomButtonContainer} {
      width: 100%;
    }
  }
`;
