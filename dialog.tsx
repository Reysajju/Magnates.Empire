import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statueRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!heroConfig.brandLeft && !heroConfig.brandRight) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const statue = statueRef.current;
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;
    const nav = navRef.current;
    const badge = badgeRef.current;
    const bottom = bottomRef.current;

    if (!section || !statue || !leftText || !rightText || !nav || !badge || !bottom) return;

    // Set initial states
    gsap.set([leftText, rightText], { opacity: 0, y: 60 });
    gsap.set(statue, { opacity: 0, scale: 1.08, y: 40 });
    gsap.set(nav, { opacity: 0, y: -20 });
    gsap.set(badge, { opacity: 0, y: 20 });
    gsap.set(bottom, { opacity: 0 });

    // Entrance timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.3,
    });

    tl.to(statue, { opacity: 1, scale: 1, y: 0, duration: 1.4 })
      .to(leftText, { opacity: 1, y: 0, duration: 1 }, '-=1')
      .to(rightText, { opacity: 1, y: 0, duration: 1 }, '-=0.85')
      .to(nav, { opacity: 1, y: 0, duration: 0.7 }, '-=0.7')
      .to(badge, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
      .to(bottom, { opacity: 1, duration: 0.5 }, '-=0.3');

    // Scroll parallax — statue moves slower, text drifts outward
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(statue, { y: p * 120 });
        gsap.set(leftText, { y: p * 200, x: p * -60 });
        gsap.set(rightText, { y: p * 180, x: p * 60 });
        gsap.set(badge, { y: p * 80 });
      },
    });
    triggersRef.current.push(scrollTrigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative h-screen w-full overflow-hidden bg-[#8c8c91]"
      aria-label="Hero Section - Magnates Empire Luxury Perfume"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Hidden SEO Content for Answer Engines */}
      <div className="sr-only">
        <h1 itemProp="name">Magnates Empire - Luxury Perfume House Since 1892</h1>
        <p itemProp="description">Handcrafted luxury perfumes in Grasse, France. Premium oud, amber, and artisan fragrances.</p>
        <meta itemProp="url" content="https://magnatesempire.com" />
        <meta itemProp="foundingDate" content="1892" />
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <meta itemProp="streetAddress" content="12 Rue des Parfumeurs" />
          <meta itemProp="addressLocality" content="Grasse" />
          <meta itemProp="postalCode" content="06130" />
          <meta itemProp="addressCountry" content="FR" />
        </div>
        <meta itemProp="telephone" content="+33 4 93 36 44 66" />
      </div>

      {/* Skip to main content for accessibility */}
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded">
        Skip to main content
      </a>

      {/* Navigation */}
      <nav
        ref={navRef}
        aria-label="Main Navigation"
        className="absolute top-0 left-0 w-full z-50 px-8 lg:px-16 py-6 flex items-center justify-between will-change-transform"
      >
        <a href="/" className="museo-label text-white/70 hover:text-white transition-colors" aria-label="Magnates Empire Home">
          {heroConfig.brandLeft} {heroConfig.brandRight}
        </a>
        <div className="flex items-center gap-8" role="menubar">
          {heroConfig.navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              className="museo-label text-white/70 hover:text-white transition-colors"
              role="menuitem"
              aria-label={`Navigate to ${link.label}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main hero content — 3-column: text | statue | text */}
      <main className="relative z-10 flex items-center justify-center h-full px-6 lg:px-12">
        {/* Left text block */}
        <div
          ref={leftTextRef}
          className="flex flex-col items-end text-right flex-1 pr-6 lg:pr-12 will-change-transform"
        >
          <span className="museo-headline text-white text-[11vw] md:text-[9vw] lg:text-[7vw] leading-[0.85]" role="heading" aria-level={1}>
            {heroConfig.brandLeft}
          </span>
          <p className="museo-body text-white/60 text-sm md:text-base max-w-[240px] mt-6">
            {heroConfig.tagline}
          </p>
          <div className="flex items-center gap-4 mt-6" role="list" aria-label="Social media links">
            {heroConfig.socialLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.href} 
                className="museo-label text-white/40 hover:text-white transition-colors text-[10px]" 
                data-cursor="hover"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${link.label}`}
                role="listitem"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Center perfume bottle image */}
        <figure
          ref={statueRef}
          className="relative flex-shrink-0 w-[36vw] md:w-[30vw] lg:w-[26vw] max-w-[480px] will-change-transform"
          itemScope
          itemType="https://schema.org/ImageObject"
        >
          {/* Badge above statue */}
          <div
            ref={badgeRef}
            className="absolute -top-10 left-1/2 -translate-x-1/2 museo-label text-white/50 text-[10px] whitespace-nowrap will-change-transform"
          >
            {heroConfig.badge}
          </div>
          <img
            src={heroConfig.heroImage}
            alt={heroConfig.heroImageAlt}
            className="w-full h-auto object-contain"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            itemProp="contentUrl"
            style={{
              maskImage: 'radial-gradient(ellipse 72% 78% at 50% 45%, black 45%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 72% 78% at 50% 45%, black 45%, transparent 100%)',
            }}
          />
          <figcaption className="sr-only">{heroConfig.heroImageAlt}</figcaption>
          <meta itemProp="name" content="Magnates Empire Imperial Oud" />
          <meta itemProp="description" content="Luxury perfume bottle with crown cap" />
        </figure>

        {/* Right text block */}
        <div
          ref={rightTextRef}
          className="flex flex-col items-start text-left flex-1 pl-6 lg:pl-12 will-change-transform"
        >
          <span className="museo-headline text-white text-[11vw] md:text-[9vw] lg:text-[7vw] leading-[0.85]" role="heading" aria-level={1}>
            {heroConfig.brandRight}
          </span>
          <time className="museo-label text-white/40 mt-6 text-[10px]" dateTime="1892">{heroConfig.since}</time>
          {heroConfig.email && (
            <a
              href={`mailto:${heroConfig.email}`}
              className="museo-label text-white/40 hover:text-white transition-colors text-[10px] mt-4"
              data-cursor="hover"
              aria-label="Email us at concierge@magnatesempire.com"
            >
              {heroConfig.email}
            </a>
          )}
        </div>
      </main>

      {/* Bottom bar */}
      <footer
        ref={bottomRef}
        className="absolute bottom-0 left-0 w-full z-20 px-8 lg:px-16 py-5 flex items-center justify-between border-t border-white/10"
      >
        <p className="museo-label text-white/30 text-[10px]">{heroConfig.scrollText}</p>
        <p className="museo-label text-white/30 text-[10px]">{heroConfig.copyrightText}</p>
      </footer>
    </section>
  );
};

export default Hero;
