import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { textVariant } from "../utils/motion";

const categories = ["Architecture / UI", "Product / Web", "Concept / Interaction"];
const devices = ["Desktop", "Tablet", "Mobile"];
const workflow = ["UI design", "Component", "Responsive", "Interaction"];

const Works = () => {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [device, setDevice] = useState("Desktop");
  const touchStart = useRef(null);
  const reduceMotion = useReducedMotion();
  const previewX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: .4 });
  const previewY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: .4 });
  const previewIndex = hovered ?? active;
  const project = projects[previewIndex];

  const swipeStart = (event) => { touchStart.current = event.touches[0].clientX; };
  const swipeEnd = (event) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < 55) return;
    event.preventDefault();
    setHovered(null);
    setActive((current) => (current + (delta < 0 ? 1 : projects.length - 1)) % projects.length);
  };

  return (
    <div className='work-exhibition'>
      <motion.div variants={textVariant()} className='works-heading'>
        <div><p className={styles.sectionSubText}>Selected work / 2026</p><h2 className={styles.sectionHeadText}>A small digital exhibition.</h2></div>
        <p>Digital interfaces, explored as a collection of connected design decisions.</p>
      </motion.div>

      <LayoutGroup id='project-exhibition'>
        <div className='exhibition-layout' onMouseLeave={() => setHovered(null)}>
          <nav className='exhibition-selector' aria-label='Project index' onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHovered(null); }}>
            <span className='exhibition-label'>PROJECT INDEX <i>01 — 03</i></span>
            {projects.map((item, index) => <button type='button' key={item.name} className={previewIndex === index ? 'is-active' : ''} onMouseEnter={() => setHovered(index)} onFocus={() => setHovered(index)} onClick={() => { setActive(index); setHovered(null); setDevice('Desktop'); }} aria-pressed={active === index}>
              <span className='exhibition-index-number'>0{index + 1}</span><span className='exhibition-index-copy'><b>{item.name.toUpperCase()}</b><small>{categories[index]}</small></span><img src={item.image} alt='' /><i className='exhibition-index-arrow' aria-hidden='true'>↗</i>
              {previewIndex === index && <motion.i className='exhibition-index-mark' layoutId='project-selector-mark' />}
            </button>)}
          </nav>

          <AnimatePresence mode='sync' initial={false}>
            <motion.article key={project.name} className={`exhibition-project ${hovered !== null ? 'is-previewing' : ''}`} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -7 }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }}>
              <div className={`exhibition-stage exhibition-stage--${device.toLowerCase()}`} onTouchStart={swipeStart} onTouchEnd={swipeEnd} onPointerMove={(event) => { if (event.pointerType === 'touch' || reduceMotion) return; const rect = event.currentTarget.getBoundingClientRect(); previewX.set(((event.clientX - rect.left) / rect.width - .5) * 7); previewY.set(((event.clientY - rect.top) / rect.height - .5) * 5); }} onPointerLeave={() => { previewX.set(0); previewY.set(0); }}>
                <div className='exhibition-stage-toolbar'><span className='exhibition-live'><i /> LIVE PREVIEW</span><div className='exhibition-device-switch' role='group' aria-label='Preview responsive project frame'>{devices.map((item, index) => <button type='button' key={item} className={device === item ? 'is-active' : ''} aria-pressed={device === item} onClick={() => setDevice(item)}><span>0{index + 1}</span>{item}</button>)}</div></div>
                <motion.a layoutId={reduceMotion ? undefined : 'project-preview'} data-cursor-label='OPEN PROJECT ↗' className='exhibition-visual' href={project.source_code_link} target='_blank' rel='noreferrer' aria-label={`Open ${project.name} project`}>
                  <AnimatePresence mode='sync' initial={false}><motion.img key={project.name} style={reduceMotion ? undefined : { x: previewX, y: previewY }} src={project.image} alt={`${project.name} website preview`} loading='lazy' initial={reduceMotion ? false : { opacity: 0, scale: 1.025, clipPath: 'inset(0 0 0 12%)' }} animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0%)' }} exit={reduceMotion ? undefined : { opacity: 0, scale: .985, clipPath: 'inset(0 12% 0 0)' }} transition={{ duration: .62, ease: [.22, 1, .36, 1] }} /></AnimatePresence>
                  <span className='exhibition-open'>OPEN INTERFACE <b>↗</b></span><span className='exhibition-visual-index'>0{previewIndex + 1} / 0{projects.length}</span>
                </motion.a>
              </div>
              <div className='exhibition-details'>
                <div><span className='exhibition-label'>PROJECT 0{previewIndex + 1} / UI DESIGN · FRONTEND</span><h3>{project.name}<i>.</i></h3></div>
                <a className='exhibition-live-link' href={project.source_code_link} target='_blank' rel='noreferrer'>View live project <span>↗</span></a>
                <p>{project.description}</p>
                <div className='exhibition-tags'>{project.tags.map((tag) => <span key={tag.name}>{tag.name}</span>)}</div>
                <div className='exhibition-breakpoints'><span>RESPONSIVE BY DESIGN</span><b>DESKTOP</b><i /><b>TABLET</b><i /><b>MOBILE</b></div>
                <div className='exhibition-workflow' aria-label='Design to code workflow'>{workflow.map((step, index) => <div key={step} className='exhibition-workflow-step' style={{ '--step-index': index }}><span>0{index + 1}</span><b>{step}</b>{index < workflow.length - 1 && <i aria-hidden='true'>→</i>}</div>)}</div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
};

export default SectionWrapper(Works, "work");
