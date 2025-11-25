"use client";

import { useState } from "react";
import * as Menubar from "@radix-ui/react-menubar";
import Link from "next/link";
import { useScrollState } from "../../hooks/useScrollState";
import Sidebar from "../Sidebar";

export default function Header() {
  const isScrolled = useScrollState(50);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop Header — Transparent, hidden when scrolled */}
      <header
        className={`w-full sticky top-0 z-30 transition-all duration-300 ${
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 py-6 flex justify-center hidden md:flex">
          <Menubar.Root className="flex gap-6 items-center">
            {/* Home */}
            <Menubar.Menu>
              <Link href="/" className="nav-hover-text">
                <span>Ana Sayfa</span>
              </Link>
            </Menubar.Menu>

            {/* About */}
            <Menubar.Menu>
              <Link href="/about" className="nav-hover-text">
                <span>Hakkımda</span>
              </Link>
            </Menubar.Menu>

            <Menubar.Menu>
              <Link href="/project" className="nav-hover-text">
                <span>Projeler</span>
              </Link>
            </Menubar.Menu>
            <Menubar.Menu>
              <Link href="/contact" className="nav-hover-text">
                <span>İletişim</span>
              </Link>
            </Menubar.Menu>
          </Menubar.Root>
        </div>
      </header>

      
      <div className="fixed left-6 top-6 z-40 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-12 h-12 rounded-full bg-[#630000] shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Floating Hamburger — Visible only when scrolled */}
      {isScrolled && (
        <div className="fixed left-6 top-6 z-40 transition-all duration-300">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-12 h-12 rounded-full bg-[#630000] shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
