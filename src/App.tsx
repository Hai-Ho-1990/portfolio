import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import About from './components/About';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import HomePage from './pages/temp';

function Layout(): JSX.Element {
  return (
    <div className="app bg-black ">
      <main className="container ">
        <HomePage />
      </main>
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
