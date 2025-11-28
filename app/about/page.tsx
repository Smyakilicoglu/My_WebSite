"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutSection() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const hoverRefs = useRef<HTMLDivElement[]>([]);
    const imageRefs = useRef<HTMLImageElement[]>([]);
    const textRefs = useRef<HTMLHeadingElement[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // addToRefs fonksiyonu, imageRefs'e resimleri eklemek için gereklidir
    const addToRefs = (el: HTMLImageElement | null) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
      // Sayfa geçişi sonrası doğru başlangıç efekti
      gsap.set(el, { opacity: 0.3, filter: "grayscale(100%)" });
    }
  };
    

    // ... (İlk useEffect: Soldan sağa kayan satırlar - Aynı kaldı)
    useEffect(() => {
        if (!marqueeRef.current) return;

        const rows = Array.from(
            marqueeRef.current.querySelectorAll<HTMLElement>(".marquee-row")
        );

        // Üst ve alt satırlar için (0 ve 2. index)
        const leftRows = rows.filter((_, i) => i !== 1);

        leftRows.forEach((row) => {
            if (row.dataset.duplicated === "true") return;
            const childrenHtml = row.innerHTML;
            row.innerHTML = childrenHtml + childrenHtml; // seamless kopya
            row.dataset.duplicated = "true";
            row.style.display = "flex";
            row.style.alignItems = "center";
        });

        const tles: gsap.core.Tween[] = [];

        leftRows.forEach((row, index) => {
            const totalWidth = row.scrollWidth;
            const singleWidth = totalWidth / 2;
            if (singleWidth <= 0) return;

            const duration = 10 + index * 2.5;

            const tw = gsap.to(row, {
                x: `-${singleWidth}px`,
                ease: "none",
                duration,
                repeat: -1,
                modifiers: {
                    x: (x: string) => {
                        const val = parseFloat(x);
                        const mod = ((val % -singleWidth) + -singleWidth) % -singleWidth;
                        return `${mod}px`;
                    },
                },
            });

            tles.push(tw);
        });

        return () => {
            tles.forEach((t) => t.kill());
        };
    }, []);

    // ... (İkinci useEffect: Ortadaki satır sağa doğru - fromTo ile düzeltilmiş kısım - Aynı kaldı)
    useEffect(() => {
        if (!marqueeRef.current) return;

        // Ortadaki satırı seç (2. satır, index 1)
        const middleRow = marqueeRef.current.querySelector<HTMLElement>(".marquee-row:nth-child(2)");
        if (!middleRow) return;

        // Seamless için kopya ekle (Zaten yapılmış, ama tekrar kontrol edelim)
        if (middleRow.dataset.duplicated !== "true") {
            const childrenHtml = middleRow.innerHTML;
            middleRow.innerHTML = childrenHtml + childrenHtml;
            middleRow.dataset.duplicated = "true";
            middleRow.style.display = "flex";
            middleRow.style.alignItems = "center";
        }

        const totalWidth = middleRow.scrollWidth;
        const singleWidth = totalWidth / 2;
        if (singleWidth <= 0) return;

        // EN BASİT VE DOĞRU ÇÖZÜM: `fromTo` Kullanmak
        const tw_final = gsap.fromTo(middleRow, {
            x: -singleWidth, // Başlangıç pozisyonu (kopya içeriğin başlangıcı)
        }, {
            x: 0, // Bitiş pozisyonu (orijinal içeriğin başlangıcı)
            ease: "none",
            duration: 15,
            repeat: -1,
        });

        return () => {
            tw_final.kill(); // cleanup
        };
    }, []);

    // ... (Üçüncü useEffect: Hover Efektleri - Aynı kaldı)
    useEffect(() => {
        hoverRefs.current.forEach((hoverEl, i) => {
            const imgEl = imageRefs.current[i];
            const txtEl = textRefs.current[i];
            if (!hoverEl || !imgEl || !txtEl) return;

            let activeTimeline: gsap.core.Timeline | null = null;

            const handleMouseEnter = () => {
                if (activeTimeline) activeTimeline.kill();
                activeTimeline = gsap.timeline({ overwrite: true });

                activeTimeline.to(imgEl, {
                    x: -10, // resim hafifçe sola
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out"
                }, 0);

                activeTimeline.to(txtEl, {
                    x: 20, // metin sağa kayıyor
                    duration: 0.4,
                    ease: "power2.out"
                }, 0);

                activeTimeline.to(txtEl, {
                    fontWeight: "bold",
                    duration: 0.2
                }, "<");
            };

            const handleMouseLeave = () => {
                if (activeTimeline) activeTimeline.kill();
                activeTimeline = gsap.timeline({ overwrite: true });

                activeTimeline.to(imgEl, {
                    x: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in"
                }, 0);

                activeTimeline.to(txtEl, {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.in"
                }, 0);

                activeTimeline.to(txtEl, {
                    fontWeight: "normal",
                    duration: 0.2
                }, "<");
            };

            hoverEl.addEventListener("mouseenter", handleMouseEnter);
            hoverEl.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                hoverEl.removeEventListener("mouseenter", handleMouseEnter);
                hoverEl.removeEventListener("mouseleave", handleMouseLeave);
                if (activeTimeline) activeTimeline.kill();
            };
        });
    }, []);

    // ... (Dördüncü useEffect: Scroll Animasyonu - Aynı kaldı)
    useEffect(() => {
        if (!scrollContainerRef.current) return;

        const images = Array.from(
            scrollContainerRef.current.querySelectorAll<HTMLImageElement>(".scroll-image")
        );

        if (images.length === 0) return;

        const totalWidth = images.reduce((acc, img) => acc + img.offsetWidth + 20, 0); // gap 20px

        // container genişliği kadar scroll alanı
        gsap.to(images, {
            x: () => `-${totalWidth - window.innerWidth}px`, // sağdan sola
            ease: "none",
            scrollTrigger: {
                trigger: scrollContainerRef.current,
                start: "top top",
                end: () => `+=${totalWidth}`, // toplam scroll mesafesi
                scrub: true, // scroll ile senkronize
                pin: true, // section sabit kalacak
                anticipatePin: 1,
            },
        });
    }, []);

    // ... (Beşinci useEffect: Resim Efektleri - Aynı kaldı)
    useEffect(() => {
        // Başlangıç: tüm resimler gri ve opaklık düşük
        gsap.set(imageRefs.current, { opacity: 0.3, filter: "grayscale(100%)" });

        imageRefs.current.forEach((img) => {
            img.addEventListener("mouseenter", () => {
                const middleIndex = Math.floor(imageRefs.current.length / 2);
                const tl = gsap.timeline();

                imageRefs.current.forEach((targetImg, j) => {
                    const distanceFromMiddle = Math.abs(j - middleIndex);
                    tl.to(targetImg, {
                        opacity: 1,
                        filter: "grayscale(0%)",
                        duration: 0.7,
                        ease: "power2.out",
                        delay: distanceFromMiddle * 0.15, // ortadan yayılma
                    }, 0);
                });
            });

            img.addEventListener("mouseleave", () => {
                gsap.to(imageRefs.current, {
                    opacity: 0.3,
                    filter: "grayscale(100%)",
                    duration: 0.5,
                    ease: "power2.inOut",
                });
            });
        });
    }, []);

    // MOBİL SCROLL RENK AKTİVASYONU
    useEffect(() => {
    const handleScroll = () => {
        const scrollY = window.scrollY;

        // 300px SCROLL YUKARISINA GELİNCE RENK AÇILSIN
        if (scrollY > 100) {
        gsap.to(imageRefs.current, {
            opacity: 1,
            filter: "grayscale(0%)",
            duration: 0.8,
            ease: "power2.out",
        });
        } else {
        gsap.to(imageRefs.current, {
            opacity: 0.3,
            filter: "grayscale(100%)",
            duration: 0.8,
            ease: "power2.inOut",
        });
        }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <main>
            <section className="w-full min-h-screen flex justify-center items-center text-black py-32">
                <div className="max-w-5xl mx-auto px-6">
                    {/* Başlık */}
                    <h2 className="italic-cursive text-[#630000] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 text-center md:text-left leading-tight">
                        Hakkımda
                    </h2>

                    {/* İÇERİK ALANI: Metin ve Resimler */}
                    {/* Grid kullanarak metin ve resim alanını yan yana getiriyoruz */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                        
                        {/* Metin Alanı (Sol Sütun) */}
                        <div className="text-left order-2 md:order-1"> {/* Mobil görünümde metin altta, desktop'ta solda */}
                            <p className="text-lg md:text-base leading-relaxed text-gray-800 mb-6">
                                Ben <span className="font-semibold text-black">Sümeyra Kılıçoğlu</span>, Necmettin Erbakan Üniversitesi Bilgisayar
                                Mühendisliği 4. sınıf öğrencisiyim. Öğrenimimin ikinci yarısında ocak ayından itibaren
                                başlayacak uzun dönemli <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}>5+ ay</span> bir yazılım stajı arıyorum.
                            </p>
                            <p className="text-lg md:text-base leading-relaxed text-gray-800 mb-6">
                                Web teknolojileri <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}>React.js, Next.js, Node.js</span> ve veritabanı
                                yönetimi <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}>MongoDB, SQL, PostgreSQL</span> konusunda güçlü bir temele sahibim.
                                Mobil alanda <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}>Kotlin</span>  ve <span className="italic-cursive text-[#630000]" style={{ fontSize: "22px"}}>Android SDK</span> kullanarak hibrit çözümler üretiyorum.
                            </p>
                            <p className="text-lg md:text-base leading-relaxed text-gray-800">
                                Hedefim, teknolojiyi gerçek probleme değer katan çözümlere dönüştüren bir
                                yazılım mühendisi olarak profesyonel alanda yer edinmek.
                            </p>
                        </div>
                         
                        {/* Resim Alanı (Sağ Sütun) */}
                        {/* DEĞİŞİKLİK BURADA: Mobil cihazlarda (md altı) gizle */}
                        <div className="md:w-full h-[450px] relative order-1 md:order-2 z-0 md:z-10"> 
                            <div className="absolute w-full h-full">
                                {/* Resim 1 */}
                                <img
                                  ref={addToRefs}
                                  src="/foto1.jpg"
                                  alt="Ana Profil"
                                  className="
                                    absolute top-0 left-0 object-cover shadow-2xl z-30
                                    w-[200px] h-[300px] md:w-[200px] md:h-[280px] lg:w-[250px] lg:h-[350px]
                                  "
                                  style={{ filter: "grayscale(100%)", opacity: 0.3 }}
                                />

                                {/* Resim 2 */}
                                <img
                                  ref={addToRefs}
                                  src="/universite.jpg"
                                  alt="Necmettin Erbakan Üniversitesi"
                                  className="
                                    absolute object-cover shadow-2xl z-30
                                    max-w-[150px] mx-auto md:max-w-[200px] 
                                    pt-10   
                                    md:pt-0
                                  "
                                  style={{ 
                                      left: '250px', 
                                      top: '0px',
                                      transform: 'translate(-50%, -50%)', 
                                      filter: "grayscale(100%)", opacity: 0.3 
                                  }}
                                />

                                {/* Resim 3: 2. resmin sağ alt köşesinden kesişmeli. */}
                                <img
                                ref={addToRefs}
                                    src="/code.jpg"
                                    alt="Proje Görseli 2"
                                    className="absolute w-[180px] h-[120px] object-cover shadow-2xl z-10 hidden lg:block" 
                                    style={{ 
                                        left: '350px', 
                                        top: '200px', 
                                        transform: 'translate(-50%, -50%)', 
                                        filter: "grayscale(100%)", opacity: 0.3 
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="about" className="w-full text-black">
            <div className="max-w-6xl mx-auto px-3 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* 1. Sütun: Staj Deneyimi */}
                <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 border-b-2 pb-5">
                    Staj Deneyimi – Melikgazi Belediyesi Bilgi İşlem Departmanı
                    </h3>
                    <p className="text-sm leading-relaxed pt-4">
                    <span className="italic-numbers text-[#630000]" style={{fontSize: "22px"}}> Ağustos 2024 – Eylül 2024 | Yazılım Geliştirici Stajyeri </span>
                    </p>
                    <p className="text-sm leading-relaxed pt-4">
                    Melikgazi Belediyesi Bilgi İşlem Departmanında gerçekleştirdiğim yazılım geliştirme stajı boyunca, teorik olarak bildiğim web teknolojilerini kurumsal bir ortamda uygulama fırsatı buldum. <span className="italic-cursive text-[#630000]" style={{fontSize: "22px"}}> React.js, Node.js </span> ve <span className="italic-cursive text-[#630000]" style={{fontSize: "22px"}}> SQL </span> gibi teknolojilerde sahip olduğum altyapıyı gerçek projeler üzerinde çalışarak güçlendirdim.
                    </p>
                    <p className="text-sm leading-relaxed pt-4">
                    <span className="italic-numbers text-[#630000]" style={{fontSize: "22px"}}>1. </span> Staj sürecinde Personel Portalı projesinin geliştirilmesinde aktif rol aldım. <span className="italic-cursive text-[#630000]" style={{fontSize: "22px"}}> React.js </span> ve <span className="italic-cursive text-[#630000]" style={{fontSize: "22px"}}> Bootstrap </span> kullanarak kullanıcı dostu ve erişilebilir arayüzler geliştirdim. Projenin canlıya geçiş sürecine destek sağladım.
                    </p>
                    <p className="text-sm leading-relaxed pt-4">
                    <span className="italic-numbers text-[#630000]" style={{fontSize: "22px"}}>2. </span> Mevcut sistemlerde hata tespiti, performans optimizasyonu ve özellik entegrasyonu konularında görev aldım. <span className="italic-cursive text-[#630000]" style={{fontSize: "22px"}}> API </span> bağlantıları kurarak verilerin doğru şekilde işlenmesi ve sunulması süreçlerine katkıda bulundum.
                    </p>
                    <p className="text-sm leading-relaxed pt-4">
                    <span className="italic-numbers text-[#630000]" style={{fontSize: "22px"}}>3. </span> Bu süreç bana yalnızca teknik açıdan değil; Git ile versiyon kontrolü, ekip içi iletişim ve görev takibi, kurumsal proje yönetimi, yazılım geliştirme–test–deployment döngüsünün pratik uygulaması konularında da değerli deneyimler kazandırdı.
                    </p>
                    <p className="text-sm leading-relaxed pt-4">
                    <span className="italic-numbers text-[#630000]" style={{fontSize: "22px"}}>4. </span> Bu staj, yazılım geliştirme sürecine hem teknik hem profesyonel açıdan daha olgun ve sistemli yaklaşmamı sağlayan dönüştürücü bir deneyim oldu.
                    </p>
                </div>

                {/* 2. Sütun: Eğitim Bilgisi + Yetkinlikler + Sertifikalar */}
                <div className="p-6">
                    <h3 className="font-bold text-xl mt-7 mb-2 border-b-2 pb-5">
                    Eğitim Bilgisi
                    </h3>
                    <p className="text-sm leading-relaxed pt-4">
                    Bilgisayar Mühendisliği — Necmettin Erbakan Üniversitesi (Konya)
                    </p>
                    <p className="text-sm leading-relaxed pt-4">
                    4. Sınıf Öğrencisi | AGNO: <span className="italic-cursive text-[#630000]" style={{fontSize: "15px"}}> 2.95</span>
                    </p>

                    {/* Sertifikalar */}
                    <h3 className="font-bold text-xl mt-15 mb-2 border-b-2 pb-5">
                    Sertifikalar
                    </h3>

                    {/* 1. Sertifika */}
                    <p className="text-sm leading-relaxed pt-4">
                    <span className="italic-numbers text-[#630000]" style={{fontSize: "22px"}}>1. </span> The Complete 2024 Web Development Bootcamp<br/>
                    Alınan Kurum: Udemy<br/>
                    Doğrulama: <a href="https://www.udemy.com/certificate/UC013a2472-39a5-4ebe-9c59-2838041f5b30/" target="_blank" className="text-[#360000] italic-cursive" style={{fontSize: "20px"}}>Link</a>
                    </p>

                    {/* 2. Sertifika */}
                    <p className="text-sm leading-relaxed pt-4">
                    <span className="italic-numbers text-[#630000]" style={{fontSize: "22px"}}>2. </span> The Ultimate MySQL Bootcamp: Go from SQL Beginner to Expert<br/>
                    Alınan Kurum: Udemy<br/>
                    Doğrulama: <a href="https://www.udemy.com/certificate/UC2ae72547-94b9-422d-a22c-dcc2b2a6a606/" target="_blank" className="text-[#360000] italic-cursive" style={{fontSize: "20px"}}>Link</a>
                    </p>
                </div>

                </div>
            </div>
            </section>

    <section id="about" className="w-full text-black">
        <div className="max-w-6xl mx-auto px-3 pb-20">
  <div className="flex flex-wrap justify-between gap-8">
    {/* 1. Bölüm */}
    <div className="flex-1 min-w-[300px] p-6">
      <h3 className="font-bold text-xl mb-2 border-b-2 pb-5">
        Teknik Uzmanlık ve Full-Stack Yetkinlik
      </h3>
      <p className="text-sm leading-relaxed pt-5">
        Web teknolojileri ve veritabanı yönetiminde güçlü bir temel sahibim. 
        <span className="italic-cursive text-[#630000]"> React.js, Node.js, SQL/MongoDB</span> gibi araçlarla geliştirdiğim
        projelerde kullanıcı dostu arayüzler oluşturdum. Melikgazi Belediyesi
        stajımda React.js ve Bootstrap ile projelerin canlıya geçiş aşamasına
        katkı sağladım.
      </p>
    </div>

    {/* 2. Bölüm */}
    <div className="flex-1 min-w-[300px] p-6">
      <h3 className="font-bold text-xl mb-2 border-b-2 pb-5">
        Yenilikçi Projeler ve Çözüm Odaklılık
      </h3>
      <p className="text-sm leading-relaxed pt-5">
        Makine öğrenimi ve mobil uygulama entegrasyonu ile yenilikçi çözümler
        geliştirdim. Blockchain tabanlı NFT projeleri ve sosyal fayda odaklı
        uygulamalar ürettim.
      </p>
    </div>

    {/* 3. Bölüm */}
    <div className="flex-1 min-w-[300px] p-6">
      <h3 className="font-bold text-xl mb-2 border-b-2 pb-5">
        Kariyer Vizyonu ve Profesyonel Gelişim
      </h3>
      <p className="text-sm leading-relaxed pt-5">
        Teknolojiyi sadece geliştiren değil, gerçek dünyada faydaya
        dönüştüren bir yazılım mühendisi olmayı hedefliyorum. Ekip çalışmasına
        önem veriyor, kodun okunabilir ve sürdürülebilir olmasına dikkat
        ediyorum.
      </p>
    </div>
  </div>
</div>

      {/* --- ABOUT TEXT --- */}
      

      {/* --- MARQUEE SKILLS --- */}
      <div ref={marqueeRef} className="overflow-hidden space-y-6">
        
        <div className="marquee-row flex whitespace-nowrap text-4xl font-bold gap-16">
          <span>Figma</span>
          <span>JavaScript</span>
          <span>C#</span>
          <span>C++</span>
          <span>Java</span>
          <span>Figma</span>
          <span>JavaScript</span>
          <span>C#</span>
          <span>C++</span>
          <span>Java</span>
        </div>

        <div className="italic-cursive text-[#630000] marquee-row flex whitespace-nowrap text-4xl font-bold gap-16">
          <span>React</span>
          <span>Next.js</span>
          <span>HTML/CSS</span>
          <span>Bootstrap</span>
          <span>Python</span>
          <span>React</span>
          <span>Next.js</span>
          <span>HTML/CSS</span>
          <span>Bootstrap</span>
          <span>Python</span>
        </div>

        <div className="marquee-row flex whitespace-nowrap text-4xl font-bold gap-16">
          <span>Node.js</span>
          <span>Express.js</span>
          <span>MongoDB</span>
          <span>SQL</span>
          <span>PostgreSQL</span>
          <span>Node.js</span>
          <span>Express.js</span>
          <span>MongoDB</span>
          <span>SQL</span>
          <span>PostgreSQL</span>
        </div>

      </div>
    </section>
    </main>
  );
}
