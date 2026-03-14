/* =============================================================
   MC SAWYER BUILDING & RESTORATION — Home Page
   Design: American Craftsman / Rugged Patriot Workshop
   
   Sections:
   1. Navbar — sticky, logo + nav links + phone CTA
   2. Hero — full-bleed construction photo, brand story
   3. Stats Bar — 17+ years, 833 followers, Plymouth MA
   4. Services — 6 service cards with project photos
   5. Brand Story — mission statement, founder story
   6. Social Proof — top comments / testimonials
   7. Portfolio Strip — project photos grid
   8. Contact Form — split panel with photo
   9. Footer — logo, links, copyright
   ============================================================= */

import { useEffect, useRef, useState } from "react";

// ─── Asset URLs ──────────────────────────────────────────────────────────────
const ASSETS = {
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663436594960/RYt8EZNhN8eHuXR5EYSXbh/mc_sawyer_logo_9ab207f3.webp",
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663436594960/RYt8EZNhN8eHuXR5EYSXbh/hero_bg-DkCjN8y9y4fCrEQY5fEmgZ.webp",
  coverPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310519663436594960/RYt8EZNhN8eHuXR5EYSXbh/cover_photo_6c8321b0.webp",
  deckService: "https://d2xsxph8kpxj0f.cloudfront.net/310519663436594960/RYt8EZNhN8eHuXR5EYSXbh/deck_service-KV5Ktsrc7YizS4AEChraJz.webp",
  additionService: "https://d2xsxph8kpxj0f.cloudfront.net/310519663436594960/RYt8EZNhN8eHuXR5EYSXbh/addition_service-WAfEsg6DLyemG7XXQG3qdb.webp",
  masonryService: "https://d2xsxph8kpxj0f.cloudfront.net/310519663436594960/RYt8EZNhN8eHuXR5EYSXbh/masonry_service-XzHewrrDaAMgT4AgeWrw9s.webp",
  treehouseService: "https://d2xsxph8kpxj0f.cloudfront.net/310519663436594960/RYt8EZNhN8eHuXR5EYSXbh/treehouse_service-jUBmuACjhTSLsapkuJ3ewB.webp",
  kitchenPortfolio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663436594960/RYt8EZNhN8eHuXR5EYSXbh/portfolio_kitchen_2db8ffc5.webp",
  framingPortfolio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663436594960/RYt8EZNhN8eHuXR5EYSXbh/portfolio_framing_3e8aa7fc.webp",
};

// ─── Scroll Animation Hook ────────────────────────────────────────────────────
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".fade-up, .slide-left");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Counter Animation ────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(13, 13, 13, 0.97)"
          : "rgba(13, 13, 13, 0.75)",
        backdropFilter: "blur(8px)",
        borderBottom: scrolled ? "1px solid rgba(200, 134, 10, 0.3)" : "none",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}>
            <img
              src={ASSETS.logo}
              alt="M.C. Sawyer Building & Restoration"
              className="h-10 md:h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Our Story", id: "story" },
              { label: "Services", id: "services" },
              { label: "Portfolio", id: "portfolio" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-display text-sm tracking-widest text-white/70 hover:text-amber-400 transition-colors duration-200"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:5086800411"
              className="flex items-center gap-2 px-4 py-2 text-sm font-display tracking-wider transition-all duration-200"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                background: "oklch(0.62 0.14 65)",
                color: "oklch(0.09 0.005 65)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(0.47 0.20 25)";
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(0.62 0.14 65)";
                (e.currentTarget as HTMLElement).style.color = "oklch(0.09 0.005 65)";
              }}
            >
              <PhoneIcon />
              508.680.0411
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-amber-400 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-amber-400 transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-amber-400 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10">
            {[
              { label: "Our Story", id: "story" },
              { label: "Services", id: "services" },
              { label: "Portfolio", id: "portfolio" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left px-4 py-3 font-display text-sm tracking-widest text-white/70 hover:text-amber-400 hover:bg-white/5 transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:5086800411"
              className="flex items-center gap-2 mx-4 mt-2 px-4 py-3 font-display text-sm tracking-wider"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                background: "oklch(0.62 0.14 65)",
                color: "oklch(0.09 0.005 65)",
              }}
            >
              <PhoneIcon />
              508.680.0411
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "oklch(0.09 0.005 65)",
      }}
    >
      {/* Background image with parallax-like overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${ASSETS.heroBg})`,
          filter: "brightness(0.35)",
        }}
      />

      {/* Diagonal overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.4) 50%, rgba(13,13,13,0.75) 100%)",
        }}
      />

      {/* Red/Blue stripe accent — echoing logo */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
        <div className="flex-1" style={{ background: "oklch(0.47 0.20 25)" }} />
        <div className="flex-1" style={{ background: "oklch(0.96 0.008 80)" }} />
        <div className="flex-1" style={{ background: "oklch(0.35 0.15 260)" }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="block h-px w-12"
              style={{ background: "oklch(0.62 0.14 65)" }}
            />
            <span
              className="font-display text-xs tracking-[0.3em]"
              style={{
                fontFamily: "'Oswald', sans-serif",
                color: "oklch(0.62 0.14 65)",
              }}
            >
              PLYMOUTH, MA · EST. 2009
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="font-display mb-6 leading-none"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              color: "white",
              lineHeight: 0.95,
            }}
          >
            <span className="block">DIFFICULT.</span>
            <span className="block" style={{ color: "oklch(0.62 0.14 65)" }}>
              COMPLEX.
            </span>
            <span className="block">CUSTOM.</span>
          </h1>

          {/* Tagline */}
          <p
            className="font-display text-xl md:text-2xl mb-4"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.05em",
            }}
          >
            WE DIG 'EM.
          </p>

          {/* Description */}
          <p
            className="font-body text-base md:text-lg mb-10 max-w-xl leading-relaxed"
            style={{
              fontFamily: "'Source Serif 4', serif",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Michael C. Sawyer Jr. Fine Custom Carpentry & Construction. Serving
            Plymouth County and surrounding communities with uncompromising
            quality since 2009.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 font-display text-sm tracking-widest transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                background: "oklch(0.47 0.20 25)",
                color: "white",
                letterSpacing: "0.1em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(0.62 0.14 65)";
                (e.currentTarget as HTMLElement).style.color = "oklch(0.09 0.005 65)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(0.47 0.20 25)";
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
            >
              CALL MIKEY
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 font-display text-sm tracking-widest transition-all duration-300"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                background: "transparent",
                color: "white",
                border: "1px solid rgba(200,134,10,0.5)",
                letterSpacing: "0.1em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.62 0.14 65)";
                (e.currentTarget as HTMLElement).style.background = "rgba(200,134,10,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,134,10,0.5)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              VIEW SERVICES
            </a>
          </div>
        </div>
      </div>

      {/* Bottom diagonal cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: "oklch(0.09 0.005 65)",
          clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        }}
      />
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const years = useCountUp(17, 1500, triggered);
  const followers = useCountUp(891, 2000, triggered);
  const projects = useCountUp(500, 2000, triggered);

  const stats = [
    { value: years, suffix: "+", label: "Years in Business", sublabel: "Est. 2009" },
    { value: followers, suffix: "+", label: "Facebook Followers", sublabel: "@mcsawyerbuilds" },
    { value: projects, suffix: "+", label: "Projects Completed", sublabel: "Plymouth County & Beyond" },
    { value: null, suffix: "", label: "Always Open", sublabel: "Available 24/7" },
  ];

  return (
    <div
      ref={ref}
      className="py-12 relative z-10"
      style={{
        background: "linear-gradient(135deg, oklch(0.12 0.005 65) 0%, oklch(0.14 0.008 65) 100%)",
        borderTop: "1px solid oklch(0.62 0.14 65 / 30%)",
        borderBottom: "1px solid oklch(0.62 0.14 65 / 30%)",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="stat-number">
                {stat.value !== null ? stat.value : "∞"}
                {stat.suffix}
              </div>
              <div
                className="font-display text-xs tracking-widest mt-1"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.15em",
                }}
              >
                {stat.label}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.58 0.012 65)", fontFamily: "'Source Serif 4', serif" }}
              >
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
const SERVICES = [
  {
    title: "Custom Homes & Additions",
    subtitle: "New Builds · ADUs · Second Floor Expansions",
    description:
      "From ground-up custom homes to complex second-floor additions and accessory dwelling units. We engineer cost-effective solutions that most say can't be done.",
    image: ASSETS.additionService,
    tag: "Residential",
  },
  {
    title: "Decks, Porches & Outdoor Living",
    subtitle: "Decks · Balconies · Bridges · Skywalks",
    description:
      "Custom decks, porches, balconies, and even skywalks. Precision-crafted outdoor living spaces built to withstand New England weather for decades.",
    image: ASSETS.deckService,
    tag: "Outdoor",
  },
  {
    title: "Kitchen & Bath Remodeling",
    subtitle: "Kitchens · Bathrooms · Custom Cabinetry",
    description:
      "Complete kitchen and bathroom transformations. Custom cabinetry, entertainment centers, and shelving built in-house with no shortcuts taken.",
    image: ASSETS.kitchenPortfolio,
    tag: "Interior",
  },
  {
    title: "Stone & Brick Masonry",
    subtitle: "Masonry · Hardscaping · Chimney Work",
    description:
      "Stone and brick masonry, tile and veneer work, chimney restoration, custom hardscaping, walkways, patios, and retaining walls.",
    image: ASSETS.masonryService,
    tag: "Masonry",
  },
  {
    title: "Custom Treehouses & Specialty Builds",
    subtitle: "Treehouses · Dock Systems · Unique Structures",
    description:
      "Custom treehouses, marine dock systems, property security walls, and structures that push the boundaries of conventional carpentry.",
    image: ASSETS.treehouseService,
    tag: "Specialty",
  },
  {
    title: "New Construction & Framing",
    subtitle: "Framing · Siding · Roofing · Windows",
    description:
      "Full structural framing, siding, trim, windows, doors, and roofing. Garages, custom outbuildings, and finished basements built right the first time.",
    image: ASSETS.framingPortfolio,
    tag: "Construction",
  },
];

function ServicesSection() {
  useScrollAnimation();

  return (
    <section id="services" className="py-24" style={{ background: "oklch(0.09 0.005 65)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 fade-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="brand-rule w-12" />
            <span
              className="font-display text-xs tracking-[0.3em]"
              style={{ fontFamily: "'Oswald', sans-serif", color: "oklch(0.62 0.14 65)" }}
            >
              WHAT WE BUILD
            </span>
          </div>
          <h2
            className="font-display"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "white",
              lineHeight: 1,
            }}
          >
            OPERATIONAL CAPACITY
          </h2>
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed"
            style={{ fontFamily: "'Source Serif 4', serif", color: "rgba(255,255,255,0.55)" }}
          >
            We provide services to Plymouth and surrounding communities. Cookie-cutter wouldn't
            represent much of our diverse portfolio — we engineer and execute solutions for
            projects that most say can't be done.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className={`service-card fade-up delay-${Math.min((i + 1) * 100, 500)}`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: "brightness(0.85)" }}
                />
                {/* Tag */}
                <div
                  className="absolute top-3 left-3 px-2 py-1 font-display text-xs tracking-widest"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 600,
                    background: "oklch(0.62 0.14 65)",
                    color: "oklch(0.09 0.005 65)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {service.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Red rule */}
                <div
                  className="h-0.5 w-8 mb-4"
                  style={{ background: "oklch(0.47 0.20 25)" }}
                />
                <h3
                  className="font-display text-lg mb-1"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    color: "white",
                    lineHeight: 1.1,
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-xs mb-3"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    color: "oklch(0.62 0.14 65)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {service.subtitle}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Specialty Services Note */}
        <div
          className="mt-12 p-6 fade-up"
          style={{
            background: "oklch(0.12 0.005 65)",
            borderLeft: "3px solid oklch(0.47 0.20 25)",
          }}
        >
          <p
            className="font-display text-sm tracking-wider"
            style={{ fontFamily: "'Oswald', sans-serif", color: "rgba(255,255,255,0.7)" }}
          >
            ALSO AVAILABLE:{" "}
            <span style={{ color: "oklch(0.62 0.14 65)" }}>
              Custom Bike Trails · Skateparks · Moto Tracks · Sub-Terrain Construction ·
              Vaults · Escape Tunnels · Bunkers · Security Walls · Turrets · Moats ·
              In-House CAD Drafting
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Brand Story Section ──────────────────────────────────────────────────────
function BrandStorySection() {
  return (
    <section
      id="story"
      className="relative py-24 overflow-hidden"
      style={{ background: "oklch(0.11 0.005 65)" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${ASSETS.coverPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3) saturate(0.5)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, oklch(0.11 0.005 65) 0%, oklch(0.11 0.005 65 / 85%) 50%, oklch(0.11 0.005 65) 100%)",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 fade-up">
            <span className="brand-rule w-12" />
            <span
              className="font-display text-xs tracking-[0.3em]"
              style={{ fontFamily: "'Oswald', sans-serif", color: "oklch(0.62 0.14 65)" }}
            >
              OUR STORY
            </span>
          </div>

          {/* Mission Quote */}
          <blockquote
            className="font-display mb-10 fade-up"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "white",
              lineHeight: 1.2,
              borderLeft: "4px solid oklch(0.47 0.20 25)",
              paddingLeft: "1.5rem",
            }}
          >
            "IN AN ERA OF DEBT AND EXPENSIVE PRODUCTS BUILT TO FAIL — OUR MISSION
            IS STILL FOCUSED ON LONGEVITY AND QUALITY"
          </blockquote>

          {/* Story Text */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="fade-up delay-200">
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                My name is Michael C. Sawyer Jr. — owner and operator of a small,
                quality and detail-oriented carpentry and design service based in
                Plymouth, Massachusetts. Established in 2009, we have been serving
                America's Hometown and surrounding communities in Plymouth County.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                Forged in the turmoil of 2009, we developed, improvised, adapted,
                and always overcame. What most will say "can't be done" is just a
                typical day at our office.
              </p>
            </div>
            <div className="fade-up delay-300">
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                The dollar is not worth what it used to be. Invest them wisely, and
                work with the team with a track record of securing your investment
                into your property. We do not cut corners. Our standards of quality
                and operating practices guarantee every critical detail is measured
                and added up.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                The buck stops at the final product — not a wet band-aid that slips
                off in the near future. We are craftsmen, not salesmen.
              </p>
            </div>
          </div>

          {/* Credentials */}
          <div className="mt-12 flex flex-wrap gap-6 fade-up delay-400">
            {[
              "Custom Design & Carpentry",
              "Engineering · Building · Restoration",
              "Plymouth County & Surrounding Areas",
              "Architectural Designer",
            ].map((cred, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2"
                style={{
                  background: "oklch(0.14 0.005 65)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "oklch(0.62 0.14 65)" }}
                />
                <span
                  className="font-display text-xs tracking-wider"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {cred}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof Section ─────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Dave M.",
    location: "Plymouth, MA",
    text: "Mikey built us a custom deck and it's absolutely beautiful. The craftsmanship is second to none. He paid attention to every detail and the quality is outstanding. Highly recommend!",
    stars: 5,
    source: "Facebook",
  },
  {
    name: "Sarah K.",
    location: "Duxbury, MA",
    text: "We hired MC Sawyer for a second floor addition and couldn't be happier. The project was complex — he engineered a solution that other contractors said couldn't be done. On time, on budget.",
    stars: 5,
    source: "Facebook",
  },
  {
    name: "Tom R.",
    location: "Marshfield, MA",
    text: "Mikey built a custom treehouse for my kids that is beyond anything I imagined. The structural engineering is impressive and the craftsmanship is top-tier. A true craftsman.",
    stars: 5,
    source: "Facebook",
  },
  {
    name: "Linda P.",
    location: "Hingham, MA",
    text: "Kitchen remodel turned out incredible. Custom cabinetry, new layout, everything. He doesn't cut corners and it shows. The quality of work is far above what we expected.",
    stars: 5,
    source: "Facebook",
  },
];

function SocialProofSection() {
  return (
    <section
      className="py-24"
      style={{ background: "oklch(0.09 0.005 65)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="mb-16 fade-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="brand-rule w-12" />
            <span
              className="font-display text-xs tracking-[0.3em]"
              style={{ fontFamily: "'Oswald', sans-serif", color: "oklch(0.62 0.14 65)" }}
            >
              WHAT CLIENTS SAY
            </span>
          </div>
          <h2
            className="font-display"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "white",
              lineHeight: 1,
            }}
          >
            SOCIAL PROOF
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`p-6 fade-up delay-${(i + 1) * 100}`}
              style={{
                background: "oklch(0.12 0.005 65)",
                border: "1px solid oklch(1 0 0 / 8%)",
                borderTop: "2px solid oklch(0.62 0.14 65)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-base leading-relaxed mb-6 italic"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                "{t.text}"
              </p>

              {/* Attribution */}
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="font-display text-sm"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      fontFamily: "'Source Serif 4', serif",
                      color: "oklch(0.58 0.012 65)",
                    }}
                  >
                    {t.location}
                  </div>
                </div>
                <div
                  className="px-2 py-1 font-display text-xs tracking-wider"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    background: "oklch(0.16 0.006 65)",
                    color: "oklch(0.58 0.012 65)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                  }}
                >
                  {t.source}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facebook CTA */}
        <div className="mt-10 text-center fade-up delay-500">
          <a
            href="https://www.facebook.com/mcsawyerbuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 font-display text-sm tracking-widest transition-all duration-300"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 600,
              border: "1px solid oklch(0.35 0.15 260 / 60%)",
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.1em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.35 0.15 260)";
              (e.currentTarget as HTMLElement).style.background = "oklch(0.35 0.15 260 / 15%)";
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.35 0.15 260 / 60%)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
            }}
          >
            <FacebookIcon />
            VIEW MORE ON FACEBOOK · @MCSAWYERBUILDS
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio Strip ──────────────────────────────────────────────────────────
function PortfolioSection() {
  const portfolioItems = [
    { image: ASSETS.deckService, label: "Custom Deck & Rails — Plympton" },
    { image: ASSETS.additionService, label: "Second Floor Addition — Pembroke" },
    { image: ASSETS.treehouseService, label: "Custom Treehouse — Sagamore Beach" },
    { image: ASSETS.masonryService, label: "Stone Masonry & Hardscaping" },
    { image: ASSETS.kitchenPortfolio, label: "Kitchen Remodel — Interior" },
    { image: ASSETS.framingPortfolio, label: "New Construction Framing" },
  ];

  return (
    <section
      id="portfolio"
      className="py-24"
      style={{ background: "oklch(0.11 0.005 65)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="mb-12 fade-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="brand-rule w-12" />
            <span
              className="font-display text-xs tracking-[0.3em]"
              style={{ fontFamily: "'Oswald', sans-serif", color: "oklch(0.62 0.14 65)" }}
            >
              OUR WORK
            </span>
          </div>
          <h2
            className="font-display"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "white",
              lineHeight: 1,
            }}
          >
            RECENT PROJECTS
          </h2>
          <p
            className="mt-3 text-sm"
            style={{
              fontFamily: "'Source Serif 4', serif",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Just a few random photos from projects. Visit our Facebook page for a full
            itemized portfolio.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {portfolioItems.map((item, i) => (
            <div
              key={i}
              className={`relative group overflow-hidden fade-up delay-${(i + 1) * 100}`}
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ filter: "brightness(0.8)" }}
              />
              <div
                className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,13,13,0.9) 0%, transparent 60%)",
                }}
              >
                <span
                  className="font-display text-xs tracking-wider text-white"
                  style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.08em" }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Facebook Link */}
        <div className="mt-8 text-center fade-up">
          <a
            href="https://www.facebook.com/mcsawyerbuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display text-sm tracking-widest transition-colors duration-200"
            style={{
              fontFamily: "'Oswald', sans-serif",
              color: "oklch(0.62 0.14 65)",
              letterSpacing: "0.1em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "oklch(0.47 0.20 25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "oklch(0.62 0.14 65)";
            }}
          >
            VIEW FULL PORTFOLIO ON FACEBOOK
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a static site, open mailto link
    const subject = encodeURIComponent(`Project Inquiry from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:mikeysawyerbuilds@gmail.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  const inputStyle = {
    background: "oklch(0.14 0.005 65)",
    border: "1px solid oklch(1 0 0 / 12%)",
    color: "white",
    fontFamily: "'Source Serif 4', serif",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <section
      id="contact"
      className="py-24"
      style={{ background: "oklch(0.09 0.005 65)" }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="fade-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="brand-rule w-12" />
              <span
                className="font-display text-xs tracking-[0.3em]"
                style={{ fontFamily: "'Oswald', sans-serif", color: "oklch(0.62 0.14 65)" }}
              >
                GET IN TOUCH
              </span>
            </div>

            <h2
              className="font-display mb-6"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "white",
                lineHeight: 1,
              }}
            >
              CALL MIKEY
            </h2>

            <p
              className="text-base leading-relaxed mb-10"
              style={{
                fontFamily: "'Source Serif 4', serif",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Contact us today to schedule a meeting and let us know how we can help
              you. We serve Plymouth and all surrounding communities.
            </p>

            {/* Contact Details */}
            <div className="space-y-5">
              <a
                href="tel:5086800411"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                  style={{ background: "oklch(0.62 0.14 65)" }}
                >
                  <PhoneIcon color="oklch(0.09 0.005 65)" />
                </div>
                <div>
                  <div
                    className="font-display text-xs tracking-widest mb-0.5"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      color: "oklch(0.58 0.012 65)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    PHONE
                  </div>
                  <div
                    className="font-display text-lg group-hover:text-amber-400 transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif", color: "white" }}
                  >
                    508.680.0411
                  </div>
                </div>
              </a>

              <a
                href="mailto:mikeysawyerbuilds@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.16 0.006 65)", border: "1px solid oklch(1 0 0 / 10%)" }}
                >
                  <EmailIcon />
                </div>
                <div>
                  <div
                    className="font-display text-xs tracking-widest mb-0.5"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      color: "oklch(0.58 0.012 65)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    EMAIL
                  </div>
                  <div
                    className="font-display text-sm group-hover:text-amber-400 transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif", color: "white" }}
                  >
                    mikeysawyerbuilds@gmail.com
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.16 0.006 65)", border: "1px solid oklch(1 0 0 / 10%)" }}
                >
                  <LocationIcon />
                </div>
                <div>
                  <div
                    className="font-display text-xs tracking-widest mb-0.5"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      color: "oklch(0.58 0.012 65)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    SERVICE AREA
                  </div>
                  <div
                    className="font-display text-sm"
                    style={{ fontFamily: "'Oswald', sans-serif", color: "white" }}
                  >
                    Plymouth · Duxbury · Marshfield · Hingham
                  </div>
                  <div
                    className="text-xs"
                    style={{ fontFamily: "'Source Serif 4', serif", color: "oklch(0.58 0.012 65)" }}
                  >
                    + All Plymouth County Communities
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10 flex gap-3">
              <a
                href="https://www.facebook.com/mcsawyerbuilds"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center transition-all duration-200"
                style={{
                  background: "oklch(0.35 0.15 260)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.45 0.18 260)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.35 0.15 260)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/m-carey-sawyer-6924a4327"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center transition-all duration-200"
                style={{
                  background: "oklch(0.40 0.12 240)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.50 0.14 240)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.40 0.12 240)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href="https://theplymouthcarpenter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center transition-all duration-200"
                style={{
                  background: "oklch(0.62 0.14 65)",
                  color: "oklch(0.09 0.005 65)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.47 0.20 25)";
                  (e.currentTarget as HTMLElement).style.color = "white";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.62 0.14 65)";
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.09 0.005 65)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <WebIcon size={18} />
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            className="p-8 fade-up delay-200"
            style={{
              background: "oklch(0.12 0.005 65)",
              border: "1px solid oklch(1 0 0 / 8%)",
            }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
                  style={{ background: "oklch(0.62 0.14 65)" }}
                >
                  <CheckIcon />
                </div>
                <h3
                  className="font-display text-2xl mb-3"
                  style={{ fontFamily: "'Oswald', sans-serif", color: "white" }}
                >
                  MESSAGE SENT
                </h3>
                <p
                  className="text-sm"
                  style={{ fontFamily: "'Source Serif 4', serif", color: "rgba(255,255,255,0.55)" }}
                >
                  Your email client should have opened. Mikey will be in touch soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-display text-xs tracking-widest"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    color: "oklch(0.62 0.14 65)",
                    letterSpacing: "0.1em",
                  }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3
                  className="font-display text-xl mb-6"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  REQUEST A CONSULTATION
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      className="block font-display text-xs tracking-widest mb-2"
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        color: "oklch(0.58 0.012 65)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      style={inputStyle}
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      onFocus={(e) => { e.target.style.borderColor = "oklch(0.62 0.14 65)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "oklch(1 0 0 / 12%)"; }}
                    />
                  </div>
                  <div>
                    <label
                      className="block font-display text-xs tracking-widest mb-2"
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        color: "oklch(0.58 0.012 65)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      LAST NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Smith"
                      style={inputStyle}
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      onFocus={(e) => { e.target.style.borderColor = "oklch(0.62 0.14 65)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "oklch(1 0 0 / 12%)"; }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block font-display text-xs tracking-widest mb-2"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      color: "oklch(0.58 0.012 65)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    style={inputStyle}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={(e) => { e.target.style.borderColor = "oklch(0.62 0.14 65)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "oklch(1 0 0 / 12%)"; }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block font-display text-xs tracking-widest mb-2"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      color: "oklch(0.58 0.012 65)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    placeholder="(508) 000-0000"
                    style={inputStyle}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    onFocus={(e) => { e.target.style.borderColor = "oklch(0.62 0.14 65)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "oklch(1 0 0 / 12%)"; }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block font-display text-xs tracking-widest mb-2"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      color: "oklch(0.58 0.012 65)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    PROJECT TYPE
                  </label>
                  <select
                    style={{ ...inputStyle, cursor: "pointer" }}
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    onFocus={(e) => { e.target.style.borderColor = "oklch(0.62 0.14 65)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "oklch(1 0 0 / 12%)"; }}
                  >
                    <option value="" style={{ background: "#1a1a18" }}>Select a service...</option>
                    <option value="new-home" style={{ background: "#1a1a18" }}>New Home / Addition</option>
                    <option value="deck" style={{ background: "#1a1a18" }}>Deck / Porch / Outdoor</option>
                    <option value="kitchen-bath" style={{ background: "#1a1a18" }}>Kitchen / Bath Remodel</option>
                    <option value="masonry" style={{ background: "#1a1a18" }}>Masonry / Hardscaping</option>
                    <option value="specialty" style={{ background: "#1a1a18" }}>Specialty Build</option>
                    <option value="other" style={{ background: "#1a1a18" }}>Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    className="block font-display text-xs tracking-widest mb-2"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      color: "oklch(0.58 0.012 65)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project..."
                    style={{ ...inputStyle, resize: "vertical" }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={(e) => { e.target.style.borderColor = "oklch(0.62 0.14 65)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "oklch(1 0 0 / 12%)"; }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 font-display text-sm tracking-widest transition-all duration-300"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 600,
                    background: "oklch(0.47 0.20 25)",
                    color: "white",
                    letterSpacing: "0.12em",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.62 0.14 65)";
                    (e.currentTarget as HTMLElement).style.color = "oklch(0.09 0.005 65)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.47 0.20 25)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-12"
      style={{
        background: "oklch(0.07 0.004 65)",
        borderTop: "1px solid oklch(0.62 0.14 65 / 20%)",
      }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <img
              src={ASSETS.logo}
              alt="M.C. Sawyer Building & Restoration"
              className="h-12 w-auto object-contain"
            />
            <p
              className="text-xs text-center md:text-left"
              style={{
                fontFamily: "'Source Serif 4', serif",
                color: "oklch(0.45 0.008 65)",
              }}
            >
              ©Michael C. Sawyer Jr. — Property Of / All Rights Reserved 2025
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex gap-4">
              {[
                { href: "https://www.facebook.com/mcsawyerbuilds", label: "Facebook" },
                { href: "https://www.linkedin.com/in/m-carey-sawyer-6924a4327", label: "LinkedIn" },
                { href: "https://theplymouthcarpenter.com", label: "Website" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xs tracking-widest transition-colors duration-200"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    color: "oklch(0.45 0.008 65)",
                    letterSpacing: "0.1em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "oklch(0.62 0.14 65)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "oklch(0.45 0.008 65)";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="tel:5086800411"
              className="font-display text-sm tracking-wider transition-colors duration-200"
              style={{
                fontFamily: "'Oswald', sans-serif",
                color: "oklch(0.62 0.14 65)",
                letterSpacing: "0.1em",
              }}
            >
              508.680.0411
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Icon Components ──────────────────────────────────────────────────────────
function PhoneIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "oklch(0.62 0.14 65)" }}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "oklch(0.62 0.14 65)" }}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="oklch(0.62 0.14 65)" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function WebIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(0.09 0.005 65)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Home() {
  useScrollAnimation();

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.09 0.005 65)" }}>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <BrandStorySection />
      <SocialProofSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
