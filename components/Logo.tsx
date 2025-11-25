"use client";

import React, { forwardRef, useRef, useEffect, SVGProps } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

declare module "gsap/gsap-core" {
  interface TweenVars {
    drawSVG?: string | number;
  }
}

gsap.registerPlugin(DrawSVGPlugin);

const Logo = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => {
  const sRef = useRef<SVGPathElement>(null);
  const kRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sRef.current || !kRef.current) return;

    gsap.set([sRef.current, kRef.current], { drawSVG: "0%" });

    const tl = gsap.timeline();
    tl.to(sRef.current, { drawSVG: "100%", duration: 1, ease: "power1.inOut" })
      .to(kRef.current, { drawSVG: "100%", duration: 1, ease: "power1.inOut" }, "<0.5")
      .to([sRef.current, kRef.current], { drawSVG: "50% 50%", duration: 1, ease: "power1.inOut" });
  }, []);

  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      {/* Daha düzgün S harfi */}
      <path
        ref={sRef}
        d="
            M80 75
            C90 55, 90 75, 30 90
            C60 90, 90 95, 90 115
            C90 135, 30 135, 30 115
        "
        stroke="#EEEBDD"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        />

      {/* Daha düzgün K harfi */}
      <path
        ref={kRef}
        d="
            M90 30 
            Q100 75 88 120 
            
            M95 70
            Q130 50 145 30  
            
            M95 75
            Q130 80 150 100 
        "
        stroke="#EEEBDD"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default Logo;
