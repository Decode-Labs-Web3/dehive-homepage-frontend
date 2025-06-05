"use client";
import React, { useRef, useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import DehiveCard from "../components/sections/homepage_section";
import { dehives } from "../data/homepage_data";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let current = 0;
    let isScrolling = false;

    sectionRefs.current = Array.from(container.querySelectorAll('section'));

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      if (e.deltaY > 0 && current < sectionRefs.current.length - 1) {
        current++;
      } else if (e.deltaY < 0 && current > 0) {
        current--;
      } else {
        return;
      }
      isScrolling = true;
      sectionRefs.current[current]?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => { isScrolling = false; }, 900);
      e.preventDefault();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-[#0d0d0d] min-h-screen text-white px-[2vw] py-[2rem] pt-[7rem]" ref={scrollRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
          {dehives.map((dehive) => (
            <DehiveCard key={dehive.id} dehive={dehive} />
          ))}
        </div>
      </main>
    </>
  );
}