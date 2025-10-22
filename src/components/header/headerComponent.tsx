import React from 'react';
import LogoComponent from './logoComponent';
import Nav from '../Nav';

function headerComponent() {
  return (
    <section className="hero">
      <LogoComponent />
      <Nav />
    </section>
  );
}

export default headerComponent;
