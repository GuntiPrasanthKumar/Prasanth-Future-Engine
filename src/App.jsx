import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Home, User, Briefcase, Code, Mail } from 'lucide-react';
import Scene from './components/Scene';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <div id="canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Scene />
        </Canvas>
      </div>

      <div className="overlay">
        {/* Subtle top gradient and logo to fill free space */}
        <div className="top-gradient"></div>
        <div style={{ position: 'absolute', top: '2rem', left: '5vw', zIndex: 10 }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-1px' }}>Prasanth</h1>
        </div>

        {/* Only showing Hero for now based on user request */}
        <div className={activeTab === 'home' ? '' : 'hidden-section'}>
          <Hero />
        </div>
        
        {/* 
          These sections are hidden until the user provides the next plan.
          They are wrapped in hidden-section class.
        */}
        <div className={activeTab === 'about' ? '' : 'hidden-section'}>
          <About />
        </div>
        <div className={activeTab === 'projects' ? '' : 'hidden-section'}>
          <Projects />
        </div>
        <div className={activeTab === 'skills' ? '' : 'hidden-section'}>
          <Skills />
        </div>

        {/* Unique Bottom Navbar */}
        <nav className="bottom-nav">
          <button 
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
            title="Home"
          >
            <Home size={20} />
          </button>
          <button 
            className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
            title="About"
          >
            <User size={20} />
          </button>
          <button 
            className={`nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
            title="Projects"
          >
            <Briefcase size={20} />
          </button>
          <button 
            className={`nav-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
            title="Skills"
          >
            <Code size={20} />
          </button>
          <button 
            className="nav-btn"
            onClick={() => window.location.href = 'mailto:prasanthgunti07@gmail.com'}
            title="Contact"
          >
            <Mail size={20} />
          </button>
        </nav>
      </div>
    </>
  );
}

export default App;
