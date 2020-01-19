import React from 'react';

import {
  HomePageOverlay,
  ImageContainer,
  Image,
  LinkTitle
} from './homepage.styles';

const HomePage = () => {
  return (
    <HomePageOverlay>
      <LinkTitle to='/signin' title='Ovládni svoj domov hlasom'>
        Ovládni svoj domov hlasom
      </LinkTitle>
      <ImageContainer>
        <Image />
      </ImageContainer>
    </HomePageOverlay>
  );
};

export default HomePage;
