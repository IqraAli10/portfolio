import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import AIStatus from "../components/AIStatus";

const Hero = () => {
  return (
    <section className={`relative w-full min-h-[100svh] mx-auto flex items-center py-12 sm:py-0`}>
      <div
        className={`z-20 max-w-7xl mx-auto ${styles.paddingX} w-full flex flex-col md:flex-row items-start gap-5`}
      >
        <div className='hidden md:flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <AIStatus />
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Iqra</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-2xl`}>
          AI & Full Stack Developer<br className='sm:block hidden' />
          Crafting smart interfaces<br className='sm:block hidden' />
          and seamless web experiences.
          </p>
          {/* Mobile: floating avatar directly under text */}
          <div className='block md:hidden relative z-10 mt-6 flex justify-center'>
            <img src='/girl.png' alt='Iqra' className='w-40 xs:w-48 ai-photo-glow animate-float' />
          </div>
        </div>
      </div>

      {/* Canvas: below text on mobile, behind on sm+ */}
      {/* 3D Computer only on md+ (laptops/desktops) */}
      <div className='hidden md:block relative z-10 mt-6 md:mt-0 md:absolute md:inset-0 md:z-10 pointer-events-none'>
        <ComputersCanvas />
      </div>

      {/* Creative AI-themed decor (kept); removed screen-like chip */}
      <div className='hidden sm:block ai-orb w-[60px] h-[60px] left-[3%] top-[16%] animate-float-y z-0'></div>
      <div className='hidden md:block ai-ring w-[260px] h-[260px] right-[22%] top-[8%] animate-spin-slow z-0'></div>
      <div className='hidden md:block ai-orb w-[140px] h-[140px] left-[14%] bottom-[18%] animate-float-x z-0'></div>
      <div className='hidden lg:block ai-ring w-[120px] h-[120px] right-[18%] bottom-[24%] animate-spin-slow z-0'></div>
      <div className='hidden lg:block ai-orb w-[80px] h-[80px] right-[30%] top-[38%] animate-float-y z-0'></div>
      <div className='hidden xl:block ai-beam left-[8%] top-[22%] rotate-12 z-0'></div>

      <div className='absolute z-20 xs:bottom-6 bottom-24 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.2,
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
