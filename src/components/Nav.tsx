import React from 'react';
import { Link } from 'react-router-dom';
import LogoComponent from './header/logoComponent';

export default function Nav(): JSX.Element {
  return (
    <nav className="nav gap-4 text-xs pr-4 flex justify-between items-center p-4 ">
      <ul className="flex gap-4">
        <li>
          <Link
            to="/projects"
            className="nav-button py-2 px-6 rounded-2xl text-[0.6rem] bg-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/30 inline-block"
          >
            Work
          </Link>
        </li>
      </ul>
    </nav>
  );
}
