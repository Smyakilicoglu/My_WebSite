// components/Footer.tsx
"use client";

import React, { useState } from "react";
import {
  LinkedInLogoIcon,
  InstagramLogoIcon,
  GitHubLogoIcon,
  DownloadIcon,
} from "@radix-ui/react-icons";
import "../../app/globals.css";

// CV dosyanızın yolunu buraya tanımlayın.
const CV_FILE_PATH = "/SümeyraKılıçoğlu_CV.pdf";

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Ad/Soyad yönetimi için önceki çözümümüzü koruyoruz
    if (e.target.name === "firstName" || e.target.name === "lastName") {
      const otherPart =
        e.target.name === "firstName"
          ? formData.name.split(" ")[1] || ""
          : formData.name.split(" ")[0] || "";
      const newName =
        e.target.name === "firstName"
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
    // Formun Formspree'ye gönderilmesi için form eylemini çalıştır
    // React state'ini sıfırlama ve başarılı mesajı gösterme kısmı, formspree'nin başarılı dönüşünden sonra yapılmalıdır.
    // Şimdilik sadece client-side (istemci tarafı) state'ini güncelliyoruz.
    setSubmitted(true);
    // Gerçek Formspree kullanımı için aşağıdaki satırı formun action'ı halledeceği için yorum satırı yaptık
    // setFormData({ name: "", email: "", message: "" });
  };

  const [firstName, lastName] = formData.name.split(" ").filter(Boolean);

  const handleDownloadCV = () => {
    window.open(CV_FILE_PATH, "_blank");
  };

  return (
    <footer
      className="newspaper-bg text-black w-full **min-h-screen** flex flex-col justify-center items-center py-10" // **h-screen yerine min-h-screen ve py-10 ekledik**
      id="contact" // İsteğe bağlı olarak iletişim bölümüne anchor link için id ekledik
    >
      <div className="max-w-4xl w-full px-6">
        {/* Ana İçerik: İletişim Başlığı, CV ve Form */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* SOL SÜTUN: İletişim Başlığı, CV Görseli ve Butonu */}
          <div className="md:w-1/3 text-left">
            <h2 className="italic-cursive text-[#630000] text-4xl font-bold mb-6 mt-4">
              {/* Mobil görünümde yukarıdan biraz boşluk bıraktık */}
              İletişim
            </h2>
            <p className="mb-4 text-lg">
              Detaylı özgeçmişimi inceleyebilir veya form aracılığıyla bana doğrudan mesaj gönderebilirsiniz.
            </p>

            {/* CV Görseli (CV'nin Yarısı) */}
            <div className="mb-4">
              {/* Max yüksekliği mobil ve masaüstünde daha iyi görünecek şekilde ayarladık */}
              <img
                src="/cv.png"
                alt="Sümeyra KILIÇOĞLU CV Önizlemesi"
                className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-300"
                style={{ maxHeight: "300px" }} // Yüksekliği mobil/masaüstü için biraz artırdık
              />
            </div>

            {/* CV İndirme Butonu */}
            <button
              onClick={handleDownloadCV}
              className="italic-cursive text-[#630000] font-semibold py-2 px-4 transition-colors w-fit flex items-center justify-center border-b-2 border-[#360000] hover:border-[#630000] mb-8" // Alt marjin ekledik
              style={{ fontSize: "22px" }}
            >
              <DownloadIcon className="w-5 h-5 mr-2" />
              CV İndir
            </button>
          </div>

          {/* SAĞ SÜTUN: Form Alanları */}
          <div className="md:w-2/3">
            <h3 className="italic-cursive text-[#630000] text-3xl font-bold mb-4 md:mt-4">
              Bana Ulaşın
            </h3>
            {submitted ? (
              <div className="italic-cursive text-black font-bold mb-4 p-4 border border-[#630000] bg-gray-100 rounded-lg">
                Mesajınız başarıyla gönderildi! Sizinle en kısa sürede iletişime geçeceğim. Teşekkürler.
              </div>
            ) : (
              // Formspree kullanımı için action ve method korundu.
              <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/xldknpgb" // Formspree aksiyonu
                method="POST"
                className="flex flex-col gap-4"
              >
                {/* Ad ve Soyad aynı satırda */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    name="firstName"
                    style={{ fontSize: "18px" }} // Font boyutunu biraz küçülttük
                    placeholder="Adınız"
                    value={firstName || ""}
                    onChange={handleChange}
                    required
                    className="italic-cursive border-b border-[#630000] p-2 w-full sm:flex-1 focus:outline-none focus:ring-0 focus:border-black"
                  />
                  <input
                    type="text"
                    name="lastName"
                    style={{ fontSize: "18px" }}
                    placeholder="Soyadınız"
                    value={lastName || ""}
                    onChange={handleChange}
                    required
                    className="italic-cursive border-b border-[#630000] p-2 w-full sm:flex-1 focus:outline-none focus:ring-0 focus:border-black"
                  />
                </div>

                {/* E-posta alanı */}
                <input
                  type="email"
                  name="email"
                  style={{ fontSize: "18px" }}
                  placeholder="E-posta Adresiniz"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="italic-cursive border-b border-[#630000] p-2 focus:outline-none focus:ring-0 focus:border-black"
                />

                {/* Mesaj alanı */}
                <textarea
                  name="message"
                  style={{ fontSize: "18px" }}
                  placeholder="Mesajınız"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="italic-cursive border-b border-[#630000] p-2 h-32 resize-none focus:outline-none focus:ring-0 focus:border-black"
                />

                {/* Gönder butonu */}
                <div className="text-right">
                  <button
                    type="submit"
                    className="italic-cursive text-[#630000] font-semibold py-3 px-6 transition-colors w-fit border-b-2 border-[#360000] hover:border-[#630000]"
                    style={{ fontSize: "20px" }} // Font boyutunu biraz küçülttük
                  >
                    Gönder
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        {/* İki Sütunlu Yapı Bitişi */}
        
        <hr className="my-10 border-t border-gray-300" /> {/* Yatay çizgi ekledik */}

        {/* Sosyal ikonlar ve Telif Hakkı (Ortalama) */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="https://www.linkedin.com/in/s%C3%BCmeyra-kili%C3%A7o%C4%9Flu-9b7674251"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#0077B5] transition-colors"
            >
              <LinkedInLogoIcon className="w-7 h-7" />
            </a>
            <a
              href="https://github.com/Smyakilicoglu"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-gray-600 transition-colors"
            >
              <GitHubLogoIcon className="w-7 h-7" />
            </a>
            <a
              href="https://www.instagram.com/sumeyra___klc/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-[#E4405F] transition-colors"
            >
              <InstagramLogoIcon className="w-7 h-7" />
            </a>
          </div>

          <p className="italic-cursive text-sm text-center mb-6">
            © {new Date().getFullYear()} Sümeyra KILIÇOĞLU. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}