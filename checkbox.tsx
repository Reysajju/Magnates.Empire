import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!aboutConfig.headline) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const gallery = galleryRef.current;
    const stats = statsRef.current;

    if (!section || !text || !gallery || !stats) return;

    // Text reveal
    const textElements = text.querySelectorAll('.reveal-text');
    textElements.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 50 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Gallery column parallax — contained within the gallery wrapper
    const columns = gallery.querySelectorAll<HTMLElement>('.gallery-col');
    columns.forEach((col) => {
      const speed = parseFloat(col.dataset.speed || '0');
      const trigger = ScrollTrigger.create({
        trigger: gallery,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(col, { y: self.progress * speed });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Gallery images: opacity 0.4 -> 1 + slide up
    const imgWraps = gallery.querySelectorAll<HTMLElement>('.gallery-img-wrap');
    imgWraps.forEach((wrap) => {
      const offset = parseFloat(wrap.dataset.offset || '0');
      gsap.set(wrap, { opacity: 0.4, y: offset });

      const trigger = ScrollTrigger.create({
        trigger: wrap,
        start: 'top 92%',
        end: 'top 40%',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(wrap, {
            opacity: 0.4 + progress * 0.6,
            y: offset * (1 - progress),
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Stats reveal
    const statItems = stats.querySelectorAll('.stat-item');
    statItems.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1, y: 0, duration: 0.8,
            delay: i * 0.1, ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  // Split gallery images into 3 columns
  const col1Images = aboutConfig.galleryImages.filter((_, i) => i % 3 === 0);
  const col2Images = aboutConfig.galleryImages.filter((_, i) => i % 3 === 1);
  const col3Images = aboutConfig.galleryImages.filter((_, i) => i % 3 === 2);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#050505]"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      {/* Hidden structured data for AEO */}
      <div className="sr-only">
        <h2 itemProp="name">Magnates Empire Heritage - Crafting Luxury Since 1892</h2>
        <p itemProp="description">For over 130 years, Magnates Empire has crafted exceptional fragrances in Grasse, France using 47 rare ingredients sourced ethically from around the globe.</p>
        <meta itemProp="foundingDate" content="1892" />
        <meta itemProp="foundingLocation" content="Grasse, France" />
      </div>

      {/* Section Header */}
      <article className="max-w-6xl mx-auto pt-32 pb-20 px-8 lg:px-16">
        <header>
          <span className="reveal-text museo-label text-white/50 mb-6 block" style={{ willChange: 'transform, opacity' }}>
            {aboutConfig.label}
          </span>
          <h2 
            id="about-heading"
            className="reveal-text museo-headline text-white text-4xl md:text-5xl lg:text-7xl mb-8" 
            style={{ willChange: 'transform, opacity' }}
            itemProp="headline"
          >
            {aboutConfig.headline}
          </h2>
        </header>
        <p 
          className="reveal-text museo-body text-white/60 text-lg md:text-xl max-w-2xl" 
          style={{ willChange: 'transform, opacity' }}
          itemProp="text"
        >
          {aboutConfig.description}
        </p>
      </article>

      {/* Gallery — overflow hidden to prevent parallax leaking into stats */}
      <figure className="overflow-hidden">
        <div ref={galleryRef} className="relative max-w-7xl mx-auto px-4 lg:px-8 pb-16">
          <div className="grid grid-cols-3 gap-4 lg:gap-5" role="list" aria-label="Heritage gallery">

            {/* Column 1 — drifts up (reduced speed) */}
            <div className="gallery-col space-y-4 lg:space-y-5 will-change-transform" data-speed="-80" role="listitem">
              {col1Images.map((img, i) => (
                <figure 
                  key={i} 
                  className="gallery-img-wrap overflow-hidden will-change-transform" 
                  data-offset={i === 0 ? "60" : "120"}
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-auto object-cover" 
                    style={{ aspectRatio: i === 0 ? '3/4' : '4/5' }}
                    loading="lazy"
                    decoding="async"
                    itemProp="contentUrl"
                  />
                  <figcaption className="museo-label text-white/25 mt-3 text-[10px]" itemProp="caption">{img.label}</figcaption>
                  <meta itemProp="name" content={img.label} />
                  <meta itemProp="description" content={img.alt} />
                </figure>
              ))}
            </div>

            {/* Column 2 — drifts down, starts offset */}
            <div className="gallery-col space-y-4 lg:space-y-5 pt-20 lg:pt-32 will-change-transform" data-speed="100" role="listitem">
              {col2Images.map((img, i) => (
                <figure 
                  key={i} 
                  className="gallery-img-wrap overflow-hidden will-change-transform" 
                  data-offset={i === 0 ? "80" : "160"}
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-auto object-cover" 
                    style={{ aspectRatio: '3/4' }}
                    loading="lazy"
                    decoding="async"
                    itemProp="contentUrl"
                  />
                  <figcaption className="museo-label text-white/25 mt-3 text-[10px]" itemProp="caption">{img.label}</figcaption>
                  <meta itemProp="name" content={img.label} />
                  <meta itemProp="description" content={img.alt} />
                </figure>
              ))}
            </div>

            {/* Column 3 — drifts up faster */}
            <div className="gallery-col space-y-4 lg:space-y-5 will-change-transform" data-speed="-120" role="listitem">
              {col3Images.map((img, i) => (
                <figure 
                  key={i} 
                  className="gallery-img-wrap overflow-hidden will-change-transform" 
                  data-offset={i === 0 ? "40" : "140"}
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-auto object-cover" 
                    style={{ aspectRatio: i === 0 ? '4/5' : '3/4' }}
                    loading="lazy"
                    decoding="async"
                    itemProp="contentUrl"
                  />
                  <figcaption className="museo-label text-white/25 mt-3 text-[10px]" itemProp="caption">{img.label}</figcaption>
                  <meta itemProp="name" content={img.label} />
                  <meta itemProp="description" content={img.alt} />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </figure>

      {/* Stats — z-index above gallery to prevent overlap */}
      {aboutConfig.stats.length > 0 && (
        <aside 
          ref={statsRef} 
          className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 py-24 bg-[#050505]"
          aria-label="Company Statistics"
        >
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
            {aboutConfig.stats.map((stat, i) => (
              <div key={i} className="stat-item" itemScope itemType="https://schema.org/QuantitativeValue">
                <dt className="museo-label text-white/40">{stat.label}</dt>
                <dd className="museo-headline text-white text-4xl md:text-5xl mb-2" itemProp="value">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      )}

      {/* Bottom text */}
      {aboutConfig.bottomText && (
        <article className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 pb-32 bg-[#050505]">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <p 
                className="reveal-text museo-body text-white/50 text-base lg:text-lg"
                itemProp="text"
              >
                {aboutConfig.bottomText}
              </p>
            </div>
          </div>
        </article>
      )}
    </section>
  );
};

export default About;
