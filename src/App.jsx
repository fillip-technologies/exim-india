import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Certifications from './pages/Certifications'
import Contact from './pages/Contact'
import LoginPage from './login/LoginPage'
import ProtectedRoute from './components/common/ProtectedRoute'
import DashboardLayout from './dashboard/DashboardLayout'
import DashboardOverview from './dashboard/pages/DashboardOverview'
import ContactsPage from './dashboard/pages/ContactsPage'
import ContactDetailPage from './dashboard/pages/ContactDetailPage'
import TestimonialsPage from './dashboard/pages/TestimonialsPage'
import CategoriesPage from './dashboard/pages/CategoriesPage'
import OrdersPage from './dashboard/pages/OrdersPage'
import OrderDetailPage from './dashboard/pages/OrderDetailPage'
import {
  ProductListingPage,
  ProductAddPage,
  ProductDetailPage,
} from './dashboard/products'

// Product Pages (Dynamic Universal Catalog)
import Products from './pages/product/Products'
import MasterProductPage from './pages/product/MasterProductPage'
import MasterProductDetailPage from './pages/product/MasterProductDetailPage'

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
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/products/:category" element={<MasterProductPage />} />
        <Route path="/products/:category/:id" element={<MasterProductDetailPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/quality" element={<About />} />
        <Route path="/global-network" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Protected Admin Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="contacts/:id" element={<ContactDetailPage />} />
            {/* Orders Dashboard Routes */}
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderDetailPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            {/* Products Dashboard Routes */}
            <Route path="products" element={<ProductListingPage />} />
            <Route path="products/new" element={<ProductAddPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="products/:id/edit" element={<ProductAddPage isEdit={true} />} />
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
