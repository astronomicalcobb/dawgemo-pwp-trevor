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
- **Maps**: Google Maps JavaScript API (loaded via inline script, version: weekly)
- **Forms**: EmailJS 4.x (loaded via CDN, initialized with public key: 2Zxpf0h3F0WtUFVCf)
- **Input Masking**: IMask (for phone number formatting)
- **JavaScript**: Vanilla JS (ES modules)

## Architecture

### Single-Page Structure

The entire website is contained in `index.html` with the following sections in order:
1. Navigation (fixed top nav with links to all sections)
2. Hero Section (#home)
3. Services Section (#services) - 4 service cards
4. Service Area Section (#service-area) - embedded Google Map with service area polygon
5. Gallery Section (#gallery) - 6 gallery images
6. About Section (#about) - includes History timeline and Values grid
7. Contact Section (#contact) - contact form and embedded map with place details
8. Footer

### Dark Mode

Dark mode is implemented using Tailwind's `dark:` variant with `darkMode: 'media'` configuration. Colors automatically switch based on user's system preference.

**Dark Mode Color Palette:**
- **Backgrounds**: gray-800 and gray-900 alternating for sections, gray-700 for cards
- **primary-100 Text**: gray-300 for body text
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
- Handles mobile menu interactions:
  - Closes menu when navigation link is clicked
  - Removes focus from hamburger button after click
- Initializes Google Maps API with two maps:
  - Service area map with polygon overlay showing coverage area
  - Contact map with marker and dynamic Google Place details (rating, hours, address)
- Handles dark/light mode map styling based on system preference
- Handles form validation and input formatting:
  - Name capitalization
  - Phone masking with IMask
  - Email validation with regex pattern
  - Character counters for subject (128 max) and message (1024 max) with color-coded feedback
  - Form submission via EmailJS with counter reset on success

### Styling

`src/style.css` configures Tailwind CSS and imports:
- Referenced in HTML via `<link href="/src/style.css" rel="stylesheet">`
- Processed by PostCSS with @tailwindcss/postcss plugin during build
- May include Flowbite integration or custom CSS

Note: Tailwind classes are used extensively throughout the HTML with responsive variants and dark mode support.

## File Organization

```
/
├── index.html          # Main single-page HTML file
├── src/
│   ├── main.js        # JavaScript entry point (Flowbite, Lucide, Google Maps, EmailJS, IMask, form handling)
│   └── style.css      # Tailwind CSS configuration and imports
├── public/assets/     # Static assets directory
├── documentation/ui/  # UI reference links (Penguin UI, Radix UI, shadcn/ui)
└── postcss.config.cjs # PostCSS configuration for Tailwind
```

## Key Implementation Details

### Google Maps API
The Google Maps JavaScript API is loaded in the `<head>` via inline loader script:
- API Key: `AIzaSyAi3vqD5-waWnp7BmeKYW7TmPr3ptE7RmU`
- Version: `weekly` (automatically uses latest stable version)
- Dynamic library loading via `google.maps.importLibrary()` in main.js
- Libraries used: `maps`, `marker`, `places`

### Dev Server Proxy
Developer to run local development server via `npm run dev` instead of Claude Code.

### Branding & Hero
**Page Title:** "Husky Drilling" (in `<title>` tag)

**Favicons:**
- Light mode: `/favicon.png`
- Dark mode: `/favicon-dark.png` (via media query in link tag)

**Logos:**
- Light mode: `/assets/images/dawg.png`
- Dark mode: `/assets/images/dawg-dark.png`
- Logo switching handled via `dark:hidden` and `hidden dark:block` classes

**Hero Section:**
- Full viewport height (`h-screen`)
- Background image: `/assets/images/hero.jpeg` with overlay
- Responsive object positioning: `object-right` on mobile, `object-center` on larger screens
- CTA button linking to contact section
- Responsive typography scaling across breakpoints

### Navigation
Fixed-position navbar (`fixed top-0 w-full`) with smooth scrolling enabled via `scroll-smooth` class on `<html>`. All nav links use anchor links to section IDs. Responsive padding is applied to the nav element (`px-4 sm:px-6 md:px-8 lg:px-10`) to ensure content alignment with sections at all breakpoints.

All sections have responsive scroll margins to prevent navbar overlap:
- Mobile: `scroll-mt-12` (48px) for regular sections, `scroll-mt-16` (64px) for hero
- Desktop: `sm:scroll-mt-16` (64px) for all sections

Mobile menu uses Flowbite's `data-collapse-toggle` for hamburger menu functionality with Lucide menu icon. JavaScript automatically:
- Closes menu when navigation link is clicked
- Removes focus from hamburger button after click to clear focus styles

### Services
Four service cards in responsive grid layout (`#services`):
1. **Drilling** - arrow-down-to-line icon
2. **Pump Installation** - droplet icon
3. **Well Services** - wrench icon
4. **Maintenance** - cog icon

Card features:
- Responsive grid: 1 column mobile, 2 columns tablet, 4 columns desktop
- Centered text layout with Lucide icons
- Hover effect: `-translate-y-2` lift animation
- Icon color: cyan-500 in both light and dark modes
- Card background: gray-300 (light) / gray-700 (dark)
- Card text: gray-700 (light) / gray-400 (dark)

### Forms
Contact form (#contactForm) includes name, email, phone, subject, and message fields with full validation and submission handling via EmailJS. The form uses a responsive grid layout (`grid grid-cols-1 sm:grid-cols-2 gap-4`) for name/phone fields.

**Field Features:**
- **Name**: Automatic capitalization on input, must have first and last name (2+ words)
- **Phone**: IMask formatting `(000) 000-0000`, 4-64 chars
- **Email**: Automatically lowercased and trimmed, custom validation with regex pattern, 8-64 chars
- **Subject**: Character counter with color-coding (gray → green at 1+ chars → yellow at 80% → red at max or < 4 chars), max 128 chars, min 4 chars required
- **Message**: Character counter with validation feedback (gray → green at 16+ chars → yellow at 80% → red at max or < 16 chars), min 16 chars, max 1024 chars

**Validation Rules:**
- Name must contain at least 2 space-separated words
- Subject minimum 4 characters
- Message minimum 16 characters
- Email uses custom regex validation pattern
- Phone uses standard HTML5 validation with IMask formatting

**EmailJS Integration:**
- Service ID: `service_8uwodx9`
- Template ID: `template_8ir0hso`
- Public Key: `2Zxpf0h3F0WtUFVCf`
- Template parameters include: name, phone, email, subject, message
- Success/error feedback displayed below submit button
- Form resets on successful submission
- Character counters reset to (0/128) and (0/1024) with gray styling
- Button disabled during submission with "Sending..." text

### Maps
Two embedded Google Maps initialized via JavaScript in `main.js` using Google Maps JavaScript API:

**Service Area Map** (`#service-area-map`):
- Displays polygon overlay showing service coverage area across central New Mexico
- 171 coordinate points defining the service boundary
- Green polygon (`#0F9D58`) with 15% fill opacity
- Auto-fitted bounds to center the polygon
- Responsive height: `32vh` mobile, `64vh` desktop

**Contact Map** (`#contact-map`):
- Marker at Husky Well & Pump Service location (34.656926, -106.757983)
- Dynamically fetches Google Place details via Places API
- Displays rating, reviews count, business hours, and open/closed status
- Collapsible hours section with toggle interaction (cyan-600/cyan-500 button color)
- "View on Google Maps" link styled cyan-600 (light) / cyan-500 (dark)
- Fallback to static info if Places API fails
- Place details rendered in `#place-details` container with responsive padding

**Map Styling:**
- Dark mode styles automatically applied based on system preference
- Custom dark map theme with muted colors
- Style updates on theme change via `matchMedia` listener
- Border and background color match section backgrounds to prevent white corners

### Gallery
Photo gallery section (`#gallery`) displaying 6 images of drilling operations:
- Responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop
- Fixed card height: `h-72` with `overflow-hidden`
- Images use `object-cover` to fill card space
- Hover effect: `group-hover:scale-105` for subtle zoom on image
- Images include: sunset drilling scenes, rig setup in El Cerro, Corrales job, equipment photos
- All images stored in `/assets/images/` directory

### About Section
Company history and values (`#about`) with two subsections:

**Our History Timeline:**
- Vertical timeline with left border (`border-l-4 border-cyan-600 dark:border-cyan-500`)
- 5 timeline items: 1960, 1965, 1989, 1992, Present
- Each item has cyan dot marker (`bg-cyan-600 dark:bg-cyan-500`) with scale-on-hover effect (`group-hover:scale-125`)
- Timeline year labels: `text-cyan-600 dark:text-cyan-500`
- Cards with hover translate-up effect (`hover:-translate-y-2`)
- Card background: gray-50 (light) / gray-700 (dark)
- Responsive left padding and dot positioning

**Our Values Grid:**
- 4 value cards: Reliability, Quality, Integrity, Community
- Responsive grid: 1 column mobile, 2 columns tablet, 4 columns desktop
- Lucide icons for each value (shield-check, badge-check, handshake, house)
- Icon color: cyan-600 (light) / cyan-500 (dark)
- Card text: gray-700 (light) / gray-400 (dark)
- Same card styling as services section

### Footer
Three-column footer layout with company info, contact details, and quick links:
- Responsive grid: 1 column mobile, 3 columns tablet+
- Dark/light mode logo switching
- Contact info with Lucide icons (phone, mail, clock-4)
- Clickable phone/email links with hover effects
- Quick navigation links with translate-x hover effect
- Copyright notice with top border separator
- Footer background: gray-100 (light) / gray-950 (dark)

### Color Scheme

**Light Mode:**
- **Backgrounds**: gray-200 for body, gray-100 and gray-200 alternating for sections, gray-50 for cards
- **primary-100 Text**: gray-700 for body text
- **Headings**: cyan-600 for all h2/h3 headings
- **Accents**: cyan-600 for links, icons, and interactive elements
- **Navigation**: gray-100 background with cyan-600 logo, gray-700 text with cyan-600 hover states
- **Buttons**: cyan-600 with cyan-700 hover states, gray-100 text
- **Borders**: gray-300 for subtle separation
- **Footer**: gray-100 background with gray-700 text and cyan-600 headings

**Dark Mode:**
- **Backgrounds**: gray-800 and gray-900 alternating for sections, gray-700 for cards
- **primary-100 Text**: gray-300 for headings and primary-100 text, gray-400 for body/card text
- **Headings**: gray-300 for all h2/h3 section headings
- **Accents**: cyan-500 for icons, timeline elements, and interactive elements
- **Navigation**: gray-800 background with gray-300 text
- **Buttons**: cyan-500 background with cyan-700 hover states, gray-100 text
- **Borders**: gray-700 for subtle separation, cyan-500 for timeline borders
- **Footer**: gray-950 background with gray-400 text and gray-300 headings

**Consistent Elements:**
- Both modes use gray color palette for backgrounds and neutrals
- cyan is the primary-100 brand color across both modes:
  - Light mode: cyan-600 for most accents, cyan-500 for service icons
  - Dark mode: cyan-500 for most accents (icons, buttons, timeline elements)
- Smooth transitions on color changes: `transition-colors duration-300`
- Buttons use cyan-500 (dark) / cyan-600 (light) with cyan-700 hover in both modes

## Common Patterns

- Sections use responsive padding: `px-4 sm:px-6 md:px-8 lg:px-10` (horizontal) and `py-11 sm:py-12 md:py-13 lg:py-14` (vertical)
- Content containers: `max-w-7xl mx-auto` for centered max-width layout
- Cards: `rounded-md shadow-lg` for consistent card styling
- Hover effects: `hover:-translate-y-2 transition` on service cards and timeline items
- Grid layouts: Responsive grids using `grid-cols-1` with breakpoint variants (sm:, md:, lg:, xl:)
- Dark mode: Every styled element has `dark:` variants for colors
- Color transitions: `transition-colors duration-300` for smooth theme changes
