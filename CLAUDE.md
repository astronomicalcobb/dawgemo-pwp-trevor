# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page marketing website for Husky Well & Pump Service, a well drilling and pump service company operating in central New Mexico. The site is built as a static website using Vite as the build tool with vanilla JavaScript.

## Development Commands

```bash
# Start development server with network access
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Watch Tailwind CSS compilation (legacy, not typically needed with Vite)
npm run watch
```

## Tech Stack

- **Build Tool**: Vite 7.2.4 (ESM-based)
- **Styling**: Tailwind CSS (via CDN in index.html) + PostCSS with @tailwindcss/postcss plugin
- **UI Components**: Flowbite 4.0.1 (pre-built Tailwind components)
- **Icons**: Lucide 0.554.0 (icon library)
- **JavaScript**: Vanilla JS (ES modules)

## Architecture

### Single-Page Structure

The entire website is contained in `index.html` with the following sections in order:
1. Navigation (fixed top nav with links to all sections)
2. Hero Section (#home)
3. Services Section (#services) - 4 service cards
4. Service Area Section (#service-area) - embedded Google Map
5. Our Work Section (#our-work) - 6 placeholder gallery items
6. About Section (#about) - includes History timeline, Values grid, and Meet the Crew
7. Contact Section (#contact) - contact form and embedded map
8. Footer

### Dark Mode

Dark mode is implemented using Tailwind's `dark:` variant with `darkMode: 'media'` configuration. Colors automatically switch based on user's system preference.

### JavaScript Entry Point

`src/main.js` is the single JavaScript entry point that:
- Imports Flowbite for interactive components
- Initializes Lucide icons with `createIcons({ icons })`
- Note: Line 5 has a bug - uses `document.append()` instead of proper DOM insertion

### Styling

`src/index.css` configures Flowbite integration:
- Imports Flowbite's default theme
- Loads Flowbite plugin for Tailwind
- Sources Flowbite components from node_modules

Tailwind is loaded via CDN in the HTML `<head>` with inline configuration: `tailwind.config = {darkMode: 'media'}`

## File Organization

```
/
├── index.html          # Main single-page HTML file
├── src/
│   ├── main.js        # JavaScript entry point (Flowbite + Lucide initialization)
│   └── index.css      # Flowbite configuration
├── public/assets/     # Static assets directory
├── documentation/ui/  # UI reference links (Penguin UI, Radix UI, shadcn/ui)
└── postcss.config.cjs # PostCSS configuration for Tailwind
```

## Key Implementation Details

### Navigation
Fixed-position navbar (`fixed top-0 w-full`) with smooth scrolling enabled via `scroll-smooth` class on `<html>`. All nav links use anchor links to section IDs.

### Forms
Contact form (#contactForm) includes name, email, phone, and message fields. Form submission handling is not implemented - no event listener attached in main.js.

### Maps
Two embedded Google Maps:
- Service area map in #service-area section
- Contact location map in #contact section (points to Husky Drilling Company location)

### Color Scheme
Primary brand colors: Blue-900 (dark blue) for light mode, Blue-400 for dark mode
Secondary: Gray scale for backgrounds and text

## Common Patterns

- Sections use `py-20 px-6` for consistent vertical/horizontal padding
- Content containers: `max-w-7xl mx-auto` for centered max-width layout
- Cards: `rounded-md shadow-lg` for consistent card styling
- Hover effects: `hover:-translate-y-2 transition` on service cards
- Dark mode: Every styled element has `dark:` variants for colors
