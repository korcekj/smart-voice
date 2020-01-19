import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { ReactComponent as HomeLogo } from '../../assets/icons/logo-transparent.svg';

export const HomePageOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 80px);
  padding: 0 2em;
  overflow: hidden;
`;

export const LinkTitle = styled(Link)`
  display: block;
  font-size: 40px;
  font-weight: bold;
  margin: 0 0 5em 0;
  position: relative;
  text-align: center;
  color: #00465f;
  transition: color 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: #333;

    &::after {
      background-color: #00465f;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #5c99af;
    transform: translateX(-50%);
    transition: background-color 0.2s ease-in-out;
    animation: underline 2.5s infinite;
  }

  @media screen and (max-width: 800px) {
    font-size: 32px;
  }

  @keyframes underline {
    0% {
      width: 0;
    }
    50% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  max-width: 35%;
  max-height: 35%;
  animation: bounce 2.5s infinite;

  &::before,
  &::after {
    font-size: 16px;
    font-weight: bold;
    padding: 0.5em 1em;
    position: absolute;
    color: #fff;
    top: 65%;
    transform: translateY(-65%);
    border-radius: 3px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  }

  &::before {
    content: 'Smart';
    background-color: #e79d45;
    left: -5em;
  }

  &::after {
    content: 'Voice';
    background-color: #df5b5b;
    right: -5em;
  }

  @media screen and (max-width: 800px) {
    &::before,
    &::after {
      font-size: 14px;
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3em);
    }
  }
`;

export const Image = styled(HomeLogo)`
  width: 100%;
  height: 100%;
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4));
`;
