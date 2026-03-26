import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import { testimonialsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!testimonialsConfig.quote) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const elements = content.querySelectorAll('.reveal-item');
    elements.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 30 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
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
      ref={sectionRef}
      id="testimonials"
      className="relative w-full bg-[#8c8c91] py-32 px-8 lg:px-16"
      aria-label="Customer Testimonials"
      itemScope
      itemType="https://schema.org/Review"
    >
      {/* Hidden structured data for AEO */}
      <div className="sr-only">
        <meta itemProp="reviewRating" content="5" />
        <meta itemProp="bestRating" content="5" />
        <meta itemProp="worstRating" content="1" />
      </div>

      <div ref={contentRef} className="max-w-5xl mx-auto text-center">
        {/* Quote Icon */}
        <div className="reveal-item flex justify-center mb-12">
          <Quote className="w-16 h-16 text-white/30" strokeWidth={1} aria-hidden="true" />
        </div>

        {/* Quote Text */}
        <blockquote 
          className="reveal-item museo-headline text-white text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-12"
          itemProp="reviewBody"
        >
          "{testimonialsConfig.quote}"
        </blockquote>

        {/* Author */}
        <div 
          className="reveal-item flex flex-col md:flex-row items-center justify-center gap-6"
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
        >
          {testimonialsConfig.authorImage && (
            <figure className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
              <img
                src={testimonialsConfig.authorImage}
                alt={`${testimonialsConfig.authorName}, ${testimonialsConfig.authorTitle}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                itemProp="image"
              />
            </figure>
          )}
          <div className="text-center md:text-left">
            <p className="museo-headline text-white text-lg" itemProp="name">{testimonialsConfig.authorName}</p>
            <p className="museo-label text-white/50" itemProp="jobTitle">
              {testimonialsConfig.authorTitle}
            </p>
          </div>
        </div>

        {/* Review Publisher */}
        <div className="sr-only" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="Luxe Magazine" />
        </div>

        {/* Decorative Line */}
        <div className="reveal-item mt-24 flex items-center justify-center">
          <div className="w-24 h-px bg-white/20" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
