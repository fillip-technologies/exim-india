// Master Dataset for Fluorescent Colours with Authentic Technical Data and Specifications
// Images imported directly from src/assets/img/fc/

import yellowFcImg from '../assets/img/fc/yellow.jpg'
import greenFcImg from '../assets/img/fc/green.jpg'
import orangeFcImg from '../assets/img/fc/orange.jpg'
import blueFcImg from '../assets/img/fc/blue.jpg'
import redFcImg from '../assets/img/fc/red.jpg'
import pinkFcImg from '../assets/img/fc/pink.jpg'
import violetFcImg from '../assets/img/fc/violet.jpg'

export const FLUORESCENT_ANALYSIS_SPECS = [
  { characteristic: 'Physical Appearance', requirement: 'Ultra-Fine High-Visibility Fluorescent Powder' },
  { characteristic: 'Daylight Luminescence', requirement: 'High Quantum Yield Neon Emission under UV / Daylight' },
  { characteristic: 'Average Particle Size (D50)', requirement: '3.0 – 8.0 Microns (Sub-Micron Dispersibility)' },
  { characteristic: 'Softening / Melting Point', requirement: '130°C – 145°C' },
  { characteristic: 'Decomposition Temperature', requirement: '> 220°C (High Thermal Resistance)' },
  { characteristic: 'Moisture Content (at 105°C)', requirement: '< 1.00% Max' },
  { characteristic: 'pH Value (10% Aqueous Slurry)', requirement: '5.50 – 7.50' },
  { characteristic: 'Heavy Metals (as Pb), Max.', requirement: '< 10.00 ppm' },
  { characteristic: 'Light Fastness (Blue Wool Scale)', requirement: 'Grade 3 – 4 (Daylight Stability)' },
  { characteristic: 'Solvent Resistance', requirement: 'Resistant to aliphatic hydrocarbons, alcohols and plasticizers' },
]

export const FLUORESCENT_APPLICATIONS = [
  {
    category: 'Textile Printing & Dyeing',
    suitability: 'Screen printing inks, pigment printing pastes, synthetic fiber masterbatches, and athletic apparel.',
    feature: 'Outstanding neon vibrancy with soft fabric feel and wash resistance.',
  },
  {
    category: 'Plastics & Polymers',
    suitability: 'Polyethylene (PE), Polypropylene (PP), Polystyrene (PS), EVA molding, and blown films.',
    feature: 'Uniform color distribution with minimal plate-out and low odor at processing temperatures.',
  },
  {
    category: 'Coatings & High-Visibility Paints',
    suitability: 'Aerosol spray paints, industrial safety signage, traffic markings, and architectural accent enamels.',
    feature: 'Maximum daylight visibility and retro-reflective brilliance under twilight illumination.',
  },
  {
    category: 'Security Inks & Stationery',
    suitability: 'Fluorescent highlighters, water-based marker inks, counterfeit prevention documents, and packaging seals.',
    feature: 'Crisp, smear-free edge definition and instantaneous optical fluorescent excitation under blacklight (365nm).',
  },
]

export const FLUORESCENT_PRODUCTS = [
  {
    id: 'yellow-3501lf',
    name: 'Yellow 3501LF',
    shadeName: 'Fluorescent Lemon Yellow',
    image: yellowFcImg,
    category: 'warm',
    groupName: 'Warm Neon',
    shadeColor: '#facc15',
    types: 'High-Strength Daylight Fluorescent Pigment',
    moq: '100 Kgs',
    supplyAbility: '20 Metric Tons/Month',
    port: 'JNPT, (Nhava sheva) Mumbai',
    packaging: '25 Kg corrugated carton boxes / fibre drums with polyethylene inner liner',
    shelfLife: '36 Months from Manufacturing Date',
    storage: 'Store in tightly sealed containers in a cool, dry, ventilated area away from excessive heat and direct sunlight.',
    applicationSummary:
      'Electrifying neon lemon-yellow daylight fluorescent pigment with peak emission at 520nm. Widely utilized in safety markings, highlighter inks, polymer molding, and athletic textile print pastes.',
    analysis: FLUORESCENT_ANALYSIS_SPECS,
  },
  {
    id: 'green-3502lf',
    name: 'Green 3502LF',
    shadeName: 'Fluorescent Radiant Green',
    image: greenFcImg,
    category: 'cool',
    groupName: 'Cool Radiance',
    shadeColor: '#22c55e',
    types: 'High-Strength Daylight Fluorescent Pigment',
    moq: '100 Kgs',
    supplyAbility: '10 Tons per Month',
    port: 'JNPT, (Nhava sheva) Mumbai',
    packaging: '25 Kg corrugated carton boxes / fibre drums with polyethylene inner liner',
    shelfLife: '36 Months from Manufacturing Date',
    storage: 'Store in tightly sealed containers in a cool, dry, ventilated area away from excessive heat and direct sunlight.',
    applicationSummary:
      'Intense neon emerald green fluorescent shade delivering unparalleled daylight pop. Excellent heat resistance for plastic extrusion, graphic arts inks, and protective safety equipment.',
    analysis: FLUORESCENT_ANALYSIS_SPECS,
  },
  {
    id: 'orange-3504lf',
    name: 'Orange 3504LF',
    shadeName: 'Fluorescent Vivid Orange',
    image: orangeFcImg,
    category: 'warm',
    groupName: 'Warm Neon',
    shadeColor: '#f97316',
    types: 'High-Strength Daylight Fluorescent Pigment',
    moq: '50 Kgs',
    supplyAbility: '10 Tons per Month',
    port: 'JNPT, (Nhava sheva) Mumbai',
    packaging: '25 Kg corrugated carton boxes / fibre drums with polyethylene inner liner',
    shelfLife: '36 Months from Manufacturing Date',
    storage: 'Store in tightly sealed containers in a cool, dry, ventilated area away from excessive heat and direct sunlight.',
    applicationSummary:
      'Hyper-visible blaze orange pigment designed for construction safety cones, high-visibility signage, hunting gear coatings, and eye-catching consumer packaging.',
    analysis: FLUORESCENT_ANALYSIS_SPECS,
  },
  {
    id: 'blue-3510lf',
    name: 'Blue 3510LF',
    shadeName: 'Fluorescent Electric Blue',
    image: blueFcImg,
    category: 'cool',
    groupName: 'Cool Radiance',
    shadeColor: '#3b82f6',
    types: 'High-Strength Daylight Fluorescent Pigment',
    moq: '100 Kgs',
    supplyAbility: '10 Tons per Month',
    port: 'JNPT, (Nhava sheva) Mumbai',
    packaging: '25 Kg corrugated carton boxes / fibre drums with polyethylene inner liner',
    shelfLife: '36 Months from Manufacturing Date',
    storage: 'Store in tightly sealed containers in a cool, dry, ventilated area away from excessive heat and direct sunlight.',
    applicationSummary:
      'Deep luminous electric cyan-blue fluorescent pigment offering distinct UV reactivity and superior optical dispersion in specialty inks, masterbatches, and novelty coatings.',
    analysis: FLUORESCENT_ANALYSIS_SPECS,
  },
  {
    id: 'red-3506lf',
    name: 'Red 3506LF',
    shadeName: 'Fluorescent Fire Red',
    image: redFcImg,
    category: 'warm',
    groupName: 'Warm Neon',
    shadeColor: '#ef4444',
    types: 'High-Strength Daylight Fluorescent Pigment',
    moq: '100 Kgs',
    supplyAbility: '10 Tons/Month',
    port: 'JNPT, (Nhava sheva) Mumbai',
    packaging: '25 Kg corrugated carton boxes / fibre drums with polyethylene inner liner',
    shelfLife: '36 Months from Manufacturing Date',
    storage: 'Store in tightly sealed containers in a cool, dry, ventilated area away from excessive heat and direct sunlight.',
    applicationSummary:
      'Brilliant fiery red daylight fluorescent pigment delivering intense warmth and optical purity. Formulated for emergency signage, automotive hazard marking, and specialty printing pastes.',
    analysis: FLUORESCENT_ANALYSIS_SPECS,
  },
  {
    id: 'pink-3507lf',
    name: 'Pink 3507LF',
    shadeName: 'Fluorescent Hot Pink',
    image: pinkFcImg,
    category: 'warm',
    groupName: 'Warm Neon',
    shadeColor: '#ec4899',
    types: 'High-Strength Daylight Fluorescent Pigment',
    moq: '100 Kgs',
    supplyAbility: '10 Tons per Month',
    port: 'JNPT, (Nhava sheva) Mumbai',
    packaging: '25 Kg corrugated carton boxes / fibre drums with polyethylene inner liner',
    shelfLife: '36 Months from Manufacturing Date',
    storage: 'Store in tightly sealed containers in a cool, dry, ventilated area away from excessive heat and direct sunlight.',
    applicationSummary:
      'Ultra-vibrant hot magenta pink fluorescent shade with exceptional visual excitation. Widely demanded in fashion apparel printing, cosmetics packaging, stationery, and premium plastic toys.',
    analysis: FLUORESCENT_ANALYSIS_SPECS,
  },
  {
    id: 'violet-3509lf',
    name: 'Violet 3509LF',
    shadeName: 'Fluorescent Royal Violet',
    image: violetFcImg,
    category: 'cool',
    groupName: 'Cool Radiance',
    shadeColor: '#8b5cf6',
    types: 'High-Strength Daylight Fluorescent Pigment',
    moq: '100 Kgs',
    supplyAbility: '10 Tons/Month',
    port: 'JNPT, (Nhava sheva) Mumbai',
    packaging: '25 Kg corrugated carton boxes / fibre drums with polyethylene inner liner',
    shelfLife: '36 Months from Manufacturing Date',
    storage: 'Store in tightly sealed containers in a cool, dry, ventilated area away from excessive heat and direct sunlight.',
    applicationSummary:
      'Mesmerizing ultraviolet-reactive deep violet fluorescent pigment. Ideal for specialty security printing, club-lighting décor, artistic masterbatches, and graphic poster inks.',
    analysis: FLUORESCENT_ANALYSIS_SPECS,
  },
]
