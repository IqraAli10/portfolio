import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import DigitalWorkspace from "./DigitalWorkspace";

const Hero = ({ designMode, setDesignMode }) => {
  const [easterEgg, setEasterEgg] = useState(false);
  const [isPerforming, setIsPerforming] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [previewTouched, setPreviewTouched] = useState(false);
  const [viewport, setViewport] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop");
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.8, 0]);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springX = useSpring(magneticX, { stiffness: 240, damping: 18, mass: 0.3 });
  const springY = useSpring(magneticY, { stiffness: 240, damping: 18, mass: 0.3 });
  const handleMagnet = (event) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    magneticX.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    magneticY.set((event.clientY - rect.top - rect.height / 2) * 0.12);
  };
  const resetMagnet = () => { magneticX.set(0); magneticY.set(0); };
  useEffect(() => {
    if (reduceMotion || previewTouched) { setIsPerforming(false); return undefined; }
    setIsPerforming(true);
    const timers = [
      window.setTimeout(() => setViewport('tablet'), 4450),
      window.setTimeout(() => setViewport('mobile'), 4950),
      window.setTimeout(() => setViewport('desktop'), 5500),
      window.setTimeout(() => { setIsPerforming(false); setViewport(window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop'); }, 6100),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [reduceMotion, previewTouched]);

  return (
    <section ref={heroRef} id='home' className={`hero-universe relative w-full min-h-[100svh] overflow-hidden ${isPerforming ? 'hero-is-performing' : ''}`} onPointerMove={(event) => { if (event.pointerType !== 'touch') { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--canvas-x', `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty('--canvas-y', `${event.clientY - rect.top}px`); } }}>
      <div className='hero-atmosphere' aria-hidden='true' />
      <div className='hero-design-canvas' aria-hidden='true'><svg viewBox='0 0 1000 600' preserveAspectRatio='none'><path d='M500 0V600M0 300H1000M260 300H740M500 110V490' /><circle cx='500' cy='300' r='5' /><circle cx='260' cy='300' r='3' /><circle cx='740' cy='300' r='3' /></svg><span className='canvas-measure canvas-measure--one'>72 / 0.95</span><span className='canvas-measure canvas-measure--two'>12 COL · 32 GAP</span><span className='canvas-measure canvas-measure--three'>BREAKPOINT · 768</span></div>
      <motion.div className='hero-interface-scene' style={reduceMotion ? undefined : { y: sceneY, opacity: sceneOpacity }}>
        <DigitalWorkspace viewport={viewport} setViewport={setViewport} introActive={isPerforming} />
      </motion.div>

      <div className='hero-content mx-auto flex min-h-[100svh] max-w-7xl items-center px-6 pb-20 pt-32 sm:px-10 lg:px-16'>
        <motion.div
          className='hero-copy relative z-10'
          initial={reduceMotion ? false : "hidden"}
          animate='visible'
          variants={{ visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } } }}
        >
          <motion.p className='hero-eyebrow' variants={heroReveal}>
            <span className='hero-eyebrow-mark'>✳</span> Digital experiences, thoughtfully made
          </motion.p>
          <motion.h1 className='hero-title' variants={heroReveal} onPointerMove={(event) => { if (event.pointerType !== 'touch') { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--type-x', `${(event.clientX - rect.left - rect.width / 2) * .008}px`); event.currentTarget.style.setProperty('--type-y', `${(event.clientY - rect.top - rect.height / 2) * .006}px`); } }} onPointerLeave={(event) => { event.currentTarget.style.setProperty('--type-x', '0px'); event.currentTarget.style.setProperty('--type-y', '0px'); }}>
            Hi, I’m<span className='hero-name'>Iqra Bibi<span className='hero-period'>.</span><button type='button' className='hero-easter-star' aria-label='A little portfolio note' onClick={() => setEasterEgg((value) => !value)}>✳</button></span>
          </motion.h1>
          <AnimatePresence>{easterEgg && <motion.span className='hero-easter-note' initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>yes, I designed this too.</motion.span>}</AnimatePresence>
          <motion.p className='hero-role' variants={heroReveal}>
            Frontend Developer <span>&</span><br /> UI Designer
          </motion.p>
          <motion.p className='hero-intro' variants={heroReveal}>
            I design and build interactive digital experiences that feel as good as they look.
          </motion.p>
          <motion.div className='hero-actions' variants={heroReveal}>
            <motion.a data-cursor-label='LET’S GO' style={{ x: springX, y: springY }} onPointerMove={handleMagnet} onPointerLeave={resetMagnet} className='hero-primary-link' href='#work' whileHover={reduceMotion ? undefined : { scale: 1.025 }} whileTap={{ scale: .98 }} transition={{ type: "spring", stiffness: 360, damping: 22 }}>
              Explore my work <span aria-hidden='true'>↗</span>
            </motion.a>
            <a className='hero-secondary-link' href='#contact'>Let’s connect <span aria-hidden='true'>↗</span></a>
          </motion.div>
          <motion.div className='hero-footnote' variants={heroReveal}>
            <span className='hero-status-dot' /> Interface design <span className='hero-footnote-divider'>/</span> Creative code
          </motion.div>
        </motion.div>

        <div className='hero-project-controls'>
          <span className='hero-control-label'>One product <b>3 responsive views</b></span>
          <div className='hero-control-tabs' role='group' aria-label='Focus the responsive preview'>
            {["Desktop", "Tablet", "Mobile"].map((item, index) => (
              <button key={item} type='button' onClick={() => { setPreviewTouched(true); setIsPerforming(false); setViewport(item.toLowerCase()); }} aria-pressed={viewport === item.toLowerCase()} className={viewport === item.toLowerCase() ? "is-active" : ""}>
                <span>0{index + 1}</span>{item}
              </button>
            ))}
          </div>
          <div className='hero-current-project'><span>Responsive interface concept</span><strong>Studio Space <i aria-hidden='true'>✳</i></strong></div>
        </div>
      </div>

      <a className='hero-scroll-cue' href='#about'><span className='hero-scroll-line' /> Scroll to explore</a>
      <div className='hero-coordinate' aria-hidden='true'>DIGITAL&nbsp;—&nbsp;INTERACTIVE&nbsp;—&nbsp;HUMAN</div>
      <button type='button' className={`design-mode-toggle ${designMode ? 'is-active' : ''}`} aria-pressed={designMode} onClick={() => setDesignMode((value) => !value)}><i /> DESIGN MODE <span>{designMode ? 'ON' : 'OFF'}</span></button>
      <div className='hero-floating-labels' aria-hidden='true'>
        {['UI DESIGN', 'FRONTEND', 'RESPONSIVE', 'INTERACTION'].map((label, index) => <motion.span key={label} className={`hero-float-label hero-float-label--${index + 1}`} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .5, ease: [.22, 1, .36, 1], delay: 3 + index * .12 }}>{label}</motion.span>)}
      </div>
    </section>
  );
};

const heroReveal = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default Hero;
