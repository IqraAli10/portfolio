import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import KnowledgeInline from "./KnowledgeInline";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full' tiltMaxAngleX={45} tiltMaxAngleY={45} scale={1} transitionSpeed={450}>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const [showSkills, setShowSkills] = React.useState(false);
  return (
    <div className='relative'>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About Iqra.</h2>
      </motion.div>

      <div className={`mt-4 ${!showSkills ? 'md:pr-64 lg:pr-80 xl:pr-[22rem]' : ''}`}>
        {!showSkills ? (
          <>
            <p className='text-secondary text-[17px] max-w-3xl leading-[30px]'>
              I’m Iqra, an AI Developer & Full Stack Developer based in Pakistan. I’m
              passionate about building intelligent systems, crafting seamless web
              experiences, and developing end-to-end scalable applications using modern
              technologies. I move fast, design thoughtfully, and ship reliable
              products — from clean APIs and robust backends to beautiful, responsive
              UIs.
            </p>
            <button onClick={() => setShowSkills(true)} className='mt-6 ai-btn'>
              <span className='dot' />
              <span className='uppercase tracking-wider text-[12px]'>Skills</span>
            </button>
          </>
        ) : (
          <>
            <KnowledgeInline />
            <button aria-label='Close skills' onClick={() => setShowSkills(false)} className='mt-6 ai-btn'>
              <span className='dot' />
            </button>
          </>
        )}
      </div>

      {/* Floating avatar image on the right side (hide when Skills open) */}
      {!showSkills && (
        <motion.img
          src='/girl.png'
          alt='Iqra avatar'
          className='hidden md:block absolute right-2 md:top-2 lg:right-6 lg:top-0 w-40 md:w-48 lg:w-64 xl:w-72 ai-photo-glow animate-float pointer-events-none select-none'
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        />
      )}

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      
    </div>
  );
};

export default SectionWrapper(About, "about");
