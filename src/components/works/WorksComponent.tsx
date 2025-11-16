import React from 'react';
import lyfta from '../../assets/lyfta.png';
import pokedex from '../../assets/pokedex.png';
import foody from '../../assets/foody.png';
import cg from '../../assets/cg.png';

export default function Works() {
  const projects = [
    {
      title: 'LYFTA ',
      img: lyfta,
    },
    {
      title: 'Pokedex',
      img: pokedex,
    },
    {
      title: 'foody',
      img: foody,
    },
    {
      title: 'CG.',
      img: cg,
    },
  ];

  return (
    <>
      <li className="w-screen h-screen shrink-0 flex items-center justify-center bg-black text-white">
        <div className="border border-white/30 rounded-2xl px-5 py-2 flex items-center ">
          <svg
            className="w-3 h-5 mr-2"
            fill="#ffffff"
            viewBox="-8.5 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>left</title>
              <path d="M7.094 15.938l7.688 7.688-3.719 3.563-11.063-11.063 11.313-11.344 3.531 3.5z"></path>
            </g>
          </svg>

          <h4 className="text-sm">scroll</h4>
        </div>
      </li>
      {projects.map((project, index) => (
        <li
          key={index}
          className="w-screen h-screen shrink-0 relative flex items-end justify-center bg-black "
        >
          <div className="relative z-10 text-center px-6 bottom-[85%]">
            <h2 className="text-3xl font-bold mb-4 text-white">{project.title}</h2>
          </div>
          <img
            src={project.img}
            alt={project.title}
            className="absolute  w-screen  object-cover h-[80%] px-4 bottom-0"
          />
        </li>
      ))}
    </>
  );
}
