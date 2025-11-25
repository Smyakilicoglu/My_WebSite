"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// ScrollTrigger'ı kaydet
gsap.registerPlugin(ScrollTrigger);

/**
 * Sayfa kaydırıldığında, '.animate-on-scroll' sınıfına sahip elementlere
 * alttan (y: 40px) yukarı kayma ve opaklık efekti uygular.
 */
export default function useScrollAnimation() {
  useEffect(() => {
    // ScrollTrigger'ın yeniden tetiklenmesini ve çakışmasını önlemek için
    // önceki tüm ScrollTrigger örneklerini temizle
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach((el) => {
      // Her element için yeni bir animasyon oluştur
      gsap.fromTo(
        el,
        { 
          y: 40, 
          opacity: 0, 
          // Başlangıç durumunda animasyonun çakışmaması için hemen ayarla
          // Bu, FOUC (Flash of Unstyled Content) sorununu da önleyebilir.
          visibility: 'hidden' 
        }, 
        {
          y: 0,
          opacity: 1,
          duration: 0.8, // Süreyi hafifçe uzattım, daha akıcı bir geçiş için
          ease: "power2.out",
          // Animasyon bittiğinde görünürlüğü kalıcı olarak aç
          visibility: 'visible',
          
          scrollTrigger: {
            trigger: el,
            // 'top 85%': Elementin üst kısmı, viewport'un %85'ine geldiğinde başla
            start: "top 85%",
            // play: Bir kez görünce oynat
            // none: Geri kaydırırken tetikleme
            // none: İleri kaydırırken tekrar tetikleme
            // reverse: Geri kaydırırken tersine çevir (kapat)
            toggleActions: "play none none reverse", 
          },
        }
      );
    });

    // Cleanup fonksiyonu: Component unmount edildiğinde tetikleyicileri temizle
    return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
}