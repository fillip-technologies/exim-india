import CertificationsHero from '../components/certification/CertificationsHero'
import CertificationSection from '../components/certification/CertificationSection'

export default function Certifications() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Dedicated Certifications Laboratory Hero Banner */}
      <CertificationsHero />

      {/* 2. Official Certificate Cards Grid */}
      <CertificationSection />
    </div>
  )
}
