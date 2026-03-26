import { ArrowUpRight, Instagram, Twitter, Facebook, Linkedin, Youtube, Globe } from 'lucide-react';
import { footerConfig } from '../config';

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Globe,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  if (!footerConfig.brandName) return null;

  return (
    <footer 
      id="footer-section"
      className="relative w-full bg-[#8c8c91] overflow-hidden"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      {/* Hidden structured data for AEO */}
      <div className="sr-only">
        <h2>Contact Magnates Empire - Luxury Perfume House</h2>
        <p>Get in touch with our concierge team for inquiries about our luxury perfume collection, private consultations, or press opportunities.</p>
      </div>

      {/* Marquee Section */}
      {footerConfig.marqueeText && (
        <div className="py-20 overflow-hidden border-t border-white/10" aria-hidden="true">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="museo-headline text-white/10 text-[15vw] font-semibold tracking-tight mx-8"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
              >
                {footerConfig.marqueeText}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer Content */}
      <div className="px-8 lg:px-16 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2" itemScope itemType="https://schema.org/Organization">
              <h3 className="museo-headline text-white text-2xl mb-4" itemProp="name">
                {footerConfig.brandName}
              </h3>
              <p className="museo-body text-white/60 text-sm max-w-sm mb-6" itemProp="description">
                {footerConfig.brandDescription}
              </p>
              <div className="flex items-center gap-4" role="list" aria-label="Social media links">
                {footerConfig.socialLinks.map((link, i) => {
                  const IconComponent = socialIconMap[link.label] || Globe;
                  return (
                    <a
                      key={i}
                      href={link.href}
                      data-cursor="hover"
                      className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow ${footerConfig.brandName} on ${link.label}`}
                      role="listitem"
                      itemProp="sameAs"
                    >
                      <IconComponent className="w-4 h-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            {footerConfig.quickLinks.length > 0 && (
              <nav aria-label="Footer navigation">
                <h4 className="museo-label text-white/50 mb-6">{footerConfig.quickLinksTitle}</h4>
                <ul className="space-y-3">
                  {footerConfig.quickLinks.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        data-cursor="hover"
                        className="group museo-body text-white/70 text-sm hover:text-white transition-colors flex items-center gap-2"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Contact */}
            {footerConfig.contactItems.length > 0 && (
              <address className="not-italic" itemScope itemType="https://schema.org/ContactPoint">
                <h4 className="museo-label text-white/50 mb-6">{footerConfig.contactTitle}</h4>
                <ul className="space-y-3">
                  {footerConfig.contactItems.map((item, i) => (
                    <li
                      key={i}
                      className="museo-body text-white/70 text-sm"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ul>
                <meta itemProp="contactType" content="customer service" />
                <meta itemProp="availableLanguage" content="English, French" />
              </address>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
            <p className="museo-body text-white/40 text-xs mb-4 md:mb-0">
              <time dateTime={String(currentYear)}>{currentYear}</time> {footerConfig.brandName}. All rights reserved.
            </p>
            {footerConfig.bottomLinks.length > 0 && (
              <nav className="flex items-center gap-6" aria-label="Legal links">
                {footerConfig.bottomLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    data-cursor="hover"
                    className="museo-body text-white/40 text-xs hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
