"use client";
import { useEffect, useState } from "react";

interface CustomCursorProps {
  disableEffect?: boolean;
}

export default function CustomCursor({ disableEffect = false }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [overNav, setOverNav] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // masaüstü kontrolü

  const SPOTLIGHT_SELECTOR = " .spotlight, [data-spotlight], h1, p, h2, h3, .nav-hover-text, span";

  useEffect(() => {
    // başlangıçta ekran boyutunu kontrol et
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // mobil/tablet için hiç efekt yapma

    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });

      if (disableEffect) {
        setOverNav(false);
        return;
      }

      const el = document.elementFromPoint(x, y) as Element | null;
      if (el && el.closest && el.closest(SPOTLIGHT_SELECTOR)) {
        setOverNav(true);
      } else {
        setOverNav(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [disableEffect, isDesktop]);


  if (!isDesktop) return null; // mobil/tablet için hiç render etme

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        transform: "translate(-50%, -50%)",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        backgroundColor: overNav ? "white" : "black",
        mixBlendMode: overNav ? "difference" : "normal",
        transition: "background-color 120ms ease, transform 80ms ease",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
