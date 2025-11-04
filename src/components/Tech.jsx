import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const [useStatic, setUseStatic] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setUseStatic(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='group relative w-28 h-28 flex items-center justify-center' key={technology.name} title={technology.name}>
          {useStatic ? (
            <img src={technology.icon} alt={technology.name} className='w-20 h-20 object-contain drop-shadow-[0_6px_20px_rgba(145,94,255,0.25)]' />
          ) : (
            <BallCanvas icon={technology.icon} />
          )}
          <span className='pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/70 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
            {technology.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
