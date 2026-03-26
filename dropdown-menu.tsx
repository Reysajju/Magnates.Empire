import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Calendar, Ticket } from 'lucide-react';
import { visitConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  MapPin,
  Clock,
  Calendar,
  Ticket,
};

const Visit = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!visitConfig.headline && visitConfig.infoCards.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const cardElements = cards.querySelectorAll('.info-card');
    cardElements.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out',
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16"
      aria-labelledby="visit-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* Hidden structured data for AEO */}
      <div className="sr-only">
        <h2>Visit Magnates Empire Atelier in Grasse, France</h2>
        <p>Book a private fragrance consultation with our master perfumers. Experience our luxury perfume collection in person at our historic atelier.</p>
        <div itemProp="mainEntity" itemScope itemType="https://schema.org/LocalBusiness">
          <meta itemProp="name" content="Magnates Empire Atelier" />
          <meta itemProp="@id" content="https://magnatesempire.com#atelier" />
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <meta itemProp="streetAddress" content="12 Rue des Parfumeurs" />
            <meta itemProp="addressLocality" content="Grasse" />
            <meta itemProp="postalCode" content="06130" />
            <meta itemProp="addressCountry" content="FR" />
          </div>
          <meta itemProp="telephone" content="+33 4 93 36 44 66" />
          <meta itemProp="email" content="concierge@magnatesempire.com" />
          <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
            <meta itemProp="latitude" content="43.6583" />
            <meta itemProp="longitude" content="6.9244" />
          </div>
        </div>
      </div>

      {/* Section Header */}
      <header className="max-w-7xl mx-auto mb-16">
        <span className="museo-label text-white/50 mb-4 block">{visitConfig.label}</span>
        <h2
          id="visit-heading"
          className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-8"
          dangerouslySetInnerHTML={{ __html: visitConfig.headline }}
          itemProp="headline"
        />
        <p className="museo-body text-white/60 text-lg max-w-2xl" itemProp="description">
          {visitConfig.description}
        </p>
      </header>

      {/* Info Cards Grid */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        role="list"
        aria-label="Contact Information"
      >
        {visitConfig.infoCards.map((card, i) => {
          const IconComponent = iconMap[card.icon];
          return (
            <article 
              key={i} 
              className="info-card p-8 border border-white/10 hover:border-white/20 transition-colors"
              role="listitem"
              itemScope
              itemType="https://schema.org/ContactPoint"
            >
              {IconComponent && (
                <IconComponent 
                  className="w-8 h-8 text-white/50 mb-6" 
                  strokeWidth={1.5} 
                  aria-hidden="true"
                />
              )}
              <h3 className="museo-headline text-white text-xl mb-3" itemProp="contactType">{card.title}</h3>
              <div
                className="museo-body text-white/60 text-sm"
                dangerouslySetInnerHTML={{ __html: card.content }}
                itemProp="availableLanguage"
              />
              {card.title === "Location" && (
                <div className="sr-only" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <meta itemProp="streetAddress" content="12 Rue des Parfumeurs" />
                  <meta itemProp="addressLocality" content="Grasse" />
                  <meta itemProp="postalCode" content="06130" />
                  <meta itemProp="addressCountry" content="FR" />
                </div>
              )}
              {card.title === "Hours" && (
                <div className="sr-only">
                  <meta itemProp="hoursAvailable" content="Tuesday-Saturday 10:00-18:00" />
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* CTA */}
      {visitConfig.ctaText && (
        <div className="max-w-7xl mx-auto mt-16 text-center">
          <button
            data-cursor="hover"
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#050505] museo-label hover:bg-white/90 transition-colors"
            aria-label="Book a private fragrance consultation"
            itemProp="potentialAction"
            itemScope
            itemType="https://schema.org/ReserveAction"
          >
            <span itemProp="name">{visitConfig.ctaText}</span>
            <meta itemProp="target" content="https://magnatesempire.com/booking" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Visit;
