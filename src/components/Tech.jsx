import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='group relative w-28 h-28' key={technology.name} title={technology.name}>
          <BallCanvas icon={technology.icon} />
          <span className='pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/70 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
            {technology.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
