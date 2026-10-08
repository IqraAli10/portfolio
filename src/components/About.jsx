import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => (
  <div className='about-composition'>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>A little about me</p>
      <h2 className={styles.sectionHeadText}>Design with intent.<br /><span className='about-heading-accent'>Built to work.</span></h2>
    </motion.div>

    <div className='about-grid'>
      <motion.div variants={fadeIn("right", "spring", 0.12, 0.8)} className='about-copy'>
        <p>I’m Iqra Bibi, a frontend developer and UI designer focused on the details that make digital products feel clear, useful, and a little unexpected.</p>
        <p>I bring interface thinking and frontend craft together—from the first layout to the small interactions that make an experience feel considered.</p>
        <a href='#skills' className='about-skills-link'>Explore my toolkit <span>↗</span></a>
        <div className='about-principles'><span>Curious by nature</span><i /><span>Thoughtful by design</span></div>
      </motion.div>

      <motion.div variants={fadeIn("left", "spring", 0.2, 0.8)} className='about-node-map' role='group' aria-label='Areas of practice'>
        <svg className='about-node-lines' viewBox='0 0 600 390' aria-hidden='true'>
          <defs><linearGradient id='nodeLine' x1='0' x2='1'><stop stopColor='#C9B6A3' stopOpacity='.16' /><stop offset='.52' stopColor='#9C8D80' stopOpacity='.6' /><stop offset='1' stopColor='#A98272' stopOpacity='.16' /></linearGradient></defs>
          <path d='M300 192 114 72M300 192 490 70M300 192 100 312M300 192 500 312M114 72 490 70M100 312 500 312' />
        </svg>
        <div className='about-node about-node--center'><span className='about-node-core'>IB</span><b>Design + code</b><small>ONE CONNECTED PRACTICE</small></div>
        {services.map((service, index) => (
          <motion.div key={service.title} className={`about-node about-node--${index + 1}`} whileHover={{ y: -4, scale: 1.035 }} transition={{ type: "spring", stiffness: 320, damping: 22 }}>
            <img src={service.icon} alt='' /><span>{service.title}</span>
          </motion.div>
        ))}
        <span className='about-map-label about-map-label--top'>CRAFT <i>01 — 05</i></span>
        <span className='about-map-label about-map-label--bottom'>THINK · DESIGN · BUILD</span>
      </motion.div>
    </div>
  </div>
);

export default SectionWrapper(About, "about");
