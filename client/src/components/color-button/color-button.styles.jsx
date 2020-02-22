import styled from 'styled-components';

export const ColorButtonContainer = styled.div`
  width: 50px;
  height: 35px;
  border: 2px solid #d0e8f0;
  border-radius: 3px;
  padding: 0.3em;
`;

export const ColorContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background-color: ${({ color }) =>
    `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`};
  cursor: pointer;
`;

export const CoverContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const PopOverContainer = styled.div`
  position: absolute;
  z-index: 2;
`;
