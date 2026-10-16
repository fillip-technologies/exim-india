export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { 
    name: 'Products', 
    path: '/products',
    // The category list is loaded from the API (GET /categories?nav=1)
    hasCategoryMenu: true,
  },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Contact Us', path: '/contact' },
]

export const CONTACT_INFO = {
  phone: '+91 79775 23176',
  mobile: '+91 98923 64600',
  phones: ['+91 79775 23176', '+91 98923 64600'],
  email: 'info@eximindiacorporation.com',
  secondaryEmail: 'eximindiacorp@gmail.com',
  emails: ['info@eximindiacorporation.com', 'eximindiacorp@gmail.com'],
  whatsapp: '917977523176',
  secondaryWhatsapp: '919892364600',
  address: 'San Mamede Cottage, Flat No. 1, 1st Floor, Cross Road No. 4, I. C. Colony, Borivali West, Mumbai - 400103, Maharashtra, India',
  warehouseAddress: 'Shop no B-13, Ground Floor, New Heritage CHS Ltd, Kandarpada, Dahisar West, Mumbai - 400068, Maharashtra, India',
  certifications: 'ISO 9001:2015 • FSSAI • HALAL • KOSHER • GMP',
  tagline: 'INDIAN PRODUCTS. GLOBAL OPPORTUNITIES.',
}

