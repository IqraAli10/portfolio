import React from "react";
import { technologies } from "../constants";

const KnowledgeInline = () => {
  return (
    <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {technologies.map((t) => (
        <div key={t.name} className='ai-meter'>
          <div className='ai-meter-row'>
            <span className='ai-meter-name'>{t.name}</span>
            <span className='ai-meter-val'>80%</span>
          </div>
          <div className='ai-meter-bar'>
            <div className='ai-meter-fill' style={{ width: `80%` }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default KnowledgeInline;


