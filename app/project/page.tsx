"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ExternalLink, ChevronDown } from "lucide-react"; // Ikon değişti

// Varsayımsal olarak, Next.js projenizin 'public' klasöründe
// proje görsellerinin olduğu kabul edilmiştir.
const IMAGE_BASE_PATH = ""; 
const rotatingTexts = ["Web", "Mobil", "Blockchain", "Yapay Zeka", "Veritabanı", "Gömülü Sistemler", "Full-Stack"];


export default function ProjectPage() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % rotatingTexts.length);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // Açık olan projenin index'ini tutan state. Başlangıçta hepsi kapalıdır (null).
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Mobil/Masaüstü ayrımı için ekran genişliğini izleyen state
    const [isMobile, setIsMobile] = useState(false);

    // MD breakpoint'i (768px) altındaysak, isMobile'ı true yaparız.
    useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setIsMobile(window.innerWidth < 1024);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleProject = (index: number) => {
        if (!isMobile) return;

        const newIndex = openIndex === index ? null : index;
        setOpenIndex(newIndex);

        // Eğer yeni bir proje açılıyorsa sayfayı o projeye kaydır
        if (newIndex !== null) {
            setTimeout(() => {
                const element = document.getElementById(`project-${newIndex}`);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 800); // Animasyonun bitmesini beklemek için 800ms gecikme
        }
    };

    
    // ... (Projeler dizisi buraya eklenmeli)
    const projects = [
    // Resim Yolları Düzeltildi (Öncü '/' kaldırıldı)
    {
    name: "Yapay Zeka Destekli İşaret Dili Çevirmen Mobil Uygulaması",
    description: (
        <>
        Bu çalışma, <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> işitme engelli bireylerin toplumsal iletişim engellerini kaldırma </span> misyonuyla geliştirilmiş çokmodlu bir mühendislik projesidir. Sistem, akıllı telefon kamerasından alınan görüntü verilerini kullanarak <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> dinamik Türk İşaret Dili (TİD) ifadelerini gerçek zamanlı olarak tanımayı </span> hedefler.
        
        <br/><br/>
        
        Teknik süreçte, el ve vücut hareketlerinin uzamsal özelliklerini yakalamak için <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> MediaPipe Holistic çerçevesi </span> ile 3 boyutlu yer işaretleri (landmark) analiz edilir. Çıkarılan bu hareket paternleri, <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> CNN+GRU hibrit derin öğrenme mimarisi </span> kullanılarak yüksek doğrulukla sınıflandırılır (Literatürde %96,72'ye varan başarı oranları gözlemlenmiştir).
        
        <br/><br/>
        
        Tanınan TİD ifadesi metin çıktısına dönüştürüldükten sonra, sistemin son bileşeni olan <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Metinden Konuşmaya (TTS) teknolojisi </span> (Google TTS API entegrasyonu veya Tacotron 2 + HiFi-GAN gibi derin öğrenme tabanlı mimariler) ile sesli ifadeye çevrilir. Bu bütünleşik yapı, mobil tabanlı <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> gerçek zamanlı çeviri ve seslendirme çözümü </span> sunarak, işitme engellilerin toplumsal yaşama katılımını artırmaktadır.
        </>
    ),
    tech: [
        "React Native (veya Flutter) (Frontend/UI)", 
        "TensorFlow Lite (Mobil ML Optimizasyonu)", 
        "Python / FastAPI (Backend Model API)", 
        "Mediapipe (Hareket ve Poz Algılama)", 
        "Firebase/SQLite (Veri Yönetimi)"
    ],
    github: "https://github.com/Smyakilicoglu/Sign-Language-Translator-App-Analysis",
    image: "projeler1.png",
    },
    {
    name: "Dijital Çizim Eldiveni ve Mobil Kontrol Sistemi",
    description: (
        <>
        Bu proje, geleneksel çizim yöntemlerini dijital dünyaya taşıyan bir 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Donanım-Yazılım entegrasyonudur</span>. Eldiven, el ve parmak hareketlerini hassas bir şekilde yakalar. 
        Ana teknik bileşen, verilerin mobil cihaza düşük enerji tüketimi ve yüksek hızda aktarılması için 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Bluetooth Low Energy (BLE) protokolünün </span> kullanılmasıdır. 
        Eldivenin gömülü sistemleri, yakalanan 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> gerçek zamanlı hareket verilerini </span> (IMU/Jiroskop/Akselerometre) işler. 
        Mobil uygulama (Flutter ile geliştirildi), bu verileri alıp, kullanıcının havada yaptığı hareketleri doğru bir şekilde algılayarak tuval üzerinde 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> dijital çizim noktalarına </span> dönüştürür. 
        Proje, hem 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> gömülü yazılım (Embedded C) </span> hem de mobil uygulama mimarisi konusundaki yetkinliği göstermektedir.
        </>
    ),
    tech: [
        "Flutter (Mobil Uygulama Arayüzü)", 
        "Bluetooth Low Energy (BLE) (Kablosuz İletişim)", 
        "Embedded C / Arduino (Gömülü Sistem Yazılımı)", 
        "IMU Sensörleri (Hassas Hareket Algılama)", 
        "Dart (Mobil Programlama)"
    ],
    live: "https://1drv.ms/p/c/450e43bffd5ecf87/EXMMvUnfl3VJoQdr1-YBvzYBBwb2rZ7_pW7D3f7asOkuvg?e=wnmJM7", // Eğer canlı demo yoksa boş kalabilir
    image: "projeler2.png", 
    },
    {
    name: "Difinity Token Creation & DeFi Simülasyonu",
    description: (
        <>
        Bu proje, modern bir kripto para birimi (token) yaratmayı ve onun ekosistemini simüle etmeyi amaçlayan tam kapsamlı bir 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Blockchain Mühendisliği </span>çalışmasıdır. 
        Token, sektör standardı olan 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Ethereum ERC-20 Kontrat Standardına </span> uygun olarak 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Solidity </span> dilinde geliştirilmiştir. 
        Geliştirme, test ve dağıtım süreçleri için 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Hardhat </span> çerçevesi kullanılmıştır. 
        Projenin kritik kısmı, tokenomics (ekonomi modellemesi) özelliklerini içeren (örneğin, yakma/mint etme mekanizmaları) akıllı kontratların oluşturulması ve React tabanlı bir ön yüz (Viewer) ile bu kontratların durumunun 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Web3.js/Ethers.js </span> aracılığıyla gerçek zamanlı olarak izlenmesi ve yönetilmesidir.
        </>
    ),
    tech: [
        "Solidity (Akıllı Kontrat Geliştirme)", 
        "Hardhat (Geliştirme, Test ve Dağıtım Çerçevesi)", 
        "ERC-20 Standardı (Token Kontrat Mimarisi)", 
        "React (Ön Yüz Geliştirme)", 
        "Web3.js / Ethers.js (Blockchain Etkileşimi)"
    ],
    github: "https://github.com/Smyakilicoglu/Token",
    image: "projeler3.png", 
    },
    {
    name: "OpenD: Tam İşlevli NFT Pazaryeri",
    description: (
        <>
        Bu proje, popüler NFT platformlarının özelliklerini taklit eden, tam işlevli bir 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Merkezi Olmayan Uygulama (DApp) </span> mimarisi üzerine kurulmuştur. 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Next.js </span> kullanılarak yüksek performanslı ve SEO uyumlu bir kullanıcı arayüzü geliştirilmiştir. 
        Platform, kullanıcıların dijital varlıklarını 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> mint etme (basma) </span> , sergileme ve takas işlemlerini gerçekleştirmesine olanak tanır. 
        Ön yüz, 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Web3.js </span> ve/veya 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Ethers.js </span> kütüphaneleri aracılığıyla akıllı kontratlarla (Smart Contracts) doğrudan etkileşime girerek cüzdan bağlantısı ve işlem imzalarını yönetir. 
        Tasarım ve stil için modern, mobil uyumlu bir arayüz sunan 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Tailwind CSS </span> kullanılmıştır. Proje, 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Blockchain </span> ve 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Web3 </span> teknolojilerinde uçtan uca geliştirme yetkinliğini göstermektedir.
        </>
    ),
    tech: [
        "Next.js (React Framework, SSR/SSG)", 
        "Web3.js / Ethers.js (Blockchain Etkileşim Kütüphanesi)", 
        "Solidity (Akıllı Kontrat Dili - Mint/Pazar Yeri)", 
        "Tailwind CSS (Hızlı ve Modüler CSS Geliştirme)", 
        "ERC-721 Standardı (NFT Kontrat Mimarisi)"
    ],
    github: "https://github.com/Smyakilicoglu/NFT_Opend",
    image: "projeler4.png", 
    },
    {
    name: "JWT Tabanlı Güvenli ve Ölçeklenebilir Kimlik Doğrulama Sistemi",
    description: (
        <>
        Bu proje, modern web uygulamaları için 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> güvenlik ve performans </span> odaklı geliştirilmiş kapsamlı bir arka uç (backend) çözümüdür. 
        Sistem, oturum yönetimini sunucu tarafında tutmak yerine, durum bilgisini token içinde taşıyan 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> JWT (JSON Web Token) </span> mekanizması üzerine kurulmuştur. 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> Node.js ve Express.js </span> kullanılarak RESTful API mimarisi ile geliştirilen bu sistem, kullanıcı parolalarının güvenliği için 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> kriptografik şifreleme </span> (örneğin, bcrypt) ve yetkilendirme (authorization) için 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> ara yazılım (middleware) kontrolleri </span> içerir. 
        Tüm kullanıcı verileri yüksek performanslı ve esnek 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> MongoDB </span> veritabanında yönetilir. 
        Proje, güncel güvenlik pratiklerine uygun, 
        <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}> ölçeklenebilir </span> ve dağıtık mimarilere kolayca entegre edilebilir bir yapı sunmaktadır.
        </>
    ),
    tech: [
        "Node.js & Express.js (RESTful API Geliştirme)", 
        "JWT (JSON Web Token) (Durumsuz Yetkilendirme)", 
        "MongoDB (Esnek Veritabanı Yönetimi)", 
        "Bcrypt (Parola Kriptografik Şifrelemesi)", 
        "Middleware (Erişim Kontrolü ve Yetkilendirme)"
    ],
    github: "https://github.com/Smyakilicoglu/Authentication",
    image: "projeler5.png", 
    },
    {
    name: "Tüm Projelerim",
    description: (
        <>
        Bu portfolyo, Yapay Zeka, Web3/Blockchain ve Gömülü Sistemler gibi farklı disiplinlerdeki yetkinliğimi gösteren kapsamlı bir mühendislik koleksiyonudur. Odak noktam, kompleks problemleri yenilikçi ve sosyal fayda odaklı çözümlere dönüştürmektir.
        
        <br/><br/>
        
        <span className="italic-numbers text-[#630000]" style={{ fontSize: "22px"}}>1.</span> Sosyal Fayda ve Derin Öğrenme projeleri ile TİD çevirisi ve CNN+GRU mimarileri üzerine çalışıyorum.
        <br/>
        <span className="italic-numbers text-[#630000]" style={{ fontSize: "22px"}}>2.</span> Gömülü Sistemler ve Mobil Uygulamalar alanında kendimi geliştirmeye çalışıyorum.
        <br/>
        <span className="italic-numbers text-[#630000]" style={{ fontSize: "22px"}}>3.</span> Web ve UI/UX design.
        <br/>
        <span className="italic-numbers text-[#630000]" style={{ fontSize: "22px"}}>4.</span> Arka Uç (Backend) Mimarisi için Node.js/Express üzerinde çalıştım.
        </>
    ),
    tech: [
        "Yapay Zeka & ML (CNN/GRU/MediaPipe)", 
        "Blockchain & Web3 (Solidity/ERC-20/NFT/Web3.js)", 
        "Mobil Geliştirme (React Native/Flutter/BLE)", 
        "Backend & Güvenlik (Node.js/JWT/MongoDB/Express)", 
        "Gömülü Sistem (Embedded C/Arduino/IMU)",
        "Modern Web (Next.js/Tailwind CSS)",
    ],
    github: "https://github.com/Smyakilicoglu",
    live: "", 
    image: "projeler6.png", 
    },
  ];

    const formatIndex = (index: number) => (index + 1).toString().padStart(3, '0');

    // Açık/Kapalı sınıfını belirler
    const getAccordionClasses = (idx: number) => {
        const isOpen = isMobile ? openIndex === idx : false;
        
        // Masaüstü (md ve üzeri): group-hover:max-h-[500px] ve group-hover:opacity-100'ü kullanırız.
        // Mobil (md altı): Eğer açıksa (isOpen), max-h-auto ve opacity-100 kullanırız. 
        // Aksi takdirde (Kapalıysa) max-h-0 ve opacity-0 kullanırız.
        const mobileClasses = isOpen 
            ? 'max-h-full opacity-100 mt-4' 
            : 'max-h-0 opacity-0';

        // md:group-hover sınıflarını mobil sınıflara eklemiyoruz, Tailwind hover doğal olarak çalışır.
        return `
            ${mobileClasses} 
            md:group-hover:max-h-[500px] 
            md:group-hover:opacity-100 
            md:group-hover:mt-4
            transition-all duration-700 ease-in-out md:flex md:gap-8
        `;
    };

    return (
        <main className="min-h-screen px-4 md:px-8 max-w-full mx-auto pt-20 md:pt-0">
            <div className="flex items-center justify-center my-8 space-x-6">
                <span className="text-gray-600 italic">{rotatingTexts[index]}</span>
                <h1 className="text-5xl italic-cursive text-[#630000] font-bold">
                    Projeler
                </h1>
                <span className="text-gray-600 italic">{rotatingTexts[(index + 1) % rotatingTexts.length]}</span>
            </div>
            <div className="flex flex-col space-y-0">
                {projects.map((proj, idx) => (
                    <div
                        key={idx}
                        id={`project-${idx}`}
                        // Tıklama olayını tüm div'e ekleriz, sadece mobil modda aktif olur
                        onClick={() => toggleProject(idx)}
                        className={`
                            group 
                            relative 
                            w-full 
                            border-b 
                            border-[#360000]
                            py-8 
                            px-2 
                            md:px-4 
                            overflow-hidden 
                            cursor-pointer 
                            transition-all 
                            duration-500 
                            ease-in-out
                            will-change-transform
                            will-change-height`}
                    >
                        {/* HER ZAMAN GÖRÜNÜR BAŞLIK ALANI */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            
                            {/* Numaratör */}
                            <div 
                                className="text-5xl font-serif text-[#360000] italic-numbers mr-8 transition-colors duration-300 md:text-left text-right" 
                                style={{ fontFamily: '"Great Vibes", sans-serif' }}
                            >
                                {formatIndex(idx)}
                            </div>
                            
                            
                            <div className="flex flex-col flex-grow">
                                {/* Proje Adı */}
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 group-hover:text-[#630000] transition-colors duration-300">
                                    {proj.name}
                                </h2>
                            </div>

                            {/* İkon: Mobil aç/kapa durumunu yansıtacak */}
                            <ChevronDown 
                                className={`
                                    text-black 
                                    group-hover:text-[#630000] 
                                    transition-transform duration-500 
                                    text-3xl mt-2 md:mt-0 flex-shrink-0
                                    ${isMobile && openIndex === idx ? 'rotate-180' : 'md:group-hover:rotate-180'}
                                `} 
                                size={32} 
                            />
                        </div>

                        {/* AÇILAN İÇERİK: max-height yönetimi artık state tabanlı */}
                        <div className={getAccordionClasses(idx)}>
                            
                            {/* SOL SÜTUN: Açıklama, Teknolojiler ve Linkler (order-1) */}
                            <div className="w-full md:w-2/3 md:order-1">
                                {/* Uzun Açıklama */}
                                <p className="mb-4 text-base leading-relaxed">
                                    {proj.description}
                                </p>
                                
                                {/* Teknolojiler */}
                                <div className="mb-4">
                                    <span className="font-bold text-gray-800 mr-2">Teknolojiler:</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {proj.tech.map((tech, i) => (
                                            <span key={i} className="animated-border text-sm font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Linkler */}
                                <div className="flex space-x-6 py-1">
                                    {proj.github && (
                                        <Link
                                            href={proj.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 text-base font-semibold text-black transition-colors"
                                        >
                                            <GitHubLogoIcon className="size-[25px]" />
                                            <span className="cizgi italic-cursive"
                                            style={{fontSize: "18px"}}>GitHub İncele</span>
                                        </Link>
                                    )}
                                    {proj.live && (
                                        <Link
                                            href={proj.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 text-base font-semibold text-black transition-colors"
                                        >
                                            <ExternalLink className="size-[25px]" />
                                            <span className="cizgi italic-cursive"
                                            style={{fontSize: "18px"}}>Sunum İncele</span>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* SAĞ SÜTUN: Resim (order-2) */}
                            {proj.image && (
                                <div
                                    className={`
                                        w-full md:w-1/3 mb-4 md:mb-0 md:order-2 flex items-center
                                        ${isMobile && idx !== projects.length - 1 ? "hidden" : "block"}
                                    `}
                                >
                                    <img
                                        src={`${IMAGE_BASE_PATH}/${proj.image}`}
                                        alt={`${proj.name} Proje Görseli`}
                                        className="w-full h-auto object-cover shadow-xl"
                                        style={{ maxHeight: "350px" }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}