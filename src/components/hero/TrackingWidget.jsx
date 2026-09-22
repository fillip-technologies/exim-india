import { useState } from 'react'
import Button from '../common/Button'

export default function TrackingWidget() {
  const [activeTab, setActiveTab] = useState('track')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackResult, setTrackResult] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Quote form state
  const [quoteData, setQuoteData] = useState({
    origin: 'Nhava Sheva (INNSA)',
    destination: 'Rotterdam (NLRTM)',
    mode: 'Ocean Freight (FCL)',
    weight: '15000',
  })
  const [quoteCalculated, setQuoteCalculated] = useState(false)

  const handleTrack = (e) => {
    e.preventDefault()
    if (!trackingNumber.trim()) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setTrackResult({
        number: trackingNumber,
        status: 'In Transit - Customs Cleared',
        vessel: 'MSC GULSUN / Voyage 2408W',
        portOfLoading: 'Nhava Sheva (JNPT), India',
        portOfDischarge: 'Rotterdam Gateway, Netherlands',
        eta: 'Sept 28, 2026',
      })
    }, 600)
  }

  const handleQuote = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setQuoteCalculated(true)
    }, 600)
  }

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0 rounded-3xl glass-panel p-5 sm:p-7 shadow-2xl border border-white/20 relative overflow-hidden backdrop-blur-2xl">
      {/* Background ambient lighting */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-900/70 rounded-full border border-white/10 mb-6">
        <button
          type="button"
          onClick={() => {
            setActiveTab('track')
            setTrackResult(null)
          }}
          className={`flex-1 py-2.5 px-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
            activeTab === 'track'
              ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Track Shipment
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('quote')
            setQuoteCalculated(false)
          }}
          className={`flex-1 py-2.5 px-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
            activeTab === 'quote'
              ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Instant Freight Quote
        </button>
      </div>

      {/* Tab 1: Tracking */}
      {activeTab === 'track' && (
        <form onSubmit={handleTrack} className="space-y-4">
          <div>
            <label htmlFor="tracking-input" className="block text-xs font-medium text-slate-300 mb-1.5">
              Enter Container No, Bill of Lading (B/L), or Airway Bill (AWB)
            </label>
            <div className="relative">
              <input
                id="tracking-input"
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. EXIM98240182 or MSCU1234567"
                required
                className="w-full rounded-2xl bg-slate-950/80 border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              />
              <div className="absolute right-3 top-2.5 text-xs text-slate-500 hidden sm:block">
                All Major Carriers
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live Port API Sync
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6"
            >
              {isSubmitting ? 'Locating Cargo...' : 'Track Consignment'}
            </Button>
          </div>

          {/* Simulated Tracking Result */}
          {trackResult && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-xs space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Consignment:</span>
                <span className="font-semibold text-white uppercase">{trackResult.number}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {trackResult.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Routing:</span>
                <span className="text-slate-200">{trackResult.portOfLoading} &rarr; {trackResult.portOfDischarge}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Carrier / ETA:</span>
                <span className="text-amber-400 font-medium">{trackResult.vessel} ({trackResult.eta})</span>
              </div>
            </div>
          )}
        </form>
      )}

      {/* Tab 2: Quote */}
      {activeTab === 'quote' && (
        <form onSubmit={handleQuote} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="origin-port" className="block text-xs font-medium text-slate-300 mb-1">
                Port of Loading (India)
              </label>
              <select
                id="origin-port"
                value={quoteData.origin}
                onChange={(e) => setQuoteData({ ...quoteData, origin: e.target.value })}
                className="w-full rounded-xl bg-slate-950/80 border border-white/15 px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
              >
                <option value="Nhava Sheva (INNSA)">Nhava Sheva JNPT (INNSA)</option>
                <option value="Mundra Port (INMUN)">Mundra Port (INMUN)</option>
                <option value="Chennai Port (INMAA)">Chennai Port (INMAA)</option>
                <option value="Kolkata Port (INCCU)">Kolkata Port (INCCU)</option>
                <option value="Delhi ICD Tughlakabad">Delhi ICD Tughlakabad</option>
              </select>
            </div>

            <div>
              <label htmlFor="dest-port" className="block text-xs font-medium text-slate-300 mb-1">
                Destination Port (Global)
              </label>
              <select
                id="dest-port"
                value={quoteData.destination}
                onChange={(e) => setQuoteData({ ...quoteData, destination: e.target.value })}
                className="w-full rounded-xl bg-slate-950/80 border border-white/15 px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
              >
                <option value="Rotterdam (NLRTM)">Rotterdam, Netherlands</option>
                <option value="Hamburg (DEHAM)">Hamburg, Germany</option>
                <option value="Jebel Ali (AEJEA)">Dubai / Jebel Ali, UAE</option>
                <option value="Singapore (SGSIN)">Port of Singapore</option>
                <option value="New York (USNYC)">New York / New Jersey, USA</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="freight-mode" className="block text-xs font-medium text-slate-300 mb-1">
                Transport Mode
              </label>
              <select
                id="freight-mode"
                value={quoteData.mode}
                onChange={(e) => setQuoteData({ ...quoteData, mode: e.target.value })}
                className="w-full rounded-xl bg-slate-950/80 border border-white/15 px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
              >
                <option value="Ocean Freight (FCL 20ft)">Ocean FCL (20ft Standard)</option>
                <option value="Ocean Freight (FCL 40ft HC)">Ocean FCL (40ft High Cube)</option>
                <option value="Ocean Freight (LCL)">Ocean LCL (Consolidated)</option>
                <option value="Air Cargo Priority">Air Cargo Priority (Expedited)</option>
              </select>
            </div>

            <div>
              <label htmlFor="cargo-weight" className="block text-xs font-medium text-slate-300 mb-1">
                Estimated Gross Weight (kg)
              </label>
              <input
                id="cargo-weight"
                type="number"
                value={quoteData.weight}
                onChange={(e) => setQuoteData({ ...quoteData, weight: e.target.value })}
                className="w-full rounded-xl bg-slate-950/80 border border-white/15 px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                placeholder="15000"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Calculating Competitive Tariffs...' : 'Calculate Indicative Freight Rate'}
            </Button>
          </div>

          {quoteCalculated && (
            <div className="mt-3 p-3.5 rounded-2xl bg-slate-900/90 border border-orange-500/30 text-xs space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between text-slate-300 font-medium">
                <span>Indicative Ocean Tariff:</span>
                <span className="text-orange-400 font-bold text-sm">$1,450 - $1,680 / Cont.</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Includes standard ocean freight &amp; Indian port handling. Dedicated CHA customs clearance available upon booking.
              </p>
            </div>
          )}
        </form>
      )}
    </div>
  )
}
