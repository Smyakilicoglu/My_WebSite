"use client";
import { ReactNode, useEffect } from "react";
import useScrollAnimation from "./useScrollAnimation";

export default function ScrollAnimationWrapper({ children }: { children: ReactNode }) {
  useScrollAnimation(); // artık client-side
  return <>{children}</>;
}
