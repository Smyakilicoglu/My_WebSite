"use client";

import Link from "next/link";
import { LinkedInLogoIcon, InstagramLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const GithubIcon = ({ className }: { className?: string }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // Tailwind sm breakpoint

    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden"; // mobilde scroll kapanır
    } else {
      document.body.style.overflow = "auto"; // desktop normal
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-[400px] bg-[#630000] opacity-90 
        rounded-r-[40px] z-50 transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute left-8 top-8 p-1 rounded transition text-2xl font-bold leading-none text-white"
        >
          ✕
        </button>

        {/* GRID: Sol sosyal ikonlar / Ortadaki çizgi / Sağ menü */}
        <div className="grid grid-cols-[1fr_2px_2fr] h-full">
          
          {/* Sol alan: sosyal ikonlar */}
          <div className="flex flex-col justify-end items-center pb-10 pl-5 pr-10">
            <div className="flex flex-col gap-6 text-white">
              <a href="https://www.linkedin.com/in/s%C3%BCmeyra-kili%C3%A7o%C4%9Flu-9b7674251" target="_blank" rel="noreferrer" className="italic-cursive flex flex-row gap-2">
                <LinkedInLogoIcon className="hover:opacity-70 w-5 h-5" />
                <p>Linkedin</p>
              </a>
              <a href="https://github.com/Smyakilicoglu" target="_blank" rel="noreferrer" className="italic-cursive flex flex-row gap-2">
                <GithubIcon className="hover:opacity-70 w-5 h-5" />
                <p className="text-">GitHub</p>
              </a>
              <a href="https://www.instagram.com/sumeyra___klc/" target="_blank" rel="noreferrer" className="italic-cursive flex flex-row gap-2">
                <InstagramLogoIcon className="hover:opacity-70 w-5 h-5" />
                <p>Instagram</p>
              </a>
            </div>
          </div>

          {/* Ortadaki çizgi */}
          <div className="bg-white/30 w-full my-10 rounded-full"></div>

          {/* Sağ alan: menü linkleri */}
          <div className="flex flex-col justify-start py-10 pr-6 pl-4 space-y-6 mt-20">
            <Link href="/" className="italic-cursive text-2xl font-medium text-white hover:opacity-70" onClick={onClose}>Ana Sayfa</Link>
            <Link href="/about" className="italic-cursive text-2xl  font-medium text-white hover:opacity-70" onClick={onClose}>Hakkımda</Link>
            <Link href="/project" className="italic-cursive text-2xl  font-medium text-white hover:opacity-70" onClick={onClose}>Projeler</Link>
            <Link href="/contact" className="italic-cursive text-2xl  font-medium text-white hover:opacity-70" onClick={onClose}>İletişim</Link>
          </div>

        </div>
      </div>
    </>
  );
}
