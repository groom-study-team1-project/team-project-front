import React from 'react';
import Navbar from '../components/Common/Navbar';

function MainPage() {
  return (
    <>
      <div>
        <Navbar isMainPage={true} isLoggedIn={false} />
      </div>
    </>
  );
}

export default MainPage;
