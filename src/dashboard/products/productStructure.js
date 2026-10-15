/**
 * src/dashboard/products/productStructure.js
 * ─────────────────────────────────────────────────────────────
 * Master Data Definitions, Schemas, Validation and Frontend
 * LocalStorage Store for Exim India Product Management.
 */

import tartrazineImg from '../../assets/img/synthesis-food-color/high-quality-Tartrazine.jpg'
import sunsetYellowImg from '../../assets/img/synthesis-food-color/Sunset-Yellow-FCF-aluminum-lake.jpg'
import alluraRedImg from '../../assets/img/synthesis-food-color/Allura-Red-colour.jpg'
import brilliantBlueImg from '../../assets/img/synthesis-food-color/Brilliant-Blue.jpg'
import ponceauImg from '../../assets/img/synthesis-food-color/High-quality-food-color-Ponceau.jpg'
import carmoisineImg from '../../assets/img/synthesis-food-color/Food-Color-Carmoisine.jpg'
import titaniumImg from '../../assets/img/chemicals.png'
import diethanolamineImg from '../../assets/chemicals/dietalhone.png'
import methyldiethanolamineImg from '../../assets/chemicals/methyl.png'
import redLeadImg from '../../assets/chemicals/red-lead.png'

// ── 1. Taxonomy & Dropdown Constants ──────────────────────────────
export const PRODUCT_CATEGORIES = [
  { id: 'synthetic-food-colours', label: 'Synthetic Food Colours', icon: '🎨' },
  { id: 'bakery-colors', label: 'Bakery Colours & Flavours', icon: '🧁' },
  { id: 'blended-colours', label: 'Blended Food Colours', icon: '🌈' },
  { id: 'lake-colours', label: 'Aluminum Lake Pigments', icon: '💎' },
  { id: 'cosmetic-colours', label: 'Cosmetic Grade Colours', icon: '✨' },
  { id: 'pharmaceutical-colours', label: 'Pharmaceutical D&C Colours', icon: '💊' },
  { id: 'liquid-flavours', label: 'Liquid Food Flavours', icon: '💧' },
  { id: 'emulsion-flavours', label: 'Emulsion Flavours', icon: '🧪' },
  { id: 'food-additives', label: 'Food Additives & Preservatives', icon: '🌾' },
  { id: 'chemicals', label: 'Chemicals & Titanium Dioxide', icon: '⚗️' },
  { id: 'natural-food-colors', label: 'Natural Food Colours', icon: '🌿' },
]

export const PRODUCT_GRADES = [
  'Food Grade (FCC / FSSAI)',
  'Pharma Grade (USP / BP / IP)',
  'Cosmetic Grade (US FDA D&C)',
  'Industrial & Technical Grade',
]

export const PRODUCT_STATUSES = [
  { id: 'active', label: 'Active / Published', color: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  { id: 'draft', label: 'Draft', color: 'bg-slate-100 text-slate-700 ring-slate-200' },
  { id: 'low_stock', label: 'Low Stock', color: 'bg-amber-50 text-amber-700 ring-amber-200' },
  { id: 'archived', label: 'Archived', color: 'bg-rose-50 text-rose-700 ring-rose-200' },
]

export const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'INR', symbol: '₹', label: 'INR (₹)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
]

export const PRICE_UNITS = [
  'Kg',
  '25 Kg Drum',
  'Metric Ton (MT)',
  'Liter',
  'Pound (lb)',
]

export const AVAILABLE_CERTIFICATIONS = [
  'ISO 9001:2015 Certified',
  'WHO-GMP Certified',
  'Halal Certified (MUI / JAZ)',
  'Kosher Certified',
  'US FDA Registered',
  'FSSAI Central License',
  'REACH Compliant (EU)',
  'HACCP Food Safety',
]

export const COMMON_APPLICATIONS = [
  'Bakery & Confectionery',
  'Beverages & Syrups',
  'Dairy & Ice Cream',
  'Snack Foods & Savory',
  'Pharmaceutical Coatings',
  'Cosmetics & Personal Care',
  'Desserts & Puddings',
  'Seasonings & Sauces',
]

export const STANDARD_ANALYSIS_TEMPLATE = [
  { characteristic: 'Total color/Assay, percent by Mass, min.', requirement: '85.00%' },
  { characteristic: 'Volatile matter + Sodium chloride + Sodium sulphate, max.', requirement: '15.00%' },
  { characteristic: 'Water-insoluble matter, percent by mass, Max.', requirement: '00.20%' },
  { characteristic: 'Subsidiary dyes, percent by mass, Max.', requirement: '01.00%' },
  { characteristic: 'Dye intermediates, percent by mass, max.', requirement: '00.01%' },
  { characteristic: 'Lead (Pb), mg/kg, Max.', requirement: '10.00 ppm' },
  { characteristic: 'Arsenic (As), mg/kg, Max.', requirement: '03.00 ppm' },
  { characteristic: 'Heavy metals, (as Pb) mg/kg, max.', requirement: '40.00 ppm' },
  { characteristic: 'Mercury & Cadmium, mg/kg, Max.', requirement: '01.00 ppm' },
  { characteristic: 'Shelf Life', requirement: '3 Years from Mfg' },
]

// ── 2. Initial Seed Products ──────────────────────────────────────
export const SEED_PRODUCTS = [
  {
    id: 'prod-tartrazine-102',
    name: 'Tartrazine Yellow (Food Grade)',
    slug: 'tartrazine-yellow-food-grade',
    sku: 'EX-SYN-102',
    category: 'synthetic-food-colours',
    subCategory: 'Yellow Dyes',
    brandName: 'Exim India Corporation',
    status: 'active',
    featured: true,
    grade: 'Food Grade (FCC / FSSAI)',
    colorHex: '#facc15',
    colorDesc: 'Brilliant Golden Yellow Powder',
    colorNo: 'Yellow 4',
    ciNo: '19140',
    casNo: '1934-21-0',
    eNumber: 'E102',
    fdcName: 'FD&C Yellow No 5',
    purity: '87% Min Pure Dye',
    shelfLife: '3 Years',
    hsCode: '3204.12.91',
    price: 13.50,
    currency: 'USD',
    priceUnit: 'Kg',
    moq: '25 Kg',
    placeOfOrigin: 'Maharashtra, India',
    packagingDetails: '25 Kg Fiber HDPE Drum with food-grade double polyethylene inner liner',
    deliveryDetail: '7 - 12 days via Air Cargo or Nhava Sheva Sea Port',
    paymentTerms: 'T/T, L/C at sight, Advance Wire',
    incoterms: 'FOB Mumbai / CIF',
    image: tartrazineImg,
    shortDescription: 'High-purity water-soluble synthetic yellow food color providing intense lemon-yellow shade with superior heat stability.',
    description: 'Tartrazine is a water-soluble synthetic lemon yellow azo dye primarily manufactured for bakery, confectionery, dairy products, beverages, cosmetics, and medicinal syrups. Manufactured strictly in compliance with ISO 9001 and WHO-GMP standards.',
    applications: ['Bakery & Confectionery', 'Beverages & Syrups', 'Dairy & Ice Cream', 'Snack Foods & Savory'],
    certifications: ['ISO 9001:2015 Certified', 'WHO-GMP Certified', 'Halal Certified (MUI / JAZ)', 'Kosher Certified', 'US FDA Registered', 'FSSAI Central License'],
    specifications: [
      { characteristic: 'Total color/Assay, percent by Mass, min.', requirement: '85.00%' },
      { characteristic: 'Water-insoluble matter, Max.', requirement: '00.20%' },
      { characteristic: 'Lead (Pb), Max.', requirement: '10.00 ppm' },
      { characteristic: 'Arsenic (As), Max.', requirement: '03.00 ppm' },
      { characteristic: 'Mercury & Cadmium, Max.', requirement: '01.00 ppm' },
      { characteristic: 'Combined ether extracts, Max', requirement: '00.20%' },
    ],
    createdAt: '2026-02-10T10:30:00Z',
    updatedAt: '2026-03-01T14:20:00Z',
  },
  {
    id: 'prod-sunset-yellow-110',
    name: 'Sunset Yellow FCF Lake',
    slug: 'sunset-yellow-fcf-lake',
    sku: 'EX-LAK-110',
    category: 'lake-colours',
    subCategory: 'Orange Lake Pigments',
    brandName: 'Exim India Corporation',
    status: 'active',
    featured: true,
    grade: 'Food Grade (FCC / FSSAI)',
    colorHex: '#f97316',
    colorDesc: 'Orange to Reddish Orange Lake Fine Pigment',
    colorNo: 'Yellow 6 Lake',
    ciNo: '15985:1',
    casNo: '15790-07-5',
    eNumber: 'E110',
    fdcName: 'FD&C Yellow No 6 Lake',
    purity: '22% - 40% Pure Dye Content',
    shelfLife: '3 Years',
    hsCode: '3204.12.94',
    price: 18.20,
    currency: 'USD',
    priceUnit: 'Kg',
    moq: '50 Kg',
    placeOfOrigin: 'Gujarat, India',
    packagingDetails: '20 Kg Corrugated cartons with double sealed polyethylene liners',
    deliveryDetail: '10 - 15 business days worldwide dispatch',
    paymentTerms: 'L/C at sight, T/T advance',
    incoterms: 'FOB Mumbai / CIF Rotterdam / CIF Dubai',
    image: sunsetYellowImg,
    shortDescription: 'Insoluble aluminum lake colorant offering vivid orange-yellow tinting in fat-based matrixes, coatings, and tablet compression.',
    description: 'Sunset Yellow Aluminum Lake is engineered for applications where water solubility causes bleeding or migration. Ideal for confectionery coatings, dry mix gravies, pressed tablets, and cosmetics.',
    applications: ['Bakery & Confectionery', 'Pharmaceutical Coatings', 'Snack Foods & Savory', 'Cosmetics & Personal Care'],
    certifications: ['ISO 9001:2015 Certified', 'Halal Certified (MUI / JAZ)', 'Kosher Certified', 'FSSAI Central License'],
    specifications: [
      { characteristic: 'Pure Dye Content (Assay), min.', requirement: '24.00% - 38.00%' },
      { characteristic: 'HCl Insoluble Matter, Max.', requirement: '0.50%' },
      { characteristic: 'Lead (Pb), Max.', requirement: '10.00 ppm' },
      { characteristic: 'Arsenic (As), Max.', requirement: '3.00 ppm' },
      { characteristic: 'Barium (Ba), Max.', requirement: '500.00 ppm' },
    ],
    createdAt: '2026-02-12T09:15:00Z',
    updatedAt: '2026-03-02T11:45:00Z',
  },
  {
    id: 'prod-allura-red-129',
    name: 'Allura Red AC (FD&C Red 40)',
    slug: 'allura-red-ac-fdc-red-40',
    sku: 'EX-SYN-129',
    category: 'synthetic-food-colours',
    subCategory: 'Red Azo Dyes',
    brandName: 'Exim India Corporation',
    status: 'active',
    featured: false,
    grade: 'Food Grade (FCC / FSSAI)',
    colorHex: '#dc2626',
    colorDesc: 'Dark Red Granular / Powder Form',
    colorNo: 'Red 40',
    ciNo: '16035',
    casNo: '25956-17-6',
    eNumber: 'E129',
    fdcName: 'FD&C Red No 40',
    purity: '86% Min Assay',
    shelfLife: '3 Years',
    hsCode: '3204.12.92',
    price: 15.80,
    currency: 'USD',
    priceUnit: 'Kg',
    moq: '25 Kg',
    placeOfOrigin: 'Maharashtra, India',
    packagingDetails: '25 Kg Export Worthy Cartons / Drums with Moisture Barrier Foil',
    deliveryDetail: '10 days prompt container loading',
    paymentTerms: 'T/T 30% advance, balance against B/L copy',
    incoterms: 'FOB Mumbai / CIF Hamburg',
    image: alluraRedImg,
    shortDescription: 'Uniform red dye offering remarkable light and pH stability across broad acidic food applications.',
    description: 'Allura Red AC is among the most versatile food colors in the world, approved across North America, Europe, Asia, and the Middle East for non-alcoholic drinks, gelatin, candies, and sauces.',
    applications: ['Beverages & Syrups', 'Bakery & Confectionery', 'Dairy & Ice Cream', 'Desserts & Puddings'],
    certifications: ['ISO 9001:2015 Certified', 'WHO-GMP Certified', 'US FDA Registered', 'Halal Certified (MUI / JAZ)', 'FSSAI Central License'],
    specifications: [
      { characteristic: 'Total color/Assay, percent by Mass, min.', requirement: '85.00%' },
      { characteristic: 'Volatile matter, max.', requirement: '15.00%' },
      { characteristic: 'Lead (Pb), Max.', requirement: '10.00 ppm' },
      { characteristic: 'Arsenic (As), Max.', requirement: '03.00 ppm' },
    ],
    createdAt: '2026-02-15T14:00:00Z',
    updatedAt: '2026-03-03T08:10:00Z',
  },
  {
    id: 'prod-brilliant-blue-133',
    name: 'Brilliant Blue FCF',
    slug: 'brilliant-blue-fcf',
    sku: 'EX-SYN-133',
    category: 'synthetic-food-colours',
    subCategory: 'Triarylmethane Dyes',
    brandName: 'Exim India Corporation',
    status: 'active',
    featured: true,
    grade: 'Food Grade (FCC / FSSAI)',
    colorHex: '#2563eb',
    colorDesc: 'Deep Violet-Blue Powder / Micro-Granules',
    colorNo: 'Blue 1',
    ciNo: '42090',
    casNo: '3844-45-9',
    eNumber: 'E133',
    fdcName: 'FD&C Blue No 1',
    purity: '88% Min Pure Dye',
    shelfLife: '3 Years',
    hsCode: '3204.12.93',
    price: 24.50,
    currency: 'USD',
    priceUnit: 'Kg',
    moq: '20 Kg',
    placeOfOrigin: 'Maharashtra, India',
    packagingDetails: '25 Kg UN Certified Fiber Drums with tamper-proof seal',
    deliveryDetail: 'Ex-stock available for immediate dispatch',
    paymentTerms: '100% Irrevocable L/C at sight',
    incoterms: 'FOB Nhava Sheva / CIF Singapore',
    image: brilliantBlueImg,
    shortDescription: 'Intense cyan-blue powder offering vibrant shades in beverages, frostings, and gelatin desserts.',
    description: 'Brilliant Blue FCF produces a vivid, clear sky-blue hue. Blends seamlessly with Tartrazine to yield vibrant lime and forest greens.',
    applications: ['Beverages & Syrups', 'Bakery & Confectionery', 'Cosmetics & Personal Care'],
    certifications: ['ISO 9001:2015 Certified', 'WHO-GMP Certified', 'Halal Certified (MUI / JAZ)', 'Kosher Certified', 'US FDA Registered'],
    specifications: [
      { characteristic: 'Total color/Assay, percent by Mass, min.', requirement: '85.00%' },
      { characteristic: 'Water-insoluble matter, Max.', requirement: '00.20%' },
      { characteristic: 'Heavy metals, max.', requirement: '40.00 ppm' },
      { characteristic: 'Lead (Pb), Max.', requirement: '10.00 ppm' },
    ],
    createdAt: '2026-02-18T16:20:00Z',
    updatedAt: '2026-03-04T12:00:00Z',
  },
  {
    id: 'prod-titanium-dioxide-171',
    name: 'Titanium Dioxide (Food Grade E171 / USP)',
    slug: 'titanium-dioxide-food-grade-e171',
    sku: 'EX-CHM-171',
    category: 'chemicals',
    subCategory: 'Inorganic Pigments & Whiteners',
    brandName: 'Exim India Corporation',
    status: 'low_stock',
    featured: false,
    grade: 'Pharma Grade (USP / BP / IP)',
    colorHex: '#f8fafc',
    colorDesc: 'Ultra-Fine Pure White Powder',
    colorNo: 'Pigment White 6',
    ciNo: '77891',
    casNo: '13463-67-7',
    eNumber: 'E171',
    fdcName: 'Titanium Dioxide USP',
    purity: '99.2% Min Assay',
    shelfLife: '5 Years',
    hsCode: '2823.00.10',
    price: 5.80,
    currency: 'USD',
    priceUnit: 'Kg',
    moq: '500 Kg',
    placeOfOrigin: 'Tamil Nadu, India',
    packagingDetails: '25 Kg Multi-ply paper bags with moisture-proof inner PE lining, 1 MT pallets',
    deliveryDetail: '14 days sea shipment',
    paymentTerms: 'T/T 30% advance, 70% against BL',
    incoterms: 'FOB Chennai / CIF Jebel Ali',
    image: titaniumImg,
    shortDescription: 'High opacity, premium dispersion white pigment for pharmaceutical tablet coating, hard capsules, and whitening.',
    description: 'High-purity anatomical grade Titanium Dioxide engineered specifically for pharmaceutical tablet coating, cosmetic creams, sunscreen lotions, and confectionery whitening with maximum opacity.',
    applications: ['Pharmaceutical Coatings', 'Cosmetics & Personal Care', 'Bakery & Confectionery'],
    certifications: ['ISO 9001:2015 Certified', 'WHO-GMP Certified', 'US FDA Registered', 'FSSAI Central License'],
    specifications: [
      { characteristic: 'Assay (TiO2 on dry basis)', requirement: '99.0% - 100.5%' },
      { characteristic: 'Loss on drying (105°C for 3 hrs)', requirement: '0.50% Max' },
      { characteristic: 'Loss on ignition (800°C)', requirement: '0.50% Max' },
      { characteristic: 'Water-soluble substances', requirement: '0.25% Max' },
      { characteristic: 'Acid-soluble substances', requirement: '0.50% Max' },
      { characteristic: 'Arsenic (As)', requirement: '1.0 ppm Max' },
      { characteristic: 'Lead (Pb)', requirement: '10.0 ppm Max' },
    ],
    createdAt: '2026-02-20T11:00:00Z',
    updatedAt: '2026-03-05T09:30:00Z',
  },
  {
    id: 'prod-diethanolamine-dea',
    name: 'Diethanolamine (DEA)',
    slug: 'diethanolamine-dea',
    sku: 'EX-CHM-111',
    category: 'chemicals',
    subCategory: 'Ethanolamines & Gas Sweetening Solvents',
    brandName: 'Exim India Corporation',
    status: 'active',
    featured: true,
    grade: 'Industrial & Technical Grade',
    colorHex: '#e2e8f0',
    colorDesc: 'Clear Colorless Viscous Liquid',
    colorNo: 'DEA',
    ciNo: '—',
    casNo: '111-42-2',
    eNumber: '—',
    fdcName: 'Diethanolamine Pure',
    purity: '99.0% Min Assay',
    shelfLife: '2 Years',
    hsCode: '2922.12.00',
    price: 2.85,
    currency: 'USD',
    priceUnit: 'Kg',
    moq: '1,000 Kg',
    placeOfOrigin: 'Gujarat, India',
    packagingDetails: '210 Kg Steel Drums / 1000 Kg IBC Containers',
    deliveryDetail: '7 - 10 business days prompt dispatch',
    paymentTerms: 'T/T, L/C at sight',
    incoterms: 'FOB Mumbai / CIF',
    image: diethanolamineImg,
    shortDescription: 'High-purity organic amine compound widely utilized in natural gas sweetening, detergent formulations, and surfactants.',
    description: 'Diethanolamine (DEA) is an amino alcohol used extensively as an industrial surfactant, corrosion inhibitor intermediate, and in natural gas processing plants to sweeten sour gas by absorbing acidic contaminants.',
    applications: ['Industrial Solvents', 'Detergents & Cleaners', 'Gas Sweetening Units'],
    certifications: ['ISO 9001:2015 Certified', 'WHO-GMP Certified', 'REACH Compliant (EU)'],
    specifications: [
      { characteristic: 'Assay (DEA), percent by Mass, min.', requirement: '99.00%' },
      { characteristic: 'Monoethanolamine (MEA), max.', requirement: '0.50%' },
      { characteristic: 'Triethanolamine (TEA), max.', requirement: '0.50%' },
      { characteristic: 'Water Content (Karl Fischer), max.', requirement: '0.15%' },
    ],
    createdAt: '2026-02-21T09:00:00Z',
    updatedAt: '2026-03-05T10:00:00Z',
  },
  {
    id: 'prod-methyldiethanolamine-mdea',
    name: 'Methyldiethanolamine (MDEA)',
    slug: 'methyldiethanolamine-mdea',
    sku: 'EX-CHM-105',
    category: 'chemicals',
    subCategory: 'Specialty Gas Treating Amines',
    brandName: 'Exim India Corporation',
    status: 'active',
    featured: true,
    grade: 'Industrial & Technical Grade',
    colorHex: '#f1f5f9',
    colorDesc: 'Colorless to Pale Yellow Liquid',
    colorNo: 'MDEA',
    ciNo: '—',
    casNo: '105-59-9',
    eNumber: '—',
    fdcName: 'Methyldiethanolamine Tech',
    purity: '99.2% Min Assay',
    shelfLife: '2 Years',
    hsCode: '2922.19.90',
    price: 3.40,
    currency: 'USD',
    priceUnit: 'Kg',
    moq: '1,000 Kg',
    placeOfOrigin: 'Gujarat, India',
    packagingDetails: '215 Kg UN Approved Tight Head Steel Drums',
    deliveryDetail: '10 days prompt container shipping',
    paymentTerms: 'L/C, T/T advance',
    incoterms: 'FOB Nhava Sheva / CIF',
    image: methyldiethanolamineImg,
    shortDescription: 'Specialized tertiary amine solvent for acid gas removal, CO2 & H2S selective scrubbing in refineries.',
    description: 'Methyldiethanolamine (MDEA) is a tertiary alkanolamine characterized by high selectivity towards H2S in the presence of CO2, with minimal thermal degradation and low vapor loss during thermal regeneration.',
    applications: ['Refinery Gas Sweetening', 'Ammonia Synthesis Plants', 'Specialty Chemical Synthesis'],
    certifications: ['ISO 9001:2015 Certified', 'REACH Compliant (EU)'],
    specifications: [
      { characteristic: 'Assay (MDEA), percent by Mass, min.', requirement: '99.20%' },
      { characteristic: 'Water by Weight, max.', requirement: '0.20%' },
      { characteristic: 'Color (APHA), max.', requirement: '50' },
      { characteristic: 'Specific Gravity at 20/20°C', requirement: '1.040 - 1.044' },
    ],
    createdAt: '2026-02-21T10:30:00Z',
    updatedAt: '2026-03-05T10:30:00Z',
  },
  {
    id: 'prod-red-lead-1314',
    name: 'Red Lead (Lead Tetroxide)',
    slug: 'red-lead-lead-tetroxide',
    sku: 'EX-CHM-131',
    category: 'chemicals',
    subCategory: 'Inorganic Pigments & Oxides',
    brandName: 'Exim India Corporation',
    status: 'active',
    featured: false,
    grade: 'Industrial & Technical Grade',
    colorHex: '#dc2626',
    colorDesc: 'Bright Orange-Red Crystalline Powder',
    colorNo: 'Pigment Red 105',
    ciNo: '77578',
    casNo: '1314-41-6',
    eNumber: '—',
    fdcName: 'Minium / Lead Tetroxide',
    purity: '98.0% Min (as Pb3O4)',
    shelfLife: '5 Years',
    hsCode: '2824.90.00',
    price: 4.20,
    currency: 'USD',
    priceUnit: 'Kg',
    moq: '500 Kg',
    placeOfOrigin: 'Maharashtra, India',
    packagingDetails: '25 Kg Multi-wall paper bags with HDPE inner liner / 50 Kg drums',
    deliveryDetail: '10 business days prompt loading',
    paymentTerms: 'T/T, L/C',
    incoterms: 'FOB Mumbai / CIF',
    image: redLeadImg,
    shortDescription: 'Heavy-duty anti-corrosive pigment powder for marine primer paints, specialized crystal glass, and batteries.',
    description: 'Red Lead (trilead tetroxide, Pb3O4) is a bright red to orange water-insoluble inorganic compound widely manufactured for anti-rust coatings on steel structures, bridge coatings, and lead-acid battery manufacture.',
    applications: ['Anti-Corrosive Marine Paints', 'Crystal & Optical Glass', 'Lead-Acid Battery Plates'],
    certifications: ['ISO 9001:2015 Certified'],
    specifications: [
      { characteristic: 'True Red Lead (Pb3O4), min.', requirement: '98.00%' },
      { characteristic: 'Residue on 240 mesh sieve, max.', requirement: '0.10%' },
      { characteristic: 'Matter volatile at 105°C, max.', requirement: '0.20%' },
      { characteristic: 'Water-soluble matter, max.', requirement: '0.30%' },
    ],
    createdAt: '2026-02-21T11:15:00Z',
    updatedAt: '2026-03-05T11:15:00Z',
  },
  {
    id: 'prod-ponceau-4r-124',
    name: 'Ponceau 4R (Cochineal Red A)',
    slug: 'ponceau-4r-cochineal-red-a',
    sku: 'EX-SYN-124',
    category: 'synthetic-food-colours',
    subCategory: 'Red Azo Dyes',
    brandName: 'Exim India Corporation',
    status: 'draft',
    featured: false,
    grade: 'Food Grade (FCC / FSSAI)',
    colorHex: '#b91c1c',
    colorDesc: 'Deep Crimson Red Powder',
    colorNo: 'Food Red 7',
    ciNo: '16255',
    casNo: '2611-82-7',
    eNumber: 'E124',
    fdcName: 'Acid Red 18',
    purity: '85% Min Pure Dye',
    shelfLife: '3 Years',
    hsCode: '3204.12.92',
    price: 14.20,
    currency: 'USD',
    priceUnit: 'Kg',
    moq: '25 Kg',
    placeOfOrigin: 'Maharashtra, India',
    packagingDetails: '25 Kg HDPE Plastic drums',
    deliveryDetail: '10 business days',
    paymentTerms: 'T/T, L/C',
    incoterms: 'FOB Mumbai',
    image: ponceauImg,
    shortDescription: 'Crimson-red synthetic food coloring offering bright berry shade in confectionery, jams, and drink powders.',
    description: 'Ponceau 4R is a strawberry-to-cherry red synthetic colorant used broadly in dessert powders, preserves, fish pastes, and cough mixtures.',
    applications: ['Bakery & Confectionery', 'Beverages & Syrups', 'Desserts & Puddings'],
    certifications: ['ISO 9001:2015 Certified', 'Halal Certified (MUI / JAZ)', 'Kosher Certified'],
    specifications: [
      { characteristic: 'Total color/Assay, percent by Mass, min.', requirement: '82.00%' },
      { characteristic: 'Lead (Pb), Max.', requirement: '10.00 ppm' },
      { characteristic: 'Arsenic (As), Max.', requirement: '03.00 ppm' },
    ],
    createdAt: '2026-02-22T08:00:00Z',
    updatedAt: '2026-02-22T08:00:00Z',
  },
  {
    id: 'prod-carmoisine-122',
    name: 'Carmoisine (Azorubine)',
    slug: 'carmoisine-azorubine',
    sku: 'EX-SYN-122',
    category: 'synthetic-food-colours',
    subCategory: 'Red Azo Dyes',
    brandName: 'Exim India Corporation',
    status: 'active',
    featured: false,
    grade: 'Food Grade (FCC / FSSAI)',
    colorHex: '#991b1b',
    colorDesc: 'Rich Magenta Red Powder',
    colorNo: 'Food Red 3',
    ciNo: '14720',
    casNo: '3567-69-9',
    eNumber: 'E122',
    fdcName: 'Ext D&C Red 10',
    purity: '85% Min Assay',
    shelfLife: '3 Years',
    hsCode: '3204.12.92',
    price: 16.00,
    currency: 'USD',
    priceUnit: 'Kg',
    moq: '25 Kg',
    placeOfOrigin: 'Maharashtra, India',
    packagingDetails: '25 Kg Fiber Drums with tamper-proof ring',
    deliveryDetail: '7 - 10 days',
    paymentTerms: 'T/T advance',
    incoterms: 'FOB Mumbai / CIF',
    image: carmoisineImg,
    shortDescription: 'Deep maroon to magenta coloring providing authentic berry tones in syrups and confectionery.',
    description: 'Carmoisine is an azo food dye yielding an intense red to maroon shade. Widely employed in cheesecake mixes, yogurts, marzipan, and pharmaceuticals.',
    applications: ['Bakery & Confectionery', 'Dairy & Ice Cream', 'Beverages & Syrups'],
    certifications: ['ISO 9001:2015 Certified', 'Halal Certified (MUI / JAZ)', 'Kosher Certified', 'FSSAI Central License'],
    specifications: [
      { characteristic: 'Total color/Assay, percent by Mass, min.', requirement: '85.00%' },
      { characteristic: 'Water-insoluble matter, Max.', requirement: '00.20%' },
      { characteristic: 'Lead (Pb), Max.', requirement: '10.00 ppm' },
    ],
    createdAt: '2026-02-25T13:45:00Z',
    updatedAt: '2026-03-06T15:10:00Z',
  },
]

// ── 3. Empty Template for New Products ────────────────────────────
export const EMPTY_PRODUCT_FORM = {
  name: '',
  slug: '',
  sku: '',
  category: 'synthetic-food-colours',
  subCategory: '',
  brandName: 'Exim India Corporation',
  status: 'active',
  featured: false,
  grade: 'Food Grade (FCC / FSSAI)',
  colorHex: '#3b82f6',
  colorDesc: '',
  colorNo: '',
  ciNo: '',
  casNo: '',
  eNumber: '',
  fdcName: '',
  purity: '85% Min Assay',
  shelfLife: '3 Years',
  hsCode: '3204.12.90',
  price: '',
  currency: 'USD',
  priceUnit: 'Kg',
  moq: '25 Kg',
  placeOfOrigin: 'Maharashtra, India',
  packagingDetails: '25 Kg Fiber HDPE Drum with double inner poly-liner',
  deliveryDetail: '7 - 14 business days via Air / Sea Cargo',
  paymentTerms: 'T/T, 100% Irrevocable L/C at sight',
  incoterms: 'FOB Mumbai / CIF',
  image: '',
  shortDescription: '',
  description: '',
  applications: ['Bakery & Confectionery', 'Beverages & Syrups'],
  certifications: ['ISO 9001:2015 Certified', 'WHO-GMP Certified', 'Halal Certified (MUI / JAZ)', 'FSSAI Central License'],
  specifications: [...STANDARD_ANALYSIS_TEMPLATE],
}

// ── 4. Validation Helper ──────────────────────────────────────────
export function validateProduct(formData) {
  const errors = {}

  if (!formData.name?.trim()) {
    errors.name = 'Product name is required.'
  }
  if (!formData.category) {
    errors.category = 'Please select a product category.'
  }
  if (!formData.sku?.trim()) {
    errors.sku = 'SKU / Product Code is required.'
  }
  if (!formData.hsCode?.trim()) {
    errors.hsCode = 'HS Code is required for customs export clearance.'
  }
  if (formData.price === '' || formData.price === null || Number(formData.price) <= 0) {
    errors.price = 'Please provide a valid unit price greater than 0.'
  }
  if (!formData.moq?.trim()) {
    errors.moq = 'Minimum Order Quantity (MOQ) is required.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// ── 5. Slug and SKU Auto-generator ────────────────────────────────
export function generateSlug(name) {
  return (name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function generateSKU(category, name) {
  const catPrefixMap = {
    'synthetic-food-colours': 'SYN',
    'bakery-colors': 'BAK',
    'blended-colours': 'BLN',
    'lake-colours': 'LAK',
    'cosmetic-colours': 'COS',
    'pharmaceutical-colours': 'PHR',
    'liquid-flavours': 'LFL',
    'emulsion-flavours': 'EMF',
    'food-additives': 'ADD',
    'chemicals': 'CHM',
    'natural-food-colors': 'NAT',
  }
  const prefix = catPrefixMap[category] || 'PRD'
  const randomSuffix = Math.floor(100 + Math.random() * 900)
  return `EX-${prefix}-${randomSuffix}`
}

// ── 6. LocalStorage Store Manager ─────────────────────────────────
const STORAGE_KEY = 'exim_admin_products_v2'

export const productStore = {
  // Read all items from localStorage or fallback to seeds
  _load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (e) {
      console.warn('Failed to parse products from localStorage:', e)
    }
    // Seed initial database
    this._save(SEED_PRODUCTS)
    return SEED_PRODUCTS
  },

  _save(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    } catch (e) {
      console.error('Failed to save products to localStorage:', e)
    }
  },

  // Query & Filter products
  getAll({ search = '', category = '', status = '', grade = '', sort = 'newest', page = 1, limit = 10 } = {}) {
    let list = this._load()

    // 1. Search Query
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter((item) =>
        item.name.toLowerCase().includes(q) ||
        (item.sku && item.sku.toLowerCase().includes(q)) ||
        (item.hsCode && item.hsCode.toLowerCase().includes(q)) ||
        (item.casNo && item.casNo.toLowerCase().includes(q)) ||
        (item.ciNo && item.ciNo.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
      )
    }

    // 2. Category Filter
    if (category && category !== 'all') {
      list = list.filter((item) => item.category === category)
    }

    // 3. Status Filter
    if (status && status !== 'all') {
      list = list.filter((item) => item.status === status)
    }

    // 4. Grade Filter
    if (grade && grade !== 'all') {
      list = list.filter((item) => item.grade === grade)
    }

    // 5. Sorting
    list = [...list].sort((a, b) => {
      if (sort === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      if (sort === 'oldest') return new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'price-low') return Number(a.price) - Number(b.price)
      if (sort === 'price-high') return Number(b.price) - Number(a.price)
      return 0
    })

    const total = list.length
    const startIndex = (page - 1) * limit
    const paginatedItems = list.slice(startIndex, startIndex + limit)

    return {
      data: paginatedItems,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    }
  },

  // Get single product by ID or Slug
  getById(idOrSlug) {
    const list = this._load()
    return list.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null
  },

  // Create new product
  create(productData) {
    const list = this._load()
    const now = new Date().toISOString()
    const newProduct = {
      ...EMPTY_PRODUCT_FORM,
      ...productData,
      id: `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      slug: productData.slug || generateSlug(productData.name),
      sku: productData.sku || generateSKU(productData.category, productData.name),
      createdAt: now,
      updatedAt: now,
    }
    const updatedList = [newProduct, ...list]
    this._save(updatedList)
    return newProduct
  },

  // Update product
  update(id, productData) {
    const list = this._load()
    const index = list.findIndex((p) => p.id === id)
    if (index === -1) {
      throw new Error(`Product with ID "${id}" was not found.`)
    }
    const updated = {
      ...list[index],
      ...productData,
      updatedAt: new Date().toISOString(),
    }
    list[index] = updated
    this._save(list)
    return updated
  },

  // Delete product
  delete(id) {
    const list = this._load()
    const filtered = list.filter((p) => p.id !== id)
    this._save(filtered)
    return true
  },

  // Bulk delete
  bulkDelete(ids = []) {
    const list = this._load()
    const filtered = list.filter((p) => !ids.includes(p.id))
    this._save(filtered)
    return true
  },

  // Bulk status update
  bulkUpdateStatus(ids = [], newStatus) {
    const list = this._load()
    const updated = list.map((p) => {
      if (ids.includes(p.id)) {
        return { ...p, status: newStatus, updatedAt: new Date().toISOString() }
      }
      return p
    })
    this._save(updated)
    return updated
  },

  // Toggle status
  toggleStatus(id, newStatus) {
    return this.update(id, { status: newStatus })
  },

  // Duplicate an existing product
  duplicate(id) {
    const target = this.getById(id)
    if (!target) throw new Error('Target product not found')
    const duplicateData = {
      ...target,
      name: `${target.name} (Copy)`,
      slug: `${target.slug}-copy-${Date.now().toString().slice(-4)}`,
      sku: `${target.sku}-CPY`,
      status: 'draft',
    }
    delete duplicateData.id
    delete duplicateData.createdAt
    delete duplicateData.updatedAt
    return this.create(duplicateData)
  },

  // Stats for cards & overview
  getStats() {
    const list = this._load()
    const active = list.filter((p) => p.status === 'active').length
    const draft = list.filter((p) => p.status === 'draft').length
    const lowStock = list.filter((p) => p.status === 'low_stock').length
    const featured = list.filter((p) => p.featured).length
    return {
      total: list.length,
      active,
      draft,
      lowStock,
      featured,
    }
  },

  // Reset to seed defaults
  resetToDefaults() {
    this._save(SEED_PRODUCTS)
    return SEED_PRODUCTS
  },
}
