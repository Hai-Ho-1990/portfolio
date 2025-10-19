import React from 'react';

export default function App(): JSX.Element {
  return (
    <div className="app">
      <header className="hero">
        <h1>Hai Ho — Web Portfolio</h1>
        <p>Frontend developer • React • TypeScript</p>
      </header>

      <main className="container">
        <section id="about">
          <h2>About</h2>
          <p>Short bio goes here. Replace this with your introduction.</p>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <ul>
            <li>Project A — brief description</li>
            <li>Project B — brief description</li>
          </ul>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>Email: your@email.com</p>
        </section>
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Hai Ho</small>
      </footer>
    </div>
  );
}
