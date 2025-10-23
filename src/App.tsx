import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import HeaderComponent from './components/header/headerComponent';
import FooterComponent from './components/footer/footerComponent';

function Layout(): JSX.Element {
  return (
    <div className="app ">
      <main className="container ">
        <HeaderComponent />

        <Projects />
        <FooterComponent />
      </main>
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
