import React, { useEffect, useState } from "react";

const AIStatus = () => {
  const [ticker, setTicker] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTicker((t) => (t + 1) % 1000), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className='ai-status flex items-center gap-3 select-none'>
      <div className='relative w-3 h-3'>
        <span className='ai-ping absolute inset-0 rounded-full'></span>
        <span className='ai-dot absolute inset-0 rounded-full'></span>
      </div>
      <span className='ai-status-text'>AI System Online</span>
      <span className='ai-divider' />
      <span className='ai-metrics'>latency ~ {120 + (ticker % 30)}ms</span>
    </div>
  );
};

export default AIStatus;




