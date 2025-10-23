import React from 'react';
import profileImg from '../../assets/profile.png';

export default function HeroComponent() {
  return (
    <div className="hero-component flex flex-col justify-center items-center p-4 ">
      <img className="w-20 h-20 align-middle" src={profileImg} alt="Profile" />
      <div className="hero-text w-[60%] pt-10">
        <h2 className="text-4xl  text-center">
          Building digital products, brands, and experiences.
        </h2>
      </div>
    </div>
  );
}
