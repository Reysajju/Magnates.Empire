// Site configuration
// Magnates Empire - Luxury Perfume Brand

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface HeroConfig {
  brandLeft: string;
  brandRight: string;
  tagline: string;
  badge: string;
  since: string;
  email: string;
  heroImage: string;
  heroImageAlt: string;
  scrollText: string;
  copyrightText: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutConfig {
  label: string;
  headline: string;
  description: string;
  bottomText: string;
  galleryImages: GalleryImage[];
  stats: StatItem[];
}

export interface Exhibition {
  id: number;
  title: string;
  image: string;
  date: string;
}

export interface ExhibitionsConfig {
  label: string;
  headline: string;
  ctaText: string;
  exhibitions: Exhibition[];
}

export interface Collection {
  id: number;
  title: string;
  year: string;
  description: string;
  image: string;
}

export interface CollectionsConfig {
  label: string;
  headline: string;
  ctaText: string;
  collections: Collection[];
}

export interface TestimonialsConfig {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
}

export interface InfoCard {
  icon: string;
  title: string;
  content: string;
}

export interface VisitConfig {
  label: string;
  headline: string;
  description: string;
  ctaText: string;
  infoCards: InfoCard[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  marqueeText: string;
  brandName: string;
  brandDescription: string;
  socialLinks: SocialLink[];
  quickLinks: FooterLink[];
  quickLinksTitle: string;
  contactTitle: string;
  contactItems: string[];
  bottomLinks: FooterLink[];
}

export const siteConfig: SiteConfig = {
  language: "en",
  title: "Magnates Empire | Luxury Perfume",
  description: "Discover Magnates Empire - an exquisite collection of luxury perfumes crafted with rare ingredients and timeless artistry. Experience the essence of power, sophistication, and elegance.",
};

export const heroConfig: HeroConfig = {
  brandLeft: "Magnates",
  brandRight: "Empire",
  tagline: "The Scent of Sovereignty",
  badge: "Grasse, France",
  since: "Est. 1892",
  email: "concierge@magnatesempire.com",
  heroImage: "/images/hero-bottle.png",
  heroImageAlt: "Magnates Empire Luxury Perfume Bottle with Crown Cap",
  scrollText: "Discover the Collection",
  copyrightText: "© 2024 Magnates Empire",
  navLinks: [
    { label: "Heritage", href: "#about" },
    { label: "Collection", href: "#collections" },
    { label: "Experience", href: "#visit" },
    { label: "Contact", href: "#footer" },
  ],
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com/magnatesempire" },
    { label: "Twitter", href: "https://twitter.com/magnatesempire" },
    { label: "Facebook", href: "https://facebook.com/magnatesempire" },
  ],
};

export const aboutConfig: AboutConfig = {
  label: "Heritage Since 1892",
  headline: "Where Artisan Craftsmanship Meets Royal Elegance",
  description: "For over a century, Magnates Empire has crafted exceptional fragrances in the heart of Grasse, the perfume capital of the world. Our master perfumers source the rarest ingredients—from aged oud wood to golden amber resin—creating scents that embody power, sophistication, and timeless allure. Each bottle is a testament to our unwavering commitment to excellence.",
  bottomText: "Our fragrances are composed of the finest natural ingredients, ethically sourced from around the globe. From the mystical oud forests of Southeast Asia to the sun-kissed vanilla orchids of Madagascar, every note tells a story of luxury and refinement.",
  galleryImages: [
    { src: "/images/gallery-1.jpg", alt: "Our historic atelier in Grasse", label: "The Atelier" },
    { src: "/images/gallery-2.jpg", alt: "Elegant hands holding perfume", label: "The Experience" },
    { src: "/images/gallery-3.jpg", alt: "Premium perfume ingredients", label: "The Ingredients" },
    { src: "/images/gallery-4.jpg", alt: "Luxury bedroom setting", label: "The Lifestyle" },
    { src: "/images/gallery-5.jpg", alt: "Evening event ambiance", label: "The Occasion" },
    { src: "/images/gallery-6.jpg", alt: "Master perfumer at work", label: "The Artisan" },
  ],
  stats: [
    { value: "130+", label: "Years of Heritage" },
    { value: "47", label: "Rare Ingredients" },
    { value: "12", label: "Master Perfumers" },
    { value: "89", label: "Countries" },
  ],
};

export const exhibitionsConfig: ExhibitionsConfig = {
  label: "Fragrance Notes",
  headline: "The Aroma Profile",
  ctaText: "Explore Notes",
  exhibitions: [
    {
      id: 1,
      title: "Top Notes: Saffron & Bergamot",
      image: "/images/gallery-3.jpg",
      date: "The First Impression",
    },
    {
      id: 2,
      title: "Heart Notes: Oud & Rose",
      image: "/images/collection-1.jpg",
      date: "The Soul of the Fragrance",
    },
    {
      id: 3,
      title: "Base Notes: Amber & Vanilla",
      image: "/images/collection-4.jpg",
      date: "The Lasting Memory",
    },
    {
      id: 4,
      title: "Signature Accord: Sandalwood",
      image: "/images/collection-3.jpg",
      date: "The Magnates Touch",
    },
  ],
};

export const collectionsConfig: CollectionsConfig = {
  label: "The Collection",
  headline: "Four Distinct Expressions of Luxury",
  ctaText: "Discover",
  collections: [
    {
      id: 1,
      title: "Imperial Oud",
      year: "2024",
      description: "A majestic blend of aged oud wood, smoked incense, and precious saffron. This commanding fragrance evokes the power of ancient empires and the mystique of the Orient.",
      image: "/images/collection-1.jpg",
    },
    {
      id: 2,
      title: "Amber Noir",
      year: "2023",
      description: "An intoxicating symphony of dark amber, velvety rose, and warm spices. Seductive and mysterious, this scent commands attention in any room.",
      image: "/images/collection-2.jpg",
    },
    {
      id: 3,
      title: "Sandalwood Reserve",
      year: "2022",
      description: "A refined composition of rare Mysore sandalwood, creamy tonka bean, and subtle leather. Timeless sophistication in every drop.",
      image: "/images/collection-3.jpg",
    },
    {
      id: 4,
      title: "Velvet Vanilla",
      year: "2021",
      description: "An elegant interpretation of Madagascar vanilla, enriched with golden honey and white musk. Warm, inviting, and irresistibly cozy.",
      image: "/images/collection-4.jpg",
    },
  ],
};

export const testimonialsConfig: TestimonialsConfig = {
  quote: "Magnates Empire is not merely a perfume—it is an olfactory journey through centuries of luxury and craftsmanship. When I wear Imperial Oud, I feel the weight of history and the promise of eternity in every breath.",
  authorName: "Victoria Ashford",
  authorTitle: "Editor-in-Chief, Luxe Magazine",
  authorImage: "/images/testimonial-author.jpg",
};

export const visitConfig: VisitConfig = {
  label: "Experience",
  headline: "Visit Our Atelier<br />in Grasse",
  description: "Immerse yourself in the world of Magnates Empire. Our private fragrance consultations offer an intimate journey through our collection, guided by our master perfumers. Discover the scent that defines your legacy.",
  ctaText: "Book a Consultation",
  infoCards: [
    {
      icon: "MapPin",
      title: "Location",
      content: "12 Rue des Parfumeurs<br />06130 Grasse, France",
    },
    {
      icon: "Clock",
      title: "Hours",
      content: "Tuesday - Saturday<br />10:00 AM - 6:00 PM",
    },
    {
      icon: "Calendar",
      title: "Appointments",
      content: "Private consultations<br />Available daily",
    },
    {
      icon: "Ticket",
      title: "Exclusive Events",
      content: "Monthly fragrance<br />masterclasses",
    },
  ],
};

export const footerConfig: FooterConfig = {
  marqueeText: "MAGNATES EMPIRE • THE SCENT OF SOVEREIGNTY • CRAFTED IN GRASSE SINCE 1892 •",
  brandName: "Magnates Empire",
  brandDescription: "Luxury perfumes crafted with rare ingredients and timeless artistry. The essence of power, sophistication, and elegance.",
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com/magnatesempire" },
    { label: "Twitter", href: "https://twitter.com/magnatesempire" },
    { label: "Facebook", href: "https://facebook.com/magnatesempire" },
    { label: "Linkedin", href: "https://linkedin.com/company/magnatesempire" },
  ],
  quickLinks: [
    { label: "Heritage", href: "#about" },
    { label: "Collection", href: "#collections" },
    { label: "Experience", href: "#visit" },
    { label: "Press", href: "#" },
    { label: "Careers", href: "#" },
  ],
  quickLinksTitle: "Explore",
  contactTitle: "Contact",
  contactItems: [
    "concierge@magnatesempire.com",
    "+33 4 93 36 44 66",
    "12 Rue des Parfumeurs",
    "06130 Grasse, France",
  ],
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Shipping & Returns", href: "#" },
  ],
};
