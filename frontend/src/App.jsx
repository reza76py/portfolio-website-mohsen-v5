import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NavBar from './components/NavBar';
import './styles/styles.css';

function App() {
  return (
    <Router>
      {/* Navigation area */}
      <nav className="navbar">
        <NavBar />
      </nav>

      {/* Body area */}
      <div className="body-area">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
