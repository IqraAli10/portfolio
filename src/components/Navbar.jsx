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

  // lock body scroll when mobile menu open
  useEffect(() => {
    if (toggle) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [toggle]);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-3 sm:py-5 fixed top-0 z-40`}>
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
            <div className='fixed inset-0 z-50 bg-primary/95'>
              <div className='max-w-7xl mx-auto px-6 pt-5'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <img src='/girl.png' alt='' className='w-8 h-8 rounded-full' />
                    <span className='ai-brand text-[18px] font-bold'>Iqra</span>
                  </div>
                  <button aria-label='Close menu' onClick={() => setToggle(false)}>
                    <img src={close} alt='close' className='w-[28px] h-[28px] object-contain' />
                  </button>
                </div>
                <ul className='mt-6 list-none flex flex-col gap-6 ai-menu-panel'>
                  {navLinks.map((nav) => (
                    <li
                      key={nav.id}
                      className={`font-poppins font-medium cursor-pointer text-[20px] ${active === nav.title ? "text-white ai-link ai-link-active" : "text-secondary ai-link"}`}
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
