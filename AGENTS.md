# Agent Guidelines & Memory for Exim India

This document serves as the project source of truth and architectural reference for AI agents working in this repository.

---

## 🎯 Project Overview & Business Domain
**Exim India Corporation** is a leading research-based export house delivering high-quality:
- **Food Colors**
- **Flavours & Emulsions**
- **Fragrances**
- **Essential Oils**
- **Botanical Extracts**
- **Natural Ingredients & Global Solutions**

Exporting premium Indian ingredients to 50+ countries worldwide across 100+ product formulations.

---

## ☀️ CRITICAL THEME RULE: 100% LIGHT THEME ONLY
> **DO NOT USE DARK THEME**.
> The entire website must use a crisp, modern, executive **LIGHT THEME**:
> - Clean white backgrounds (`#ffffff`, `bg-white`)
> - Off-white / light slate surfaces (`#f8fafc`, `#f1f5f9`)
> - High-contrast charcoal/navy text (`#0f172a`, `#1e293b`)
> - Forest green accents (`#0a3622`, `#16a34a`)
> - Warm amber/gold accents (`#b45309`, `#c2410c`)
> - Brand orange accents (`#ea580c`, `#f97316`)

---

## 🧭 CRITICAL ROUTING RULE: REACT ROUTER `<Link>` ONLY
> **NEVER USE HTML `<a href="...">` FOR INTERNAL ROUTING**.
> Always use React Router's `<Link to="...">` or `<NavLink to="...">` from `react-router-dom`.

---

## 🎨 Master Design System & Tokens
All colors and fonts are maintained centrally in:
1. [`src/styles/tokens.css`](src/styles/tokens.css)
2. [`src/constants/theme.js`](src/constants/theme.js)

### Master Color Tokens:
- **Heading Navy/Charcoal**: `#0f172a` (Primary typography)
- **Hero Accent Amber/Gold**: `#b45309` / `#c2410c` (For "TO THE WORLD" heading)
- **Forest Green**: `#0a3622` / `#15803d` (Primary CTA button "Explore Our Products")
- **Brand Green (Logo)**: `#16a34a` (From "E" in logo)
- **Brand Orange (Logo)**: `#ea580c` / `#f97316` (From "X" in logo)
- **Maritime Blue (Logo)**: `#0284c7` (From "m" in logo)
- **Royal Purple (Logo)**: `#7e22ce` (From "i" in logo)
- **Surface Light**: `#ffffff` / `#f8fafc` / `#f1f5f9`
- **Border Light**: `#e2e8f0` / `#cbd5e1`

### Master Typography:
- **Headings**: `Outfit`, system-ui, sans-serif
- **Body UI**: `Plus Jakarta Sans`, system-ui, sans-serif

---

## 📁 Production Directory Structure

```text
src/
├── assets/                  # Media assets (logo.png, hero-bgi-1.png)
├── components/
│   ├── common/              # Button, Badge, GlassCard
│   ├── layout/              # Navbar (floating circle/pill), TopBar, Footer
│   └── hero/                # All Homepage Components: HeroSection, DiverseRangeSection, etc. (do not create separate folders for homepage components)
├── constants/               # navigation.js, theme.js
├── styles/                  # tokens.css, index.css
├── pages/                   # Home.jsx, Products.jsx, About.jsx, Contact.jsx
├── App.jsx                  # Main router setup
└── main.jsx                 # Entry point
```

---

## 🧩 Component Standards
- **Navbar**: Floating circular/pill-shaped bar (`rounded-full`), transparent glassmorphic light backdrop (`backdrop-blur-xl bg-white/70 border border-slate-200/80 shadow-lg shadow-slate-900/5`), dark readable text, React Router `<Link>`.
- **Hero**: Exact reproduction of user's provided UI design mockup with light gradient overlay, bold 3-tier heading, product overview, "Explore Our Products" forest green button, "Watch Our Story" play button, and bottom frosted stats bar.
