// components/Footer.tsx
"use client";

import React, { useState } from "react";
import { LinkedInLogoIcon, InstagramLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import "../../app/globals.css";

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Ad/Soyad yönetimi için önceki çözümümüzü koruyoruz
    if (e.target.name === "firstName" || e.target.name === "lastName") {
        const otherPart = e.target.name === "firstName" 
            ? formData.name.split(" ")[1] || ""
            : formData.name.split(" ")[0] || "";
        const newName = e.target.name === "firstName" 
            ? `${e.target.value} ${otherPart}`
            : `${otherPart} ${e.target.value}`;
        setFormData({ ...formData, name: newName.trim() });
    } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada API veya mail gönderme entegrasyonu yapılabilir
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const [firstName, lastName] = formData.name.split(" ").filter(Boolean);

  return (
    <footer className="newspaper-bg text-black w-full h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full px-6"> {/* Max genişliği 4xl'a çıkardık, iki sütun için daha iyi */}
        
        {/* İki Sütunlu Yapı: flex ve md:flex-row ile mobil/masaüstü ayrımı */}
        <div className="flex flex-col md:flex-row gap-12">
            
            {/* SOL SÜTUN: İletişim Başlığı ve Metni */}
            <div className="md:w-1/3 text-left">
                <h2 className="italic-cursive text-[#630000] text-4xl font-bold mb-4">İletişim</h2>
            </div>

            {/* SAĞ SÜTUN: Form Alanları */}
            <div className="md:w-2/3">
                {submitted ? (
                    <div className="italic-cursive text-black font-bold mb-4">
                        Mesajınız başarıyla gönderildi! Teşekkürler.
                    </div>
                ) : (
                    <form
                        action="https://formspree.io/f/xldknpgb" // <--- buraya Formspree action URL
                        method="POST"
                        className="flex flex-col gap-4"
                        onSubmit={() => setSubmitted(true)}
                      >
                        {/* Ad ve Soyad aynı satırda */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            name="firstName"
                            style={{ fontSize: "20px"}}
                            placeholder="Adınız"
                            value={firstName || ""}
                            onChange={handleChange}
                            required
                            className="italic-cursive border-b border-[#630000] p-2 w-full sm:w-auto sm:flex-1 focus:outline-none focus:ring-0 focus:border-black"
                          />
                          <input
                            type="text"
                            name="lastName"
                            style={{ fontSize: "20px"}}
                            placeholder="Soyadınız"
                            value={lastName || ""}
                            onChange={handleChange}
                            required
                            className="italic-cursive border-b border-[#630000] p-2 w-full sm:w-auto sm:flex-1 focus:outline-none focus:ring-0 focus:border-black"
                          />
                        </div>

                        {/* E-posta alanı */}
                        <input
                            type="email"
                            name="email"
                            style={{ fontSize: "20px"}}
                            placeholder="E-posta Adresiniz"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="italic-cursive border-b border-[#630000] p-2 focus:outline-none focus:ring-0 focus:border-black"
                        />

                        {/* Mesaj alanı */}
                        <textarea
                            name="message"
                            style={{ fontSize: "20px"}}
                            placeholder="Mesajınız"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="italic-cursive border-b border-[#630000] p-2 h-32 resize-none focus:outline-none focus:ring-0 focus:border-black"
                        />

                        {/* Gönder butonu: w-fit ile içeriğe daraltma */}
                        <div className="text-right">
                            <button
                                type="submit"
                                className="italic-cursive text-[#630000] font-semibold py-3 px-6 transition-colors w-fit cizgi"
                                style={{ fontSize: "22px"}} 
                            >
                                Gönder
                            </button>
                        </div>
                    </form>
                )}
            </div>
            
        </div>
        {/* İki Sütunlu Yapı Bitişi */}
        
        {/* Sosyal ikonlar ve Telif Hakkı (Hala sola hizalı) */}
        <div className="flex justify-center gap-6 mb-8 pt-10">
          <a href="https://www.linkedin.com/in/s%C3%BCmeyra-kili%C3%A7o%C4%9Flu-9b7674251" target="_blank" rel="noreferrer">
            <LinkedInLogoIcon className="w-6 h-6" />
          </a>
          <a href="https://github.com/Smyakilicoglu" target="_blank" rel="noreferrer">
            <GitHubLogoIcon className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/sumeyra___klc/" target="_blank" rel="noreferrer">
            <InstagramLogoIcon className="w-6 h-6" />
          </a>
        </div>

        <p className="italic-cursive text-left text-sm flex justify-center">
          © {new Date().getFullYear()} Sümeyra KILIÇOĞLU. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}