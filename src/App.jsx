import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Certifications from './pages/Certifications'
import Contact from './pages/Contact'

// Product Pages (wrapped inside src/pages/product/)
import Products from './pages/product/Products'
import SyntheticFoodColours from './pages/product/SyntheticFoodColours'
import SyntheticFoodColorDetail from './pages/product/SyntheticFoodColorDetail'
import BlendedColours from './pages/product/BlendedColours'
import BlendedColorDetail from './pages/product/BlendedColorDetail'
import CosmeticColours from './pages/product/CosmeticColours'
import CosmeticColorDetail from './pages/product/CosmeticColorDetail'
import LakeColours from './pages/product/LakeColours'
import LakeColorDetail from './pages/product/LakeColorDetail'
import LiquidFlavours from './pages/product/LiquidFlavours'
import LiquidFlavourDetail from './pages/product/LiquidFlavourDetail'
import PharmaceuticalColours from './pages/product/PharmaceuticalColours'
import PharmaceuticalColorDetail from './pages/product/PharmaceuticalColorDetail'
import EmulsionFlavours from './pages/product/EmulsionFlavours'
import EmulsionFlavourDetail from './pages/product/EmulsionFlavourDetail'
import DiscoDustPowder from './pages/product/DiscoDustPowder'
import DiscoDustDetail from './pages/product/DiscoDustDetail'
import FoodAdditives from './pages/product/FoodAdditives'
import FoodAdditiveDetail from './pages/product/FoodAdditiveDetail'
import MangoPulp from './pages/product/MangoPulp'
import MangoPulpDetail from './pages/product/MangoPulpDetail'
import Chemicals from './pages/product/Chemicals'
import TitaniumDioxide from './pages/product/TitaniumDioxide'
import TitaniumDioxideDetail from './pages/product/TitaniumDioxideDetail'
import NaturalFoodColors from './pages/product/NaturalFoodColors'
import NaturalFoodColorDetail from './pages/product/NaturalFoodColorDetail'
import PearlPigmentPowder from './pages/product/PearlPigmentPowder'
import PearlPigmentDetail from './pages/product/PearlPigmentDetail'
import EdibleLustre from './pages/product/EdibleLustre'
import EdibleLustreDetail from './pages/product/EdibleLustreDetail'
import FluorescentColours from './pages/product/FluorescentColours'
import NaturalFruitPowder from './pages/product/NaturalFruitPowder'
import FruitFragrance from './pages/product/FruitFragrance'
import PowderFlavours from './pages/product/PowderFlavours'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/synthetic-food-colours" element={<SyntheticFoodColours />} />
        <Route path="/products/synthetic-food-colours/:id" element={<SyntheticFoodColorDetail />} />
        <Route path="/products/blended-colours" element={<BlendedColours />} />
        <Route path="/products/blended-colours/:id" element={<BlendedColorDetail />} />
        <Route path="/products/cosmetic-colours" element={<CosmeticColours />} />
        <Route path="/products/cosmetic-colours/:id" element={<CosmeticColorDetail />} />
        <Route path="/products/lake-colours" element={<LakeColours />} />
        <Route path="/products/lake-colours/:id" element={<LakeColorDetail />} />
        <Route path="/products/liquid-flavours" element={<LiquidFlavours />} />
        <Route path="/products/liquid-flavours/:id" element={<LiquidFlavourDetail />} />
        <Route path="/products/pharmaceutical-colours" element={<PharmaceuticalColours />} />
        <Route path="/products/pharmaceutical-colours/:id" element={<PharmaceuticalColorDetail />} />
        <Route path="/products/emulsion-flavours" element={<EmulsionFlavours />} />
        <Route path="/products/emulsion-flavours/:id" element={<EmulsionFlavourDetail />} />
        <Route path="/products/disco-dust-powder" element={<DiscoDustPowder />} />
        <Route path="/products/disco-dust-powder/:id" element={<DiscoDustDetail />} />
        <Route path="/products/food-additives" element={<FoodAdditives />} />
        <Route path="/products/food-additives/:id" element={<FoodAdditiveDetail />} />
        <Route path="/products/mango-pulp" element={<MangoPulp />} />
        <Route path="/products/mango-pulp/:id" element={<MangoPulpDetail />} />
        <Route path="/products/chemicals" element={<Chemicals />} />
        <Route path="/products/titanium-dioxide" element={<TitaniumDioxide />} />
        <Route path="/products/titanium-dioxide/:id" element={<TitaniumDioxideDetail />} />
        <Route path="/products/natural-food-colors" element={<NaturalFoodColors />} />
        <Route path="/products/natural-food-colors/:id" element={<NaturalFoodColorDetail />} />
        <Route path="/products/pearl-pigment-powder" element={<PearlPigmentPowder />} />
        <Route path="/products/pearl-pigment-powder/:id" element={<PearlPigmentDetail />} />
        <Route path="/products/edible-lustre" element={<EdibleLustre />} />
        <Route path="/products/edible-lustre/:id" element={<EdibleLustreDetail />} />
        <Route path="/products/fluorescent-colours" element={<FluorescentColours />} />
        <Route path="/products/natural-fruit-powder" element={<NaturalFruitPowder />} />
        <Route path="/products/fruit-fragrance" element={<FruitFragrance />} />
        <Route path="/products/powder-flavours" element={<PowderFlavours />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/quality" element={<About />} />
        <Route path="/global-network" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
