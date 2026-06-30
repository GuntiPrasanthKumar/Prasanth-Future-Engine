import { m } from 'framer-motion';

export default function Hero() {
  return (
    <section className="section hero" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <m.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ maxWidth: '800px', textAlign: 'center', zIndex: 10 }}
      >
        <h2 style={{ color: 'var(--text-secondary)', letterSpacing: '2px', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '1rem' }}>
          Get ready to build
        </h2>
        <h1 className="title shining-text" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', margin: '0 auto' }}>
          Engineering the<br />
          future of software
        </h1>
        <p className="subtitle" style={{ fontSize: '1.2rem', marginTop: '2rem', margin: '2rem auto 0', maxWidth: '700px' }}>
          Building immersive, AI-powered web experiences and scalable backend systems. Reimagining how humans interact with technology.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', justifyContent: 'center' }}>
          <button style={{ 
            background: 'rgba(255,255,255,0.1)', 
            border: '1px solid rgba(255,255,255,0.2)', 
            color: 'white', 
            padding: 'var(--space-2) var(--space-4)', 
            borderRadius: 'var(--radius-sm)',
            fontSize: '1rem',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}>Get Started</button>
          
          <a href="/Prasanth_Resume.pdf" download="Prasanth_Resume.pdf" style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--text-secondary)', 
            padding: 'var(--space-2) var(--space-4)', 
            fontSize: '1rem',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center'
          }}>Download Resume</a>
        </div>
      </m.div>
    </section>
  );
}
