import React, { useEffect } from 'react';
import axios from 'axios';

import Header from './components/header/header.component';

import { GlobalStyles } from './global.styles';

const App = () => {
  // useEffect(() => {
  //   const asyncFun = async () => {
  //     const { user } = await auth.signInWithPopup(googleProvider);
  //     await createUser(user);
  //   };
  //   asyncFun();
  // }, []);

  useEffect(() => {
    axios({
      url: 'http://192.168.0.102',
      method: 'get'
    })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }, []);

  return (
    <div>
      <GlobalStyles />
      <Header />
    </div>
  );
};

export default App;
