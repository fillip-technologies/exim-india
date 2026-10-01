import productHeroImg from '../../assets/product-hero.png'

export default function ProductHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fedc02] h-[340px] sm:h-[380px] lg:h-[420px] flex items-center border-b border-amber-300/60">
      {/* Background Banner Graphic: Pure Visual Image Banner */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={productHeroImg}
          alt="Exim India Product Formulations"
          className="w-full h-full object-cover object-[center_78%]"
        />
      </div>
    </section>
  )
}
