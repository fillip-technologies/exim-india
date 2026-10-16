import HeroSection from '../components/hero/HeroSection'
import DiverseRangeSection from '../components/hero/DiverseRangeSection'
import AboutSection from '../components/hero/AboutSection'
import ProductAccordionSection from '../components/hero/ProductAccordionSection'
import PurposeSection from '../components/hero/PurposeSection'
import AboutServicesSection from '../components/about/AboutServicesSection'
import LogisticsSection from '../components/hero/LogisticsSection'
import LogisticsSplitSection from '../components/hero/LogisticsSplitSection'
import CertificationSection from '../components/certification/CertificationSection'
import TestimonialsSection from '../components/hero/TestimonialsSection'
import InquirySection from '../components/hero/InquirySection'

import { useCategories } from '../api/useCatalog'

// How many categories to highlight in the "featured" band
const FEATURED_COUNT = 4

export default function Home() {
  const { categories } = useCategories()

  // Highlight the first categories that have an image; everything comes from the API
  const featuredProducts = categories
    .filter((c) => c.image)
    .slice(0, FEATURED_COUNT)
    .map((c) => ({
      title: c.name,
      description: c.description,
      image: c.image,
      link: c.path || `/products/${c.slug}`,
    }))

  return (
    <>
      <HeroSection />
      <DiverseRangeSection />
      <AboutSection />
      <ProductAccordionSection />
      <PurposeSection />
      {featuredProducts.length > 0 && (
      <AboutServicesSection
        overline="INDIA'S TRUSTED COLOUR & PIGMENT MANUFACTURER"
        titleLine1="India's Best Pigment & Colour"
        titleLine2="Manufacturing Company."
        description="Pioneering research-backed formulation excellence — manufacturing certified cosmetic pigments, food-grade synthetic colours, pharmaceutical grade colours, and pure botanical extracts exported to 50+ countries worldwide."
        items={featuredProducts}
      />
      )}
      <LogisticsSection />
      <LogisticsSplitSection />
      {/* <CertificationSection />  */}
      <TestimonialsSection />
      <InquirySection />
    </>
  )
}

