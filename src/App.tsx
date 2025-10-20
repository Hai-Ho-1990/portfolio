import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

export default function App(): JSX.Element {
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
  )
}
