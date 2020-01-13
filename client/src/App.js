import React, { useEffect } from 'react';

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
    fetch('/api/local-devices')
      .then(x => x.json())
      .then(x => console.log(x));
  }, []);

  return (
    <div>
      <GlobalStyles />
      <Header />
    </div>
  );
};

export default App;
