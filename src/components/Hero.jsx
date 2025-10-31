import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import AIStatus from "../components/AIStatus";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] z-10 max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <AIStatus />
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Iqra</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            AI Developer & Full Stack Developer<br className='sm:block hidden' />
            crafting smooth user experiences<br className='sm:block hidden' /> with modern web technologies          </p>
        </div>
      </div>

      {/* Canvas: below text on mobile, behind on sm+ */}
      <div className='relative z-0 mt-8 sm:mt-0 sm:absolute sm:inset-0 sm:z-0 pointer-events-none'>
        <ComputersCanvas />
      </div>

      {/* Creative AI-themed decor placed at highlighted spots */}
      <div className='hidden sm:block ai-orb w-[60px] h-[60px] left-[3%] top-[16%] animate-float-y'></div>
      <div className='hidden md:block ai-ring w-[260px] h-[260px] right-[22%] top-[8%] animate-spin-slow'></div>
      <div className='hidden md:block ai-orb w-[140px] h-[140px] left-[14%] bottom-[18%] animate-float-x'></div>
      <div className='hidden lg:block ai-ring w-[120px] h-[120px] right-[18%] bottom-[24%] animate-spin-slow'></div>
      <div className='hidden lg:block ai-orb w-[80px] h-[80px] right-[30%] top-[38%] animate-float-y'></div>
      <div className='hidden xl:block ai-chip right-[36%] bottom-[26%] animate-float-y'></div>
      <div className='hidden xl:block ai-beam left-[8%] top-[22%] rotate-12'></div>

      <div className='absolute z-10 xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
