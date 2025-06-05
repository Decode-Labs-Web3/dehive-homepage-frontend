"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        className="flex items-center justify-between py-3 px-6 md:px-10 w-full max-w-7xl mx-auto bg-[#121212]/80 backdrop-blur-xl pointer-events-auto shadow-md border border-white/10 rounded-xl mt-4"
        initial={{ y: 0 }}
        animate={{ y: show ? 0 : -100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-10">
            {/* <img src="/dehive_logo.png" alt="DeHive logo" className="w-10 h-10 object-contain" /> */}
          </div>
          <span className="ml-3 text-xl font-bold text-white">DeHive</span>
        </Link>

        <Link
          href="/app"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-300"
        >
          Login
        </Link>
      </motion.nav>
    </div>
  );
}