"use client";

import React, { ReactNode, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const overlayRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLElement[]>([]);
  const isTransitioning = useRef(false);
  const numberOfBlocks = 20; // Blok sayısı

  // --- Animasyon Fonksiyonları ---

  // 1. Sayfayı kapatan animasyon
  const coverPage = (url: string) => {
    const tl = gsap.timeline({
      onComplete: () => router.push(url),
    });

    tl.to(blocksRef.current, {
      scaleY: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out",
      transformOrigin: "top",
    }).to({}, { duration: 0.2 });
  };

  // 2. Yeni sayfayı açan animasyon
  const revealPage = () => {
    gsap.set(blocksRef.current, { scaleY: 1, transformOrigin: "top" });

    gsap.to(blocksRef.current, {
      scaleY: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.inOut",
      transformOrigin: "top",
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
  };

  // Sayfa linklerine tıklamayı yakala
  const handleRouteChange = (url: string) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    coverPage(url);
  };

  // --- useEffect ---
  useEffect(() => {
    if (!overlayRef.current) return;

    // Blokları oluştur
    overlayRef.current.innerHTML = "";
    blocksRef.current = [];

    const blockHeight = Math.ceil(window.innerHeight / numberOfBlocks); // Dinamik yüksekliği ayarla

    for (let i = 0; i < numberOfBlocks; i++) {
      const block = document.createElement("div");
      block.className = "block bg-[#630000] w-full origin-top";
      block.style.height = `${blockHeight}px`; // Dinamik yükseklik
      overlayRef.current.appendChild(block);
      blocksRef.current.push(block);
    }

    // Sayfa linklerini yakala
    const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href^="/"]');

    const linkClickHandler = (e: MouseEvent) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const url = new URL(target.href).pathname;

      if (url !== pathname) {
        handleRouteChange(url);
      }
    };

    links.forEach((link) => link.addEventListener("click", linkClickHandler));

    // Sayfa yüklenince animasyonu başlat
    revealPage();

    // Cleanup
    return () => {
      links.forEach((link) => link.removeEventListener("click", linkClickHandler));
    };
  }, [router, pathname]);

  return (
    <>
      {children}

      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 pointer-events-none flex flex-col gap-0"
      />
    </>
  );
};

export default PageTransition;
