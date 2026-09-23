import AboutHeroSection from '../components/about/AboutHeroSection'
import AboutStorySection from '../components/about/AboutStorySection'
import AboutValuesSection from '../components/about/AboutValuesSection'
import AboutServicesSection from '../components/about/AboutServicesSection'
import InquirySection from '../components/hero/InquirySection'

export default function About() {
  return (
    <>
      {/* 1. Hero Port Banner Section */}
      <AboutHeroSection />

      {/* 2. Our Story: Connecting India to Global Opportunities */}
      <AboutStorySection />

      {/* 3. Core Values & Quality Assurance Pillars */}
      <AboutValuesSection />

      {/* 4. Logistics Built Around Your Business */}
      <AboutServicesSection />

      {/* 5. Export Inquiry Form */}
      <InquirySection />
    </>
  )
}
