"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitWords from "../components/useScrollAnimation";
import { useState } from "react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [hoveredImg, setHoveredImg] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
const lineRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!buttonRef.current || !lineRef.current) return;

  gsap.to(lineRef.current, {
    width: () => buttonRef.current?.offsetWidth + "px",
    ease: "power2.out",
    scrollTrigger: {
      trigger: buttonRef.current,
      start: "top 90%", // gecikme
      end: "top 60%",   // geri çekilme noktası
      scrub: true,
    },
  });
}, []);
  
  // GIF refs array — 12 GIF için
  const gifRefs = useRef<HTMLDivElement[]>([]);

  // Duplicate eklememek için helper
  const addPathRef = (el: SVGPathElement | null) => {
    if (el && !pathsRef.current.includes(el)) {
      pathsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (!svgRef.current || !sectionRef.current) return;

    const paths = pathsRef.current;

    // Her path’in uzunluğunu ayarla
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length - 1}`;
      path.style.strokeDashoffset = `${length}`;
    });

    // Timeline oluştur
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%", // section yüksekliği boyunca animasyon
        scrub: true,
        pin: true,     // section sabit kalır
        anticipatePin: 1,
      },
    });

    // Her path için animasyon
    paths.forEach((path) => {
      tl.to(path, { strokeDashoffset: 0, duration: 1, ease: "power1.inOut" }, "<");
    });

    // Cleanup
    return () => {
      paths.forEach((path) => gsap.killTweensOf(path));
      tl.kill();
    };
  }, []);

useEffect(() => {
  if (!aboutRef.current || !gifRefs.current) return;

  const gifs = gifRefs.current;
  const containerWidth = aboutRef.current.offsetWidth;
  const containerHeight = aboutRef.current.offsetHeight;

  // Mobil/Tablet için dinamik GIF boyutu
  const baseGifWidth = 160;
  const baseGifHeight = 120;

  // GIF sayısına göre ölçekle
  const scaleFactor = Math.min(containerWidth / (5 * baseGifWidth), 1); // max 5 sütun
  const gifWidth = baseGifWidth * scaleFactor;
  const gifHeight = baseGifHeight * scaleFactor;

  const padding = 10;

  const cols = Math.floor((containerWidth - padding * 2) / gifWidth) || 1;
  const rows = Math.floor((containerHeight - padding * 2) / gifHeight) || 1;

  // Hücre dizisi oluştur
  const cells: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * gifWidth + gifWidth / 2 + padding - containerWidth / 2;
      const y = r * gifHeight + gifHeight / 2 + padding - containerHeight / 2;
      cells.push({ x, y });
    }
  }

  // Hücreleri karıştır
  const shuffledCells = cells.sort(() => Math.random() - 0.5);

  // GIF animasyonu
  gifs.forEach((gif, i) => {
    const cell = shuffledCells[i % shuffledCells.length]; // GIF > hücre ise mod ile devam et
    gsap.fromTo(
      gif,
      { x: 0, y: 0, opacity: 0, filter: "blur(10px)" },
      {
        x: cell.x,
        y: cell.y,
        opacity: 1,
        filter: "blur(2px)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play reverse play reverse",
        },
        delay: i * 0.03,
      }
    );
  });
}, []);

useEffect(() => { if (!heroRef.current || !photoRef.current || !overlayRef.current) return;
   // Fotoğraf hafif büyüme animasyonu 
   gsap.to(photoRef.current, { 
    scale: 1.5, // büyüme oranı azaltıldı 
    ease: "power1.out", 
    scrollTrigger: 
    { 
      trigger: heroRef.current, 
      start: "top top", 
      end: "bottom top", 
      scrub: true, 
    },
    }); // Overlay kararma animasyonu 

   gsap.to(overlayRef.current, 
    { opacity: 1, 
      ease: "none", 
      scrollTrigger: { 
        trigger: heroRef.current, 
        start: "top top", 
        end: "bottom top", 
        scrub: true, 
      }, 
    }); 
  }, []);


 useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  if (hoveredImg) {
    window.addEventListener("mousemove", handleMouseMove);
  } else {
    window.removeEventListener("mousemove", handleMouseMove);
  }

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, [hoveredImg]);

  const projects = [
    {
      title: "Yapay Zeka Destekli İşaret Dili Çevirmen Mobil Uygulaması",
      subtitle: "(Bitirme Projesi)",
      img: "/proje11.png",
    },
    {
      title: "Dijital Çizim Eldiveni ve Mobil Kontrol Sistemi",
      subtitle: "BLE ile Mobilde Dijital Çizim",
      img: "/proje2.png",
    },
    {
      title: "Difinity Token Creation & DeFi Simülasyonu",
      subtitle: "Kripto Para Birimi Oluşturma",
      img: "/proje3.png",
    },
    {
      title: "OpenD: Tam İşlevli NFT Pazaryeri Web Sitesi",
      subtitle: "NFT Pazar Alanı",
      img: "/proje5.png",
    },
    {
      title: "JWT Tabanlı Güvenli ve Ölçeklenebilir Kimlik Doğrulama Sistemi",
      subtitle: "Güvenli Kimlik Doğrulama Sistemi",
      img: "/proje4.png",
    },
  ];

  return (
    <main className="scroll-smooth">
      <section
      ref={heroRef}
      className="pt-20 pb-5 md:pt-0 md:pb-0
        relative w-full h-screen flex flex-col md:flex-row 
        items-center justify-between px-6 md:px-20 overflow-hidden
      "
    >
      {/* Sol yazılar */}
      <div className="flex-1 flex flex-col justify-center z-20 text-center md:text-left mb-6 md:mb-0">
        <h1 className="italic-cursive text-[#630000] text-3xl sm:text-4xl md:text-3xl font-bold">
          SÜMEYRA KILIÇOĞLU
        </h1>
        <p className="mt-2 text-base sm:text-lg md:text-xl">
          Yenilikçi projeler geliştiren, çözüm odaklı bir bilgisayar mühendisi öğrencisiyim.
        </p>
      </div>

      {/* Ortadaki fotoğraf */}
      <div ref={photoRef} className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 overflow-hidden">
        <Image src="/profile.jpg" alt="Profil" fill className="object-cover" />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black opacity-0 pointer-events-none"
          style={{ transform: "translateZ(0)" }}
        />
      </div>

      {/* Sağ yazılar */}
      <div className="flex-1 flex flex-col justify-center items-center md:items-end z-20 text-center md:text-right">
        <p className="text-sm sm:text-base md:text-lg">
          “Başarı, yalnızca çalışkanların ve azimlilerin eseridir.”
        </p>
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "20px" }}>
          -Mustafa Kemal ATATÜRK
        </span>
      </div>
    </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section
      ref={aboutRef}
      id="about-section-trigger"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-cover bg-center"
      style={{ paddingTop: "50px", paddingBottom: "50px" }}
    >
      {/* GIF Container */}
      <div className="absolute w-full h-full flex flex-wrap justify-center items-center z-0">
        {[...Array(25)].map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el && !gifRefs.current.includes(el)) gifRefs.current.push(el);
          }}
          className="flex-none m-0 p-0" // Absolute yerine flex item
          style={{
            width: 160,
            height: 120,
          }}
        >
          <img
            src={`/about${index + 1}.gif`}
            alt={`gif-${index}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              margin: 0,
              padding: 0,
            }}
          />
        </div>


        ))}
      </div>

      {/* Hakkımda Yazısı */}
      <div className="relative z-10 text-center max-w-3xl px-4 p-6 hakkimda backdrop-blur-sm">
          {/* HAREKETLİ BAŞLIK */}
          <SplitWords triggerID = "about-section-trigger">
            <h2 className="italic-cursive text-[#630000] text-4xl font-bold mb-6">Hakkımda</h2>
          </SplitWords>

          {/* HAREKETLİ PARAGRAF */}
          <SplitWords triggerID = "about-section-trigger">
            <p className="text-lg leading-relaxed">
              Teknolojiyi sadece geliştiren değil, gerçek dünyada faydaya dönüştüren bir yazılım mühendisi olmayı hedefliyorum.
            </p>
          </SplitWords>
        <div className="relative w-fit mx-auto">
          <a href="/about">
            <button
              type="submit"
              className="italic-cursive font-semibold pt-8 pb-2 px-6 w-fit"
              style={{ fontSize: "22px" }}
              ref={buttonRef}
            >
              İncele
            </button>
          </a>

          {/* Alt çizgi */}
          <div
            ref={lineRef}
            className="absolute left-0 bottom-0 h-[2px] bg-[#630000]"
            style={{ width: 0 }}
          />
        </div>
      </div>
    </section>




      {/* ---------------- PROJECTS SECTION ---------------- */}
    <section id="projects" className="w-full relative px-30">
    <div className="flex flex-col divide-y divide-[#630000] relative">
    <h5 className="italic-cursive text-[#630000] text-3xl font-semibold pb-5 my-12 pl-10">Projelerim</h5>
    {projects.map((project, index) => (
      <div
        key={index}
        className="relative w-full py-10 px-8 cursor-pointer group transition-all duration-300"
        onMouseEnter={() => setHoveredImg(project.img)}
        onMouseLeave={() => setHoveredImg(null)}
        onClick={() => {
          router.push("/project"); // burası sayfa geçişini sağlar
        }}
      >
        <h3 className="
            text-2xl font-semibold
            transition-all duration-300 
            group-hover:text-[#810000] 
            group-hover:scale-[1.05]
          ">
          {project.title}
        </h3>

        <p
          className="
            text-black mb-4 
            transition-all duration-300 
            group-hover:text-[#810000] 
            group-hover:scale-[1.03]
          "
        >
          {project.subtitle}
        </p>
      </div>
    ))}



    {/* Fareyi takip eden resim */}
    {hoveredImg && (
      <div
        className="hidden lg:block pointer-events-none fixed w-[150px] h-[200px] z-50 overflow-hidden shadow-lg"
        style={{
          top: mousePos.y - 100, // div yüksekliği / 2
          left: mousePos.x - 75,  // div genişliği / 2
        }}

      >
        <Image
          src={hoveredImg}
          alt="Project Preview"
          fill
          className="object-cover"
        />

        
      </div>
    )}
  </div>
</section>

      {/* ---------------- SKILLS SECTION ---------------- */}


      
    </main>
  );
}

