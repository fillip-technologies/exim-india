import HeroSection from '../components/hero/HeroSection'
import DiverseRangeSection from '../components/hero/DiverseRangeSection'
import AboutSection from '../components/hero/AboutSection'
import PurposeSection from '../components/hero/PurposeSection'
import AboutServicesSection from '../components/about/AboutServicesSection'
import LogisticsSection from '../components/hero/LogisticsSection'
import LogisticsSplitSection from '../components/hero/LogisticsSplitSection'
import CertificationSection from '../components/certification/CertificationSection'
import TestimonialsSection from '../components/hero/TestimonialsSection'
import InquirySection from '../components/hero/InquirySection'

import cosmeticImg from '../assets/cosmetic-pigments.jpg'
import syntheticImg from '../assets/synthetic-food-colours.jpg'
import pearlImg from '../assets/pearlescent-pigments.jpg'
import naturalImg from '../assets/natural-colours.jpg'

const featuredProducts = [
  {
    title: 'Cosmetic Pigments',
    description: 'Dermatologically safe, high-intensity colorants formulated to stringent international US FDA and EU standards for makeup and luxury beauty cosmetics.',
    image: cosmeticImg,
    link: '/products/cosmetic-colours',
  },
  {
    title: 'Synthetic Food Colours',
    description: 'High-purity primary food dyes, vibrant lake pigments, and custom blends engineered for confectionery, baking, and beverages worldwide.',
    image: syntheticImg,
    link: '/products/synthetic-food-colours',
  },
  {
    title: 'Pearlescent Pigments',
    description: 'Ultra-luminous mica-based effect powders delivering striking multi-angle luster, shimmer, and metallic finishes for beauty applications.',
    image: pearlImg,
    link: '/products/pearl-pigment-powder',
  },
  {
    title: 'Natural Colours',
    description: 'Sustainably sourced botanical extracts, plant-based dyes, and organic carotenoids offering clean-label formulation compliance.',
    image: naturalImg,
    link: '/products/natural-food-colors',
  },
]

export default function Home() {
  return (
    <>
      <HeroSection />
      <DiverseRangeSection />
      <AboutSection />
      <PurposeSection />
      <AboutServicesSection
        overline="INDIA'S TRUSTED COLOUR & PIGMENT MANUFACTURER"
        titleLine1="India's Best Pigment & Colour"
        titleLine2="Manufacturing Company."
        description="Pioneering research-backed formulation excellence — manufacturing certified cosmetic pigments, food-grade synthetic colours, organic botanical extracts, and high-purity pearlescent powders exported to 50+ countries worldwide."
        items={featuredProducts}
      />
      <LogisticsSection />
      <LogisticsSplitSection />
      {/* <CertificationSection />  */}
      <TestimonialsSection />
      <InquirySection />
    </>
  )
}

