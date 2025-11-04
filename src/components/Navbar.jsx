import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-3 sm:py-5 fixed top-0 z-20`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto ai-nav ai-nav-shimmer rounded-2xl px-4 py-3 relative'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src='/girl.png'
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><defs><linearGradient id="g" x1="0" x2="36" y1="0" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="%23915EFF"/><stop offset="1" stop-color="%232F80ED"/></linearGradient></defs><circle cx="18" cy="18" r="18" fill="url(%23g)"/></svg>';
            }}
            alt='avatar'
            className='w-9 h-9 rounded-full object-cover shadow-[0_0_12px_rgba(145,94,255,0.35)]'
          />
          <p className='ai-brand text-[18px] font-bold cursor-pointer flex'>
            Iqra&nbsp;
            <span className='sm:block hidden'>| AI Developer & Full Stack Developer</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-6'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${active === nav.title ? "text-white ai-link ai-link-active" : "text-secondary ai-link"} hover:text-white text-[16px] font-medium cursor-pointer ai-pill px-3 py-1 rounded-full`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          {toggle && (
            <div className='fixed inset-0 z-30 bg-black/60 backdrop-blur-sm' onClick={() => setToggle(false)}>
              <div className='ai-nav rounded-none px-6 py-5 absolute top-0 left-0 right-0'>
                <ul className='list-none flex flex-col gap-5'>
                  {navLinks.map((nav) => (
                    <li
                      key={nav.id}
                      className={`font-poppins font-medium cursor-pointer text-[18px] ${active === nav.title ? "text-white ai-link ai-link-active" : "text-secondary ai-link"}`}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.title);
                      }}
                    >
                      <a href={`#${nav.id}`}>{nav.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className='ai-progress' style={{ width: `${progress}%` }} />
      </div>
    </nav>
  );
};

export default Navbar;
