import React from 'react';
import LogoComponent from './logoComponent';
import Nav from '../Nav';

function headerComponent() {
  return (
    <header className="bg-gradient-to-r from-blue-100 to-transparent p-12 text-center">
      <div className="max-w-3xl mx-auto">
        <LogoComponent />
        <Nav />
      </div>
    </header>
  );
}

export default headerComponent;
