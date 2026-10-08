import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const dashboardTasks = ["Responsive audit", "Refine component library", "Review interaction states"];

const Brand = () => (
  <span className='product-brand-mark' aria-hidden='true'>
    <svg viewBox='0 0 24 24'><path d='M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z' /></svg>
  </span>
);

const CountUp = ({ value, decimals = 0, reduceMotion }) => {
  const count = useMotionValue(reduceMotion ? value : 0);
  const displayed = useTransform(count, (current) => current.toFixed(decimals));
  useEffect(() => {
    if (reduceMotion) { count.set(value); return undefined; }
    const controls = animate(count, value, { duration: .85, delay: 3.45, ease: 'easeOut' });
    return controls.stop;
  }, [count, value, reduceMotion]);
  return <motion.span>{displayed}</motion.span>;
};

const ProductDashboard = ({ size, section, setSection, completed, setCompleted, popover, setPopover, reduceMotion, componentState }) => {
  const sectionTitle = section === "Overview" ? "Good morning, Iqra" : section === "Tasks" ? "Your task board" : "Design insights";

  return (
    <div className={`product-device product-device--${size}`}>
      <div className='product-frame-top'><span /><span /><span /><i>studio.space / {section.toLowerCase()}</i></div>
      <div className='product-app'>
        <aside className='product-sidebar'>
          <div className='product-logo'><Brand /><b>studio<span>.</span></b></div>
          <span className='product-sidebar-label'>WORKSPACE</span>
          {[
            ["Overview", "⌂"], ["Tasks", "▤"], ["Insights", "◷"],
          ].map(([label, icon]) => (
            <button type='button' key={label} className={`product-nav ${section === label ? "is-active" : ""}`} onClick={() => setSection(label)}>
              <span>{icon}</span>{label}
            </button>
          ))}
          <div className='product-sidebar-bottom'><span className='product-avatar'>IB</span><span>Iqra Bibi<small>Personal workspace</small></span><b>···</b></div>
        </aside>

        <main className='product-main'>
          <div className='product-mobile-topline'><span className='product-logo'><Brand /><b>studio<span>.</span></b></span><span className='product-mobile-date'>MON, OCT 12</span></div>
          <header className='product-topbar'>
            <span className='product-breadcrumb'>My workspace <i>/</i> {section}</span>
            <button className='product-search' type='button' onClick={() => setPopover(popover === "search" ? null : "search")} aria-expanded={popover === "search"}><span>⌕</span> Search anything <kbd>⌘ K</kbd></button>
            <button className='product-notification' type='button' aria-label='Notifications' aria-expanded={popover === "notifications"} onClick={() => setPopover(popover === "notifications" ? null : "notifications")}>♧<i /></button>
            <span className='product-avatar product-avatar--top'>IB</span>
          </header>

          <div className='product-greeting-row'>
            <div><span className='product-date'>MONDAY, OCTOBER 12</span><h3>{sectionTitle}<span>✳</span></h3><p>Your space is clear. Let’s make something good.</p></div>
            <div className='product-demo-component'><button className='product-new-button' type='button' onClick={() => setPopover(popover === "created" ? null : "created")}><span>＋</span> New project</button><span className={`product-component-state product-component-state--${componentState.toLowerCase()}`}><i />{componentState}</span></div>
          </div>

          <div className='product-metrics'>
            <motion.div className='product-metric' whileHover={reduceMotion ? undefined : { y: -3 }}><span>FOCUS TIME</span><strong><CountUp value={18.5} decimals={1} reduceMotion={reduceMotion} /> <i>hrs</i></strong><small className='metric-positive'>↗ 12% <em>vs last week</em></small><div className='metric-sparkline'><svg viewBox='0 0 110 26' preserveAspectRatio='none'><path d='M0 21 C12 21 13 14 25 17 S41 21 51 11 S66 17 75 8 S94 15 110 3' /></svg></div></motion.div>
            <motion.div className='product-metric' whileHover={reduceMotion ? undefined : { y: -3 }}><span>COMPLETED</span><strong><CountUp value={24} reduceMotion={reduceMotion} /> <i>tasks</i></strong><small className='metric-positive'>↗ 8% <em>vs last week</em></small><div className='metric-mini-bars'><i /><i /><i /><i /><i /><i /><i /></div></motion.div>
            <motion.div className='product-metric product-metric--accent' whileHover={reduceMotion ? undefined : { y: -3 }}><span>DESIGN SYSTEM</span><strong><CountUp value={78} reduceMotion={reduceMotion} /><i>%</i></strong><small>Component library <em>on track</em></small><div className='metric-progress'><i /></div></motion.div>
          </div>

          <div className='product-lower-grid'>
            <section className='product-panel product-activity'>
              <div className='product-panel-heading'><div><b>Activity</b><small>A little progress, every day</small></div><button type='button' aria-label='More activity options'>···</button></div>
              <div className='product-chart-legend'><i /> Focus hours <span>This week <b>⌄</b></span></div>
              <svg className='product-chart' viewBox='0 0 340 82' preserveAspectRatio='none' role='img' aria-label='Focus hours increased steadily this week'>
                <defs><linearGradient id={`chartFill-${size}`} x1='0' x2='0' y1='0' y2='1'><stop offset='0' stopColor='#C9B6A3' stopOpacity='.3' /><stop offset='1' stopColor='#C9B6A3' stopOpacity='0' /></linearGradient></defs>
                <path className='chart-fill' fill={`url(#chartFill-${size})`} d='M0 64 C24 57 28 61 46 46 S78 60 99 42 S127 50 150 30 S181 42 202 34 S235 47 257 21 S293 34 315 13 S332 20 340 6 V82 H0z' />
                <path className='chart-line' d='M0 64 C24 57 28 61 46 46 S78 60 99 42 S127 50 150 30 S181 42 202 34 S235 47 257 21 S293 34 315 13 S332 20 340 6' />
              </svg>
              <div className='product-chart-days'><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div>
            </section>

            <section className='product-panel product-tasks'>
              <div className='product-panel-heading'><div><b>Up next</b><small>Keep the momentum</small></div><button type='button' aria-label='Add a task'>＋</button></div>
              <div className='product-task-list'>
                {dashboardTasks.map((task, index) => {
                  const isComplete = completed[index];
                  return <button className={`product-task ${isComplete ? "is-complete" : ""}`} type='button' key={task} onClick={() => setCompleted((current) => current.map((value, taskIndex) => taskIndex === index ? !value : value))} aria-pressed={isComplete}>
                    <span className='product-checkbox'>{isComplete ? "✓" : ""}</span><span>{task}<small>{index === 0 ? "Today · 2:30 PM" : index === 1 ? "Today · Design" : "Tomorrow · Review"}</small></span><i className={`task-priority task-priority--${index}`} />
                  </button>;
                })}
              </div>
              <button className='product-all-tasks' type='button' onClick={() => setSection("Tasks")}>View all tasks <span>→</span></button>
            </section>
          </div>
          <nav className='product-bottom-nav' aria-label='Studio mobile navigation'>
            {[["Overview", "⌂"], ["Tasks", "▤"], ["Insights", "◷"]].map(([label, icon]) => <button type='button' key={label} className={section === label ? "is-active" : ""} onClick={() => setSection(label)}><span>{icon}</span>{label}</button>)}
          </nav>
          <div className='product-assistant'><span className='product-assistant-star'>✳</span><span><b>A little help?</b><small>Your weekly plan is ready to review.</small></span><button type='button' onClick={() => setSection("Insights")}>See insights <i>↗</i></button></div>
          {popover && <div className={`product-popover product-popover--${popover}`} role={popover === "search" ? "dialog" : "status"} aria-label={popover === "search" ? "Quick switch" : undefined}>
            {popover === "search" ? <><span>QUICK SWITCH</span>{["Overview", "Tasks", "Insights"].map((view) => <button type='button' key={view} onClick={() => { setSection(view); setPopover(null); }}>{view}<i>↵</i></button>)}</> : <><b>{popover === "created" ? "Your new project is ready to shape." : "You’re all caught up."}</b><button type='button' aria-label='Dismiss' onClick={() => setPopover(null)}>×</button></>}
          </div>}
        </main>
      </div>
    </div>
  );
};

const DigitalWorkspace = ({ viewport, setViewport, introActive }) => {
  const stageRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 75, damping: 22, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 75, damping: 22, mass: 0.7 });
  const rotateY = useTransform(smoothX, [-1, 1], [5, -5]);
  const rotateX = useTransform(smoothY, [-1, 1], [-3, 3]);
  const mainX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const sideX = useTransform(smoothX, [-1, 1], [-17, 17]);
  const reduceMotion = useReducedMotion();
  const [section, setSection] = useState("Overview");
  const [completed, setCompleted] = useState([false, false, false]);
  const [popover, setPopover] = useState(null);
  const [systemExpanded, setSystemExpanded] = useState(false);
  const [componentState, setComponentState] = useState(reduceMotion ? 'READY' : 'OFF');

  useEffect(() => {
    if (reduceMotion || !introActive) { setComponentState('READY'); return undefined; }
    setComponentState('OFF');
    const hover = window.setTimeout(() => setComponentState('HOVER'), 3500);
    const active = window.setTimeout(() => setComponentState('ACTIVE'), 3900);
    const success = window.setTimeout(() => setComponentState('SUCCESS'), 4300);
    return () => [hover, active, success].forEach(window.clearTimeout);
  }, [introActive, reduceMotion]);

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === "touch" || !stageRef.current) return;
    const bounds = stageRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };
  const resetPointer = () => { pointerX.set(0); pointerY.set(0); };
  const commonProps = { section, setSection, completed, setCompleted, popover, setPopover, reduceMotion, componentState };

  return (
    <div ref={stageRef} data-cursor-label='EXPLORE UI' className={`workspace-stage workspace-stage--${viewport} ${introActive && !reduceMotion ? `workspace-stage--intro workspace-stage--intro-${viewport}` : ''}`} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <motion.div className='workspace-orbit orbit-one' aria-hidden='true' animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} />
      <motion.div className='workspace-orbit orbit-two' aria-hidden='true' animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} />

      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 25, scale: .97 }} animate={reduceMotion ? undefined : introActive ? { opacity: 1, y: [20, 0, -2, 0], scale: [.97, 1, 1.005, 1] } : { opacity: 1, y: 0, scale: 1 }} transition={introActive ? { opacity: { duration: .75, delay: 1.8 }, y: { duration: 2.3, delay: 1.8, ease: [.22, 1, .36, 1] }, scale: { duration: 1.1, delay: 1.8 } } : { duration: .35 }} className={`workspace-device workspace-device--desktop ${viewport === "desktop" ? "is-focused" : ""}`} style={reduceMotion ? undefined : { x: mainX, rotateX, rotateY }} whileHover={reduceMotion || introActive ? undefined : { scale: 1.018, z: 24 }}>
        <ProductDashboard size='desktop' {...commonProps} />
      </motion.div>
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 35, scale: .94 }} className={`workspace-device workspace-device--tablet ${viewport === "tablet" ? "is-focused" : ""}`} style={reduceMotion ? undefined : { x: sideX }} animate={reduceMotion ? undefined : introActive ? { opacity: 1, y: [28, 0, 0], rotateZ: [-3, -1, 0] } : { opacity: 1, y: 0, rotateZ: 0 }} transition={introActive ? { opacity: { duration: .7, delay: 2.2 }, y: { duration: 1.1, delay: 2.2 }, rotateZ: { duration: .8, delay: 2.2 } } : { duration: .35 }} whileHover={reduceMotion || introActive ? undefined : { scale: 1.035, z: 20, rotateZ: -2 }}>
        <ProductDashboard size='tablet' {...commonProps} />
      </motion.div>
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 40, scale: .92 }} className={`workspace-device workspace-device--mobile ${viewport === "mobile" ? "is-focused" : ""}`} style={reduceMotion ? undefined : { x: sideX }} animate={reduceMotion ? undefined : introActive ? { opacity: 1, y: [28, 0, 0], rotateZ: [4, 1, 0] } : { opacity: 1, y: 0, rotateZ: 0 }} transition={introActive ? { opacity: { duration: .7, delay: 2.35 }, y: { duration: 1.1, delay: 2.35 }, rotateZ: { duration: .8, delay: 2.35 } } : { duration: .35 }} whileHover={reduceMotion || introActive ? undefined : { scale: 1.045, z: 22, rotateZ: 3 }}>
        <ProductDashboard size='mobile' {...commonProps} />
      </motion.div>
      <motion.aside className='workspace-code-panel' aria-label='Responsive component code preview' initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .55, delay: 2.1 }}>
        <div className='workspace-code-heading'><span /><span /><span /><b>ResponsiveGrid.tsx</b></div>
        <code><i>const</i> layout = <em>useViewport</em>();</code>
        <code><span>return</span> &lt;Grid columns=&#123;layout&#125; /&gt;</code>
        <div className='workspace-code-flow'>{['DESIGN', 'COMPONENT', 'RESPONSIVE', 'INTERACTION'].map((step, index) => <span key={step} style={{ '--flow-index': index }}><i />{step}</span>)}</div>
        <div className='workspace-code-status'><span /> 3 breakpoints <b>•</b> live</div>
      </motion.aside>
      <motion.aside className={`workspace-system-card ${systemExpanded ? 'is-expanded' : ''}`} aria-label='Design system preview' initial={reduceMotion ? false : { opacity: 0, y: 14, scale: .96 }} animate={reduceMotion ? undefined : { opacity: 1, y: [14, 0, -2, 0], scale: [.96, 1, 1, 1] }} transition={{ opacity: { duration: .6, delay: 2.6 }, y: { duration: 1.2, delay: 2.6, ease: [.22, 1, .36, 1] }, scale: { duration: .8, delay: 2.6 } }}>
        <button className='workspace-system-toggle' type='button' aria-expanded={systemExpanded} onClick={() => setSystemExpanded((value) => !value)}><span>IQ</span><i>{systemExpanded ? 'CLOSE' : 'OPEN SYSTEM'}</i></button>
        <span className='workspace-system-kicker'>DESIGN SYSTEM <i>01 / 04</i></span>
        <div><span>TYPE <b>Aa</b></span><span>COLOR <b><i />NUDE / INK</b></span><span>GRID <b>12 COL</b></span><span>MOTION <b>SPRING</b></span></div>
        <small>{systemExpanded ? 'DESIGN · CODE · MOTION · UI / UX' : 'Thoughtful by design. Responsive by default.'}</small>
      </motion.aside>
      <div className='workspace-device-caption' aria-hidden='true'><span /> ONE PRODUCT <i>·</i> THREE VIEWPORTS</div>
    </div>
  );
};

export default DigitalWorkspace;
