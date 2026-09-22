import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Certifications from './pages/Certifications'
import Contact from './pages/Contact'

import SyntheticFoodColours from './pages/SyntheticFoodColours'
import SyntheticFoodColorDetail from './pages/SyntheticFoodColorDetail'
import BlendedColours from './pages/BlendedColours'
import BlendedColorDetail from './pages/BlendedColorDetail'
import CosmeticColours from './pages/CosmeticColours'
import CosmeticColorDetail from './pages/CosmeticColorDetail'
import LakeColours from './pages/LakeColours'
import LakeColorDetail from './pages/LakeColorDetail'
import LiquidFlavours from './pages/LiquidFlavours'
import LiquidFlavourDetail from './pages/LiquidFlavourDetail'
import PharmaceuticalColours from './pages/PharmaceuticalColours'
import PharmaceuticalColorDetail from './pages/PharmaceuticalColorDetail'
import EmulsionFlavours from './pages/EmulsionFlavours'
import EmulsionFlavourDetail from './pages/EmulsionFlavourDetail'
import DiscoDustPowder from './pages/DiscoDustPowder'
import DiscoDustDetail from './pages/DiscoDustDetail'
import FoodAdditives from './pages/FoodAdditives'
import FoodAdditiveDetail from './pages/FoodAdditiveDetail'
import MangoPulp from './pages/MangoPulp'
import MangoPulpDetail from './pages/MangoPulpDetail'
import Chemicals from './pages/Chemicals'
import TitaniumDioxide from './pages/TitaniumDioxide'
import TitaniumDioxideDetail from './pages/TitaniumDioxideDetail'
import NaturalFoodColors from './pages/NaturalFoodColors'
import NaturalFoodColorDetail from './pages/NaturalFoodColorDetail'
import PearlPigmentPowder from './pages/PearlPigmentPowder'
import PearlPigmentDetail from './pages/PearlPigmentDetail'
import EdibleLustre from './pages/EdibleLustre'
import EdibleLustreDetail from './pages/EdibleLustreDetail'
import FluorescentColours from './pages/FluorescentColours'
import NaturalFruitPowder from './pages/NaturalFruitPowder'
import FruitFragrance from './pages/FruitFragrance'
import PowderFlavours from './pages/PowderFlavours'

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
