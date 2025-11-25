"use client";
import { useEffect, useState } from "react";

interface CustomCursorProps {
  disableEffect?: boolean;
}

export default function CustomCursor({ disableEffect = false }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [overNav, setOverNav] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [visible, setVisible] = useState(false); // cursor görünür mü?

  const SPOTLIGHT_SELECTOR =
    ".spotlight, [data-spotlight], h1, p, h2, h3, .nav-hover-text, span";

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let hideTimeout: NodeJS.Timeout;

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      setVisible(true);          // hareket edince görünür
      clearTimeout(hideTimeout); // timer sıfırla

      hideTimeout = setTimeout(() => {
        setVisible(false);        // 1.5 saniye sonra kaybolsun
      }, 1500);

      if (disableEffect) {
        setOverNav(false);
        return;
      }

      const el = document.elementFromPoint(e.clientX, e.clientY) as Element | null;
      if (el && el.closest && el.closest(SPOTLIGHT_SELECTOR)) {
        setOverNav(true);
      } else {
        setOverNav(false);
      }
    };

    const hideCursor = () => setVisible(false); // pencere dışına çıkınca yok et

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, [disableEffect, isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        transform: "translate(-50%, -50%)",
        width: visible ? "32px" : "0px",   // görünmezken küçülüyor
        height: visible ? "32px" : "0px",
        opacity: visible ? 1 : 0,          // opacity ile fade-out
        transition: "opacity 0.3s ease, width 0.3s ease, height 0.3s ease",
        borderRadius: "50%",
        backgroundColor: overNav ? "white" : "black",
        mixBlendMode: overNav ? "difference" : "normal",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
