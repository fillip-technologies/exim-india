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
