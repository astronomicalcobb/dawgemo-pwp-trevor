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

Dark mode is implemented using Tailwind's `dark:` variant with `darkMode: 'media'` configuration. Colors automatically switch based on user's system preference. The site uses a custom OKLCH color system defined in `src/style.css` with semantic color tokens.

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

**Navigation Styling:**
- Background: `bg-base-50/95` (light) / `dark:bg-base-750/95` (dark) with semi-transparency
- Text: `text-base-content` (light) / `dark:text-dark-base-content` (dark)
- Hover states: `hover:bg-base-100/50` (light) / `dark:hover:bg-base-800/50` (dark)
- Contact button: `bg-primary` / `dark:bg-dark-primary` with `text-dark-base-content` styled as a CTA button

All sections have responsive scroll margins to prevent navbar overlap:
- Mobile: `scroll-mt-14` (56px) for regular sections
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
- Hover effect: `hover:-translate-y-2` lift animation
- Card styling: Gradient background with borders
  - Background: `bg-gradient-to-br from-secondary/20 dark:from-dark-primary/30 to-secondary/5 dark:to-dark-secondary/5`
  - Border: `border dark:border-1 border-secondary/50 dark:border-dark-secondary/50`
- Icon color: `text-secondary` (light) / `dark:text-dark-secondary` (dark)
- Heading color: `text-secondary` (light) / `dark:text-dark-secondary` (dark)
- Card text: `text-base-content` (light) / `dark:text-base-150` (dark)

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
- Dynamically fetches Google Place details via Places API using `textSearch` and `getDetails`
- Displays rating, reviews count, business hours, and open/closed status
- Collapsible hours section with toggle interaction
- Toggle button: `text-secondary dark:text-dark-secondary` with underline hover
- "View on Google Maps" link styled `text-secondary dark:text-dark-secondary`
- Error handling: Falls back to `renderPlaceDetailsError()` if Places API fails (note: function is referenced but not implemented in current codebase)
- Place details rendered in `#place-details` container with gradient background matching service cards
- Loading state: Animated pulse skeleton while fetching place details

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
- Card styling: `bg-base-100 border border-base-400 dark:border-base-600 rounded-md shadow-lg`
- Images include: sunset drilling scenes, rig setup in El Cerro, Corrales job, equipment photos
- All images stored in `/assets/images/` directory

### About Section
Company history and values (`#about`) with two subsections:

**Our History Timeline:**
- Vertical timeline with left border (`border-l-4 border-accent dark:border-dark-accent`)
- 5 timeline items: 1960, 1965, 1989, 1992, Present
- Each item has dot marker (`bg-accent dark:bg-dark-accent`) with scale-on-hover effect (`group-hover:scale-125`)
- Dot styling: `border-4 border-base-100 dark:border-base-800`
- Cards with gradient background matching service cards:
  - Background: `bg-gradient-to-br from-secondary/20 dark:from-dark-primary/30 to-secondary/5 dark:to-dark-secondary/5`
  - Border: `border dark:border-1 border-secondary/50 dark:border-dark-secondary/50`
- Timeline year labels: `text-secondary dark:text-dark-secondary`
- Cards with hover translate-up effect (`hover:-translate-y-2`)
- Card text: `text-base-content dark:text-dark-base-content`
- Responsive left padding and dot positioning

**Our Values Grid:**
- 4 value cards: Reliability, Quality, Integrity, Community
- Responsive grid: 1 column mobile, 2 columns tablet, 4 columns desktop
- Lucide icons for each value (shield-check, badge-check, handshake, house)
- Card styling matches service cards (gradient background with borders)
- Icon color: `text-secondary` (light) / `dark:text-dark-secondary` (dark)
- Heading color: `text-secondary` (light) / `dark:text-dark-secondary` (dark)
- Card text: `text-base-content` (light) / `dark:text-dark-base-content` (dark)
- Section separator: `border-t border-secondary dark:border-dark-primary`

### Footer
Three-column footer layout with company info, contact details, and quick links:
- Responsive grid: 1 column mobile, 3 columns tablet+
- Dark/light mode logo switching
- Background: `bg-base-100` (light) / `dark:bg-base-800` (dark)
- Heading color: `text-base-content` (light) / `dark:text-dark-base-content` (dark)
- Text color: `text-base-750` (light) / `dark:text-base-100` (dark)
- Contact info with Lucide icons (phone, mail, clock-4)
- Clickable phone/email links with hover effects: `hover:text-secondary dark:hover:text-dark-secondary`
- Quick navigation links with translate-x hover effect: `hover:translate-x-1`
- Copyright notice with top border: `border-t border-primary-300 dark:border-dark-primary-300`
- Copyright text: `text-base-content dark:text-dark-base-content`

### Color Scheme

The website uses a **custom OKLCH color system** defined in `src/style.css` with semantic color tokens for consistent theming. Colors are specified using the OKLCH color space for better perceptual uniformity and wider color gamut support.

**Base Color Scale (Neutrals):**
- 48 shades from base-25 (lightest) to base-975 (darkest)
- Defined in increments of 25 (e.g., base-50, base-75, base-100, etc.)
- Low chroma (0.000-0.02) for neutral appearance
- Used for backgrounds, borders, and subtle UI elements

**Semantic Color Tokens:**
- **base-content / dark-base-content**: Primary text colors
- **primary / dark-primary**: Main brand color (blue) for CTAs and important actions
  - Variants: primary-200, primary-300 for hover/focus states
- **secondary / dark-secondary**: Accent color (cyan/turquoise) for icons, headings, links
- **accent / dark-accent**: Tertiary color (orange) for timeline and special accents
- **info, success, warning, error**: Status colors with dark mode variants
- **neutral**: General neutral color with variants

**Section Backgrounds:**
- Alternating pattern for visual separation:
  - Odd sections (Services, Gallery, Contact): `bg-base-50` (light) / `dark:bg-base-750` (dark)
  - Even sections (Service Area, About, Footer): `bg-base-100` (light) / `dark:bg-base-800` (dark)

**Card Styling Pattern:**
- Gradient backgrounds: `from-secondary/20 dark:from-dark-primary/30 to-secondary/5 dark:to-dark-secondary/5`
- Borders: `border dark:border-1 border-secondary/50 dark:border-dark-secondary/50`
- Applied to: Service cards, Timeline cards, Values cards, Place details container

**Interactive Elements:**
- Buttons: `bg-primary` / `dark:bg-dark-primary` with hover states (primary-200, primary-300)
- Links: `text-secondary` / `dark:text-dark-secondary` with hover effects
- Icons: `text-secondary` / `dark:text-dark-secondary` in most contexts
- Form inputs: Focus ring uses `ring-secondary` / `dark:ring-dark-secondary`

**Typography Colors:**
- Section headings (h2): `text-base-content` / `dark:text-dark-base-content`
- Card headings (h3): `text-secondary` / `dark:text-dark-secondary`
- Body text: `text-base-content` / `dark:text-dark-base-content` or `text-base-750` / `dark:text-base-100`
- Muted text: Various base shades (base-150, base-250, base-300, etc.)

**Transitions:**
- Color transitions: `transition-colors duration-300` applied globally
- Map styles update automatically based on `prefers-color-scheme` media query

## Common Patterns

- Sections use responsive padding: `px-4 sm:px-6 md:px-8 lg:px-10` (horizontal) and `py-11 sm:py-12 md:py-13 lg:py-14` (vertical)
- Content containers: `max-w-7xl mx-auto` for centered max-width layout
- Cards: `rounded-md shadow-lg` for consistent card styling with gradient backgrounds
- Card gradient pattern: `bg-gradient-to-br from-secondary/20 dark:from-dark-primary/30 to-secondary/5 dark:to-dark-secondary/5`
- Card border pattern: `border dark:border-1 border-secondary/50 dark:border-dark-secondary/50`
- Hover effects: `hover:-translate-y-2 transition` on service cards, timeline items, and value cards
- Grid layouts: Responsive grids using `grid-cols-1` with breakpoint variants (sm:, md:, lg:, xl:)
- Dark mode: Every styled element has `dark:` variants for colors using the custom OKLCH color system
- Color transitions: `transition-colors duration-300` for smooth theme changes
- Icon animations: `group-hover:scale-110` or `group-hover:scale-125` for interactive feedback
