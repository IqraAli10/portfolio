import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import Chatbot from "./components/Chatbot";
import AICursor from "./components/AICursor";

const App = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  React.useEffect(() => {
    const t1 = setTimeout(() => setShowWelcome(true), 900);
    const t2 = setTimeout(() => setShowWelcome(false), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <AICursor />
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
        {/* Chat trigger */}
        {!chatOpen && (
        <div className='ai-fab' title='Ask Iqra AI' onClick={() => setChatOpen(true)}>
          <div className='ai-fab-aura'></div>
          <button className='ai-fab-btn'>
            <img src='/girl.png' onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/chat-icon.svg'; }} alt='' width='28' height='28' style={{ borderRadius: '9999px', objectFit: 'cover' }} />
          </button>
          <div className='ai-fab-ping'>
            <span className='wave'></span>
            <span className='core'></span>
          </div>
          {showWelcome && !chatOpen && (
            <div className='ai-fab-bubble'>Ask Iqra</div>
          )}
        </div>
        )}
        <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
