import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';

function Layout(): JSX.Element {
  return (
    <div className="app">
      <header className="hero">
        <h1>Hai Ho — Web Portfolio</h1>
        <p>Frontend developer • React • TypeScript</p>
      </header>

      <Nav />

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Hai Ho</small>
      </footer>
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
