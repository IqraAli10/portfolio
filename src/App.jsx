import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import Chatbot from "./components/Chatbot";
import AICursor from "./components/AICursor";

const App = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [designMode, setDesignMode] = useState(false);
  const [breakpointHint, setBreakpointHint] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const update = () => setShowCursor(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  React.useEffect(() => {
    let timer;
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const device = width >= 1200 ? "DESKTOP" : width >= 768 ? "TABLET" : "MOBILE";
      setBreakpointHint(`${width} PX  /  ${device}`);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setBreakpointHint(""), 1800);
    };
    window.addEventListener("resize", updateBreakpoint, { passive: true });
    return () => { window.removeEventListener("resize", updateBreakpoint); window.clearTimeout(timer); };
  }, []);
  const [showWelcome, setShowWelcome] = useState(false);
  const shownOnceRef = React.useRef(false);
  const marqueeWords = ["DESIGN", "CODE", "MOTION", "RESPONSIVE", "INTERACTION"];
  React.useEffect(() => {
    if (chatOpen) return; // never show while chat is open
    if (shownOnceRef.current) return;
    const t1 = setTimeout(() => { setShowWelcome(true); }, 600);
    const t2 = setTimeout(() => { setShowWelcome(false); shownOnceRef.current = true; }, 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [chatOpen]);
  return (
    <BrowserRouter>
      <div className={`relative z-0 bg-primary ${designMode ? "design-mode" : ""}`}>
        {showCursor && <AICursor />}
        <Navbar />
        <div className='portfolio-hero-shell'>
          <Hero designMode={designMode} setDesignMode={setDesignMode} />
        </div>
        <div className={`breakpoint-hint ${breakpointHint ? "is-visible" : ""}`} aria-live='polite'>{breakpointHint}</div>
        <div className='portfolio-marquee' aria-label='Design, code, interaction, motion, responsive'>
          <div className='portfolio-marquee-track' aria-hidden='true'>{Array.from({ length: 2 }, (_, loop) => <span key={loop}>{marqueeWords.map((word, index) => <b className='marquee-word' style={{ '--word-index': index }} key={`${word}-${index}`}>{word}<i>→</i></b>)}</span>)}</div>
        </div>
        <Works />
        <Experience />
        <Tech />
        <About />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
        <footer className='portfolio-footer'>
          <a className='portfolio-footer-brand' href='#home'>Iqra Bibi<span>©</span></a>
          <p>Thoughtful interfaces. Carefully built.</p>
          <div><a href='#work'>Selected work</a><a href='#contact'>Contact</a><a href='https://www.linkedin.com/in/iqra-ali-178531254/' target='_blank' rel='noreferrer'>LinkedIn ↗</a></div>
        </footer>
        {/* Chat trigger */}
        {!chatOpen && (
        <div className='ai-fab'>
          <div className='ai-fab-aura'></div>
          <button type='button' className='ai-fab-btn' title='Ask Iqra AI' aria-label='Open Iqra assistant' onClick={() => setChatOpen(true)}>
            <img src='/girl.png' onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/chat-icon.svg'; }} alt='' width='28' height='28' style={{ borderRadius: '9999px', objectFit: 'cover' }} />
          </button>
          <div className='ai-fab-ping'>
            <span className='wave'></span>
            <span className='core'></span>
          </div>
          {showWelcome && !chatOpen && (
            <div className='ai-fab-bubble'>Ask Iqra&apos;s AI</div>
          )}
        </div>
        )}
        <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
