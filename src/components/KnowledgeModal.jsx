import React, { useMemo, useState } from "react";
import { technologies } from "../constants";

const KnowledgeModal = ({ open, onClose }) => {
  const initial = useMemo(() => Object.fromEntries(technologies.map(t => [t.name, 70])), []);
  const [ratings, setRatings] = useState(initial);

  if (!open) return null;

  const handle = (name) => (e) => setRatings({ ...ratings, [name]: Number(e.target.value) });

  return (
    <div className='ai-modal-overlay' onClick={onClose}>
      <div className='ai-modal' onClick={(e) => e.stopPropagation()}>
        <div className='ai-modal-header'>
          <h3 className='ai-modal-title'>Skill Ratings (0–100%)</h3>
          <button className='ai-modal-close' onClick={onClose}>✕</button>
        </div>
        <div className='ai-modal-body'>
          {technologies.map((t) => (
            <div key={t.name} className='ai-meter'>
              <div className='ai-meter-row'>
                <span className='ai-meter-name'>{t.name}</span>
                <span className='ai-meter-val'>{ratings[t.name]}%</span>
              </div>
              <div className='ai-meter-bar'>
                <div className='ai-meter-fill' style={{ width: `${ratings[t.name]}%` }} />
              </div>
              <input type='range' min='0' max='100' value={ratings[t.name]} onChange={handle(t.name)} className='ai-meter-input' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeModal;



