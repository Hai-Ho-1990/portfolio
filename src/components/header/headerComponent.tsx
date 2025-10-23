import React from 'react';

import Nav from '../Nav';
import HeroComponent from './heroComponent';

function HeaderComponent() {
  return (
    <section className="header bg-[#efefef] w-full">
      <Nav />
      <HeroComponent />
    </section>
  );
}

export default HeaderComponent;
