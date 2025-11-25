"use client";

import React, { ReactNode, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import Logo from "./Logo"; 

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const overlayRef = useRef<HTMLDivElement>(null);
  const logoOverlayRef = useRef<HTMLDivElement>(null); 
  const blocksRef = useRef<HTMLElement[]>([]); 
  const isTransitioning = useRef(false);
  const logoRef = useRef<HTMLDivElement>(null);

  // --- Animasyon Fonksiyonları ---

  // 1. Sayfayı kapatan animasyon (Soldan sağa uzar)
  const coverPage = (url: string) => {
  const tl = gsap.timeline({
    onComplete: () => router.push(url),
  });

  // Bloklar üstten alta kapanır
  tl.to(blocksRef.current, {
    scaleY: 1,
    duration: 0.4,
    stagger: 0.05,
    ease: "power2.out",
    transformOrigin: "top", // üstten kapanacak
  })
    .to(logoOverlayRef.current!, { opacity: 1, duration: 0.5 }, "<0.1")
    .to({}, { duration: 0.2 });
};

// 2. Yeni sayfayı açan animasyon (bloklar üstten alta kayboluyor)
const revealPage = () => {
  // Bloklar başlangıçta sayfayı kaplamış
  gsap.set(blocksRef.current, { scaleY: 1, transformOrigin: "top" });

  gsap.to(blocksRef.current, {
    scaleY: 0,
    duration: 0.5,
    stagger: 0.05,
    ease: "power2.inOut", // yumuşak geçiş
    transformOrigin: "top",
    onComplete: () => {
      gsap.to(logoOverlayRef.current, { opacity: 0, duration: 0.5 }); // logo fade out
      isTransitioning.current = false;
    },
  });
};

  // ... (Geri kalan kod aynı kalır) ...

  const handleRouteChange = (url: string) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    coverPage(url);
  };

  useEffect(() => {
    const createBlocks = () => {
      if (!overlayRef.current) return;
      overlayRef.current.innerHTML = "";
      blocksRef.current = [];

      for (let i = 0; i < 20; i++) {
        const block = document.createElement("div");
        block.className = "block bg-red-800 w-full h-[5vh] origin-left"; 
        overlayRef.current.appendChild(block);
        blocksRef.current.push(block);
      }
    };
    
    createBlocks();

    const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href^="/"]');
    
    const linkClickHandler = (e: MouseEvent) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.href;
      const url = new URL(href).pathname;
      
      if (url !== pathname) {
        handleRouteChange(url);
      }
    };

    links.forEach((link) => {
      link.addEventListener("click", linkClickHandler as EventListener);
    });
    
    revealPage();

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", linkClickHandler as EventListener);
      });
    };
  }, [router, pathname]); 

  return (
    <>
      {children}

      <div 
        ref={overlayRef} 
        className="fixed inset-0 z-50 pointer-events-none flex flex-col"
      >
      </div>

      <div
        ref={logoOverlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center opacity-0 pointer-events-none"
        style={{ backgroundColor: "#630000" }}
      >
        <div 
          ref={logoRef} 
          className="w-24 h-24"
        >
          <Logo /> 
        </div>
      </div>
    </>
  );
};

export default PageTransition;