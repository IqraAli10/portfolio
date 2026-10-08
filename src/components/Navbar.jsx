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
    <nav className={`${styles.paddingX} w-full flex items-center py-3 sm:py-5 sticky top-0 z-40`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto ai-nav ai-nav-shimmer rounded-2xl px-4 py-3 relative nav-enter'>
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
              e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="%23D8C6B5"/><text x="18" y="23" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23272321">IB</text></svg>';
            }}
            alt='avatar'
            className='w-9 h-9 rounded-full object-cover shadow-[0_0_12px_rgba(169,130,114,0.22)]'
          />
          <p className='ai-brand text-[18px] font-bold cursor-pointer flex'>
            Iqra Bibi<span className='navbar-role sm:block hidden'> / Frontend Developer & UI Designer</span>
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
          {!toggle && (
            <button type='button' aria-label='Open navigation menu' onClick={() => setToggle(true)} className='grid place-items-center rounded-lg p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9B6A3]'>
              <img src={menu} alt='' className='w-[28px] h-[28px] object-contain' />
            </button>
          )}

          {toggle && (
            <div className='fixed inset-0 z-50 ai-menu-backdrop' onClick={() => setToggle(false)}>
              <div className='ai-menu-card ai-drawer mx-0 rounded-b-2xl p-5' onClick={(e)=>e.stopPropagation()}>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <img src='/girl.png' alt='' className='w-8 h-8 rounded-full' />
                    <span className='ai-brand text-[18px] font-bold'>Iqra</span>
                  </div>
                  <button aria-label='Close menu' onClick={() => setToggle(false)}>
                    <img src={close} alt='close' className='w-[28px] h-[28px] object-contain' />
                  </button>
                </div>
                <ul className='mt-5 list-none flex flex-col gap-4'>
                  {navLinks.map((nav) => (
                    <li
                      key={nav.id}
                      className={`font-poppins font-medium cursor-pointer text-[18px] ${active === nav.title ? "text-white ai-link ai-link-active" : "text-secondary ai-link"}`}
                      onClick={() => { setToggle(false); setActive(nav.title); }}
                    >
                      <a href={`#${nav.id}`}>{nav.title}</a>
                    </li>
                  ))}
                </ul>
                <div className='mt-6 flex items-center gap-3'>
                  <a href='#contact' className='ai-menu-btn text-white text-[14px]'>
                    <span>Contact</span>
                  </a>
                  <a href='https://www.linkedin.com/in/iqra-ali-178531254/' target='_blank' rel='noreferrer' className='ai-menu-btn text-white text-[14px]'>LinkedIn</a>
                </div>
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
