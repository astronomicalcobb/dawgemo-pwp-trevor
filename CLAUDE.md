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

**Dark Mode Color Palette:**
- **Backgrounds**: gray-800 and gray-900 alternating for sections, gray-700 for cards
- **Primary Text**: gray-300 for body text
- **Headings**: cyan-400 for all h2/h3 headings
- **Accents**: cyan-400 for links, icons, and interactive elements
- **Navigation**: gray-800 background with cyan-400 logo/links
- **Buttons**: cyan-600 with cyan-700 hover states
- **Borders**: gray-700 for subtle separation

### JavaScript Entry Point

`src/main.js` is the single JavaScript entry point that:
- Imports Flowbite for interactive components
- Initializes Lucide icons with `createIcons({ icons })`
- Imports and initializes EmailJS for contact form submissions
- Imports IMask for phone number formatting
- Handles form validation and input formatting (name capitalization, phone masking, character counters)

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
Fixed-position navbar (`fixed top-0 w-full`) with smooth scrolling enabled via `scroll-smooth` class on `<html>`. All nav links use anchor links to section IDs. Responsive padding is applied to the nav element (`px-4 sm:px-6 md:px-8 lg:px-10`) to ensure content alignment with sections at all breakpoints.

### Forms
Contact form (#contactForm) includes name, email, phone, subject, and message fields with full validation and submission handling via EmailJS. The form uses a responsive grid layout (`grid grid-cols-1 sm:grid-cols-2 gap-4`) for name/phone fields. Features include:
- Name input with automatic capitalization
- Phone input with IMask formatting: `(000) 000-0000`
- Subject field with character counter (max 128 chars) and color-coded feedback
- Message textarea with character counter (min 16, max 1024 chars) and validation hints
- EmailJS integration for sending emails (service_8uwodx9, template_8ir0hso)

### Maps
Two embedded Google Maps with rounded corners (`rounded-md` on both container and iframe):
- Service area map in #service-area section
- Contact location map in #contact section (points to Husky Drilling Company location)
Maps use border and matching background color to prevent white corners from showing.

### Color Scheme

**Light Mode:**
- **Backgrounds**: gray-200 for body, gray-100 and gray-200 alternating for sections, gray-50 for cards
- **Primary Text**: gray-700 for body text
- **Headings**: cyan-600 for all h2/h3 headings
- **Accents**: cyan-600 for links, icons, and interactive elements
- **Navigation**: gray-100 background with cyan-600 logo, gray-700 text with cyan-600 hover states
- **Buttons**: cyan-600 with cyan-700 hover states, gray-100 text
- **Borders**: gray-300 for subtle separation
- **Footer**: gray-100 background with gray-700 text and cyan-600 headings

**Dark Mode:**
- **Backgrounds**: gray-800 and gray-900 alternating for sections, gray-700 for cards
- **Primary Text**: gray-300 for body text
- **Headings**: cyan-400 for all h2/h3 headings
- **Accents**: cyan-400 for links, icons, and interactive elements
- **Navigation**: gray-800 background with gray-300 text
- **Buttons**: cyan-600 with cyan-700 hover states
- **Borders**: gray-700 for subtle separation
- **Footer**: gray-950 background with gray-400 text and gray-300 headings

**Consistent Elements:**
- Both modes use gray color palette for backgrounds and neutrals
- cyan is the primary brand color across both modes (cyan-600 in light, cyan-400 in dark)
- Smooth transitions on color changes: `transition-colors duration-300`
- Buttons use cyan-600/cyan-700 in both modes for consistency

## Common Patterns

- Sections use `py-20 px-6` for consistent vertical/horizontal padding
- Content containers: `max-w-7xl mx-auto` for centered max-width layout
- Cards: `rounded-md shadow-lg` for consistent card styling
- Hover effects: `hover:-translate-y-2 transition` on service cards
- Dark mode: Every styled element has `dark:` variants for colors
