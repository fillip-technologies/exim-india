/**
 * src/constants/chemicalsData.js
 * ─────────────────────────────────────────────────────────────
 * Master dataset for Industrial Chemicals & Specialty Intermediates.
 */

import diethanolamineImg from '../assets/chemicals/dietalhone.png'
import methyldiethanolamineImg from '../assets/chemicals/methyl.png'
import redLeadImg from '../assets/chemicals/red-lead.png'

export const CHEMICALS_PRODUCTS = [
  {
    id: 'diethanolamine-dea',
    name: 'Diethanolamine (DEA)',
    shortName: 'DEA',
    casNo: '111-42-2',
    formula: 'C4H11NO2',
    grade: 'Industrial & Technical Grade',
    category: 'Chemicals & Intermediates',
    image: diethanolamineImg,
    description: 'High-purity organic amine compound widely utilized in natural gas sweetening, detergent formulations, surfactants, and as a corrosion inhibitor intermediate.',
  },
  {
    id: 'methyldiethanolamine-mdea',
    name: 'Methyldiethanolamine (MDEA)',
    shortName: 'MDEA',
    casNo: '105-59-9',
    formula: 'C5H13NO2',
    grade: 'Industrial & Technical Grade',
    category: 'Chemicals & Intermediates',
    image: methyldiethanolamineImg,
    description: 'Tertiary amine solvent primarily employed in refinery gas treatment, bulk hydrogen sulfide (H2S) and carbon dioxide (CO2) removal, and specialty chemical synthesis.',
  },
  {
    id: 'red-lead',
    name: 'Red Lead (Lead Tetroxide)',
    shortName: 'Minium',
    casNo: '1314-41-6',
    formula: 'Pb3O4',
    grade: 'Industrial & Technical Grade',
    category: 'Inorganic Pigments & Chemicals',
    image: redLeadImg,
    description: 'Vivid bright orange-red crystalline pigment powder engineered for heavy-duty anti-corrosive primer paints, optical glass, and battery plate manufacture.',
  },
]
