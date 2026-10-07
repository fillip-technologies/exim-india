import AboutHeroSection from '../components/about/AboutHeroSection'
import AboutStorySection from '../components/about/AboutStorySection'
import WhyEximSection from '../components/about/WhyEximSection'
import AboutValuesSection from '../components/about/AboutValuesSection'
import GlobalReachSection from '../components/about/GlobalReachSection'
import InquirySection from '../components/hero/InquirySection'

export default function About() {
  return (
    <>
      {/* 1. Hero Port Banner Section */}
      <AboutHeroSection />

      {/* 2. Our Story: Connecting India to Global Opportunities */}
      <AboutStorySection />

      {/* 3. Why Exim India - 6 Strategic Core Pillars (User Reference UI) */}
      <WhyEximSection />

      {/* 4. Core Values & Quality Assurance Pillars */}
      <AboutValuesSection />

      {/* 5. Global Reach & Destinations Map */}
      <GlobalReachSection />

      {/* 6. Export Inquiry Form */}
      <InquirySection />
    </>
  )
}
