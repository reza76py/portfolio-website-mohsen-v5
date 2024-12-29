import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import './styles/styles.css'



function App() {
  return (
    <Router>
      <nav className='navbar'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <a href='/'>Home</a>
          </li>
          <li className='nav-item'>
            <a href='/about'>About</a>
          </li>
          <li className='nav-item'>
            <a href='/contact'>Contact</a>
          </li>
        </ul>
      </nav>
      <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
      </Routes>
      </div>
    </Router>
  )
}

export default App