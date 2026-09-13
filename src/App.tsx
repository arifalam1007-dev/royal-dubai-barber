import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { translations, Lang } from './translations';

// ===== Language Context =====
const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.en;
}>({ lang: 'en', setLang: () => {}, t: translations.en });

const useLang = () => useContext(LanguageContext);

// ===== Images =====
const images = {
  hero: 'https://image.qwenlm.ai/generated-images/ebad176d-1cc4-4962-839a-75e5350c6d37/_result.png',
  gallery: [
    'https://image.qwenlm.ai/generated-images/80a36fab-2f59-4f50-a3b8-4192d5f43da9/_result.png',
    'https://image.qwenlm.ai/generated-images/83e38730-75a4-4239-aa63-cea323dd014c/_result.png',
    'https://image.qwenlm.ai/generated-images/ea4922a7-e3f6-4a58-896b-c13d28fc97ec/_result.png',
    'https://image.qwenlm.ai/generated-images/6ed12c68-2607-47e3-b070-14723a104319/_result.png',
    'https://image.qwenlm.ai/generated-images/8462b24d-5877-4d03-85b0-7a83b3c82de0/_result.png',
    'https://image.qwenlm.ai/generated-images/ebad176d-1cc4-4962-839a-75e5350c6d37/_result.png',
  ],
};

// ===== WhatsApp Config =====
const WHATSAPP_NUMBER = '97141234567';
const PHONE_NUMBER = '+97141234567';
const INSTAGRAM_URL = 'https://instagram.com/royaldubaibarber';
const MAPS_URL = 'https://maps.google.com/?q=Dubai+Mall+Fashion+Avenue';

// ===== Navbar Component =====
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#about', label: t.nav.about },
    { href: '#hours', label: t.nav.hours },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 no-underline">
              <div className="w-10 h-10 rounded-full border-2 border-[#C9A96E] flex items-center justify-center">
                <i className="fas fa-crown text-[#C9A96E] text-sm"></i>
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white">Royal Dubai</span>
                <span className="block text-[#C9A96E] text-xs tracking-widest uppercase -mt-1">Barber</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="px-3 py-1.5 border border-[#C9A96E] rounded text-[#C9A96E] text-sm font-medium hover:bg-[#C9A96E] hover:text-black transition-all"
              >
                {lang === 'en' ? 'عربي' : 'EN'}
              </button>

              {/* Book Now - Desktop */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex btn-gold text-sm py-2.5 px-5"
              >
                {t.nav.bookNow}
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white text-2xl p-2"
                aria-label="Menu"
              >
                <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 text-white text-3xl"
          aria-label="Close menu"
        >
          <i className="fas fa-times"></i>
        </button>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={handleNavClick}
            className="text-white text-2xl font-display hover:text-[#C9A96E] transition-colors no-underline"
          >
            {link.label}
          </a>
        ))}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.message)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleNavClick}
          className="btn-gold mt-4"
        >
          <i className="fab fa-whatsapp"></i> {t.nav.bookNow}
        </a>
      </div>
    </>
  );
}

// ===== Hero Section =====
function Hero() {
  const { t } = useLang();

  return (
    <section id="home" className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${images.hero})` }}></div>
      <div className="hero-overlay"></div>
      <div className="hero-content max-w-4xl">
        <p className="animate-fade-down text-[#C9A96E] text-sm sm:text-base tracking-[4px] uppercase mb-4 font-medium">
          {t.hero.subtitle}
        </p>
        <h1 className="animate-fade-up delay-200 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-2">
          {t.hero.title}
        </h1>
        <h2 className="animate-fade-up delay-300 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold gold-text mb-6">
          {t.hero.titleAccent}
        </h2>
        <p className="animate-fade-up delay-400 text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.hero.description}
        </p>
        <div className="animate-fade-up delay-500 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <i className="fab fa-whatsapp text-lg"></i>
            {t.hero.bookBtn}
          </a>
          <a href="#services" className="btn-outline">
            <i className="fas fa-cut"></i>
            {t.hero.servicesBtn}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#services" className="text-[#C9A96E] text-2xl">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
}

// ===== Services Section =====
function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="section bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-subtitle">{t.services.subtitle}</p>
          <h2 className="section-title">{t.services.title}</h2>
          <div className="gold-line"></div>
          <p className="section-desc">{t.services.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((service, index) => (
            <div key={index} className="service-card reveal">
              <div className="service-icon">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{service.desc}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="service-price">
                  {service.price} <span className="text-sm font-normal">{t.services.currency}</span>
                </span>
                <span className="text-gray-500 text-xs">
                  <i className="far fa-clock mr-1"></i>
                  {service.duration}
                </span>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${t.whatsapp.message} - ${service.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 border border-[#C9A96E] text-[#C9A96E] rounded text-sm font-medium hover:bg-[#C9A96E] hover:text-black transition-all no-underline"
              >
                {t.services.bookService}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Gallery Section =====
function Gallery() {
  const { t } = useLang();

  return (
    <section id="gallery" className="section bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-subtitle">{t.gallery.subtitle}</p>
          <h2 className="section-title">{t.gallery.title}</h2>
          <div className="gold-line"></div>
          <p className="section-desc">{t.gallery.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.gallery.map((img, index) => (
            <div
              key={index}
              className={`gallery-item reveal ${index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}
              style={{ height: index === 0 ? '400px' : '250px' }}
            >
              <img src={img} alt={`Gallery ${index + 1}`} loading="lazy" />
              <div className="gallery-overlay">
                <i className="fas fa-expand text-white text-2xl"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== About Section =====
function About() {
  const { t } = useLang();

  return (
    <section id="about" className="section bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="reveal">
            <p className="section-subtitle">{t.about.subtitle}</p>
            <h2 className="section-title">{t.about.title}</h2>
            <div className="gold-line-left"></div>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">{t.about.p1}</p>
            <p className="text-gray-400 text-base mb-8 leading-relaxed">{t.about.p2}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {t.about.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-3xl font-bold text-[#C9A96E] mb-1">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="reveal">
            <div className="relative">
              <div className="rounded-lg overflow-hidden border border-[#C9A96E]/20">
                <img
                  src={images.gallery[0]}
                  alt="Royal Dubai Barber Interior"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#C9A96E]/30 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Hours Section =====
function Hours() {
  const { t } = useLang();

  const today = new Date().getDay();
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Sunday=6, Monday=0...
  const todayIndex = dayMap[today];

  return (
    <section id="hours" className="section bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-subtitle">{t.hours.subtitle}</p>
          <h2 className="section-title">{t.hours.title}</h2>
          <div className="gold-line"></div>
        </div>

        <div className="max-w-2xl mx-auto reveal">
          <div className="bg-[#1a1a1a] border border-[#C9A96E]/20 rounded-lg overflow-hidden">
            <table className="hours-table">
              <tbody>
                {t.hours.days.map((item, index) => (
                  <tr
                    key={index}
                    className={index === todayIndex ? 'bg-[#C9A96E]/10' : ''}
                  >
                    <td className="flex items-center gap-3">
                      {index === todayIndex && (
                        <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse"></span>
                      )}
                      {item.day}
                    </td>
                    <td>{item.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">
            <i className="fas fa-info-circle text-[#C9A96E] mr-2"></i>
            {t.hours.note}
          </p>
        </div>
      </div>
    </section>
  );
}

// ===== Contact Section =====
function Contact() {
  const { t, lang } = useLang();

  return (
    <section id="contact" className="section bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-subtitle">{t.contact.subtitle}</p>
          <h2 className="section-title">{t.contact.title}</h2>
          <div className="gold-line"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Address */}
          <div className="contact-card reveal">
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3 className="text-white font-semibold mb-2">{lang === 'ar' ? 'العنوان' : 'Address'}</h3>
            <p className="text-gray-400 text-sm">{t.contact.address}</p>
          </div>

          {/* Phone */}
          <div className="contact-card reveal">
            <div className="contact-icon">
              <i className="fas fa-phone"></i>
            </div>
            <h3 className="text-white font-semibold mb-2">{lang === 'ar' ? 'الهاتف' : 'Phone'}</h3>
            <a href={`tel:${PHONE_NUMBER}`} className="text-[#C9A96E] text-sm hover:underline no-underline">
              {t.contact.phone}
            </a>
          </div>

          {/* Email */}
          <div className="contact-card reveal">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3 className="text-white font-semibold mb-2">{lang === 'ar' ? 'البريد' : 'Email'}</h3>
            <a href={`mailto:${t.contact.email}`} className="text-[#C9A96E] text-sm hover:underline no-underline">
              {t.contact.email}
            </a>
          </div>

          {/* Social */}
          <div className="contact-card reveal">
            <div className="contact-icon">
              <i className="fab fa-instagram"></i>
            </div>
            <h3 className="text-white font-semibold mb-2">{t.contact.followUs}</h3>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] text-sm hover:underline no-underline">
              @royaldubaibarber
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="btn-gold"
          >
            <i className="fas fa-phone"></i>
            {t.contact.callUs}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
          >
            <i className="fab fa-whatsapp"></i>
            {t.contact.whatsapp}
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <i className="fas fa-map"></i>
            {t.contact.findUs}
          </a>
        </div>

        {/* Map */}
        <div className="reveal rounded-lg overflow-hidden border border-[#C9A96E]/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.1676519830498!2d55.2707!3d25.1972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e2a1%3A0xff4c71b31e3e7e40!2sDubai+Mall!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
            width="100%"
            height="350"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Royal Dubai Barber Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

// ===== Footer =====
function Footer() {
  const { t, lang } = useLang();

  return (
    <footer className="bg-[#050505] border-t border-[#C9A96E]/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-[#C9A96E] flex items-center justify-center">
                <i className="fas fa-crown text-[#C9A96E] text-sm"></i>
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white">Royal Dubai</span>
                <span className="block text-[#C9A96E] text-xs tracking-widest uppercase -mt-1">Barber</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">{t.footer.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C9A96E] font-semibold mb-4 text-sm uppercase tracking-wider">
              {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <div className="flex flex-col gap-2">
              <a href="#services" className="text-gray-400 hover:text-[#C9A96E] transition-colors text-sm no-underline">
                {t.nav.services}
              </a>
              <a href="#gallery" className="text-gray-400 hover:text-[#C9A96E] transition-colors text-sm no-underline">
                {t.nav.gallery}
              </a>
              <a href="#hours" className="text-gray-400 hover:text-[#C9A96E] transition-colors text-sm no-underline">
                {t.nav.hours}
              </a>
              <a href="#contact" className="text-gray-400 hover:text-[#C9A96E] transition-colors text-sm no-underline">
                {t.nav.contact}
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#C9A96E] font-semibold mb-4 text-sm uppercase tracking-wider">
              {t.contact.followUs}
            </h4>
            <div className="flex gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition-all no-underline"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition-all no-underline"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="w-10 h-10 rounded-full border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition-all no-underline"
              >
                <i className="fas fa-phone"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#C9A96E]/10 pt-8 text-center">
          <p className="text-gray-500 text-sm">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

// ===== WhatsApp Float Button =====
function WhatsAppFloat() {
  const { t } = useLang();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  return (
    <div className="relative">
      {showTooltip && (
        <div className="absolute bottom-16 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap animate-fade-up">
          {t.whatsapp.button}
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-white rotate-45"></div>
        </div>
      )}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Book via WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}

// ===== Scroll Reveal Hook =====
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// ===== Main App =====
function AppContent() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Hours />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const t = translations[lang];

  useEffect(() => {
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <AppContent />
    </LanguageContext.Provider>
  );
}
