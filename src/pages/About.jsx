import AboutHeroSection from '../components/about/AboutHeroSection'
import AboutStorySection from '../components/about/AboutStorySection'
import AboutServicesSection from '../components/about/AboutServicesSection'

export default function About() {
  return (
    <>
      {/* 1. Hero Port Banner Section */}
      <AboutHeroSection />

      {/* 2. Our Story: Connecting India to Global Opportunities */}
      <AboutStorySection />

      {/* 3. Logistics Built Around Your Business */}
      <AboutServicesSection />
    </>
  )
}
