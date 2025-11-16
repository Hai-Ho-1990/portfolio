import React from 'react';
import profileImg from '../../assets/profile.png';
import RotatingText from '../animations/RotatingText';

export default function HeroComponent() {
  return (
    <div className="hero-component flex flex-col justify-center items-center p-4">
      <img
        className="w-20 h-20 align-middle rounded-full border-4 border-white "
        src={profileImg}
        alt="Profile"
      />
      <div className="hero-text w-screen flex flex-col justify-center items-center text-center pt-4">
        <h2 className="text-3xl ">
          Junior Frontend Developer. Building{' '}
          <RotatingText className="" words={['#digitalProducts', '#brands', '#experiences']} />.
        </h2>
      </div>
      <div className="pt-6">
        <button
          className="bg-black text-white py-2 px-9 rounded-2xl text-[0.6rem] shadow-lg"
          onClick={() => {
            /* Add handler */
          }}
          aria-label="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-send"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 14l11 -11" />
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
