import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";

const skillGroups = [
  { title: "Interface & frontend", detail: "Building responsive, component-led interfaces.", names: ["HTML 5", "CSS 3", "JavaScript", "TypeScript", "React JS", "Redux Toolkit", "Tailwind CSS"] },
  { title: "Creative tools", detail: "Prototyping ideas and bringing interaction to life.", names: ["figma", "Three JS"] },
  { title: "Backend & workflow", detail: "Connecting the interface to the systems behind it.", names: ["Node JS", "MongoDB", "git", "docker"] },
];

const Tech = () => (
  <div id='skills' className='tech-ecosystem'>
    <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: .55 } } }}>
      <p className={styles.sectionSubText}>Tools I build with</p>
      <h2 className={styles.sectionHeadText}>A considered toolkit.</h2>
      <p className='tech-intro'>The right tool for the idea, with the craft to make it feel cohesive.</p>
    </motion.div>
    <div className='tech-groups'>
      {skillGroups.map((group, groupIndex) => (
        <motion.section key={group.title} className='tech-group' variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .55, delay: groupIndex * .08 } } }}>
          <div className='tech-group-heading'><span>0{groupIndex + 1}</span><div><h3>{group.title}</h3><p>{group.detail}</p></div></div>
          <div className='tech-items'>
            {group.names.map((name, index) => {
              const technology = technologies.find((item) => item.name === name);
              if (!technology) return null;
              return <motion.button key={technology.name} type='button' className='tech-item' title={technology.name} whileHover={{ y: -4, rotateX: 4 }} whileTap={{ scale: .97 }} transition={{ type: "spring", stiffness: 360, damping: 22 }} style={{ "--tech-order": index }}>
                <span className='tech-icon-frame'><img src={technology.icon} alt='' loading='lazy' /></span>
                <span>{technology.name}</span>
                <i aria-hidden='true'>↗</i>
              </motion.button>;
            })}
          </div>
        </motion.section>
      ))}
    </div>
  </div>
);

export default SectionWrapper(Tech, "");
