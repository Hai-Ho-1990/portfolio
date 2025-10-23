import React from 'react';
import { Link } from 'react-router-dom';
import LogoComponent from './header/logoComponent';

export default function Nav(): JSX.Element {
  return (
    <nav className="nav gap-4 text-xs pr-4 flex justify-between items-center p-4 ">
      <LogoComponent />
      <ul className="flex gap-4">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
      </ul>
    </nav>
  );
}
