import React from 'react';
// import { BubbleBackground } from '../animate-ui/components/backgrounds/bubble';
import Nav from '../Nav';
import HeroComponent from './heroComponent';
import CompetenceComponent from '../CompetenceComponent';
// import Silk from '../Silk';

function HeaderComponent() {
  return (
    <section className="relative w-screen h-screen flex flex-col justify-between overflow-hidden bg-[#efefef]">
      {/* Bakgrundsanimation */}
      {/* <div className="absolute inset-0 -z-10 ">
        <Silk speed={5} scale={1} color="#C4C4C4" noiseIntensity={1.5} rotation={0} />
      </div> */}

      {/* Innehåll ovanpå */}
      <Nav />
      <HeroComponent />
      <CompetenceComponent />
    </section>
  );
}

export default HeaderComponent;
