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

export default function Home() {
  return (
    <>
      <HeroSection />
      <DiverseRangeSection />
      <AboutSection />
      <PurposeSection />
      <AboutServicesSection
        overline="GLOBAL MULTIMODAL LOGISTICS"
        titleLine1="Connecting Indian Products"
        titleLine2="To Every Corner of the World."
        description="Comprehensive ocean, air, and road freight infrastructure supported by temperature-controlled warehousing to keep your international cargo moving seamlessly."
      />
      <LogisticsSection />
      <LogisticsSplitSection />
      {/* <CertificationSection />  */}
      <TestimonialsSection />
      <InquirySection />
    </>
  )
}
