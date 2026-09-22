import HeroSection from '../components/hero/HeroSection'
import DiverseRangeSection from '../components/hero/DiverseRangeSection'
import AboutSection from '../components/hero/AboutSection'
import PurposeSection from '../components/hero/PurposeSection'
import LogisticsSection from '../components/hero/LogisticsSection'
import LogisticsSplitSection from '../components/hero/LogisticsSplitSection'
import CertificationSection from '../components/certification/CertificationSection'
import InquirySection from '../components/hero/InquirySection'

export default function Home() {
  return (
    <>

      <HeroSection />
      <DiverseRangeSection />
      <AboutSection />
      <PurposeSection />
      <LogisticsSection />
      <LogisticsSplitSection />
      {/* <CertificationSection />  */}
      <InquirySection />
    </>
  )
}
