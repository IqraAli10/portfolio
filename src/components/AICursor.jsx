import React, { useEffect, useRef } from "react";

const AICursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;
    let isDown = false;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    const onDown = () => {
      isDown = true;
      ring.classList.add("ai-ring-down");
      dot.classList.add("ai-dot-down");
    };
    const onUp = () => {
      isDown = false;
      ring.classList.remove("ai-ring-down");
      dot.classList.remove("ai-dot-down");
    };

    const onHover = (e) => {
      const t = e.target;
      if (!t) return;
      const isInteractive = t.closest("a, button, [role='button'], input, textarea, select");
      if (isInteractive) {
        ring.classList.add("ai-ring-hover");
      } else {
        ring.classList.remove("ai-ring-hover");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onHover, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onHover);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className='ai-cursor ai-cursor-ring'></div>
      <div ref={dotRef} className='ai-cursor ai-cursor-dot'></div>
    </>
  );
};

export default AICursor;



