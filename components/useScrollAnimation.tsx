"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SplitWordsProps {
  // Tetikleyici elementin ID'si (Home.tsx'te eklenen "about-section-trigger")
  triggerID: string; 
  children: ReactNode;
}

/**
 * Metni kelimelere böler ve kaydırma tetikleyicisi ile canlandırır (Fade-in ve Slide-up efekti).
 * toggleActions: "play reverse play reverse" sayesinde sürekli tetiklenir.
 */
export default function SplitWords({ children, triggerID }: SplitWordsProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    const triggerElement = document.getElementById(triggerID); 

    if (!triggerElement) {
        console.error(`ScrollTrigger: ID "${triggerID}" bulunamadı.`);
        return;
    }

    let split: SplitText | null = null;
    let ctx: gsap.Context | null = null;

    ctx = gsap.context(() => {
      // 1. Metni kelimelere böl
      split = new SplitText(textRef.current, {
        type: "words",
        wordsClass: "split-word",
      });

      // 2. Animasyonu ayarla
      gsap.fromTo(
        split.words,
        {
          y: 20, // 20px aşağıdan başla
          opacity: 0,
          filter: "blur(4px)", // Hafif bulanıklıktan başla
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.05, // Her kelime arasında 0.05 saniye gecikme
          scrollTrigger: {
            trigger: triggerElement, // Tetikleyici element
            start: "top bottom-=300", // Tetikleyici %80 göründüğünde animasyonu başlat
            // BU KISIM DEĞİŞTİ: play reverse play reverse
            // 1. onEnter: 'play' -> Animasyonu oynat
            // 2. onLeave: 'reverse' -> Animasyonu geri sar
            // 3. onEnterBack: 'play' -> Geri kaydırırken girerse tekrar oynat
            // 4. onLeaveBack: 'reverse' -> Geri kaydırırken çıkarsa tekrar geri sar
            toggleActions: "play reverse play reverse", 
          },
        }
      );
    }, textRef); 

    return () => {
      // Cleanup
      ctx?.revert();
      split?.revert();
    };
  }, [children, triggerID]); 

  return <div ref={textRef} className="inline-block text-black">{children}</div>;
}