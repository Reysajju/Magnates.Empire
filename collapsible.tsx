import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collectionsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Collections = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!collectionsConfig.headline && collectionsConfig.collections.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stack = stackRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || !stack || cards.length === 0) return;

    // Header reveal
    const headerEls = header.querySelectorAll('.reveal-header');
    headerEls.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 30 });
      const trigger = ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Stacking cards: each card pins and the NEXT card slides up over it
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return; // last card doesn't need pinning

      // Pin this card in place while the next card scrolls up to cover it
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        // Pin until the next card has fully covered this one
        endTrigger: cards[i + 1],
        end: 'top top',
        pin: true,
        pinSpacing: false,
      });
      triggersRef.current.push(trigger);

      // Slight scale-down + dim as the next card covers this one
      const dimTrigger = ScrollTrigger.create({
        trigger: cards[i + 1],
        start: 'top bottom',
        end: 'top top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(card, {
            scale: 1 - p * 0.05,
            filter: `brightness(${1 - p * 0.3})`,
          });
        },
      });
      triggersRef.current.push(dimTrigger);
    });

    // Text reveal inside each card
    cards.forEach((card) => {
      if (!card) return;
      const textEls = card.querySelectorAll('.coll-text-el');
      textEls.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 30 });
        const trigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          onEnter: () => {
            gsap.to(el, {
              opacity: 1, y: 0, duration: 0.7,
              delay: 0.15 + i * 0.08, ease: 'power3.out',
            });
          },
        });
        triggersRef.current.push(trigger);
      });
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative w-full bg-[#f0f0f0]"
      aria-labelledby="collections-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Hidden SEO content for AEO */}
      <div className="sr-only">
        <h2>Magnates Empire Perfume Collection - Imperial Oud, Amber Noir, Sandalwood Reserve, Velvet Vanilla</h2>
        <p>Discover our luxury fragrance collection crafted with rare ingredients in Grasse, France. Each scent tells a story of power, sophistication, and elegance.</p>
        <meta itemProp="itemListOrder" content="https://schema.org/ItemListUnordered" />
        <meta itemProp="numberOfItems" content={String(collectionsConfig.collections.length)} />
      </div>

      {/* Section Header */}
      <header ref={headerRef} className="max-w-7xl mx-auto pt-32 pb-8 px-8 lg:px-16">
        <span className="reveal-header museo-label text-[#1a1a1a]/40 mb-4 block">
          {collectionsConfig.label}
        </span>
        <h2 
          id="collections-heading"
          className="reveal-header museo-headline text-[#1a1a1a] text-4xl md:text-5xl lg:text-7xl"
          itemProp="name"
        >
          {collectionsConfig.headline}
        </h2>
      </header>

      {/* Stacking Cards Container */}
      <div ref={stackRef} className="relative">
        {collectionsConfig.collections.map((item, index) => (
          <article
            key={item.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="relative w-full min-h-screen bg-[#f0f0f0] will-change-transform"
            style={{ zIndex: index + 1 }}
            itemScope
            itemType="https://schema.org/Product"
            itemProp="itemListElement"
            aria-label={item.title}
          >
            <meta itemProp="position" content={String(index + 1)} />
            <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16 lg:py-24 flex items-center min-h-screen">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full ${
                  index % 2 !== 0 ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Image — 7 cols */}
                <figure
                  className={`lg:col-span-7 overflow-hidden ${
                    index % 2 !== 0 ? 'lg:[direction:ltr]' : ''
                  }`}
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <img
                    src={item.image}
                    alt={`${item.title} - Luxury Perfume by Magnates Empire`}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: '16/10' }}
                    loading="lazy"
                    decoding="async"
                    itemProp="image"
                  />
                  <meta itemProp="name" content={item.title} />
                  <meta itemProp="description" content={item.description} />
                </figure>

                {/* Text — 5 cols */}
                <div
                  className={`lg:col-span-5 ${
                    index % 2 !== 0 ? 'lg:[direction:ltr]' : ''
                  }`}
                >
                  <time 
                    className="coll-text-el museo-label text-[#1a1a1a]/30 mb-3 block" 
                    dateTime={item.year}
                    itemProp="releaseDate"
                  >
                    {item.year}
                  </time>
                  <h3 
                    className="coll-text-el museo-headline text-[#1a1a1a] text-2xl md:text-3xl lg:text-5xl mb-4"
                    itemProp="name"
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="coll-text-el museo-body text-[#1a1a1a]/55 mb-8 max-w-md text-sm lg:text-base"
                    itemProp="description"
                  >
                    {item.description}
                  </p>
                  <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
                    <meta itemProp="name" content="Magnates Empire" />
                  </div>
                  <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                    <meta itemProp="priceCurrency" content="EUR" />
                    <meta itemProp="seller" content="Magnates Empire" />
                  </div>
                  {collectionsConfig.ctaText && (
                    <button
                      data-cursor="hover"
                      className="coll-text-el inline-flex items-center gap-2 museo-label text-[#1a1a1a] border border-[#1a1a1a]/20 px-6 py-3 hover:bg-[#1a1a1a] hover:text-[#f0f0f0] transition-all duration-300"
                      aria-label={`Discover ${item.title} fragrance`}
                    >
                      {collectionsConfig.ctaText}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path
                          d="M1 7h12m0 0L8 2m5 5L8 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Collections;
