import { Link } from 'react-router-dom'
import oceanImg from '../../assets/logistics-ocean.jpg'
import airImg from '../../assets/logistics-air.jpg'
import roadImg from '../../assets/logistics-road.jpg'
import warehouseImg from '../../assets/logistics-warehouse.jpg'

export default function AboutServicesSection({
  overline = 'OUR SERVICES',
  titleLine1 = 'Connecting Indian Products',
  titleLine2 = 'With Global Markets.',
  description = 'From ocean to air, land to storage — we provide end-to-end logistics solutions that keep your supply chain moving.',
  items,
}) {
  const defaultServices = [
    {
      title: 'Ocean Freight',
      description: 'Reliable container shipping across global trade routes.',
      image: oceanImg,
    },
    {
      title: 'Air Freight',
      description: 'Fast international transportation for time-sensitive cargo.',
      image: airImg,
    },
    {
      title: 'Ground Transport',
      description: 'Efficient, rapid road freight routes connecting ports, warehouses and destinations.',
      image: roadImg,
    },
    {
      title: 'Warehousing',
      description: 'Secure ambient and temperature-controlled distribution solutions.',
      image: warehouseImg,
    },
  ]

  const displayList = items && items.length > 0 ? items : defaultServices

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#f8fafc] border-t border-slate-200/80 font-body relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: Left-aligned bold heading & Right-aligned narrative */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl text-left">
            {/* Overline with accent bar */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#0a3622] font-heading">
                {overline}
              </span>
              <span className="w-10 h-0.5 bg-[#c59b27]" />
            </div>

            {/* Impactful Master Font Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] font-black font-heading text-slate-900 tracking-tight leading-[1.18] uppercase">
              <span className="block sm:whitespace-nowrap">{titleLine1}</span>
              <span className="block sm:whitespace-nowrap">{titleLine2}</span>
            </h2>
          </div>

          {/* Right Narrative Paragraph */}
          <div className="max-w-sm lg:max-w-sm xl:max-w-md text-left lg:pb-1">
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed font-body">
              {description}
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayList.map((item) => {
            const CardContent = (
              <>
                {/* Card Image */}
                <div className="aspect-[16/11] overflow-hidden bg-slate-100 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0a3622] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Card Body - Text Only */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 text-left">
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mb-2 group-hover:text-[#0a3622] transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    {item.link && (
                      <span className="text-slate-400 group-hover:text-[#0a3622] group-hover:translate-x-1 transition-all text-sm ml-2">
                        →
                      </span>
                    )}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed font-body flex-1">
                    {item.description}
                  </p>
                </div>
              </>
            )

            if (item.link) {
              return (
                <Link
                  key={item.title}
                  to={item.link}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col no-underline text-inherit"
                >
                  {CardContent}
                </Link>
              )
            }

            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
              >
                {CardContent}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

