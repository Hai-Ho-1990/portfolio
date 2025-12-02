import React from 'react';
import lyfta from '../../assets/lyfta.png';
import lyftaMobile from '../../assets/lyfta-mobil.png';
import pokedex from '../../assets/pokedex.png';
import pokedexMobile from '../../assets/pokedex-mobil.png';
import foody from '../../assets/foody.png';
import foodyMobile from '../../assets/foody-mobil.png';
import gc from '../../assets/cg.png';
import gcMobile from '../../assets/gc-mobil.png';

import {
  HtmlIcon,
  CssIcon,
  TypeScriptIcon,
  ReactIcon,
  GithubIcon,
  FigmaIcon,
  TailwindIcon,
  PostgreIcon,
} from '../../icons/icons';

export default function Works() {
  const projects = [
    {
      title: 'LYFTA ',
      img: lyfta,
      imgMobile: lyftaMobile,
      content:
        'LYFTA is my first school project, created using only HTML and CSS. While the project showcases basic skills, it reflects the starting point of my growth as a web developer.',
      techstack: 'HTML, CSS',
      github: 'https://github.com/Hai-Ho-1990/LYFTA',
      icons: [
        <HtmlIcon key="html" className="text-orange-500" size="2x" icon={'function'} />,
        <CssIcon key="css" className="text-blue-500" size="2x" icon={'function'} />,
        <GithubIcon
          key="github"
          size="2x"
          icon={'function'}
          onClick={() => window.open('https://github.com/Hai-Ho-1990/LYFTA')}
        />,
      ],
    },
    {
      title: 'Pokedex',
      img: pokedex,
      imgMobile: pokedexMobile,
      content:
        'This project helped me learn the fundamentals of JavaScript and TypeScript, as well as how to fetch data from an API. I used the PokeAPI to display information about various Pokémon.',
      techstack: 'HTML, CSS, Javascript',
      github: 'https://github.com/Hai-Ho-1990/Pokedex',
      icons: [
        <HtmlIcon key="html" className="text-orange-500 " size="2x" icon={'function'} />,
        <CssIcon key="css" className="text-blue-500" size="2x" icon={'function'} />,
        <TypeScriptIcon key="ts" className="text-blue-600" size="2x" icon={'function'} />,
        <GithubIcon
          key="github"
          size="2x"
          icon={'function'}
          onClick={() => window.open('https://github.com/Hai-Ho-1990/Pokedex')}
        />,
      ],
    },
    {
      title: 'foody',
      img: foody,
      imgMobile: foodyMobile,
      content:
        "This project focused on creating a website prototype centered around users' needs and preferences, emphasizing user-friendliness and intuitive navigation.",
      icons: [
        <FigmaIcon
          key="figma"
          size={30}
          className="text-blue-500"
          onClick={() =>
            window.open(
              'https://www.figma.com/design/mQdJw2lTM38Pe2V5EV1I4B/foody?node-id=0-1&m=dev&t=m4alOSh6uGM6hGLF-1'
            )
          }
        />,
      ],
    },
    {
      title: 'GC.',
      img: gc,
      imgMobile: gcMobile,
      content:
        'This project was built as part of the full-stack course, where I worked with databases and the relationships between different tables. Together with the frontend, I developed a dynamic e-commerce system that integrates both backend logic and user-facing functionality.',
      icons: [
        <ReactIcon key="react" className="text-blue-400" size="2x" icon={'function'} />,
        <TypeScriptIcon key="ts" className="text-blue-600" size="2x" icon={'function'} />,
        <TailwindIcon key="tailwind" className="text-sky-400" size={30} />,
        <PostgreIcon key="postgre" className="text-blue-800" size={30} />,
        <GithubIcon
          key="github"
          size="2x"
          icon={'function'}
          onClick={() => window.open('https://github.com/Hai-Ho-1990/GOODCOFFEE.')}
        />,
      ],
    },
  ];

  return (
    <>
      {/* Intro-page */}
      <li className="w-screen h-screen shrink-0 flex flex-col items-center justify-center text-white">
        <h3
          className="text-lg
        "
        >
          work
        </h3>
        <p className="">/wɜːk/ </p>
        <h4 className="text-center w-[70%] text-2xl mt-10">
          The process of creating, building, and problem-solving to develop functional and visually
          engaging web solutions.
        </h4>
        <div className="border border-white/30 rounded-2xl px-5 py-2 flex items-center gap-2 mt-10">
          <h4 className="text-sm">view</h4>
          <svg
            fill="#ffffff"
            height="13px"
            width="13px"
            version="1.1"
            id="XMLID_287_"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <g id="next">
                {' '}
                <g>
                  {' '}
                  <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 "></polygon>{' '}
                </g>{' '}
              </g>{' '}
            </g>
          </svg>
        </div>
      </li>

      {projects.map((project, index) => (
        <React.Fragment key={index}>
          {/* EMPTY PAGE FOR CONTENT */}
          <li className="w-screen h-screen shrink-0 flex flex-col items-center justify-center bg-white text-black px-10">
            <h2 className="text-4xl font-bold mb-15">{project.title}</h2>
            <p className="text-center max-w-xl opacity-70 text-sm">
              {project.content || 'Project description coming soon...'}
            </p>

            <div className="flex  space-x-4 mt-6">{project.icons}</div>
          </li>
          {/* PROJECT PAGE */}
          <li className="w-screen h-screen shrink-0 relative flex items-end justify-center bg-black">
            {/* Desktop-bilden */}
            <img
              src={project.img}
              alt={project.title}
              className="hidden md:block absolute w-screen h-screen object-cover bottom-0"
            />

            {/* Mobile-bilden */}
            <img
              src={project.imgMobile}
              alt={project.title}
              className="block md:hidden absolute w-screen h-screen object-cover bottom-0 "
            />
          </li>
        </React.Fragment>
      ))}
    </>
  );
}
